/**
 * PayFast Integration Service
 *
 * This is a POC implementation for PayFast subscription handling.
 * For production:
 * 1. Move secrets to secure backend environment
 * 2. Implement proper ITN (Instant Transaction Notification) webhook handler
 * 3. Add signature verification for all PayFast communications
 * 4. Implement database storage for subscription state
 * 5. Add proper error handling and logging
 *
 * DO NOT hardcode secrets. Use environment variables only.
 */

import crypto from 'crypto';

interface SubscriptionData {
  name: string;
  email: string;
  phone: string;
  bodyGoals?: string;
  referralName?: string;
}

/**
 * Generate PayFast signature for subscription request
 * WARNING: In production, this should only be done server-side
 */
function generateSignature(params: Record<string, string>): string {
  const passphrase = process.env.PAYFAST_PASSPHRASE || '';

  // Build query string excluding 'signature'
  const queryString = Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // Append passphrase if provided
  const stringToHash = passphrase
    ? `${queryString}&passphrase=${encodeURIComponent(passphrase)}`
    : queryString;

  // Generate MD5 hash
  return crypto.createHash('md5').update(stringToHash).digest('hex');
}

/**
 * Create PayFast subscription redirect URL
 * This prepares the user for redirect to PayFast payment page
 */
export function createPayFastSubscriptionIntent(data: SubscriptionData): string {
  const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || '10000100';
  const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || '46f1a4d8763a1d7949020a2628a7e2d7';
  const amount = process.env.NEXT_PUBLIC_SUBSCRIPTION_AMOUNT || '399.00';
  const returnUrl = process.env.NEXT_PUBLIC_PAYFAST_RETURN_URL || 'http://localhost:3000/payment-success';
  const cancelUrl = process.env.NEXT_PUBLIC_PAYFAST_CANCEL_URL || 'http://localhost:3000/payment-cancelled';
  const notifyUrl = process.env.NEXT_PUBLIC_PAYFAST_NOTIFY_URL || 'http://localhost:3000/api/webhook/payfast';

  const [firstName, ...lastNameParts] = data.name.split(' ');
  const lastName = lastNameParts.length > 0 ? lastNameParts.join(' ') : 'Member';

  // Build subscription parameters
  const params: Record<string, string> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: firstName,
    name_last: lastName,
    email_address: data.email,
    cell_number: data.phone,
    custom_str1: data.phone, // Passed as custom field
    custom_str2: data.referralName || '', // Passed as custom field
    custom_str3: data.bodyGoals || '', // Passed as custom field
    amount: amount,
    item_name: 'SheGymZ Monthly Membership',
    item_description: 'Private women\'s wellness club - 24/7 access, personal trainers included',
    subscription_type: '1', // 1 = recurring billing
    billing_cycle: '3', // 3 = monthly
    cycles: '0', // 0 = infinite/until cancelled
  };

  // Generate signature
  const signature = generateSignature(params);
  params.signature = signature;

  // Build redirect URL
  const baseUrl = 'https://www.payfast.co.za/eng/process';
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}?${queryString}`;
}

/**
 * Verify PayFast webhook signature
 * IMPORTANT: In production, ALWAYS verify webhook signatures before processing
 */
export function verifyPayFastSignature(
  params: Record<string, string>,
  signature: string
): boolean {
  const expectedSignature = generateSignature(params);
  return signature === expectedSignature;
}

/**
 * Parse PayFast ITN (Instant Transaction Notification) payload
 * This is called from the webhook endpoint
 *
 * TODO: In production, implement full ITN handler with:
 * - Signature verification
 * - Database transaction logging
 * - Member status update
 * - Email notifications
 * - Error recovery
 */
export interface PayFastITNPayload {
  m_payment_id: string;
  pf_payment_id: string;
  payment_status: 'COMPLETE' | 'FAILED' | 'PENDING';
  item_name: string;
  item_description: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  custom_str1: string; // phone
  custom_str2: string; // referral name
  name_first: string;
  name_last: string;
  email_address: string;
  cell_number: string;
  token: string; // For future recurring transactions
  signature: string;
}

export function parsePayFastITN(payload: Record<string, string>): PayFastITNPayload {
  return {
    m_payment_id: payload.m_payment_id || '',
    pf_payment_id: payload.pf_payment_id || '',
    payment_status: (payload.payment_status as 'COMPLETE' | 'FAILED' | 'PENDING') || 'PENDING',
    item_name: payload.item_name || '',
    item_description: payload.item_description || '',
    amount_gross: payload.amount_gross || '',
    amount_fee: payload.amount_fee || '',
    amount_net: payload.amount_net || '',
    custom_str1: payload.custom_str1 || '',
    custom_str2: payload.custom_str2 || '',
    name_first: payload.name_first || '',
    name_last: payload.name_last || '',
    email_address: payload.email_address || '',
    cell_number: payload.cell_number || '',
    token: payload.token || '',
    signature: payload.signature || '',
  };
}
