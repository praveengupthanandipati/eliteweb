import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/refundpolicy.scss';

const LAST_UPDATED = '01 June 2025';
const SCROLL_OFFSET = 96;

const SECTIONS = [
  {
    id: 'overview',
    title: '1. Policy Overview',
    content: `Elite Agro Foods Private Limited ("Elite Agro Foods", "Elite Mart", "we", "us", or "our") is committed to ensuring your complete satisfaction with every purchase. This Return & Refund Policy outlines the terms and conditions under which you may return products purchased through our website (www.eliteagrofoods.com), mobile application ("Elite Mart App"), or any other authorised Elite Mart channel.

By placing an order on Elite Mart, you agree to the return and refund terms described in this policy. We reserve the right to modify these terms at any time, and the updated policy will be posted on this page with a revised effective date. Continued use of our services after any modification constitutes your acceptance of the updated terms.

Our goal is to make every return and refund experience as simple and transparent as possible. If you have a concern about any product you received, we encourage you to contact us — most issues are resolved within 24–48 hours.`,
  },
  {
    id: 'eligibility',
    title: '2. Return Eligibility',
    content: `**2.1 General Eligibility Criteria**
A product is eligible for return if one or more of the following conditions are met:
• The product delivered is different from what you ordered (wrong item)
• The product is damaged, broken, or leaking upon arrival
• The product quantity is less than what was ordered (short shipment)
• The product is past its expiry date or best-before date at the time of delivery
• The product packaging is tampered with or shows signs of tampering
• The product is of incorrect weight or volume compared to what was ordered

**2.2 Return Window**
• **Perishable items** (fresh produce, dairy, eggs, bread, chilled/frozen products): Claims must be raised within **4 hours** of delivery.
• **Packaged grocery & FMCG products**: Claims must be raised within **24 hours** of delivery.
• **Non-grocery items** (household products, personal care, baby care, etc.): Claims must be raised within **7 days** of delivery.

**2.3 Condition of Return**
Where a physical return is required:
• Products must be unused and in their original packaging
• Products must include all original tags, labels, seals, and accessories
• Partially consumed products are generally not eligible for return unless the quality defect was discovered after opening

**2.4 Proof Requirement**
For all return requests, you may be asked to provide:
• A photograph or short video of the defective/incorrect/damaged product
• The order ID and delivery date
• A brief description of the issue`,
  },
  {
    id: 'non-returnable',
    title: '3. Non-Returnable Items',
    content: `The following categories of products are not eligible for return or refund, except in the case of delivery of a wrong, damaged, or defective item:

**3.1 Perishable & Fresh Items (Post 4-Hour Window)**
• Fresh fruits and vegetables
• Fresh meat, poultry, and seafood
• Fresh dairy products (milk, curd, paneer, butter)
• Fresh baked goods (bread, cakes, pastries)
• Any product with a shelf life of less than 48 hours

**3.2 Opened or Partially Used Products**
• Any packaged food product that has been opened and partially consumed (unless a quality defect is found)
• Personal care or hygiene products once opened (razors, toothbrushes, etc.)
• Products where the tamper-evident seal has been broken without a quality concern

**3.3 Hazardous & Regulated Items**
• Flammable products (cooking gas accessories, lighter fuel)
• Any products classified as hazardous under applicable Indian regulations

**3.4 Digital & Non-Physical Products**
• Recharge vouchers, gift cards, and digital coupons
• Cashback and wallet credits already applied

**3.5 Promotional & Gifted Items**
• Free gifts or promotional items received alongside an order
• Products purchased under final-sale or clearance promotions (clearly marked as non-returnable at the time of purchase)

**3.6 Incorrect Ordering by Customer**
• Products returned solely because the customer ordered the wrong item (e.g., wrong flavour, wrong size) — where the product was correctly delivered as ordered`,
  },
  {
    id: 'return-process',
    title: '4. How to Raise a Return Request',
    content: `**4.1 Step-by-Step Return Process**

**Step 1 — Report the Issue**
Go to the Elite Mart app or website → "My Orders" → select the affected order → tap "Report an Issue" or "Request Return". Alternatively, contact our support team at support@eliteagrofoods.com or call +91 77 9977 1189.

**Step 2 — Provide Details**
Select the affected product(s) and describe the issue. Upload clear photographs or a short video showing the problem (especially for damaged, wrong, or expired items).

**Step 3 — Verification**
Our customer support team will review your request within 24 hours. We may contact you for additional information or photographs if required.

**Step 4 — Resolution**
Based on your preference and product eligibility, we will offer:
• A replacement delivery at no extra charge, or
• A refund to your original payment method or Elite Mart Wallet

**4.2 Doorstep Return Pickup**
Where a physical return is required, our delivery partner will collect the product from your registered delivery address during a mutually agreed time slot. You do not need to visit any store or courier office.

**4.3 No Return Pickup for Certain Items**
For perishable or low-value items, Elite Mart may process a refund without requiring you to physically return the product, based on the photographic/video evidence provided.

**4.4 Return Confirmation**
Once the return is accepted and (where applicable) the product is collected, you will receive a confirmation SMS and email. The refund or replacement will be initiated promptly thereafter.`,
  },
  {
    id: 'refund-process',
    title: '5. Refund Process & Timeline',
    content: `**5.1 Refund Initiation**
Refunds are initiated within 24–48 hours of return approval or cancellation confirmation. The time taken to credit the refund to your account depends on your payment method and bank's processing time.

**5.2 Refund Timelines by Payment Method**

• **Elite Mart Wallet**: Instant — credited immediately upon approval. This is the fastest refund option.
• **UPI (GPay, PhonePe, Paytm, etc.)**: 1–3 working days from initiation.
• **Debit Card / Net Banking**: 3–5 working days from initiation.
• **Credit Card**: 5–7 working days from initiation (depends on your card-issuing bank's billing cycle).
• **Cash on Delivery (COD)**: Refunded to your Elite Mart Wallet within 24 hours, or to your registered bank account within 5–7 working days upon request.
• **EMI Transactions**: Refunded to the original credit card. The EMI cancellation and any applicable interest reversal are subject to your bank's policies.

**5.3 Refund Notification**
You will receive an SMS and email notification when:
• Your refund has been approved and initiated
• The refund has been successfully credited (where supported by the payment provider)

**5.4 Non-Receipt of Refund**
If you have not received your refund within the timelines mentioned above:
• First, check your bank account, UPI app, or Elite Mart Wallet balance
• Contact your bank to confirm there are no pending transactions
• If the issue persists, write to us at support@eliteagrofoods.com with your Order ID and refund reference number — we will investigate within 48 hours`,
  },
  {
    id: 'refund-methods',
    title: '6. Refund Methods',
    content: `**6.1 Refund to Original Payment Source**
By default, all refunds are credited back to the original payment source used at the time of purchase. This ensures full traceability and security.

**6.2 Elite Mart Wallet (Fastest Option)**
You may opt to receive your refund as Elite Mart Wallet credits. Wallet credits are:
• Credited instantly upon refund approval
• Valid for 12 months from the date of credit
• Applicable on all future Elite Mart orders
• Not redeemable for cash or transferable to another account

**6.3 Bank Account Transfer (for COD Orders)**
For orders paid via Cash on Delivery, refunds are processed to your Elite Mart Wallet by default. If you prefer a bank transfer, contact support@eliteagrofoods.com with your Order ID and bank account details (account number and IFSC code). Bank transfers for COD refunds are processed within 5–7 working days.

**6.4 Partial Refunds**
If only some items in an order are eligible for refund (e.g., one product out of three was damaged), only the value of the eligible item(s) plus any proportionate delivery charge (if applicable) will be refunded. The rest of the order is unaffected.

**6.5 Refund Amount Calculation**
The refund amount will be:
• The price paid for the eligible product(s) at the time of purchase
• Plus any delivery charge proportionately refunded (see Section 9)
• Minus any discounts or coupons that were applied exclusively to the refunded item(s) (the discount value is not refunded separately)`,
  },
  {
    id: 'damaged-wrong',
    title: '7. Damaged, Incorrect & Missing Items',
    content: `**7.1 Wrong Product Delivered**
If you receive a product different from what you ordered (different brand, variant, size, or flavour):
• Report within 24 hours via "My Orders" → "Report an Issue" with a photograph
• We will arrange a free replacement delivery in the next available slot, or
• Issue a full refund for the affected item(s)
• No need to return the wrongly delivered product in most cases (for low-value or perishable items)

**7.2 Damaged Product**
If your product arrives damaged due to transit or packaging issues:
• Do not accept the delivery if you notice obvious physical damage before accepting the package
• If the damage is discovered after delivery, report within 24 hours (4 hours for perishables) with photographs or a short video
• We will issue a replacement or full refund based on your preference and stock availability
• Delivery charges will be fully refunded if the entire order was damaged

**7.3 Expired or Near-Expiry Products**
If a product is delivered past its expiry date or best-before date:
• Report within 24 hours with a photograph clearly showing the expiry date label
• A full refund or replacement will be issued immediately
• You are not required to return the expired product

**7.4 Short Shipment (Missing Items)**
If you receive fewer items than what was ordered:
• Report within 24 hours via "My Orders"
• We will dispatch the missing item(s) in the next available delivery slot, or
• Refund the value of the missing item(s) to your original payment method or Elite Mart Wallet

**7.5 Tampered Packaging**
If the packaging of a sealed product appears tampered with upon delivery:
• Refuse the delivery if possible and inform the delivery partner
• If already accepted, photograph and report within 24 hours
• A full replacement or refund will be arranged`,
  },
  {
    id: 'cancellations',
    title: '8. Order Cancellations',
    content: `**8.1 Cancellation Before Dispatch**
You may cancel your order before it has been dispatched from our fulfilment centre. To cancel:
• Go to "My Orders" → select the order → tap "Cancel Order"
• Or contact support at +91 77 9977 1189 or support@eliteagrofoods.com

A full refund will be issued to your original payment method within the standard refund timelines.

**8.2 Cancellation After Dispatch**
Once an order has been dispatched, it cannot be cancelled. You will need to refuse the delivery at the doorstep; the order will be returned to our fulfilment centre and a refund (excluding delivery charges, if applicable) will be processed within 5–7 working days.

**8.3 Partial Cancellation**
You may cancel individual items in an order before dispatch (subject to order status). Partial cancellation refunds follow the same timeline as full order cancellations.

**8.4 Cancellation by Elite Mart**
Elite Mart reserves the right to cancel an order in the following circumstances:
• Product is out of stock or unavailable at the time of fulfilment
• Your delivery address is outside our serviceable zone
• Suspected fraudulent transaction or violation of our Terms & Conditions
• Force majeure events (natural disasters, government restrictions, etc.)

In all such cases, a full refund will be issued within 24 hours of cancellation.

**8.5 Subscription / Recurring Orders**
For scheduled or subscription orders, cancellation must be made at least 2 hours before the scheduled delivery slot. Cancellations after this window may be treated as missed deliveries and refunded per our missed delivery policy.`,
  },
  {
    id: 'delivery-charges',
    title: '9. Delivery Charge Refunds',
    content: `**9.1 When Delivery Charges Are Refunded**
Delivery charges paid on an order will be refunded in full in the following cases:
• The entire order was cancelled before dispatch
• All items in the order were unavailable at fulfilment and the order was cancelled by Elite Mart
• The entire order was undelivered after two genuine delivery attempts
• All delivered items were found to be damaged, wrong, or expired upon reporting

**9.2 When Delivery Charges Are Not Refunded**
Delivery charges are non-refundable in the following situations:
• Only part of the order is being returned (the delivery charge applies to the full order)
• The order was delivered successfully and the return is initiated after delivery
• The order was not received due to the customer's unavailability (missed delivery without rescheduling)

**9.3 Free Delivery Orders**
If your order was delivered free of charge (cart value ≥ ₹500 or under a promotional offer), there are no delivery charges to refund.

**9.4 Elite Now Convenience Fee**
The Elite Now instant delivery convenience fee (₹19–₹29) is non-refundable once the delivery has been completed, except in cases where the entire order was cancelled by Elite Mart before dispatch.`,
  },
  {
    id: 'exchange',
    title: '10. Replacement & Exchange Policy',
    content: `**10.1 Replacement vs. Refund**
For eligible return requests, you may choose between:
• A **replacement** of the same product delivered in the next available slot at no extra charge, or
• A **refund** to your original payment method or Elite Mart Wallet

**10.2 Replacement Availability**
Replacements are subject to product availability. If the exact product (same brand, size, and variant) is out of stock at the time of your return request:
• You may choose an alternative product of equal or lesser value (with the price difference refunded)
• Or opt for a full refund

**10.3 No Exchange for a Different Product**
Elite Mart does not facilitate exchanges for a completely different product (e.g., replacing one brand with another brand). If you wish to try a different product, you may return the eligible item for a refund and place a new order.

**10.4 Re-Delivery of Replacement**
Replacement orders are treated as new orders for delivery purposes. A replacement order:
• Will not attract a separate delivery charge
• Will be scheduled for the next available delivery slot in your area
• Will be confirmed via SMS and email`,
  },
  {
    id: 'contact',
    title: '11. Dispute Resolution & Contact',
    content: `**Customer Support**
For return and refund queries, complaints, or feedback, contact us through:
• Email: support@eliteagrofoods.com
• Phone: +91 77 9977 1189
• In-App: "My Orders" → Select Order → "Report Issue"
• Support Hours: Monday to Saturday, 9:00 AM – 7:00 PM (IST)

**Escalation**
If your complaint is not resolved within 48 hours, escalate to our Grievance Officer:
• Email: grievance@eliteagrofoods.com
• Subject: "Return/Refund Complaint – Order #[Your Order ID]"

Our Grievance Officer will acknowledge your complaint within 24 hours and aim to resolve it within 7 working days.

**Consumer Dispute Redressal**
If you are not satisfied with our resolution, you may approach the appropriate Consumer Disputes Redressal Forum under the Consumer Protection Act, 2019, or the National Consumer Helpline (NCH) at 1800-11-4000.

**Governing Law**
This Return & Refund Policy and any disputes arising from it shall be governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana, India.`,
  },
];

const HIGHLIGHTS = [
  { icon: '⏱️', label: 'Perishable Window', value: '4 Hours' },
  { icon: '📦', label: 'Packaged Goods',    value: '24 Hours' },
  { icon: '🏠', label: 'Non-Grocery Items', value: '7 Days' },
  { icon: '💳', label: 'Refund Timeline',   value: '1–7 Working Days' },
  { icon: '⚡', label: 'Instant Refund',    value: 'Wallet Credits' },
  { icon: '🔄', label: 'Free Replacement',  value: 'On Eligible Items' },
];

const Refundpolicy = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const tocListRef  = useRef(null);
  const rafRef      = useRef(null);
  const clickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      if (clickingRef.current) return;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= SCROLL_OFFSET) current = s.id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !tocListRef.current) return;
    const btn = tocListRef.current.querySelector(`[data-id="${activeSection}"]`);
    btn?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeSection]);

  const scrollTo = (id) => {
    clickingRef.current = true;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { clickingRef.current = false; }, 800);
  };

  const renderContent = (content) =>
    content.split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**'))
        return <h4 key={i} className="rf-sub-heading">{para.replace(/\*\*/g, '')}</h4>;
      if (para.startsWith('• '))
        return (
          <ul key={i} className="rf-list">
            {para.split('\n').filter(l => l.startsWith('• ')).map((line, j) => (
              <li key={j}>{line.replace(/^• /, '')}</li>
            ))}
          </ul>
        );
      return (
        <p key={i} dangerouslySetInnerHTML={{
          __html: para
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n• /g, '<br/>• ')
        }} />
      );
    });

  return (
    <div className="rf-page">

      {/* ── Hero ── */}
      <div className="rf-hero">
        <div className="container-fluid px-3 px-xl-4">
          <div className="rf-hero-badge">Customer Policy</div>
          <h1 className="rf-hero-title">Return &amp; Refund Policy</h1>
          <p className="rf-hero-company">Elite Agro Foods Private Limited — Elite Mart</p>
          <p className="rf-hero-date">Last Updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container-fluid px-3 px-xl-4 mt-3">

        {/* ── Highlights ── */}
        <div className="rf-highlights">
          {HIGHLIGHTS.map(h => (
            <div key={h.label} className="rf-hl-card">
              <span className="rf-hl-icon">{h.icon}</span>
              <div>
                <p className="rf-hl-label">{h.label}</p>
                <p className="rf-hl-value">{h.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 rf-layout-row">

          {/* ── TOC sidebar ── */}
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <div className="rf-toc">
              <p className="rf-toc-title">Table of Contents</p>
              <ul className="rf-toc-list" ref={tocListRef}>
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <button
                      data-id={s.id}
                      className={`rf-toc-btn${activeSection === s.id ? ' rf-toc-btn--active' : ''}`}
                      onClick={() => scrollTo(s.id)}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="rf-toc-contact">
                <p>Return or refund query?</p>
                <a href="mailto:support@eliteagrofoods.com">support@eliteagrofoods.com</a>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="col-12 col-lg-9">
            <div className="rf-intro-banner">
              <span>↩️</span>
              <p>
                <strong>We stand behind every product we deliver.</strong> If something isn't right —
                wrong item, damaged goods, missing quantity, or an expired product — we'll make it
                right with a replacement or a full refund. This policy explains exactly how.
              </p>
            </div>

            {SECTIONS.map(section => (
              <div key={section.id} id={section.id} className="rf-section">
                <h2 className="rf-section-title">{section.title}</h2>
                <div className="rf-section-body">
                  {renderContent(section.content)}
                </div>
              </div>
            ))}

            <div className="rf-footer-note">
              <p>
                This Return &amp; Refund Policy was last reviewed on <strong>{LAST_UPDATED}</strong>.
                For any return or refund concerns, contact{' '}
                <a href="mailto:support@eliteagrofoods.com">support@eliteagrofoods.com</a>.
              </p>
              <div className="rf-footer-links">
                <Link to="/delivery">Delivery Policy</Link>
                <Link to="/pricing">Pricing Policy</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/faqs">FAQs</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Refundpolicy;
