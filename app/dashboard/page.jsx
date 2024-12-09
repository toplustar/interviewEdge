"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs";
import {
  Bot,
  Plus,
  ListChecks,
  Trophy,
  Zap,
  TrendingUp 
} from "lucide-react";

import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const [statsCards, setStatsCards] = useState([
    {
      icon: <ListChecks size={32} className="text-indigo-600" />,
      title: "Total Interviews",
      value: "0"
    },
    {
      icon: <Trophy size={32} className="text-green-600" />,
      title: "Best Score",
      value: "N/A"
    },
    {
      icon: <TrendingUp size={32} className="text-blue-600" />,
      title: "Improvement Rate",
      value: "0%"
    }
  ]);

  const fetchInterviews = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const response = await fetch('/api/fetchUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch interview data');
      }
  
      const data = await response.json();
      setInterviewData(data.userAnswers || []);

      // Calculate and update stats
      const totalInterviews = data.userAnswers?.length || 0;
      const bestScore = totalInterviews > 0 
        ? Math.max(...data.userAnswers.map(item => parseInt(item.rating || '0')))
        : 0;
      const improvementRate = calculateImprovementRate(data.userAnswers || []);

      setStatsCards([
        {
          ...statsCards[0],
          value: totalInterviews.toString()
        },
        {
          ...statsCards[1],
          value: bestScore ? `${bestScore}/10` : 'N/A'
        },
        {
          ...statsCards[2],
          value: `${improvementRate}%`
        }
      ]);

    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const calculateImprovementRate = (interviews) => {
    if (interviews.length <= 1) return 0;
    
    const scores = interviews
      .map(interview => parseInt(interview.rating || '0'))
      .sort((a, b) => a - b);
    
    const improvement = ((scores[scores.length - 1] - scores[0]) / scores[0]) * 100;
    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Greeting */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Bot className="text-indigo-600" size={40} />
            Dashboard
          </h2>
          <h3 className="text-xl text-gray-600 mt-2">
            Welcome, {user?.firstName || 'Interviewer'}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">
            {user?.primaryEmailAddress?.emailAddress || 'Not logged in'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card) => (
          <div 
            key={card.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
          >
            {card.icon}
            <div className="ml-4">
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <Zap size={32} className="text-yellow-500" />
            Create AI Mock Interview
          </h2>
          <button 
            onClick={() => setIsNewInterviewModalOpen(true)}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            New Interview
          </button>
        </div>

        {/* Add New Interview Component */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <AddNewInterview 
            isOpen={isNewInterviewModalOpen} 
            onClose={() => setIsNewInterviewModalOpen(false)} 
          />
        </div>
      </div>

     {/* Interview History */}
     <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Interview History
        </h2>
        <InterviewList interviews={interviewData} />
      </div>
    </div>
  );
}

export default Dashboard;