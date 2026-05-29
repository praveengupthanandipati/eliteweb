import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/delivery.scss';

const LAST_UPDATED = '01 June 2025';
const SCROLL_OFFSET = 96;

const SECTIONS = [
  {
    id: 'overview',
    title: '1. Delivery Overview',
    content: `Elite Agro Foods Private Limited ("Elite Agro Foods", "Elite Mart", "we", "us", or "our") provides home delivery services for products ordered through our website (www.eliteagrofoods.com), mobile application ("Elite Mart App"), and authorized channels. This Delivery Policy governs all delivery-related terms, conditions, timelines, charges, and responsibilities applicable to orders placed on Elite Mart.

By placing an order on Elite Mart, you agree to the delivery terms described in this policy. We reserve the right to modify these terms at any time, and the updated policy will be posted on this page with a revised effective date. Continued use of our services after any modification constitutes your acceptance of the updated terms.`,
  },
  {
    id: 'serviceability',
    title: '2. Delivery Serviceability',
    content: `**2.1 Serviceable Areas**
Elite Mart currently delivers across 300+ cities and towns in India. Delivery availability is determined by your delivery pincode. You can check if your area is serviceable by entering your pincode on our website or app before placing an order.

**2.2 Pincode Verification**
Before checkout, our platform verifies your delivery pincode to:
• Confirm serviceability for standard or express delivery
• Calculate estimated delivery time
• Apply applicable delivery charges
• Show available delivery time slots for your area

**2.3 Non-Serviceable Areas**
If your pincode is currently not serviceable:
• You will be notified on the product/cart page before checkout
• You can enter your email to receive a notification when delivery becomes available in your area
• Elite Mart is continuously expanding its delivery network

**2.4 Delivery to Special Zones**
Deliveries to gated communities, apartment complexes, technology parks, or restricted-access areas may require additional details such as the gate number, flat number, or a building pass. Please include such information in the delivery address notes to avoid delays.

**2.5 International Delivery**
Elite Mart currently does not offer international shipping. All deliveries are restricted to Indian addresses only.`,
  },
  {
    id: 'delivery-types',
    title: '3. Types of Delivery',
    content: `**3.1 Standard Scheduled Delivery**
Our standard delivery service allows you to schedule your grocery delivery up to 5 days in advance. You can select a specific date and time slot that is most convenient for you.

Available time slots:
• Morning: 7:00 AM – 9:00 AM
• Morning: 9:00 AM – 11:00 AM
• Afternoon: 12:00 PM – 2:00 PM
• Afternoon: 2:00 PM – 4:00 PM
• Evening: 4:00 PM – 6:00 PM
• Evening: 6:00 PM – 8:00 PM
• Night: 8:00 PM – 10:00 PM

**3.2 Same-Day Delivery**
Orders placed before 6:00 PM are eligible for same-day delivery in select cities, subject to slot availability. Check the "Today" tab during checkout to view available same-day slots.

**3.3 Elite Now – Instant Delivery**
Elite Now is our express hyperlocal delivery service that delivers your essentials within 15–30 minutes. Key features:
• Available in select cities only
• Covers 5,000+ frequently ordered grocery items
• Operates from 7:00 AM to 10:00 PM
• Subject to a convenience fee of ₹19–₹29 (displayed at checkout)
• A lower minimum order value may apply compared to standard delivery

**3.4 Contactless Delivery**
Elite Mart supports contactless delivery. You can select "Leave at door" or provide specific instructions for contactless handover when placing your order. Our delivery partners are trained to follow these instructions.`,
  },
  {
    id: 'delivery-timeline',
    title: '4. Delivery Timeline & Scheduling',
    content: `**4.1 Slot-Based Delivery**
Elite Mart operates on a slot-based delivery model. During checkout, you will be asked to:
• Select a delivery date (today, tomorrow, or up to 5 days in advance)
• Choose a 2-hour delivery window that suits your schedule

**4.2 Delivery Confirmation**
Once your order is placed, you will receive:
• An order confirmation SMS and email immediately
• A dispatch notification when your order leaves our fulfilment centre
• A real-time tracking link via SMS once the delivery partner is assigned

**4.3 On-Time Delivery Commitment**
We commit to delivering your order within the selected time slot under normal circumstances. Our average on-time delivery rate exceeds 95%.

**4.4 Delivery Delays**
In some cases, delivery may be delayed due to:
• High order volume during peak hours or festive seasons
• Traffic congestion or adverse weather conditions
• Incomplete or inaccurate delivery address
• Access restrictions at the delivery location

In the event of a significant delay, we will notify you via SMS and email with an updated estimated time of arrival.

**4.5 Advance Scheduling**
You may schedule a delivery up to 5 days in advance. Scheduled orders are confirmed upon placement and cannot be modified for delivery date/slot within 2 hours of the scheduled delivery window.

**4.6 Rescheduling**
You may reschedule your delivery slot up to 2 hours before the original delivery window by visiting "My Orders" → "Change Delivery Slot". Rescheduling is subject to slot availability. No rescheduling fee is charged for the first change; subsequent changes on the same order may attract a nominal fee.`,
  },
  {
    id: 'delivery-charges',
    title: '5. Delivery Charges & Free Delivery',
    content: `**5.1 Free Delivery**
Delivery is FREE for all orders with a cart value of ₹500 or more (after discount deductions, before delivery charges are applied).

**5.2 Standard Delivery Charge**
For orders below ₹500, a standard delivery charge of ₹49 per order applies. This fee is non-refundable (see Section 9 for exceptions).

**5.3 Elite Now Convenience Fee**
Elite Now instant delivery carries an additional convenience fee of ₹19–₹29, determined by your delivery location and order value. This is shown before order confirmation.

**5.4 Remote Area Surcharge**
Deliveries to remote or difficult-to-access areas beyond our standard delivery radius may attract an additional surcharge of ₹20–₹50. You will be notified of this surcharge at the pincode verification stage before placing your order.

**5.5 Surge Pricing**
During peak demand periods (public holidays, festive seasons, adverse weather, or late-night hours), delivery charges may be temporarily increased. Surge charges:
• Will be clearly displayed at checkout
• Require your explicit confirmation before the order proceeds
• Are not applied without your awareness or consent

**5.6 Free Delivery Promotions**
Elite Mart may run promotional campaigns offering free delivery on all orders regardless of order value. Such promotions are time-bound and subject to their specific terms.`,
  },
  {
    id: 'packaging',
    title: '6. Packaging & Order Handling',
    content: `**6.1 Packaging Standards**
All products are packed to ensure safe delivery and maintain product integrity. Our packaging standards include:
• Groceries and dry goods packed in tamper-evident bags or sealed boxes
• Fragile items (glass bottles, jars) packed with additional protective padding
• Temperature-sensitive products (dairy, frozen items) transported in insulated packaging
• Heavy items (large packs of rice, oil, etc.) packed in reinforced bags

**6.2 Eco-Friendly Packaging**
Elite Mart is committed to sustainable packaging. We progressively use:
• Biodegradable carry bags
• Minimal plastic packaging
• Recyclable cardboard boxes for bulk orders

**6.3 No Packaging Charges**
Elite Mart does not charge any separate packaging fee. Packaging costs are absorbed within our operations.

**6.4 Temperature-Controlled Delivery**
Perishable products such as dairy, fresh produce, eggs, and chilled items are transported using temperature-controlled vehicles or insulated packaging to maintain freshness from our facility to your doorstep.

**6.5 Order Verification at Doorstep**
We encourage you to verify your order at the time of delivery before accepting it. Check for:
• Correct items and quantities
• Undamaged packaging
• Intact seals on food products
• Correct weight or volume as ordered`,
  },
  {
    id: 'delivery-attempts',
    title: '7. Delivery Attempts & Missed Deliveries',
    content: `**7.1 First Delivery Attempt**
Our delivery partner will attempt to deliver your order within the scheduled time slot. The partner will call you on your registered mobile number before or upon arrival.

**7.2 Missed Delivery**
If you are unavailable at the time of delivery:
• The delivery partner will wait for a maximum of 5 minutes at your location
• A second delivery attempt will be made within the same day (subject to operational feasibility) or the next available slot
• You will be notified via SMS about the missed delivery and the next attempt

**7.3 Final Non-Delivery**
If both delivery attempts fail:
• The order will be returned to our fulfilment centre
• You will be notified of the returned order
• A full refund (excluding delivery charges for COD or pre-paid orders where both attempts were genuine) will be processed within 5–7 working days

**7.4 Delivery Instructions**
You can add specific delivery instructions when placing your order:
• "Leave at door / security desk / reception"
• Alternate contact number for the delivery partner
• Gate access or building code instructions
• Preferred drop-off location within the premises

**7.5 Unattended Delivery**
If you have requested an unattended delivery (e.g., "leave at door"), Elite Mart and its delivery partners will not be liable for any loss, theft, or damage to the order after it has been left at the specified location.`,
  },
  {
    id: 'address',
    title: '8. Delivery Address',
    content: `**8.1 Accurate Address Requirement**
Customers are responsible for providing an accurate, complete, and accessible delivery address. An incorrect or incomplete address may result in:
• Failed delivery attempts
• Return of the order
• Loss of perishable items with no refund eligibility

**8.2 Address Change After Order Placement**
Address changes may be requested within 30 minutes of order placement, before the order is processed for dispatch. Contact customer support immediately at support@eliteagrofoods.com or call +91 77 9977 1189. After dispatch, address changes cannot be accommodated.

**8.3 Multiple Saved Addresses**
You can save multiple delivery addresses (Home, Office, Others) in your Elite Mart account for faster checkout. Ensure your saved addresses are up to date.

**8.4 Out-of-Zone Addresses**
If you enter a delivery address that falls outside our serviceable zone after an order is placed (e.g., due to a technical error in pincode validation), Elite Mart reserves the right to cancel the order with a full refund.

**8.5 Business/Corporate Addresses**
For deliveries to office buildings or business premises, please include:
• Recipient's full name and direct mobile number
• Floor number and department/room name
• Reception or security desk instructions
• Availability confirmation (to avoid unattended deliveries)`,
  },
  {
    id: 'failed-damaged',
    title: '9. Failed, Damaged & Incorrect Deliveries',
    content: `**9.1 Wrong Product Delivered**
If you receive a product different from what you ordered:
• Report within 24 hours of delivery via "My Orders" with a photograph
• We will arrange a replacement delivery at no additional charge
• Alternatively, a full refund for the affected item(s) will be processed

**9.2 Damaged Product on Delivery**
If a product arrives damaged due to transit or packaging failure:
• Do not accept the delivery if you notice obvious damage before signing
• If damage is discovered after the delivery partner has left, report within 24 hours with photographs via "My Orders"
• We will issue a replacement or refund based on your preference

**9.3 Quantity Shortfall**
If you receive fewer items than ordered:
• Report via "My Orders" within 24 hours of delivery
• We will deliver the missing items in the next available slot or refund the value of the missing items

**9.4 Delivery Charge Refund Eligibility**
Delivery charges (if paid) will be refunded in the following cases:
• The order was not delivered despite two genuine attempts by our partner
• All items in the order were found to be unavailable at the time of fulfilment
• The delivery was cancelled by Elite Mart for any reason within our control
• A duplicate delivery charge was applied in error

**9.5 Perishable Items**
Complaints regarding perishable items (dairy, fresh produce, frozen food) must be raised within 4 hours of delivery. Due to the short shelf life of such products, claims raised after 4 hours may not be eligible for replacement or refund.`,
  },
  {
    id: 'tracking',
    title: '10. Order Tracking',
    content: `**10.1 Real-Time Tracking**
Once your order is dispatched, you will receive a real-time tracking link via SMS and email. The tracking page displays:
• Current location of the delivery partner
• Estimated time of arrival (ETA)
• Order status updates (Packed → Dispatched → Out for Delivery → Delivered)

**10.2 In-App Tracking**
You can track all your active orders in real time through the Elite Mart app under "My Orders". The app provides live status updates throughout the delivery process.

**10.3 Delivery Confirmation**
Once your order is delivered, you will receive:
• A delivery confirmation SMS and email
• A digital copy of the delivery receipt
• An invitation to rate your delivery experience

**10.4 Delivery Partner Contact**
Once a delivery partner is assigned to your order, their name and contact number will be shared with you (masked for privacy) through the tracking link. You may contact the partner directly for real-time updates on your delivery.

**10.5 Proof of Delivery**
In some cases, our delivery partners may request a One-Time Password (OTP) before handing over the order. This serves as proof of delivery and protects against fraudulent delivery claims. Do not share the OTP with anyone other than the authorised delivery partner at your doorstep.`,
  },
  {
    id: 'special-items',
    title: '11. Special Delivery Conditions',
    content: `**11.1 Festive Season & Peak Period Deliveries**
During festive seasons (Diwali, Pongal, Onam, Eid, Christmas, etc.) and other peak periods:
• Delivery slots may fill up quickly — book your slot early
• Delivery timelines may be extended by 1–2 hours due to high demand
• Additional delivery charges may apply due to surge pricing
• We will notify you of any significant delays proactively

**11.2 Heavy & Bulky Items**
Orders containing heavy items (e.g., 25kg rice bags, 5L oil cans, multiple large packs) may:
• Require ground-floor or lobby delivery in buildings without elevator access
• Take additional time for loading and unloading
• Attract a nominal heavy-item handling charge, where applicable (displayed at checkout)

**11.3 Restricted Products**
Certain products (e.g., alcohol, tobacco, or age-restricted items, if listed) may have specific delivery conditions, including:
• Age verification at the time of delivery
• Restricted delivery hours
• Non-deliverable to certain pincodes as mandated by state law

**11.4 Delivery During Adverse Conditions**
In the event of severe weather, natural calamities, civil disruptions, government-imposed restrictions (curfews, lockdowns), or force majeure events, Elite Mart may:
• Suspend delivery operations temporarily
• Reschedule affected orders to the next feasible slot
• Cancel orders with full refunds if rescheduling is not feasible

**11.5 No Delivery on Declared Holidays**
Elite Mart may suspend delivery operations on certain national public holidays or during planned maintenance. Such suspensions will be communicated in advance through the app, website, and email.`,
  },
  {
    id: 'responsibility',
    title: '12. Liability & Responsibility',
    content: `**12.1 Elite Mart's Responsibility**
Elite Mart is responsible for:
• Ensuring orders are accurately packed and dispatched in good condition
• Engaging reliable and trained delivery partners
• Communicating delivery status updates to customers
• Resolving genuine delivery complaints within 48 hours of reporting

**12.2 Customer's Responsibility**
You are responsible for:
• Providing accurate delivery address and contact information
• Being available or making arrangements for someone to receive the order during the selected slot
• Inspecting the order at delivery and reporting issues promptly (within 24 hours)
• Not sharing delivery OTPs with unauthorized individuals

**12.3 Third-Party Delivery Partners**
Elite Mart works with third-party last-mile delivery partners. While we hold these partners to strict service standards, Elite Mart is not liable for:
• Losses arising from delays caused by reasons beyond our reasonable control
• Actions or omissions of third-party delivery personnel after the order has been marked as delivered
• Any accident, personal injury, or property damage caused by a third-party delivery partner while off our premises

**12.4 Limitation of Liability**
In no event shall Elite Agro Foods' liability for any delivery-related claim exceed the total value of the affected order. We are not liable for indirect, consequential, or punitive damages arising from delivery failures.

**12.5 Force Majeure**
Elite Mart shall not be held liable for delivery failures or delays caused by circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, epidemics, government actions, strikes, or internet/infrastructure outages.`,
  },
  {
    id: 'contact',
    title: '13. Delivery Support & Contact',
    content: `For any delivery-related queries, complaints, or feedback, please reach out to us through the following channels:

**Customer Support**
• Email: support@eliteagrofoods.com
• Phone: +91 77 9977 1189
• In-App: "My Orders" → Select Order → "Report Issue"
• Support Hours: Monday to Saturday, 9:00 AM – 7:00 PM (IST)

**Delivery Complaint Escalation**
If your delivery complaint is not resolved within 48 hours, you may escalate it to:
• Email: grievance@eliteagrofoods.com
• Subject: "Delivery Complaint – Order #[Your Order ID]"

Our Grievance Officer will personally review escalated delivery complaints and respond within 72 hours.

**Useful Tips for Smooth Delivery**
• Always double-check your delivery address and mobile number before placing an order
• Add clear building/flat/landmark details to avoid delays
• Keep your phone accessible during the delivery slot
• Inspect your order before the delivery partner leaves
• Rate your delivery experience — your feedback helps us improve`,
  },
];

const HIGHLIGHTS = [
  { icon: '🚀', label: 'Elite Now',        value: '15–30 Minutes' },
  { icon: '📅', label: 'Schedule Up To',   value: '5 Days Advance' },
  { icon: '⏰', label: 'Delivery Hours',   value: '7 AM – 10 PM' },
  { icon: '🆓', label: 'Free Delivery',    value: 'Orders ≥ ₹500' },
  { icon: '🏙️', label: 'Cities Covered',  value: '300+ Cities' },
  { icon: '📦', label: 'Time Slots',       value: '7 Per Day' },
];

const Delivery = () => {
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
        return <h4 key={i} className="dl-sub-heading">{para.replace(/\*\*/g, '')}</h4>;
      if (para.startsWith('• '))
        return (
          <ul key={i} className="dl-list">
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
    <div className="dl-page">

      {/* ── Hero ── */}
      <div className="dl-hero">
        <div className="container-fluid px-3 px-xl-4">
          <div className="dl-hero-badge">Delivery Policy</div>
          <h1 className="dl-hero-title">Delivery Terms &amp; Conditions</h1>
          <p className="dl-hero-company">Elite Agro Foods Private Limited — Elite Mart</p>
          <p className="dl-hero-date">Last Updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container-fluid px-3 px-xl-4 mt-3">

        {/* ── Highlights ── */}
        <div className="dl-highlights">
          {HIGHLIGHTS.map(h => (
            <div key={h.label} className="dl-hl-card">
              <span className="dl-hl-icon">{h.icon}</span>
              <div>
                <p className="dl-hl-label">{h.label}</p>
                <p className="dl-hl-value">{h.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 dl-layout-row">

          {/* ── TOC sidebar ── */}
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <div className="dl-toc">
              <p className="dl-toc-title">Table of Contents</p>
              <ul className="dl-toc-list" ref={tocListRef}>
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <button
                      data-id={s.id}
                      className={`dl-toc-btn${activeSection === s.id ? ' dl-toc-btn--active' : ''}`}
                      onClick={() => scrollTo(s.id)}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="dl-toc-contact">
                <p>Delivery queries?</p>
                <a href="mailto:support@eliteagrofoods.com">support@eliteagrofoods.com</a>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="col-12 col-lg-9">
            <div className="dl-intro-banner">
              <span>🚚</span>
              <p>
                <strong>Fast, reliable, and transparent delivery.</strong> Elite Mart is committed to
                delivering your groceries on time, in perfect condition, with clear communication at
                every step. This policy explains all delivery terms that apply to your orders.
              </p>
            </div>

            {SECTIONS.map(section => (
              <div key={section.id} id={section.id} className="dl-section">
                <h2 className="dl-section-title">{section.title}</h2>
                <div className="dl-section-body">
                  {renderContent(section.content)}
                </div>
              </div>
            ))}

            <div className="dl-footer-note">
              <p>
                This Delivery Policy was last reviewed on <strong>{LAST_UPDATED}</strong>.
                For delivery support, contact{' '}
                <a href="mailto:support@eliteagrofoods.com">support@eliteagrofoods.com</a>.
              </p>
              <div className="dl-footer-links">
                <Link to="/returns">Return &amp; Refund Policy</Link>
                <Link to="/pricing">Pricing Policy</Link>
                <Link to="/terms">Terms &amp; Conditions</Link>
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

export default Delivery;
