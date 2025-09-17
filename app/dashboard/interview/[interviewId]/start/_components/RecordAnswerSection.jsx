"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { Mic, StopCircle, Loader2, Camera, CameraOff } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({ 
  mockInterviewQuestion, 
  activeQuestionIndex, 
  interviewData, 
  onAnswerSave,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    // Speech recognition setup with better browser compatibility
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        setSpeechSupported(true);

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            }
          }

          if (finalTranscript.trim()) {
            setUserAnswer(prev => (prev + ' ' + finalTranscript).trim());
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          toast.error(`Speech recognition error: ${event.error}`);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.onstart = () => {
          console.log('Speech recognition started');
        };
      } else {
        console.warn('Speech recognition not supported in this browser');
        setSpeechSupported(false);
        toast.warning('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      }
    }
  }, []);

  const EnableWebcam = async () => {
    try {
      // Request both video and audio permissions for better recording experience
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
      setWebcamEnabled(true);
      toast.success("Webcam and microphone enabled successfully");
    } catch (error) {
      console.error("Webcam error:", error);
      
      let errorMessage = "Failed to enable webcam";
      let description = "Please check your camera permissions";
      
      if (error.name === 'NotAllowedError') {
        errorMessage = "Camera access denied";
        description = "Please allow camera access in your browser settings";
      } else if (error.name === 'NotFoundError') {
        errorMessage = "No camera found";
        description = "Please connect a camera to your device";
      } else if (error.name === 'NotReadableError') {
        errorMessage = "Camera is being used by another application";
        description = "Please close other applications using the camera";
      }
      
      toast.error(errorMessage, { description });
    }
  };

  const DisableWebcam = () => {
    const tracks = webcamRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
    setWebcamEnabled(false);
  };

  const StartStopRecording = () => {
    if (!speechSupported || !recognitionRef.current) {
      toast.error("Speech-to-text not supported in your browser. Please use Chrome or Edge for voice recording.");
      return;
    }

    try {
      if (isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
        toast.info("Recording stopped");
      } else {
        recognitionRef.current.start();
        setIsRecording(true);
        toast.info("Recording started - speak now!");
      }
    } catch (error) {
      console.error('Recording error:', error);
      toast.error(`Failed to ${isRecording ? 'stop' : 'start'} recording: ${error.message}`);
      setIsRecording(false);
    }
  };

  const UpdateUserAnswer = async () => {
    // (previous answer saving logic remains the same)
    if (!userAnswer.trim()) {
      toast.error("Please provide an answer");
      return;
    }

    setLoading(true);

    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please give a rating out of 10 and feedback on improvement in JSON format { "rating": <number>, "feedback": <text> }`;
      
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace(/```json|```/g, '').trim();
      const JsonfeedbackResp = JSON.parse(mockJsonResp);

      const answerRecord = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await db.insert(UserAnswer).values(answerRecord);

      onAnswerSave?.(answerRecord);

      toast.success("Answer recorded successfully");
      
      setUserAnswer("");
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } catch (error) {
      toast.error("Failed to save answer", {
        description: error.message
      });
      console.error("Answer save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col relative">
      {loading && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex flex-col justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-white mb-4" />
          <p className="text-white text-lg">Saving your answer...</p>
        </div>
      )}
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        {webcamEnabled ? (
          <video 
            ref={webcamRef} 
            autoPlay 
            playsInline 
            className="w-[200px] h-[200px] object-cover rounded-lg"
          />
        ) : (
          <div className="w-[200px] h-[200px] flex justify-center items-center bg-gray-200 rounded-lg">
            <p className="text-gray-500">Webcam Disabled</p>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
        >
          {webcamEnabled ? (
            <>
              <CameraOff className="mr-2 h-4 w-4" /> Disable Webcam
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" /> Enable Webcam
            </>
          )}
        </Button>
      </div>

      <Button
        disabled={loading || !speechSupported}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className={`flex gap-2 items-center ${!speechSupported ? 'text-gray-400' : 'text-primary'}`}>
            <Mic /> {!speechSupported ? 'Voice Recording Not Supported' : 'Record Answer'}
          </h2>
        )}
      </Button>
      
      {!speechSupported && (
        <p className="text-sm text-gray-500 mb-4 text-center">
          Voice recording is not supported in your browser. Please use Chrome or Edge for voice recording, or type your answer manually below.
        </p>
      )}

      <textarea
        className="w-full h-32 p-4 mt-4 border rounded-md text-gray-800"
        placeholder="Your answer will appear here..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
    
      <Button
        className="mt-4"
        onClick={UpdateUserAnswer}
        disabled={loading || !userAnswer.trim()}
      >
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
        ) : (
          "Save Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;