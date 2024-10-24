import React from 'react'
import Header from './_components/Header'
function DashboardLayout({children}) {
  return (
    <div>
<Header></Header>    
    {children}
      <h1>bye ji</h1>
    </div>
  );
}

export default DashboardLayout;
