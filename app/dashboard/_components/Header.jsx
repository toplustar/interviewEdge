"use client";  

import { UserButton } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Header() {
  const path = usePathname(); // usePathname inside the component

  useEffect(() => {
    console.log(path); // Logs the current pathname
  }, [path]); // Dependency array ensures this runs when path changes

  return (
    <div className="flex justify-between p-5 bg-secondary shadow-md">
      <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path==='/dashboard' ? 'text-primary font-bold' : 'text-black'}
        `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path==='/' ? 'text-primary font-bold' : 'text-black'}
        `}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path==='/' ? 'text-primary font-bold' : 'text-black'}
        `}>About</li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path==='/' ? 'text-primary font-bold' : 'text-black'}
        `}>jow</li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
