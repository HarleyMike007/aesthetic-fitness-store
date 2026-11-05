# PRINT-ON-DEMAND (POD) & DROPSHIPPING AUTOMATION GUIDE
### Elite Fitness Apparel Blueprint: Printify / Printful + Shopify / Next.js

This document details the exact technical architecture, provider setup, and automated webhook pipelines needed to operate **AESTHETIX LAB** as a 100% automated, zero-inventory e-commerce brand.

---

## 1. Architecture Overview

```
[ Customer Front-End ]
        │  (User selects Size & Color -> Proceeds to Checkout)
        ▼
[ Payment & Order Capture ] ──> (Shopify Storefront API / Stripe Checkout)
        │
        ▼ (Webhook: `orders/paid`)
[ Automated Fulfillment Router ]
        │
        ├──> [ Printify / Printful API ]
        │          │
        │          ├── 1. Sublimation Printing (360° AOP)
        │          ├── 2. Precision Laser Cutting
        │          └── 3. Hand-Sewing (Cut & Sew)
        │
        ▼ (Webhook: `package/shipped`)
[ Customer Notification Engine ]
        └──> (Automated SMS & Email with Carrier Tracking: DHL / FedEx / USPS)
```

---

## 2. Choosing the Right POD Partner for All-Over-Print (AOP)

All-Over-Print fitness apparel requires **Cut & Sew Sublimation**, NOT Direct-to-Garment (DTG). 
In Cut & Sew:
1. The raw fabric roll is sublimated under high heat with your graphic pattern.
2. The panels (front, back, left sleeve, right sleeve, hood, cuffs) are precision cut.
3. The panels are stitched together. This ensures **zero white creasing under armpits or along seams**.

| Feature | Printful | Printify |
| :--- | :--- | :--- |
| **Best For** | Consistent in-house manufacturing, branded packing slips, custom printed inside labels. | Lower unit costs, access to multiple global manufacturing partners. |
| **Top AOP Catalog Items** | • Men's All-Over Print Recycled Athletic T-shirt<br>• All-Over Print Men's Athletic Long Shorts<br>• All-Over Print Unisex Hoodie | • AOP Cut & Sew Tee (Vendor: MWW On Demand)<br>• AOP Unisex Pullover Hoodie<br>• AOP Athletic Shorts with Compression Liner |
| **Fabric Compositions** | 92% Polyester, 8% Spandex (4-way stretch, moisture wicking). | High-density 260-300 GSM poly-spandex blends. |
| **Inside Label Branding** | Direct sublimation printed inside neck label with your custom logo and washing instructions. | Available through select print providers. |

---

## 3. AOP Print File Specifications (Critical for V-Taper Cut)

To make the optical V-Taper design look flawless, your graphic designer must adhere to these exact production specs:

1. **Resolution**: Minimum **300 DPI** (or minimum 150 DPI at 100% printed scale).
2. **Color Mode**: Export as **RGB** (specifically `sRGB IEC61966-2.1`). Sublimation RIP software maps sRGB to high-gamut CMYK inks.
3. **Bleed Area**: Add at least **0.5" to 0.75" (15–20mm)** bleed around all outer seams to prevent blank white edges during fabric cutting.
4. **Safe Zone (The V-Taper Rule)**:
   - Keep chest angle chevrons inside the safe zone (at least 1.5 inches away from armhole seam stitches).
   - This ensures that if the sewing operator has a slight 1/4-inch tolerance deviation, your V-taper chevron does not appear misaligned between the chest and the sleeve.

---

## 4. Integration Blueprint: Two Recommended Options

### Option A: Shopify + Printify/Printful App (Fastest, No-Code Backend)
This is the industry standard for fast-moving fitness streetwear brands.

1. **Step 1: Set Up Shopify Store**:
   - Create a Shopify store (Basic tier is sufficient).
   - Configure Shopify Payments, Apple Pay, Google Pay, and Stripe.
2. **Step 2: Connect Printify or Printful**:
   - Install the **Printify** or **Printful** app from the Shopify App Store.
   - Authorize API access.
3. **Step 3: Create & Sync AOP Products**:
   - Upload your front, back, and sleeve V-taper pattern templates in the Printify/Printful product creator.
   - Click **"Publish to Shopify"**. Printify automatically creates the product handle, variant SKUs (S, M, L, XL, 2XL), prices, and mockup images.
4. **Step 4: Enable Automated Order Routing**:
   - In Printful/Printify settings:
     - Set Order Approval to **"Automatic"** (or **"1-Hour Delay"** to allow customers to cancel or update sizing).
     - Attach a business credit card or PayPal balance to auto-pay production wholesale costs.
5. **Step 5: Connect Custom Front-End**:
   - Use the front-end code provided in this repository.
   - In `index.html`, replace the `simulateCheckout()` function with:
     ```javascript
     // Redirect to Shopify permalink cart checkout
     function proceedToShopifyCheckout() {
       // Format: https://your-store.myshopify.com/cart/{variant_id}:{quantity},{variant_id}:{quantity}
       const items = cart.map(i => `${i.variantId}:${i.qty}`).join(',');
       window.location.href = `https://checkout.aesthetixlab.com/cart/${items}`;
     }
     ```

---

### Option B: Next.js + Headless Printful API (Full Developer Control)

If you are running the front-end on Next.js/Vercel and want direct API control without paying Shopify monthly fees, use the **Printful REST API**.

#### Step 1: Install Printful Client
```bash
npm install axios dotenv
```

#### Step 2: Next.js API Route for Automated Fulfillment (`/api/checkout/route.ts`)
```typescript
import { NextResponse } from 'next/server';
import axios from 'axios';

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

export async function POST(req: Request) {
  try {
    const { orderDetails, shippingAddress, cartItems } = await req.json();

    // 1. Format order items for Printful Catalog Sync Variant IDs
    const printfulItems = cartItems.map((item: any) => ({
      sync_variant_id: item.printfulSyncVariantId, // e.g. 40182749
      quantity: item.qty,
      retail_price: item.price.toString(),
    }));

    // 2. Dispatch Order to Printful Fulfillment Engine
    const response = await axios.post(
      `${PRINTFUL_API_URL}/orders`,
      {
        recipient: {
          name: shippingAddress.fullName,
          address1: shippingAddress.street,
          city: shippingAddress.city,
          state_code: shippingAddress.stateCode, // e.g. 'CA'
          country_code: shippingAddress.countryCode, // e.g. 'US'
          zip: shippingAddress.zip,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
        },
        items: printfulItems,
        retail_costs: {
          currency: 'USD',
          subtotal: orderDetails.subtotal,
          shipping: orderDetails.shipping,
        },
        packing_slip: {
          email: 'support@aesthetixlab.com',
          phone: '+1 (800) 555-0199',
          message: 'BUILT ON THE BARS. SCULPTED FOR MASS. Tag @AESTHETIXLAB to be featured.',
          logo_url: 'https://aesthetixlab.com/assets/brand-logo-slip.png',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({
      success: true,
      printfulOrderId: response.data.result.id,
      status: response.data.result.status,
    });
  } catch (error: any) {
    console.error('Printful Fulfillment Error:', error.response?.data || error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

#### Step 3: Webhook Listener for Tracking (`/api/webhooks/printful/route.ts`)
Printful triggers a `package_shipped` webhook when production finishes and the carrier scans the parcel.
```typescript
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === 'package_shipped') {
    const shipment = event.data.shipment;
    const trackingNumber = shipment.tracking_number;
    const trackingUrl = shipment.tracking_url;
    const recipientEmail = event.data.order.recipient.email;

    // Trigger transactional email via Resend / Postmark / SendGrid
    console.log(`Order dispatched to ${recipientEmail}. Tracking: ${trackingUrl}`);
    
    // await sendShippingEmail({ to: recipientEmail, trackingUrl, trackingNumber });
  }

  return NextResponse.json({ received: true });
}
```

---

## 5. Reverse Logistics & Sizing Return Strategy for POD

### The POD Return Dilemma:
Print-on-demand providers **do not accept returns for buyer's remorse or wrong sizing**, because every piece is custom-printed on demand.

### The AESTHETIX LAB High-Profit Solution:
1. **The "Keep It & Gift It" Sizing Guarantee**:
   - Because your retail markup is high (e.g., Hoodie sells for **$78**, POD cost is **$32**, gross profit = **$46**):
   - If a customer orders size M and needs size L: Offer to ship them size L for a flat remake fee of $15 (or completely free for VIPs), while letting them keep the original size M to gift to a gym partner.
   - **Result**: You avoid international return shipping costs, gain a 5-star brand reputation, and onboard a new athlete (the gym partner who received the gifted shirt).
2. **Damaged / Defective Items**:
   - If there is a print smear or broken seam, customer snaps a photo.
   - Submit the photo to the Printify/Printful dashboard: they will issue a **free reprint within 24 hours**.
