import Link from 'next/link';

/**
 * GET /payment-cancelled
 *
 * User is redirected here if they cancel at PayFast.
 *
 * TODO (Production):
 * - Log cancellation for analytics
 * - Offer support/contact options
 * - Implement retry flow
 */
export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-block text-6xl">⊘</div>
        </div>
        <h1 className="text-4xl font-bold text-plum-900 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-lg text-warmgray-700 mb-8">
          Your payment was cancelled. If this was unexpected, you can try again or contact us for support.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/subscribe"
            className="inline-block px-8 py-3 bg-plum-900 text-white font-semibold rounded hover:bg-plum-800 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-plum-900 text-plum-900 font-semibold rounded hover:bg-plum-50 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
