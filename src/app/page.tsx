'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <>
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay - replace with supplied gym imagery */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/IMG_3780.jpeg"
            alt="Private women's fitness space"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/20 to-neutral-900/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6">
            A private space for women to train, restore, and belong.
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            24/7 access. Personal trainers included. No contracts. Just discretion and strength.
          </p>

          <Link
            href="/subscribe"
            className="inline-block px-8 py-4 bg-rose-300 text-plum-900 font-semibold rounded hover:bg-rose-200 transition-all duration-300 text-lg shadow-lg"
          >
            Request Membership
          </Link>
        </div>
      </section>

      {/* DISCRETION NOTE SECTION */}
      <section className="py-12 md:py-16 bg-neutral-50 border-b border-warmgray-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-warmgray-600 mb-4 font-semibold">
            How We Grow
          </p>
          <blockquote className="text-2xl md:text-3xl font-light text-plum-900 leading-relaxed">
            SheGymZ does not advertise publicly.
            <br />
            Membership grows through trusted referrals.
          </blockquote>
        </div>
      </section>

      {/* WHAT IS SHEGYMZ SECTION */}
      <section id="about" className="py-20 md:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-plum-900 mb-16 text-center">
            What Is SheGymZ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Left: Text content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-plum-800 mb-3">
                  🏋️ Gym & CrossFit
                </h3>
                <p className="text-warmgray-700 leading-relaxed">
                  Fully equipped private facility. Training on your terms. No crowds, no distractions.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-plum-800 mb-3">
                  💆 Massage & Recovery
                </h3>
                <p className="text-warmgray-700 leading-relaxed">
                  Dedicated recovery space. Professional massage therapy. Wellness is part of strength.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-plum-800 mb-3">
                  👥 Guided Training
                </h3>
                <p className="text-warmgray-700 leading-relaxed">
                  Personal trainers included in every membership. No add-ons. No upsells. Just support.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-plum-800 mb-3">
                  🧘 Wellness & Meditation
                </h3>
                <p className="text-warmgray-700 leading-relaxed">
                  Quiet spaces for reflection. Guided wellness sessions. Mental strength matters.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-plum-800 mb-3">
                  📸 Member Content
                </h3>
                <p className="text-warmgray-700 leading-relaxed">
                  Private content creation space. For members, by members. Ownership of your narrative.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-96 md:h-full min-h-[500px] rounded overflow-hidden">
              <Image
                src="/images/IMG_3757.jpeg"
                alt="SheGymZ facility"
                fill
                className="object-cover"
                quality={85}
              />
              {/* Subtle overlay for visual interest */}
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW MEMBERSHIP WORKS SECTION */}
      <section id="membership" className="py-20 md:py-28 bg-warmgray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-plum-900 mb-16 text-center">
            How Membership Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1: Monthly */}
            <div className="bg-white rounded p-8 border border-warmgray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold text-plum-900 mb-3">Monthly Billing</h3>
              <p className="text-warmgray-700 leading-relaxed">
                Simple monthly subscription. Charged automatically. No surprises.
              </p>
            </div>

            {/* Card 2: Flexible */}
            <div className="bg-white rounded p-8 border border-warmgray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="text-2xl font-semibold text-plum-900 mb-3">Cancel Anytime</h3>
              <p className="text-warmgray-700 leading-relaxed">
                No contracts. No lock-in periods. Leave when you need to. Always welcome back.
              </p>
            </div>

            {/* Card 3: Invitation */}
            <div className="bg-white rounded p-8 border border-warmgray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-plum-900 mb-3">Membership by Referral</h3>
              <p className="text-warmgray-700 leading-relaxed">
                We grow through word of mouth. Know someone? They can request access too.
              </p>
            </div>
          </div>

          {/* Access Revocation Note */}
          <div className="max-w-2xl mx-auto bg-rose-100 border border-rose-300 rounded p-6 text-center">
            <p className="text-sm text-warmgray-700 leading-relaxed">
              <span className="font-semibold text-plum-900">Private Club Terms:</span> SheGymZ reserves the right to revoke membership access in accordance with our private club policies. We are committed to maintaining a safe, respectful environment for all members.
            </p>
          </div>
        </div>
      </section>

      {/* PRIMARY CTA SECTION */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-plum-900 via-plum-800 to-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to join a community of strength?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Request membership today. We&apos;ll review your request and reach out to confirm your access to SheGymZ.
          </p>

          <Link
            href="/subscribe"
            className="inline-block px-8 py-4 bg-rose-300 text-plum-900 font-semibold rounded hover:bg-rose-200 transition-all duration-300 text-lg shadow-lg"
          >
            Request Membership
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
