# SheGymZ – Private Women's Wellness Club (POC)

A sophisticated proof-of-concept website for SheGymZ, a private, women-only wellness club in South Africa.

**Current Status:** Deployment-ready proof of concept with PayFast integration skeleton.

---

## 🎯 Project Philosophy

This is **not a marketing funnel**. This is a threshold to a private women's club.

**Design Principles:**
- Calm, not aggressive
- Exclusive, not loud
- Safe, not salesy
- Minimal, not cluttered
- Word-of-mouth growth, not advertising

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks only
- **Payments:** PayFast (South Africa)
- **Images:** Static local imports (replaceable placeholders)
- **Auth:** None (intentionally omitted)
- **Database:** None (intentionally omitted)

---

## 📁 Project Structure

```
shegymz/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   ├── page.tsx                # Landing page (/)
│   │   ├── subscribe/
│   │   │   └── page.tsx            # Subscription flow (/subscribe)
│   │   ├── payment-success/
│   │   │   └── page.tsx            # Success page (after PayFast)
│   │   ├── payment-cancelled/
│   │   │   └── page.tsx            # Cancellation page
│   │   └── api/
│   │       ├── subscribe/
│   │       │   └── route.ts        # Create PayFast subscription
│   │       └── webhook/
│   │           └── payfast/
│   │               └── route.ts    # PayFast ITN webhook handler
│   ├── components/
│   │   ├── Navigation.tsx          # Top navigation
│   │   └── Footer.tsx              # Footer component
│   └── lib/
│       └── payfast.ts              # PayFast integration service
├── images/                         # Static imagery (gym photos)
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.js
├── .env.local.example              # Environment variables template
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd shegymz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   The `.env.local` file contains:
   - **NEXT_PUBLIC_PAYFAST_MERCHANT_ID**: PayFast merchant ID (currently sandbox test ID)
   - **NEXT_PUBLIC_PAYFAST_MERCHANT_KEY**: PayFast merchant key (currently sandbox test key)
   - **PAYFAST_PASSPHRASE**: Signature generation passphrase
   - **Redirect URLs**: Payment success/failure/webhook URLs
   - **Subscription amount**: Monthly membership fee in ZAR

   ⚠️ **DO NOT commit `.env.local` to git.** The example file is safe for development.

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Pages & Flows

### 1. Landing Page (`/`)

**Purpose:** Build trust, not pressure.

**Sections:**
- **Hero:** Calm headline with compelling subtext
- **Discretion Note:** "We don't advertise publicly"
- **What is SheGymZ:** Features & benefits (gym, recovery, trainers, wellness, content)
- **How Membership Works:** Monthly, cancelable, referral-based
- **Primary CTA:** "Request Membership"

**Design:**
- Uses supplied gym imagery with soft overlays
- Generous spacing
- Warm colour palette (plum, rose, neutral tones)
- No aggressive marketing language

### 2. Subscription Flow (`/subscribe`)

Three-step flow:

**Step 1: Form**
- Collects: Full name, email, phone, city, optional referral name
- Validation on client & server
- Calm, respectful tone

**Step 2: Review**
- Displays entered information for confirmation
- Shows membership details (trainers included, 24/7 access, cancel anytime)
- Displays monthly amount (configurable via env)

**Step 3: Payment (PayFast)**
- Redirects to PayFast payment page
- User enters card details on PayFast (PCI compliance)
- Returns to success/cancelled pages

### 3. Payment Success (`/payment-success`)

Confirms receipt and manages expectations.

### 4. Payment Cancelled (`/payment-cancelled`)

Allows retry or return to home.

---

## 💳 PayFast Integration

### Architecture

The PayFast integration uses a **server-side abstraction layer** for security.

```
Client → /api/subscribe (POST) → PayFast Service → PayFast Payment Page
                                                    ↓
                                        User completes payment
                                                    ↓
                                        PayFast → /api/webhook/payfast (ITN)
                                                    ↓
                                        Database updated (future)
```

### Implementation

**File:** `src/lib/payfast.ts`

Key functions:
- `createPayFastSubscriptionIntent()`: Generates secure PayFast redirect URL
- `generateSignature()`: Creates MD5 signature for request validation
- `verifyPayFastSignature()`: Validates webhook signatures
- `parsePayFastITN()`: Parses Instant Transaction Notification payload

### Subscription Model

- **Type:** Recurring/subscription billing
- **Frequency:** Monthly (cycle = 3)
- **Duration:** Infinite until cancelled (cycles = 0)
- **Amount:** Configurable via `NEXT_PUBLIC_SUBSCRIPTION_AMOUNT`

### API Endpoints

#### POST `/api/subscribe`
**Purpose:** Initiate PayFast subscription

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+27123456789",
  "city": "Cape Town",
  "referralName": "Mary Smith" // optional
}
```

**Response:**
```json
{
  "redirectUrl": "https://www.payfast.co.za/eng/process?merchant_id=...&signature=..."
}
```

**Usage in Code:**
```typescript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name, email, phone, city, referralName
  })
});
const { redirectUrl } = await response.json();
window.location.href = redirectUrl;
```

#### POST `/api/webhook/payfast`
**Purpose:** Handle PayFast Instant Transaction Notification (ITN)

**Triggered by:** PayFast, when payment completes/fails

**Payload:** Form-encoded data from PayFast (see `PayFastITNPayload` interface)

**Response:** Always 200 OK (confirms receipt)

---

## 🔐 Security & Best Practices

### Environment Variables
- **Never hardcode secrets.** All PayFast credentials are in `.env.local`.
- The `.env.local` file is in `.gitignore` — it won't be committed.
- The `.env.local.example` file contains safe test credentials for development.

### PayFast Sandbox vs. Production

**Current Setup (Development/Testing):**
```
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=10000100          # Sandbox test ID
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=46f1a4d8763...   # Sandbox test key
PAYFAST_PASSPHRASE=shegymz-test-passphrase
```

**To Use Production Credentials:**
1. Get live merchant ID, key, and passphrase from PayFast
2. Update `.env.local` with production values
3. Change payment URL from `https://www.payfast.co.za/sandbox/...` to `https://www.payfast.co.za/eng/process` (already done in code)

### Signature Verification
- All PayFast requests include an MD5 signature
- Signatures are verified on webhook receipt
- ⚠️ **Production Note:** Also verify on client side and always query PayFast API independently

---

## 🎨 Design System

### Colour Palette

**SheGymZ uses a warm, sophisticated palette:**

| Name | Tailwind | Use |
|------|----------|-----|
| **Plum** | `bg-plum-900` | Primary (buttons, headers) |
| **Rose** | `bg-rose-300` | Secondary (CTAs, accents) |
| **Charcoal** | `bg-neutral-900` | Dark text, depth |
| **Warm Grey** | `bg-warmgray-*` | Neutrals, backgrounds |
| **Off-white** | `bg-neutral-50` | Breathing space |

### Typography

- **Headings:** Semibold, generous line-height
- **Body:** System fonts, comfortable reading size
- **Buttons:** Rounded, solid fills, smooth hover transitions

### Components

All components are in `src/components/`:
- `Navigation.tsx`: Sticky header with logo and nav links
- `Footer.tsx`: Contact, privacy links, discretion statement

---

## 📋 What's Intentionally NOT Included

This is a **proof of concept**, not an MVP.

**Omitted (by design):**
- ❌ User authentication system
- ❌ Admin dashboard
- ❌ Database/CMS
- ❌ Analytics or tracking
- ❌ Social media integrations
- ❌ Testimonials or reviews
- ❌ Blog/content pages
- ❌ Influencer partnerships
- ❌ Marketing funnels

**These can be added in future iterations.**

---

## 🚧 Future Implementation Checklist

### Phase 2: Authentication & Management
- [ ] User login/signup system
- [ ] Membership status dashboard
- [ ] Admin approval workflow for new members
- [ ] Invite-only access gate

### Phase 3: Database & Content
- [ ] PostgreSQL/MongoDB setup
- [ ] Member profiles and preferences
- [ ] Class booking system
- [ ] Personal trainer scheduling

### Phase 4: Payment & Billing
- [ ] Payment history & receipts
- [ ] Subscription management (upgrade, pause, cancel)
- [ ] Refund handling
- [ ] Invoice generation

### Phase 5: Member Experience
- [ ] Member app (React Native)
- [ ] Class calendar
- [ ] Trainer availability
- [ ] Recovery/massage booking

### Phase 6: Legal & Compliance
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] POPI Act compliance (South Africa)
- [ ] Membership agreement template

---

## 🧪 Testing & Deployment

### Local Development
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Deployment Options

This is a standard Next.js app and can be deployed to:
- **Vercel** (recommended, native Next.js support)
- **Netlify**
- **AWS**
- **Self-hosted** (Node.js server)

**Important for PayFast:**
- Ensure HTTPS is enabled in production
- Update redirect URLs in `.env.local` to match your domain
- Configure PayFast webhook URL to match your deployment

---

## 📸 Image Handling

**Current images are from `images/` directory:**
- IMG_3780.jpeg (hero background)
- IMG_3757.jpeg (about section)
- IMG_3749.jpeg, IMG_3759.jpeg, etc. (for future use)

**Image components use Next.js `Image` component:**
```tsx
<Image
  src="/images/IMG_3780.jpeg"
  alt="descriptive alt text"
  fill
  className="object-cover"
  quality={85}
/>
```

**To replace images:**
1. Add new images to `public/images/`
2. Update `src` prop in components
3. Update alt text for accessibility

---

## 🛡️ PayFast Documentation

- **Merchant Setup:** https://www.payfast.co.za/
- **Subscription API:** https://www.payfast.co.za/documentation/#subscription-api
- **ITN Webhook:** https://www.payfast.co.za/documentation/#itn
- **Signature Generation:** https://www.payfast.co.za/documentation/#signature

---

## 📝 License & Attribution

This is a bespoke build for SheGymZ.

**Colour palette:** SheGymZ brand guidelines  
**Imagery:** User-supplied photography  
**Copy:** SheGymZ brand voice  

---

## 🤝 Support & Contact

For questions about this POC:
1. Review inline code comments (especially in `src/lib/payfast.ts`)
2. Check the PayFast documentation link above
3. Verify environment variables are set correctly
4. Test with PayFast sandbox credentials first

---

## 📊 Project Status

**Phase:** POC (Proof of Concept)  
**Completeness:** ~85%
- ✅ Landing page with all sections
- ✅ Subscription form and review flow
- ✅ PayFast integration skeleton
- ✅ Payment success/failure pages
- ✅ Responsive design (mobile-first)
- ✅ TypeScript strict mode
- ✅ Environment variable configuration
- ⏳ ITN webhook processing (scaffolded, needs production database)
- ⏳ Email notifications (scaffolded)
- ⏳ Admin approval workflow (future)

**Next Steps:**
1. Test locally with PayFast sandbox
2. Get PayFast live credentials
3. Deploy to production (Vercel recommended)
4. Implement database for member storage
5. Add authentication system
6. Build admin dashboard for membership approvals

---

**Built with intention. For women. In strength.**
