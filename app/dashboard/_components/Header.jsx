"use client";  

import { UserButton } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Header() {
  const path = usePathname(); // usePathname inside the component

  return (
    <div className="flex justify-between p-5 bg-secondary shadow-md">
      <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li className={`transition-all duration-300 ease-in-out hover:text-primary hover:font-bold cursor-pointer 
        ${path === '/dashboard' ? 'text-primary font-bold' : 'text-black'}
        `}>Dashboard</li>
        <li className={`transition-all duration-300 ease-in-out hover:text-primary hover:font-bold cursor-pointer 
        ${path === '/' ? 'text-primary font-bold' : 'text-black'}
        `}>Questions</li>
        <li className={`transition-all duration-300 ease-in-out hover:text-primary hover:font-bold cursor-pointer 
        ${path === '/' ? 'text-primary font-bold' : 'text-black'}
        `}>About</li>
        <li className={`transition-all duration-300 ease-in-out hover:text-primary hover:font-bold cursor-pointer 
        ${path === '/' ? 'text-primary font-bold' : 'text-black'}
        `}>jow</li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
