import React from 'react'
import { SignOutButton } from '@clerk/nextjs'


function Dashboard() {
  return (
   <div>Hello ji page ke andar se
       <SignOutButton>
   <button >My custom button</button>
 </SignOutButton>
   </div>

    );
  
}

export default Dashboard