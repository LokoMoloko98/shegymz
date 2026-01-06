'use client';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-neutral-50/80 border-b border-warmgray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo / Brand */}
          <div className="text-2xl font-semibold text-plum-900">
            SheGymZ
          </div>
          <div className="hidden sm:block text-xs text-warmgray-600 font-medium tracking-widest uppercase">
            Private Wellness
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#about"
            className="text-sm text-neutral-700 hover:text-plum-800 transition-colors"
          >
            About
          </a>
          <a
            href="#membership"
            className="text-sm text-neutral-700 hover:text-plum-800 transition-colors"
          >
            Membership
          </a>
          <a
            href="/subscribe"
            className="px-6 py-2 bg-plum-900 text-white text-sm font-medium rounded hover:bg-plum-800 transition-colors"
          >
            Request Access
          </a>
        </div>
      </div>
    </nav>
  );
}
