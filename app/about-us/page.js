'use client'
import { useState } from 'react'
import { 
  Users, 
  Target, 
  Award, 
  Briefcase, 
  BookOpen, 
  Rocket 
} from 'lucide-react'

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const tabContent = {
    mission: {
      icon: <Target className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p>MockMate AI is on a mission to revolutionize interview preparation by providing personalized, intelligent AI coaching tailored to individual career aspirations.</p>
          <p>With MockMate AI, the goal is to bridge the gap between preparation and success, empowering users to unlock their full potential.</p>
        </div>
      )
    },
    story: {
      icon: <BookOpen className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p>The idea for MockMate AI was born from firsthand experiences with the challenges of interview preparation. As a solo developer, I wanted to create a platform that simplifies the process and builds confidence in individuals.</p>
          <p>This journey has been a testament to the power of passion and innovation, leading to the creation of an impactful tool for career growth.</p>
        </div>
      )
    },
    approach: {
      icon: <Rocket className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p>MockMate AI leverages advanced AI algorithms to generate dynamic, contextually relevant interview questions based on your professional background and goals.</p>
          <p>Through real-time analysis and feedback, the platform provides actionable insights, enabling users to improve with every mock interview attempt.</p>
        </div>
      )
    }
  }

  const coreValues = [
    {
      icon: <Award className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Continuous Learning",
      description: "Always striving to improve and provide better tools for growth."
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Empowerment",
      description: "Supporting individuals in building confidence and achieving professional success."
    },
    {
      icon: <Briefcase className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Excellence",
      description: "Delivering high-quality, impactful features to simplify interview preparation."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About MockMate AI
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            Empowering professionals to ace interviews through intelligent, personalized AI coaching
          </p>
        </div>

        {/* Tabs Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-16">
          <div className="flex border-b">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 flex items-center justify-center 
                  ${activeTab === tab 
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {tabContent[tab].icon}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-8">
            {tabContent[activeTab].content}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
