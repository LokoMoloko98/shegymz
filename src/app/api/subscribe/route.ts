import { NextRequest, NextResponse } from 'next/server';
import { createPayFastSubscriptionIntent } from '@/lib/payfast';

/**
 * POST /api/subscribe
 *
 * Initiates a PayFast subscription request.
 * Takes member data and returns a redirect URL to PayFast.
 *
 * TODO (Production):
 * - Validate input server-side
 * - Store membership request in database
 * - Implement proper error handling
 * - Add rate limiting
 * - Add spam detection
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, phone, bodyGoals, referralName } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create PayFast subscription intent
    const redirectUrl = createPayFastSubscriptionIntent({
      name,
      email,
      phone,
      bodyGoals,
      referralName,
    });

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate subscription' },
      { status: 500 }
    );
  }
}
