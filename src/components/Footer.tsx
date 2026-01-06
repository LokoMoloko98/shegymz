'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-warmgray-200 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-plum-900 mb-4">SheGymZ</h3>
            <p className="text-sm text-warmgray-600">
              A private space for women to train, restore, and belong.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-warmgray-600 hover:text-plum-800 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#membership" className="text-sm text-warmgray-600 hover:text-plum-800 transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href="/subscribe" className="text-sm text-warmgray-600 hover:text-plum-800 transition-colors">
                  Request Access
                </a>
              </li>
            </ul>
          </div>

          {/* Discretion Note */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-widest mb-4">
              Privacy
            </h4>
            <p className="text-xs text-warmgray-600 leading-relaxed">
              SheGymZ does not advertise publicly. Membership grows through trusted referrals only.
            </p>
          </div>
        </div>

        <div className="border-t border-warmgray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-warmgray-600">
          <p>&copy; {currentYear} SheGymZ. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-plum-800 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-plum-800 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-plum-800 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
