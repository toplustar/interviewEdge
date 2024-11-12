"use client";
import React from 'react'
import { useUser } from "@clerk/nextjs";

import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  const user = useUser();
  return (
    
    <div>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h3 className='text-lg'>Hi {user?.primaryEmailAddress?.emailAddress}</h3>
      <h3 className='text-lg'>Welcome to the AI Mockup Interview Platform</h3>
      <h2>Create and start your AI Mockup Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
        

      </div>
      <InterviewList/>


    </div>

  );

}

export default Dashboard