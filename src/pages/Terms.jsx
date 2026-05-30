import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/terms.scss';

const LAST_UPDATED = '01 June 2025';
const SCROLL_OFFSET = 96;

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction & Acceptance',
    content: `Welcome to Elite Mart, operated by Elite Agro Foods Private Limited ("Elite Agro Foods", "Elite Mart", "we", "us", or "our"), a company incorporated under the Companies Act, 2013, with its registered office at Hyderabad, Telangana, India.

These Terms & Conditions ("Terms") govern your access to and use of our website (www.eliteagrofoods.com), mobile application ("Elite Mart App"), and all associated services, platforms, and features (collectively, the "Platform"). By accessing, registering on, or using the Platform in any way, you confirm that you have read, understood, and unconditionally agreed to be bound by these Terms, along with our Privacy Policy, Delivery Policy, Return & Refund Policy, and Pricing Policy, all of which are incorporated herein by reference.

**If you do not agree to these Terms, you must immediately stop using the Platform.**

These Terms constitute a legally binding agreement between you ("User", "Customer", "you") and Elite Agro Foods. We reserve the right to update or modify these Terms at any time. Updated Terms will be posted on this page with a revised effective date. Your continued use of the Platform after any such modification constitutes your acceptance of the revised Terms.`,
  },
  {
    id: 'definitions',
    title: '2. Definitions',
    content: `In these Terms, the following terms shall have the meanings assigned to them below:

• **"Platform"** means the Elite Mart website, mobile application, and all associated digital services operated by Elite Agro Foods Private Limited.
• **"User" / "Customer" / "you"** means any individual who accesses, browses, registers on, or transacts on the Platform.
• **"Account"** means your registered profile on the Platform, protected by your login credentials.
• **"Products"** means all grocery items, household goods, personal care products, fresh produce, and any other items listed for sale on the Platform.
• **"Order"** means a confirmed purchase request placed by you for one or more Products through the Platform.
• **"Seller"** means Elite Agro Foods Private Limited, which sells Products through the Platform either directly or through authorised distribution partners.
• **"Delivery Partner"** means any third-party logistics or delivery service provider engaged by Elite Agro Foods to fulfil last-mile delivery of your Orders.
• **"Wallet"** or **"Elite Mart Wallet"** means the in-app digital credits system that holds cashback, refunded amounts, or promotional credits applied to your Account.
• **"Intellectual Property"** means all trademarks, logos, service marks, trade names, domain names, copyrights, patents, design rights, database rights, trade secrets, and any other proprietary rights owned by or licensed to Elite Agro Foods.
• **"Force Majeure"** means any event beyond the reasonable control of either party, including acts of God, natural disasters, epidemics, pandemics, government-imposed restrictions, war, terrorism, or infrastructure failures.`,
  },
  {
    id: 'eligibility',
    title: '3. Eligibility & Account Registration',
    content: `**3.1 Eligibility**
To use the Platform and place Orders, you must:
• Be at least 18 years of age, or be using the Platform under the supervision of a parent or legal guardian who has agreed to these Terms on your behalf
• Be capable of entering into a legally binding contract under the Indian Contract Act, 1872
• Not be barred from using online services under any applicable law in India or any other jurisdiction

**3.2 Account Registration**
Certain features of the Platform, including placing Orders, require you to create an Account. During registration, you must provide accurate, current, and complete information. You agree to update your information promptly if it changes.

**3.3 Account Security**
You are solely responsible for:
• Maintaining the confidentiality of your login credentials (mobile number, OTP, passwords)
• All activities that occur under your Account
• Notifying us immediately at support@eliteagrofoods.com if you suspect any unauthorised access to your Account

Elite Mart uses OTP (One-Time Password) based authentication. Do not share OTPs with anyone, including anyone claiming to be an Elite Mart representative. We will never ask for your OTP.

**3.4 One Account Per User**
You may create and maintain only one Account. Creating multiple Accounts to abuse promotional offers, referral programs, or return policies is strictly prohibited and may result in permanent suspension of all associated Accounts.

**3.5 Account Termination by User**
You may request deletion of your Account at any time by contacting support@eliteagrofoods.com. Account deletion is subject to completion of any pending Orders and settlement of any outstanding dues. Certain data may be retained as required by applicable law.`,
  },
  {
    id: 'platform-use',
    title: '4. Use of the Platform',
    content: `**4.1 Permitted Use**
The Platform is made available to you solely for the purpose of browsing Products, placing Orders, managing your Account, and using related features intended for personal, non-commercial use. Any other use requires our prior written consent.

**4.2 Prohibited Conduct**
You agree not to:
• Use the Platform for any unlawful, fraudulent, or harmful purpose
• Interfere with or disrupt the operation of the Platform, its servers, or networks
• Attempt to gain unauthorised access to any part of the Platform, other users' accounts, or our systems
• Use automated bots, scrapers, crawlers, or data-mining tools to access or collect data from the Platform without permission
• Post or transmit any content that is defamatory, offensive, obscene, or violates any third party's rights
• Impersonate any person or entity or misrepresent your affiliation with any person or entity
• Circumvent, disable, or otherwise interfere with security features of the Platform
• Resell, redistribute, or commercially exploit Products purchased on the Platform without authorisation

**4.3 Compliance with Laws**
You are responsible for ensuring that your use of the Platform complies with all applicable local, state, and national laws and regulations in India.

**4.4 Platform Availability**
We strive to keep the Platform available 24/7, but do not guarantee uninterrupted access. We may suspend access for maintenance, upgrades, or reasons beyond our control without prior notice. We are not liable for any inconvenience or loss arising from Platform downtime.`,
  },
  {
    id: 'products-pricing',
    title: '5. Products, Pricing & Availability',
    content: `**5.1 Product Information**
We make every effort to accurately describe and display Products on the Platform, including images, weights, ingredients, nutritional information, and expiry details. However:
• Product images are for illustrative purposes only and may differ slightly from the actual product
• Packaging, labels, and product formulations may change without prior notice by the manufacturer
• You are advised to read product labels carefully before use, especially regarding allergens and ingredients

**5.2 Pricing**
All Product prices listed on the Platform are in Indian Rupees (INR) and are inclusive of applicable taxes (GST) unless stated otherwise. Prices are subject to change without prior notice. The price applicable to your Order is the price displayed at the time you confirm checkout.

**5.3 Pricing Errors**
In the event of a pricing error on the Platform (whether due to a technical glitch or human error), Elite Mart reserves the right to cancel affected Orders and process a full refund, even after Order confirmation. We will notify you promptly in such cases.

**5.4 Product Availability**
Product availability is not guaranteed. Items marked "In Stock" may occasionally be unavailable at the time of fulfilment due to inventory fluctuations. In such cases:
• We will fulfil the rest of your Order and refund the unavailable item(s)
• Or offer you a suitable substitute of equal or lesser value (only with your prior consent during checkout)

**5.5 Promotions & Discounts**
Promotional offers, coupons, and discounts are subject to their individual terms and validity periods. They cannot be combined unless explicitly stated. We reserve the right to withdraw or modify promotions at any time without prior notice.`,
  },
  {
    id: 'ordering-payment',
    title: '6. Ordering & Payment',
    content: `**6.1 Placing an Order**
By clicking "Place Order" or completing the checkout process, you make a binding offer to purchase the selected Products at the stated prices. An Order is confirmed only upon receipt of our Order Confirmation SMS and email. Elite Mart reserves the right to accept or reject any Order at its sole discretion.

**6.2 Order Modifications**
After placement, Orders may be modified or cancelled only before they are dispatched from our fulfilment centre. Modifications include changes to delivery address, delivery slot, or item quantities, and are subject to availability.

**6.3 Accepted Payment Methods**
We accept the following payment methods:
• UPI (Google Pay, PhonePe, Paytm, BHIM, and other UPI apps)
• Credit cards and debit cards (Visa, Mastercard, RuPay, American Express)
• Net banking
• Cash on Delivery (COD) — available in select areas and subject to order value limits
• Elite Mart Wallet credits
• EMI options (subject to bank eligibility and minimum order value)

**6.4 Payment Security**
All online payments are processed through PCI-DSS compliant payment gateways. Elite Mart does not store your full card details on its servers. Transactions are secured by 256-bit SSL encryption.

**6.5 Cash on Delivery (COD)**
COD is available for eligible pincodes and order values. Exact change is appreciated. Our delivery partners are not authorised to collect additional charges beyond the amount shown in your Order Summary.

**6.6 Failed Payments**
If your payment fails after Order placement, the Order will not be confirmed. Any amount debited from your account will be automatically reversed by your bank within 5–7 working days. Contact support@eliteagrofoods.com if you do not receive a reversal within this period.

**6.7 Invoice**
A GST-compliant digital invoice will be generated for every confirmed Order and shared via email. You can also download invoices from "My Orders" in the app.`,
  },
  {
    id: 'delivery',
    title: '7. Delivery',
    content: `**7.1 Delivery Terms**
Delivery of Products is governed by our Delivery Policy, which forms an integral part of these Terms. Please read our Delivery Policy at www.eliteagrofoods.com/delivery for full details on delivery timelines, charges, serviceability, and missed delivery procedures.

**7.2 Risk of Loss**
The risk of loss or damage to Products passes to you upon successful delivery to the address specified in your Order. "Successful delivery" means the Products have been handed to you, a person authorised by you, or left at a location specified by you for unattended delivery.

**7.3 Delivery Address Accuracy**
You are solely responsible for providing an accurate and complete delivery address. Elite Mart is not liable for failed deliveries or loss of perishable goods resulting from an incorrect address provided by you.

**7.4 Title to Products**
Title (ownership) of Products transfers to you upon full payment and successful delivery.`,
  },
  {
    id: 'returns-refunds',
    title: '8. Returns & Refunds',
    content: `Returns and refunds are governed by our Return & Refund Policy, which forms an integral part of these Terms. Please read our Return & Refund Policy at www.eliteagrofoods.com/refund-policy for full details on eligibility, timelines, and processes.

**Key highlights:**
• Perishable items: Report issues within 4 hours of delivery
• Packaged grocery and FMCG products: Report within 24 hours
• Non-grocery household/personal care products: Report within 7 days
• Refunds are processed within 1–7 working days depending on the payment method
• Instant refunds are available to your Elite Mart Wallet

Elite Mart reserves the right to reject return requests that do not comply with the Return & Refund Policy or where abuse of the policy is suspected.`,
  },
  {
    id: 'intellectual-property',
    title: '9. Intellectual Property',
    content: `**9.1 Ownership**
All content on the Platform — including but not limited to text, graphics, logos, product images, button icons, data compilations, software code, and the overall look and feel — is the exclusive property of Elite Agro Foods Private Limited or its content suppliers and is protected under the Copyright Act, 1957, the Trade Marks Act, 1999, and other applicable Indian and international intellectual property laws.

**9.2 Restricted Use**
You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform solely for personal, non-commercial shopping purposes. You may not:
• Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Platform
• Use any data mining, robots, or similar data-gathering tools on the Platform
• Download or scrape product listings, prices, or other Platform content for commercial purposes
• Use Elite Mart's trademarks, logos, or branding without our prior written consent

**9.3 User-Submitted Content**
If you submit reviews, ratings, photographs, feedback, or other content ("User Content") to the Platform, you grant Elite Agro Foods a non-exclusive, royalty-free, perpetual, worldwide licence to use, display, reproduce, and distribute such User Content for business purposes. You represent that you own or have the right to submit such content and that it does not infringe any third-party rights.

**9.4 Feedback**
Any feedback, suggestions, or ideas you share with us may be used by Elite Agro Foods without any obligation of confidentiality, compensation, or attribution.`,
  },
  {
    id: 'privacy',
    title: '10. Privacy & Data Protection',
    content: `Your privacy is important to us. The collection, use, storage, and disclosure of your personal information is governed by our Privacy Policy, which forms an integral part of these Terms. By using the Platform, you consent to our data practices as described in the Privacy Policy.

Key data practices include:
• We collect personal information necessary to provide our services (name, contact details, delivery address, payment information)
• We do not sell or rent your personal information to third parties for their own marketing
• Your payment data is processed by PCI-DSS compliant third-party payment gateways — we do not store full card details
• You have rights to access, correct, and request deletion of your personal data
• Our Privacy Policy is compliant with the Information Technology Act, 2000, and applicable rules

For full details, read our Privacy Policy at www.eliteagrofoods.com/privacy.`,
  },
  {
    id: 'third-party',
    title: '11. Third-Party Services & Links',
    content: `**11.1 Third-Party Payment Gateways**
Payments on the Platform are processed through third-party payment gateways. By making a payment, you agree to those gateways' terms of service and privacy policies. Elite Mart is not responsible for any issues arising from third-party payment processing.

**11.2 Third-Party Delivery Partners**
Last-mile delivery may be handled by third-party logistics partners. While we hold delivery partners to our service standards, Elite Mart is not liable for independent acts or omissions of delivery partners after an Order has been marked as delivered.

**11.3 External Links**
The Platform may contain links to third-party websites for your convenience. These links do not constitute an endorsement of those websites by Elite Mart. We are not responsible for the content, privacy practices, or security of any linked third-party site. You access such sites at your own risk.

**11.4 Third-Party Brands & Products**
Products sold on the Platform from third-party brands are manufactured and packaged by those brands. Elite Mart makes no warranties regarding the accuracy of manufacturer-provided information (ingredients, nutritional values, allergens) and recommends that you independently verify such information on the physical product label.`,
  },
  {
    id: 'disclaimer',
    title: '12. Disclaimer of Warranties',
    content: `**12.1 Platform Provided "As Is"**
The Platform and all content, Products, and services available through it are provided on an "as is" and "as available" basis, without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

**12.2 No Warranty on Accuracy**
Elite Mart does not warrant that:
• The Platform will be uninterrupted, error-free, or free of viruses or other harmful components
• Information on the Platform (including product descriptions, prices, and availability) is always accurate, complete, or up to date
• Results obtained from using the Platform will meet your expectations

**12.3 Health & Dietary Information**
Nutritional information, ingredients, and health claims displayed on the Platform are provided by product manufacturers and are for informational purposes only. Elite Mart does not provide medical or dietary advice. You are advised to consult a qualified professional before making dietary decisions based on product information.

**12.4 Consumer Rights**
Nothing in these Terms limits or excludes any rights you may have as a consumer under the Consumer Protection Act, 2019, or any other applicable law in India that cannot be excluded by contract.`,
  },
  {
    id: 'liability',
    title: '13. Limitation of Liability',
    content: `**13.1 Cap on Liability**
To the maximum extent permitted by applicable law, Elite Agro Foods' total liability to you for any claim arising out of or related to these Terms or your use of the Platform shall not exceed the total amount paid by you for the specific Order that gave rise to the claim.

**13.2 Exclusion of Consequential Damages**
Elite Agro Foods shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with these Terms or your use of the Platform, including but not limited to:
• Loss of profits or revenue
• Loss of data or goodwill
• Cost of substitute goods or services
• Any other intangible losses

**13.3 Force Majeure**
Elite Mart shall not be liable for any delay or failure to perform its obligations under these Terms due to Force Majeure events, including acts of God, natural disasters, epidemics, pandemics, government restrictions, strikes, internet outages, or any other cause beyond our reasonable control.

**13.4 Indemnification**
You agree to indemnify, defend, and hold harmless Elite Agro Foods Private Limited, its directors, officers, employees, agents, and partners from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with:
• Your use of or access to the Platform in violation of these Terms
• Your violation of any applicable law or third-party rights
• Any User Content you submit to the Platform`,
  },
  {
    id: 'loyalty-wallet',
    title: '14. Loyalty Programme & Wallet',
    content: `**14.1 Elite Mart Wallet**
The Elite Mart Wallet is an in-app credit system that holds refund amounts, cashback rewards, and promotional credits. Wallet credits:
• Are valid for 12 months from the date of credit, unless otherwise stated
• Can be used to pay for future Orders on the Platform
• Are non-transferable and cannot be redeemed for cash
• Will be forfeited upon Account deletion or permanent suspension

**14.2 Promotional Credits & Cashback**
Cashback and promotional credits are subject to individual offer terms, including minimum order values, product restrictions, and validity periods. Elite Mart reserves the right to modify, suspend, or withdraw any cashback or loyalty programme without prior notice.

**14.3 Referral Programme**
If Elite Mart operates a referral programme, referral credits are subject to separate programme terms. Fraudulent referrals (self-referrals, fake accounts) will result in forfeiture of all credits and potential Account suspension.

**14.4 Misuse of Offers**
Any systematic or fraudulent misuse of promotional offers, coupons, or loyalty programmes — including creating multiple accounts, placing and cancelling orders to capture credits, or exploiting pricing errors — will result in immediate Account suspension, forfeiture of all credits, and recovery of any financial loss caused to Elite Agro Foods.`,
  },
  {
    id: 'governing-law',
    title: '15. Governing Law & Dispute Resolution',
    content: `**15.1 Governing Law**
These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

**15.2 Jurisdiction**
Subject to the arbitration clause below, you agree that any legal action or proceedings relating to these Terms shall be brought exclusively before the competent courts of Hyderabad, Telangana, India. Both parties submit to the jurisdiction of such courts.

**15.3 Dispute Resolution — Arbitration**
Any dispute, controversy, or claim arising out of or in connection with these Terms, including the validity, interpretation, breach, or termination thereof, shall first be attempted to be resolved through good-faith negotiation between the parties.

If not resolved within 30 days of written notice of the dispute, the matter shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996. The arbitration shall be:
• Conducted by a sole arbitrator mutually appointed by both parties
• Held in Hyderabad, Telangana, India
• Conducted in the English language
• Subject to the laws of India

The arbitrator's decision shall be final and binding on both parties.

**15.4 Consumer Forum**
Notwithstanding the arbitration clause, nothing in these Terms prevents you from approaching the appropriate Consumer Disputes Redressal Forum under the Consumer Protection Act, 2019, which is a statutory right available to all Indian consumers.`,
  },
  {
    id: 'miscellaneous',
    title: '16. General & Miscellaneous',
    content: `**16.1 Entire Agreement**
These Terms, together with the Privacy Policy, Delivery Policy, Return & Refund Policy, and Pricing Policy, constitute the entire agreement between you and Elite Agro Foods regarding your use of the Platform and supersede all prior communications, representations, and agreements.

**16.2 Severability**
If any provision of these Terms is found to be invalid, unlawful, or unenforceable, that provision shall be modified to the minimum extent necessary to make it valid and enforceable. If such modification is not possible, the provision shall be severed from these Terms, and the remaining provisions shall continue in full force and effect.

**16.3 Waiver**
Elite Mart's failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision. Any waiver must be in writing and signed by an authorised representative of Elite Agro Foods.

**16.4 Assignment**
You may not assign or transfer any of your rights or obligations under these Terms without our prior written consent. Elite Agro Foods may assign these Terms, in whole or in part, in connection with a merger, acquisition, sale of assets, or by operation of law.

**16.5 Notices**
Notices from Elite Mart to you will be given via email to your registered email address, SMS to your registered mobile number, or prominent notice on the Platform. Notices from you to Elite Mart must be sent in writing to support@eliteagrofoods.com or to our registered address.

**16.6 Changes to These Terms**
We reserve the right to revise these Terms at any time. Material changes will be communicated via email or in-app notification. The revised Terms will be effective from the date of posting. Continued use of the Platform after the effective date constitutes your acceptance.`,
  },
  {
    id: 'contact',
    title: '17. Contact Us',
    content: `For any questions, concerns, or feedback regarding these Terms & Conditions, please reach out to us:

**Elite Agro Foods Private Limited**
Registered Office: Hyderabad, Telangana – 500081, India

**Customer Support**
• Email: support@eliteagrofoods.com
• Phone: +91 77 9977 1189
• Support Hours: Monday to Saturday, 9:00 AM – 7:00 PM (IST)

**Legal & Compliance**
• Email: legal@eliteagrofoods.com

**Grievance Officer**
In accordance with the Information Technology Act, 2000, and Consumer Protection (E-Commerce) Rules, 2020, our Grievance Officer can be reached at:
• Email: grievance@eliteagrofoods.com
• Response Time: Within 48 hours of receipt; resolution within 30 days

We value your trust and are committed to resolving any concerns promptly and fairly.`,
  },
];

const HIGHLIGHTS = [
  { icon: '⚖️', label: 'Governed By',    value: 'Indian Law' },
  { icon: '🏛️', label: 'Jurisdiction',   value: 'Hyderabad, India' },
  { icon: '🔞', label: 'Minimum Age',     value: '18 Years' },
  { icon: '📅', label: 'Effective Date',  value: '01 June 2025' },
  { icon: '🤝', label: 'Dispute Process', value: 'Arbitration' },
  { icon: '📞', label: 'Support',         value: 'Mon–Sat, 9AM–7PM' },
];

const Terms = () => {
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
        return <h4 key={i} className="tc-sub-heading">{para.replace(/\*\*/g, '')}</h4>;
      if (para.startsWith('• '))
        return (
          <ul key={i} className="tc-list">
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
    <div className="tc-page">

      {/* ── Hero ── */}
      <div className="tc-hero">
        <div className="container-fluid px-3 px-xl-4">
          <div className="tc-hero-badge">Legal Document</div>
          <h1 className="tc-hero-title">Terms &amp; Conditions</h1>
          <p className="tc-hero-company">Elite Agro Foods Private Limited — Elite Mart</p>
          <p className="tc-hero-date">Last Updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container-fluid px-3 px-xl-4 mt-3">

        {/* ── Highlights ── */}
        <div className="tc-highlights">
          {HIGHLIGHTS.map(h => (
            <div key={h.label} className="tc-hl-card">
              <span className="tc-hl-icon">{h.icon}</span>
              <div>
                <p className="tc-hl-label">{h.label}</p>
                <p className="tc-hl-value">{h.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 tc-layout-row">

          {/* ── TOC sidebar ── */}
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <div className="tc-toc">
              <p className="tc-toc-title">Table of Contents</p>
              <ul className="tc-toc-list" ref={tocListRef}>
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <button
                      data-id={s.id}
                      className={`tc-toc-btn${activeSection === s.id ? ' tc-toc-btn--active' : ''}`}
                      onClick={() => scrollTo(s.id)}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tc-toc-contact">
                <p>Questions about these Terms?</p>
                <a href="mailto:legal@eliteagrofoods.com">legal@eliteagrofoods.com</a>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="col-12 col-lg-9">
            <div className="tc-intro-banner">
              <span>📋</span>
              <p>
                <strong>Please read these Terms carefully before using Elite Mart.</strong> They explain
                your rights and obligations when shopping with us, how we handle orders, payments,
                and disputes, and the legal framework that governs our relationship with you.
              </p>
            </div>

            {SECTIONS.map(section => (
              <div key={section.id} id={section.id} className="tc-section">
                <h2 className="tc-section-title">{section.title}</h2>
                <div className="tc-section-body">
                  {renderContent(section.content)}
                </div>
              </div>
            ))}

            <div className="tc-footer-note">
              <p>
                These Terms &amp; Conditions were last reviewed on <strong>{LAST_UPDATED}</strong>.
                For legal queries, contact{' '}
                <a href="mailto:legal@eliteagrofoods.com">legal@eliteagrofoods.com</a>.
              </p>
              <div className="tc-footer-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/refund-policy">Return &amp; Refund Policy</Link>
                <Link to="/delivery">Delivery Policy</Link>
                <Link to="/pricing">Pricing Policy</Link>
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

export default Terms;
