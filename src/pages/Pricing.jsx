import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pricing.scss';

const LAST_UPDATED = '01 June 2025';
const SCROLL_OFFSET = 96;

const SECTIONS = [
  {
    id: 'overview',
    title: '1. Pricing Overview',
    content: `Elite Agro Foods Private Limited ("Elite Agro Foods", "Elite Mart", "we", "us", or "our") operates Elite Mart as an online and offline mini-supermarket offering daily household essentials across India. This Pricing Policy outlines how we determine, display, and apply prices for all products sold through our website, mobile application, and physical stores.

By placing an order on Elite Mart, you acknowledge that you have read and agree to the pricing terms described in this policy. We reserve the right to revise pricing terms at any time, and any changes will be posted on this page with an updated effective date.`,
  },
  {
    id: 'mrp',
    title: '2. MRP & Displayed Prices',
    content: `**2.1 Maximum Retail Price (MRP)**
All packaged products sold on Elite Mart carry a Maximum Retail Price (MRP) as mandated by the Legal Metrology (Packaged Commodities) Rules, 2011. The MRP is the maximum price at which a product may be legally sold to the end consumer in India, inclusive of all taxes.

**2.2 Our Selling Price**
Elite Mart typically sells products at or below MRP. Our selling price (labelled as "Offer Price" or "Sale Price") may be lower than the MRP due to:
• Direct sourcing arrangements with manufacturers or authorised distributors
• Seasonal promotions, bulk purchase discounts, or clearance offers
• Our commitment to providing the best value to our customers

**2.3 Price Display**
All prices displayed on Elite Mart are:
• Quoted in Indian Rupees (₹ / INR)
• Inclusive of all applicable taxes (GST, cess, etc.) unless explicitly stated otherwise
• Per unit, per pack, or per weight/volume as clearly indicated on the product listing

**2.4 Weight & Volume Variants**
Many products are available in multiple weight or volume variants (e.g., 500g, 1kg, 2kg). The displayed price corresponds to the specific variant selected. Please verify the variant and price before adding to cart.`,
  },
  {
    id: 'gst-taxes',
    title: '3. GST & Applicable Taxes',
    content: `**3.1 Goods and Services Tax (GST)**
All prices on Elite Mart are inclusive of GST as per the current tax slabs prescribed by the Government of India. The applicable GST rate varies by product category:
• 0% GST: Fresh fruits and vegetables, milk, eggs, bread, cereals, salt
• 5% GST: Processed food items, packaged food, cooking oils, sugar, tea, coffee
• 12% GST: Ghee, butter, cheese, dry fruits, ayurvedic products
• 18% GST: Personal care products, home care products, stationery, electrical accessories
• 28% GST: Certain luxury or demerit goods (if applicable)

**3.2 GST Invoice**
A detailed GST invoice will be generated for every order placed on Elite Mart and sent to your registered email address. The invoice will clearly display:
• HSN/SAC code for each product
• Applicable GST rate and amount
• Total taxable value and grand total

**3.3 Input Tax Credit (ITC)**
Business customers requiring GST invoices for ITC claims may provide their GSTIN at the time of placing an order. Our system will generate a B2B invoice with all required fields.

**3.4 Price Changes Due to Tax Revisions**
If the Government of India revises GST rates or introduces new levies, product prices on Elite Mart may change accordingly. We will update prices as soon as practically possible following any such revision.`,
  },
  {
    id: 'delivery-charges',
    title: '4. Delivery Charges',
    content: `**4.1 Free Delivery Threshold**
Elite Mart offers FREE delivery on all orders with a cart value of ₹500 or more (after all discounts and coupon deductions, before delivery charges).

**4.2 Standard Delivery Charge**
For orders below the ₹500 threshold, a standard delivery charge of ₹49 per order is applicable. This charge covers our logistics, packaging, and last-mile delivery costs.

**4.3 Elite Now Express Delivery**
Our instant delivery service (Elite Now) may carry an additional convenience fee ranging from ₹19 to ₹29, depending on your delivery location and order size. This fee will be clearly displayed during checkout before order confirmation.

**4.4 Surge Pricing on Delivery**
During peak hours, festive seasons, or adverse weather conditions, delivery charges may be temporarily increased. Any such surge charges will be prominently displayed at checkout and require your explicit confirmation before the order is placed.

**4.5 Delivery Charge Refund**
Delivery charges are non-refundable except in cases where:
• The delivery was not attempted by our delivery partner
• The order was cancelled by Elite Mart due to non-availability of all items
• A duplicate charge was applied in error

**4.6 Remote Location Surcharge**
Deliveries to certain remote or difficult-to-access areas may attract an additional surcharge. This will be indicated at the pincode check stage before you proceed to checkout.`,
  },
  {
    id: 'minimum-order',
    title: '5. Minimum Order Value',
    content: `**5.1 Standard Minimum Order**
The minimum cart value required to place a delivery order on Elite Mart is ₹500. This applies to all standard delivery orders. Orders below this value cannot be processed for home delivery.

**5.2 Elite Now Minimum Order**
For Elite Now (instant delivery), a lower minimum order value may apply based on your location and current promotions. The applicable minimum will be displayed at checkout.

**5.3 Reason for Minimum Order**
The minimum order value ensures that our delivery operations remain sustainable and cost-effective, allowing us to maintain our high service standards and keep delivery charges low for all customers.

**5.4 Exceptions**
The minimum order value may be waived during:
• Special promotions or festive campaigns as communicated through the app or website
• Orders using select coupon codes that explicitly state "No Minimum Order"
• Subscription or repeat-delivery orders (where applicable)`,
  },
  {
    id: 'discounts-offers',
    title: '6. Discounts, Offers & Promotions',
    content: `**6.1 Product-Level Discounts**
Individual products may carry discounts ranging from a few percent to significant reductions off the MRP. These discounts are displayed as a percentage alongside the original MRP and the discounted selling price.

**6.2 Coupon Codes**
Elite Mart issues coupon codes for promotional discounts, new customer offers, referral bonuses, and festive campaigns. Coupon terms and conditions include:
• Each coupon has an associated minimum order value
• Coupons may be limited to one-time use per customer or account
• Coupons are non-transferable and cannot be combined unless explicitly stated
• Expired or invalid coupons will not be applied; no exception will be made after order placement
• Elite Mart reserves the right to withdraw or modify coupon terms at any time

**6.3 App-Exclusive Deals**
Certain discounts, flash sales, and early-bird offers are available exclusively through the Elite Mart mobile application. These offers may not be replicated on the website.

**6.4 Cashback & Loyalty Rewards**
Elite Mart may operate cashback or reward programs from time to time. Rewards earned are subject to the specific terms of the applicable scheme, including expiry dates and minimum redemption values.

**6.5 Bank & Payment Offers**
Instant discounts may be available for transactions made through specific bank debit/credit cards, UPI handles, or wallets. Such offers are provided by the respective financial institution and are subject to their own terms and conditions. Elite Mart is not responsible for the availability or continuation of bank-specific offers.

**6.6 Stacking of Discounts**
Unless explicitly permitted, product-level discounts and coupon discounts cannot be stacked. Applying a coupon code to an already-discounted product will apply the coupon discount on the selling price, not the MRP.`,
  },
  {
    id: 'price-changes',
    title: '7. Price Fluctuations & Changes',
    content: `**7.1 Right to Revise Prices**
Elite Agro Foods reserves the right to revise the price of any product at any time, without prior notice, due to:
• Changes in procurement or manufacturing costs
• Government-mandated price revisions or new regulations
• Market conditions, commodity price fluctuations (e.g., edible oils, pulses, cereals)
• Currency exchange rate variations for imported products
• Updates in GST or other tax rates

**7.2 Price at Time of Order**
The price charged to you will be the price displayed at the time you place your order, provided your order is confirmed. If a pricing error is discovered after your order is placed (see Section 8), you will be notified before dispatch.

**7.3 Seasonal Price Variations**
Prices for fresh and agricultural produce (such as vegetables, fruits, and dairy) may fluctuate based on season, harvest quality, and market supply. We endeavour to update these prices in real time.

**7.4 Flash Sale Pricing**
During limited-time flash sales or lightning deals, prices are valid only for the duration of the sale. Once the sale ends or the stock is exhausted, prices revert to their standard rates.

**7.5 Price Match Policy**
Elite Mart does not currently offer a price-match guarantee with third-party retailers or other e-commerce platforms. We strive to provide competitive prices independently.`,
  },
  {
    id: 'pricing-errors',
    title: '8. Pricing Errors',
    content: `**8.1 Errors in Displayed Prices**
While we make every effort to ensure price accuracy, pricing errors may occasionally occur due to technical glitches, data entry mistakes, or system errors. Elite Mart reserves the right to:
• Correct the displayed price and notify you of the correct price before dispatch
• Cancel the order if the correct price is significantly higher and you do not wish to proceed at the revised price

**8.2 Notification of Pricing Errors**
If we discover a pricing error after your order is confirmed but before dispatch:
• We will notify you via SMS and email as soon as possible
• You will be given the option to confirm the order at the correct price or cancel it for a full refund
• If we do not receive a response within 24 hours, the order will be automatically cancelled and refunded

**8.3 Orders Already Delivered**
If an order has already been delivered before a pricing error is discovered, we will not retroactively charge the correct higher price for that delivered order. However, we are not obligated to honour erroneously priced orders for future purchases.

**8.4 Systematic Exploitation**
Elite Mart reserves the right to cancel bulk orders or repeated orders that appear to exploit a pricing error or technical glitch. Accounts found to be systematically exploiting pricing errors may be temporarily or permanently restricted.`,
  },
  {
    id: 'payment-terms',
    title: '9. Payment Terms',
    content: `**9.1 Accepted Payment Methods**
Elite Mart accepts the following payment methods:
• UPI (Google Pay, PhonePe, Paytm, BHIM, and all UPI-enabled apps)
• Debit cards (Visa, Mastercard, RuPay)
• Credit cards (Visa, Mastercard, American Express)
• Net banking (all major Indian banks)
• EMI (for orders above ₹3,000 on eligible credit cards)
• Cash on Delivery (COD) — for eligible pincodes and orders up to ₹5,000
• Elite Mart Wallet (where applicable)

**9.2 Payment Timing**
All digital payments are collected at the time of order placement. COD payments are collected at the time of delivery. Subscription or advance-booking orders may have different payment schedules as described in their specific terms.

**9.3 Payment Security**
All transactions are secured using 256-bit SSL/TLS encryption. Elite Mart does not store credit or debit card details on its servers. Payments are processed through PCI-DSS compliant third-party payment gateways.

**9.4 Failed Transactions**
If a payment fails after funds are debited from your account:
• The amount will be automatically refunded by your bank within 3–7 working days
• Contact your bank or our support team at support@eliteagrofoods.com with the transaction reference
• Elite Mart is not liable for delays caused by your bank's internal refund processes

**9.5 EMI Terms**
EMI options are provided by your card-issuing bank. Interest rates, processing fees, and eligibility are determined solely by the bank. Elite Mart does not charge any additional fee for enabling EMI, but your bank may levy a processing charge.`,
  },
  {
    id: 'refunds-pricing',
    title: '10. Refunds & Price Adjustments',
    content: `**10.1 Price Adjustment Policy**
Elite Mart does not offer post-purchase price adjustments. If a product's price decreases after you have placed your order, the difference will not be refunded. Similarly, if a flash sale begins after your order is placed, the sale price will not be applied retroactively.

**10.2 Refund on Returned Products**
For approved returns, the refund will be based on the actual amount paid at the time of purchase, not the current MRP or selling price. Delivery charges (if any) are not refunded unless the return is due to an error by Elite Mart.

**10.3 Partial Order Refunds**
If one or more items in your order are unavailable and cannot be fulfilled, you will receive a refund for only those items at the price you paid. The remaining items in your order will be delivered as normal.

**10.4 Refund Timeline**
• UPI / Net Banking / Debit Card: 5–7 working days
• Credit Card: 7–10 working days (subject to your card issuer's processing time)
• Elite Mart Wallet: Within 24 hours
• COD orders: Refund via bank transfer (NEFT/IMPS) within 7–10 working days

**10.5 GST Refunds**
Refunds for returned products will include the GST component paid on those items. Revised GST invoices (credit notes) will be issued for all valid returns and sent to your registered email address.`,
  },
  {
    id: 'bulk-business',
    title: '11. Bulk & Business Pricing',
    content: `**11.1 Institutional & Bulk Orders**
Businesses, hotels, restaurants, educational institutions, and other organisations interested in placing bulk orders may contact our business sales team for customised pricing, volume discounts, and credit terms.

Contact: business@eliteagrofoods.com | +91 77 9977 1189

**11.2 Reseller Policy**
Products purchased from Elite Mart are intended for personal or household consumption. Reselling products purchased from Elite Mart at a marked-up price without authorisation is prohibited and may result in account suspension.

**11.3 Credit Terms for Business Accounts**
Verified business accounts may be eligible for credit terms (payment within 15–30 days of delivery). Credit eligibility is subject to internal assessment, documentation requirements (GST registration, PAN, etc.), and Elite Mart's approval at its sole discretion.

**11.4 Quantity Limits**
Elite Mart reserves the right to limit the quantity of any product that a single customer or account can purchase per transaction or per day, particularly during sale events or for products in limited supply.`,
  },
  {
    id: 'governing',
    title: '12. Governing Law & Disputes',
    content: `**12.1 Governing Law**
This Pricing Policy is governed by the laws of India, including but not limited to the Consumer Protection Act, 2019; the Legal Metrology Act, 2009; the Information Technology Act, 2000; and all applicable GST legislation.

**12.2 Dispute Resolution**
Any disputes arising from pricing matters shall first be attempted to be resolved amicably through our customer support channel. If unresolved within 30 days, disputes shall be subject to arbitration under the Arbitration and Conciliation Act, 1996, with proceedings conducted in Hyderabad, Telangana.

**12.3 Consumer Rights**
Nothing in this Pricing Policy limits or excludes your rights as a consumer under the Consumer Protection Act, 2019. You retain all statutory rights including the right to seek redress for unfair trade practices or misleading advertisements.

**12.4 Contact for Pricing Queries**
For any questions or concerns about our pricing, please contact:
• Email: pricing@eliteagrofoods.com
• Phone: +91 77 9977 1189
• Address: Elite Agro Foods Private Limited, Hyderabad, Telangana – 500081, India
• Support Hours: Monday to Saturday, 9:00 AM – 7:00 PM (IST)`,
  },
];

// ── Price highlight cards ──────────────────────────────────────────────────────
const HIGHLIGHTS = [
  { icon: '🆓', label: 'Free Delivery',      value: 'On orders ≥ ₹500' },
  { icon: '🛒', label: 'Minimum Order',       value: '₹500 per delivery' },
  { icon: '🚚', label: 'Standard Delivery',   value: '₹49 below threshold' },
  { icon: '⚡', label: 'Elite Now Fee',        value: '₹19 – ₹29' },
  { icon: '🏷️', label: 'Prices Include',      value: 'GST (all-inclusive)' },
  { icon: '💳', label: 'COD Available',       value: 'Up to ₹5,000' },
];

const Pricing = () => {
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

  return (
    <div className="pricing-page">

      {/* ── Hero ── */}
      <div className="pricing-hero ">
        <div className="container-fluid px-3 px-xl-4">
          <div className="pricing-hero-badge">Transparency First</div>
          <h1 className="pricing-hero-title">Pricing Policy</h1>
          <p className="pricing-hero-company">Elite Agro Foods Private Limited — Elite Mart</p>
          <p className="pricing-hero-date">Last Updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container-fluid px-3 px-xl-4 mt-3">

        {/* ── Highlight cards ── */}
        <div className="pricing-highlights">
          {HIGHLIGHTS.map(h => (
            <div key={h.label} className="pricing-hl-card">
              <span className="pricing-hl-icon">{h.icon}</span>
              <div>
                <p className="pricing-hl-label">{h.label}</p>
                <p className="pricing-hl-value">{h.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 pricing-layout-row">

          {/* ── Sidebar TOC ── */}
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <div className="pricing-toc">
              <p className="pricing-toc-title">Table of Contents</p>
              <ul className="pricing-toc-list" ref={tocListRef}>
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <button
                      data-id={s.id}
                      className={`pricing-toc-btn${activeSection === s.id ? ' pricing-toc-btn--active' : ''}`}
                      onClick={() => scrollTo(s.id)}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pricing-toc-contact">
                <p>Questions about pricing?</p>
                <a href="mailto:pricing@eliteagrofoods.com">pricing@eliteagrofoods.com</a>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="col-12 col-lg-9">

            <div className="pricing-intro-banner">
              <span>💰</span>
              <p>
                <strong>We believe in complete pricing transparency.</strong> All prices on Elite Mart
                are inclusive of GST, clearly displayed, and based on fair market rates. This page
                explains exactly how our pricing works — from MRP to delivery charges.
              </p>
            </div>

            {SECTIONS.map(section => (
              <div key={section.id} id={section.id} className="pricing-section">
                <h2 className="pricing-section-title">{section.title}</h2>
                <div className="pricing-section-body">
                  {section.content.split('\n\n').map((para, i) => {
                    if (para.startsWith('**') && para.endsWith('**')) {
                      return <h4 key={i} className="pricing-sub-heading">{para.replace(/\*\*/g, '')}</h4>;
                    }
                    if (para.startsWith('• ')) {
                      return (
                        <ul key={i} className="pricing-list">
                          {para.split('\n').filter(l => l.startsWith('• ')).map((line, j) => (
                            <li key={j}>{line.replace(/^• /, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={i} dangerouslySetInnerHTML={{
                        __html: para
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n• /g, '<br/>• ')
                      }} />
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pricing-footer-note">
              <p>
                This Pricing Policy was last reviewed on <strong>{LAST_UPDATED}</strong>.
                For queries, contact us at{' '}
                <a href="mailto:pricing@eliteagrofoods.com">pricing@eliteagrofoods.com</a>.
              </p>
              <div className="pricing-footer-links">
                <Link to="/terms">Terms &amp; Conditions</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/returns">Return &amp; Refund Policy</Link>
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

export default Pricing;
