'use client'
import { useState } from 'react'
import { 
  Book, 
  Code, 
  PenTool, 
  Target, 
  FileText, 
  Globe, 
  Award, 
  Brain 
} from 'lucide-react'
import Link from 'next/link'
import HeroSection from './dashboard/_components/HeroSection'

const ResourceCard = ({ icon, title, description, links }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="ml-4 text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="space-y-2">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
        >
          {link.name}
        </a>
      ))}
    </div>
  </div>
)

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('tech')

  const resourceCategories = {
    tech: {
      icon: <Code className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Coding Platforms",
          description: "Practice coding and algorithmic problem-solving",
          icon: <Code className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
            { name: "LeetCode", url: "https://leetcode.com/" },
            { name: "HackerRank", url: "https://www.hackerrank.com/" },
            { name: "CodeChef", url: "https://www.codechef.com/" }
          ]
        },
        {
          title: "Technical Interview Preparation",
          description: "Resources for system design and technical interviews",
          icon: <Target className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "InterviewBit", url: "https://www.interviewbit.com/" },
            { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
            { name: "Pramp", url: "https://www.pramp.com/" }
          ]
        }
      ]
    },
    aptitude: {
      icon: <Brain className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Aptitude & Reasoning",
          description: "Practice quantitative and logical reasoning skills",
          icon: <PenTool className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "IndiaBix", url: "https://www.indiabix.com/" },
            { name: "Freshersworld Aptitude", url: "https://www.freshersworld.com/aptitude-questions" },
            { name: "MathsGuru Reasoning", url: "https://www.mathsguru.com/reasoning-questions/" }
          ]
        },
        {
          title: "Competitive Exam Prep",
          description: "Resources for competitive and placement exams",
          icon: <Award className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "GATE Overflow", url: "https://gateoverflow.in/" },
            { name: "Career Power", url: "https://careerpower.in/" },
            { name: "Brilliant.org", url: "https://brilliant.org/" }
          ]
        }
      ]
    },
    interview: {
      icon: <FileText className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Interview Guides",
          description: "Comprehensive interview preparation resources",
          icon: <Book className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "Insider Tips", url: "https://www.ambitionbox.com/" },
            { name: "InterviewStreet", url: "https://www.interviewstreet.com/" },
            { name: "Career Guidance", url: "https://www.shiksha.com/" }
          ]
        },
        {
          title: "Global Learning Platforms",
          description: "Online courses and learning resources",
          icon: <Globe className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "Coursera", url: "https://www.coursera.org/" },
            { name: "edX", url: "https://www.edx.org/" },
            { name: "Udacity", url: "https://www.udacity.com/" }
          ]
        }
      ]
    }
  }

  return (
    <>
    <HeroSection />
    <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          B.Tech Interview & Preparation Resources
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive collection of resources to support your professional growth and interview preparation
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-12">
        {Object.keys(resourceCategories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 mx-2 rounded-full text-sm font-medium transition-all 
            ${activeCategory === category 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} Resources
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {resourceCategories[activeCategory].resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>

      {/* Additional Resources Section */}
      <div className="mt-16 bg-white rounded-xl shadow-md p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Additional Preparation Tips
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Resume Building",
              description: "Create a standout professional resume",
              url: "https://www.canva.com/resumes/templates/"
            },
            {
              title: "Mock Interviews",
              description: "Practice with AI-powered interview simulations",
              url: "/dashboard"
            },
            {
              title: "Skill Assessment",
              description: "Identify and improve your key skills",
              url: "https://www.skillvalue.com/"
            }
          ].map((tip, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {tip.title}
              </h3>
              <p className="text-gray-600 mb-4">{tip.description}</p>
              <a
                href={tip.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Explore
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div></>
    
  )
}