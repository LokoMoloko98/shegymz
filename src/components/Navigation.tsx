'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-neutral-50/80 border-b border-warmgray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="SheGymZ Logo"
              width={300}
              height={300}
              className="h-48 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden sm:block text-2xl text-warmgray-600 font-medium tracking-widest uppercase">
            Private Wellness
          </div>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#about"
            className="text-2xl text-neutral-700 hover:text-plum-800 transition-colors font-medium"
          >
            About 
          </a>
          <a
            href="#membership"
            className="text-2xl text-neutral-700 hover:text-plum-800 transition-colors font-medium"
          >
            Subscription Details
          </a>
          <Link
            href="/subscribe"
            className="px-10 py-4 bg-plum-900 text-white text-xl font-semibold rounded hover:bg-plum-800 transition-colors"
          >
            Subscribe Here 
          </Link>
        </div>
      </div>
    </nav>
  );
}
