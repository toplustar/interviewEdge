"use client";
import { SignIn, SignInButton, UserButton,SignOutButton,SignedOut,SignedIn } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
  const path = usePathname(); // Gets the current path

  return (
    <div className="flex justify-between p-5 bg-secondary shadow-md z-50">
      <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
      
      <ul className="hidden md:flex gap-6">
        {/* Home Link */}
        <Link href="/" passHref>
          <li className={`transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:rounded-lg cursor-pointer px-3 py-2 
            ${path === '/' ? 'text-indigo-600 font-bold bg-indigo-100 rounded-lg' : 'text-black'}
          `}>
            Home
          </li>
        </Link>
        
        {/* Dashboard Link */}
        <Link href="/dashboard" passHref>
          <li className={`transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:rounded-lg cursor-pointer px-3 py-2 
            ${path === '/dashboard' ? 'text-indigo-600 font-bold bg-indigo-100 rounded-lg' : 'text-black'}
          `}>
            Dashboard
          </li>
        </Link>
        
        {/* How it works Link */}
        <Link href="/how-it-works" passHref>
          <li className={`transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:rounded-lg cursor-pointer px-3 py-2 
            ${path === '/how-it-works' ? 'text-indigo-600 font-bold bg-indigo-100 rounded-lg' : 'text-black'}
          `}>
            How it works
          </li>
        </Link>

        {/* About us Link */}
        <Link href="/about-us" passHref>
          <li className={`transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white hover:rounded-lg cursor-pointer px-3 py-2 
            ${path === '/about-us' ? 'text-indigo-600 font-bold bg-indigo-100 rounded-lg' : 'text-black'}
          `}>
            About us
          </li>
        </Link>



      </ul>
      
      <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
   
    </div>
  );
}

export default Header;
