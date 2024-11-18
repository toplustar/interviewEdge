"use client";
import { SignIn, SignInButton, UserButton, SignOutButton, SignedOut, SignedIn } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot } from "lucide-react";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-5 bg-secondary shadow-md z-50">
      {/* Logo replaced with text and icon */}
      <div className="flex items-center gap-2">
        <Bot className="text-indigo-600" size={32} />
        <span className="text-2xl font-bold text-indigo-600">MockMate AI</span>
      </div>

      {/* Rest of the previous code remains the same */}
      <ul className="hidden md:flex gap-6">
        <NavItem path={path} href="/" label="Home" />
        <NavItem path={path} href="/dashboard" label="Dashboard" />
        <NavItem path={path} href="/how-it-works" label="How it works" />
        <NavItem path={path} href="/about-us" label="About us" />
      </ul>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Authentication Buttons */}
      <div className="hidden md:block">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-secondary z-40 shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-5">
            <NavItem path={path} href="/" label="Home" mobile />
            <NavItem path={path} href="/dashboard" label="Dashboard" mobile />
            <NavItem path={path} href="/how-it-works" label="How it works" mobile />
            <NavItem path={path} href="/about-us" label="About us" mobile />
            {/* Authentication for mobile */}
            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <SignOutButton />
              </SignedIn>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

// NavItem Component remains the same as in the previous code
function NavItem({ path, href, label, mobile }) {
  return (
    <Link href={href} passHref>
      <li
        className={`transition-all duration-300 ease-in-out cursor-pointer px-3 py-2 ${
          path === href
            ? "text-indigo-600 font-bold bg-indigo-100 rounded-lg"
            : "text-black"
        } ${mobile ? "w-full block" : "hover:bg-indigo-600 hover:text-white hover:rounded-lg"}`}
      >
        {label}
      </li>
    </Link>
  );
}

export default Header;