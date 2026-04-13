"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-1 border-b border-white/10 backdrop-blur sticky top-0 z-50 bg-black/40">

      {/* Logo */}
      <Image  
        src="/images/logo.png"
        alt="AutoQA Labs"
        width={0}
        height={0}
        sizes="100vw"
        className="w-40 md:w-52 lg:w-60 h-auto drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]"
      />

      {/* Navigation */}
      <div className="space-x-6 hidden md:flex items-center">
       <Link href="/#services">Services</Link>
<Link href="/#about">About</Link>
<Link href="/#qa-audit">Contact</Link>

      
      </div>
    </header>
  );
}