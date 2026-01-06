import Link from 'next/link';

/**
 * GET /payment-success
 *
 * User is redirected here after successful PayFast payment.
 *
 * TODO (Production):
 * - Verify payment status with PayFast API
 * - Mark membership as active in database
 * - Send welcome email
 * - Create user account/member profile
 * - Log transaction details
 */
export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-block text-6xl">✓</div>
        </div>
        <h1 className="text-4xl font-bold text-plum-900 mb-4">
          Payment Received
        </h1>
        <p className="text-lg text-warmgray-700 mb-8">
          Thank you for requesting membership. We&apos;ll review your details and be in touch shortly with access information.
        </p>
        <div className="bg-rose-100 border border-rose-300 rounded p-6 mb-8">
          <p className="text-sm text-warmgray-700">
            Check your email for next steps. If you don&apos;t see our message in your inbox, please check spam.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-plum-900 text-white font-semibold rounded hover:bg-plum-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
