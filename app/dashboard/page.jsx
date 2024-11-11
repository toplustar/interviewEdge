"use client";
import React from 'react'

import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2>Create and start your AI Mockup Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
        

      </div>
      <InterviewList/>


    </div>

  );

}

export default Dashboard