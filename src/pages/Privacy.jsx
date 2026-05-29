import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/privacy.scss';

const LAST_UPDATED = '01 June 2025';

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `Elite Agro Foods Private Limited ("Elite Agro Foods", "Elite Mart", "we", "us", or "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website (www.eliteagrofoods.com), use our mobile application ("Elite Mart App"), or interact with us in our physical stores.

By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our services.

This Privacy Policy is published in compliance with:
• The Information Technology Act, 2000, and the rules made thereunder
• The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011
• The Consumer Protection (E-Commerce) Rules, 2020
• Any other applicable laws and regulations in India`,
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    content: `We collect the following types of information to provide and improve our services:

**2.1 Personal Information You Provide**
• Full name and contact details (mobile number and email address)
• Delivery addresses (home, office, or other locations)
• Date of birth (for age-restricted product verification, where applicable)
• Profile picture (optional, if uploaded)
• Payment information (processed securely through our payment partners; we do not store card details)
• Communication preferences

**2.2 Information Collected Automatically**
• Device information: device type, model, operating system, and unique device identifiers
• Usage data: pages visited, products viewed, search queries, time spent on pages, and click patterns
• Log data: IP address, browser type, referring URL, and access timestamps
• Location data: GPS coordinates or approximate location (with your permission) to determine delivery serviceability and suggest nearby pickup points
• Cookies and similar tracking technologies (see Section 8 for details)

**2.3 Information from Third Parties**
• Social login data: if you log in via Google or Facebook, we receive basic profile information shared by that platform
• Payment verification data from payment gateway partners
• Delivery address verification from postal or mapping services`,
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: `Elite Agro Foods uses your personal information for the following purposes:

**3.1 Order Fulfilment & Delivery**
• Processing, confirming, and fulfilling your orders
• Scheduling and coordinating delivery to your address
• Sending order status updates, delivery notifications, and invoices
• Verifying your identity and delivery address

**3.2 Account Management**
• Creating and managing your Elite Mart account
• Authenticating your identity via OTP during login
• Maintaining your saved addresses, order history, and preferences
• Sending account-related notifications (password changes, security alerts)

**3.3 Customer Support**
• Responding to your queries, complaints, and feedback
• Processing returns, refunds, and exchange requests
• Investigating and resolving disputes or reported issues

**3.4 Personalisation & Recommendations**
• Personalising your shopping experience with relevant product recommendations
• Displaying region-specific offers and promotions
• Showing previously viewed and frequently ordered products

**3.5 Marketing & Promotions (with your consent)**
• Sending promotional emails, SMS, and push notifications about offers, new products, and seasonal sales
• Notifying you of exclusive deals, coupon codes, and loyalty rewards
• You may opt out of marketing communications at any time (see Section 6)

**3.6 Analytics & Service Improvement**
• Analysing usage patterns to improve website and app performance
• Conducting internal research and market analysis
• Identifying and fixing technical issues and bugs
• Developing new features and product categories based on customer behaviour

**3.7 Legal & Regulatory Compliance**
• Complying with applicable Indian laws and regulations
• Responding to lawful government or court orders
• Detecting, preventing, and investigating fraud or unauthorised access`,
  },
  {
    id: 'sharing',
    title: '4. Sharing of Your Information',
    content: `Elite Agro Foods does not sell, rent, or trade your personal information to third parties for their own marketing purposes. We share your information only in the following limited circumstances:

**4.1 Delivery & Logistics Partners**
Your name, contact number, and delivery address are shared with our third-party delivery partners solely to fulfil your orders. These partners are contractually bound to use this information only for delivery purposes.

**4.2 Payment Processing Partners**
Payment information is processed by PCI-DSS compliant payment gateway providers. We do not store or have access to your full card details. Only the last four digits of your card (for identification) may be retained.

**4.3 Technology & Cloud Service Providers**
We use trusted third-party cloud hosting, analytics, and technology service providers who process data on our behalf. All such providers are bound by strict data processing agreements and confidentiality obligations.

**4.4 Government & Law Enforcement Authorities**
We may disclose your information when required to do so by law, court order, or lawful government authority, or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.

**4.5 Business Transfers**
If Elite Agro Foods undergoes a merger, acquisition, or sale of all or part of its assets, your personal information may be transferred as part of that transaction. You will be notified of any such change in ownership or use of your personal information.

**4.6 With Your Consent**
We may share your information with third parties in other cases where you have explicitly given us your written or digital consent to do so.`,
  },
  {
    id: 'data-retention',
    title: '5. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.

• **Account data**: Retained for as long as your account is active. If you delete your account, we will delete your personal data within 90 days, except where retention is required for legal compliance.
• **Order history**: Retained for 7 years to comply with applicable tax and accounting laws in India.
• **Payment transaction records**: Retained for 5 years as required by the Payment and Settlement Systems Act, 2007.
• **Communication records (support tickets, emails)**: Retained for 2 years after resolution.
• **Marketing data**: Retained until you withdraw your consent or request deletion.
• **Log and analytics data**: Typically retained for 12 months and then anonymised or deleted.

After the applicable retention period, your personal data is securely deleted or anonymised such that it can no longer be linked to you.`,
  },
  {
    id: 'your-rights',
    title: '6. Your Rights & Choices',
    content: `As a user of Elite Mart, you have the following rights regarding your personal data:

**6.1 Right to Access**
You have the right to request a copy of the personal information we hold about you. You can view most of your data directly in your "My Account" section.

**6.2 Right to Correction**
You can update or correct inaccurate personal information through your account settings. For data we cannot make editable, contact us at support@eliteagrofoods.com.

**6.3 Right to Deletion**
You may request the deletion of your account and associated personal data. Note that we may retain certain information as required by law or for legitimate business purposes (e.g., fraud prevention, legal compliance).

**6.4 Right to Withdraw Consent**
Where we process your data based on consent, you may withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before the withdrawal.

**6.5 Right to Opt Out of Marketing**
You may unsubscribe from marketing emails by clicking the "Unsubscribe" link in any email. For SMS/push notifications, update your preferences in the app settings or contact our support team.

**6.6 Right to Data Portability**
You may request your personal data in a structured, commonly used, machine-readable format. Submit such requests to our Data Protection Officer (see Section 11).

**6.7 Right to Lodge a Complaint**
If you believe your data is being processed unlawfully, you have the right to lodge a complaint with the relevant regulatory authority in India.

To exercise any of these rights, contact us at: **privacy@eliteagrofoods.com**`,
  },
  {
    id: 'data-security',
    title: '7. Data Security',
    content: `Elite Agro Foods implements industry-standard technical and organisational security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.

**Technical Safeguards:**
• 256-bit SSL/TLS encryption for all data transmitted between your device and our servers
• PCI-DSS compliant payment processing through certified third-party gateways
• End-to-end encryption of sensitive personal data in our databases
• Multi-factor authentication (OTP-based login) for account access
• Regular penetration testing and vulnerability assessments
• Automated intrusion detection and prevention systems

**Organisational Safeguards:**
• Access to personal data is restricted to authorised employees and contractors on a need-to-know basis
• All employees handling personal data are bound by confidentiality agreements
• Regular privacy and security training for all staff members
• Documented data breach response and incident management procedures

**Important Notice:**
While we take all reasonable precautions, no method of electronic storage or transmission over the internet is 100% secure. If you suspect any unauthorised access to your account, please contact us immediately at support@eliteagrofoods.com or change your credentials through the app.`,
  },
  {
    id: 'cookies',
    title: '8. Cookies & Tracking Technologies',
    content: `Elite Mart uses cookies and similar tracking technologies on our website and mobile application to enhance your shopping experience.

**Types of Cookies We Use:**

• **Strictly Necessary Cookies**: Essential for the website and app to function correctly. These include session cookies for your shopping cart, login authentication tokens, and security cookies. These cannot be disabled.

• **Performance & Analytics Cookies**: Help us understand how visitors interact with our platform, which pages are most visited, and where errors occur. We use anonymised analytics data to improve our services.

• **Functional Cookies**: Remember your preferences such as language, delivery location, recently viewed products, and selected weight options to provide a personalised experience.

• **Marketing & Targeting Cookies**: Used to deliver relevant advertisements and promotional content based on your browsing and purchase history. These are only set with your consent.

**Managing Cookies:**
You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website. For mobile apps, you can manage tracking preferences in your device's privacy settings.

**Third-Party Cookies:**
We use third-party analytics services (such as Google Analytics) and advertising platforms. These services may set their own cookies subject to their respective privacy policies.`,
  },
  {
    id: 'children',
    title: '9. Children\'s Privacy',
    content: `Elite Mart's services are not directed to children under the age of 18. We do not knowingly collect personal information from children under 18 without verifiable parental consent.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at privacy@eliteagrofoods.com. Upon verification, we will promptly delete such information from our systems.

If we learn that we have inadvertently collected personal information from a child under 18, we will take immediate steps to delete that information.`,
  },
  {
    id: 'third-party-links',
    title: '10. Third-Party Websites & Links',
    content: `Our website and app may contain links to third-party websites, social media platforms, or partner services that are not operated by Elite Agro Foods. These include but are not limited to payment gateway websites, social media pages, and brand manufacturer websites.

Elite Agro Foods has no control over the content, privacy practices, or security measures of these third-party sites. We are not responsible for the privacy policies or practices of any third-party website. We strongly encourage you to review the privacy policy of every website you visit.

This Privacy Policy applies solely to information collected by Elite Agro Foods through our own platforms.`,
  },
  {
    id: 'dpo',
    title: '11. Data Protection Officer & Grievance',
    content: `In accordance with the Information Technology Act, 2000 and applicable rules, we have appointed a Grievance Officer to address privacy-related concerns.

**Grievance Officer / Data Protection Officer**
Name: Customer Privacy Team
Organisation: Elite Agro Foods Private Limited
Email: privacy@eliteagrofoods.com
Phone: +91 77 9977 1189
Address: Elite Agro Foods Pvt. Ltd., Hyderabad, Telangana – 500081, India
Working Hours: Monday to Friday, 9:00 AM – 6:00 PM (IST)

**Response Time:**
We will acknowledge your privacy complaint within 48 hours and aim to resolve it within 30 days of receipt. If you are not satisfied with our resolution, you may escalate the matter to the appropriate regulatory authority in India.`,
  },
  {
    id: 'changes',
    title: '12. Changes to This Privacy Policy',
    content: `Elite Agro Foods reserves the right to update or modify this Privacy Policy at any time to reflect changes in our practices, technology, legal requirements, or for other operational reasons.

When we make material changes to this Privacy Policy:
• We will update the "Last Updated" date at the top of this page
• We will notify registered users via email or a prominent in-app notification
• For significant changes affecting your rights, we may request your renewed consent

We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our services after any changes constitutes your acceptance of the revised Privacy Policy.

If you have questions about any changes, contact us at privacy@eliteagrofoods.com.`,
  },
  {
    id: 'governing-law',
    title: '13. Governing Law & Jurisdiction',
    content: `This Privacy Policy and any disputes arising from or related to it shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with this Privacy Policy shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana, India.

By using Elite Mart's services, you consent to the jurisdiction of these courts and waive any objection to such jurisdiction or venue.`,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const SCROLL_OFFSET = 96; // sticky header height + a little breathing room

const Privacy = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const tocListRef    = useRef(null);
  const rafRef        = useRef(null);
  const clickingRef   = useRef(false); // suppress scroll-listener during click-scroll

  // ── Scroll listener: find the topmost section above the threshold ─────────
  useEffect(() => {
    const update = () => {
      if (clickingRef.current) return;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = s.id;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // set correct state on mount
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Auto-scroll TOC so active button stays visible ────────────────────────
  useEffect(() => {
    if (!activeSection || !tocListRef.current) return;
    const btn = tocListRef.current.querySelector(`[data-id="${activeSection}"]`);
    btn?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeSection]);

  const scrollTo = (id) => {
    // suppress observer while the smooth-scroll animation runs (~700 ms)
    clickingRef.current = true;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { clickingRef.current = false; }, 800);
  };

  return (
    <div className="priv-page">

      {/* ── Hero ── */}
      <div className="priv-hero">
        <div className="container-fluid px-3 px-xl-4">
          <div className="priv-hero-badge">Legal Document</div>
          <h1 className="priv-hero-title">Privacy Policy</h1>
          <p className="priv-hero-company">Elite Agro Foods Private Limited — Elite Mart</p>
          <p className="priv-hero-date">Last Updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container-fluid px-3 px-xl-4">
        <div className="row g-4 priv-layout-row">

          {/* ── Sidebar TOC ── */}
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <div className="priv-toc">
              <p className="priv-toc-title">Table of Contents</p>
              <ul className="priv-toc-list" ref={tocListRef}>
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <button
                      data-id={s.id}
                      className={`priv-toc-btn${activeSection === s.id ? ' priv-toc-btn--active' : ''}`}
                      onClick={() => scrollTo(s.id)}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="priv-toc-contact">
                <p>Questions about this policy?</p>
                <a href="mailto:privacy@eliteagrofoods.com">privacy@eliteagrofoods.com</a>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="col-12 col-lg-9">

            {/* Intro banner */}
            <div className="priv-intro-banner">
              <span className="priv-intro-icon">🔒</span>
              <p>
                <strong>Your privacy matters to us.</strong> Elite Agro Foods is committed to protecting
                your personal information and being transparent about how we use it. This policy applies
                to all Elite Mart services including our website, mobile app, and physical stores.
              </p>
            </div>

            {/* Sections */}
            {SECTIONS.map(section => (
              <div key={section.id} id={section.id} className="priv-section">
                <h2 className="priv-section-title">{section.title}</h2>
                <div className="priv-section-body">
                  {section.content.split('\n\n').map((para, i) => (
                    para.startsWith('**') && para.endsWith('**') ? (
                      <h4 key={i} className="priv-sub-heading">
                        {para.replace(/\*\*/g, '')}
                      </h4>
                    ) : para.startsWith('• ') ? (
                      <ul key={i} className="priv-list">
                        {para.split('\n').filter(l => l.startsWith('• ')).map((line, j) => (
                          <li key={j}>{line.replace(/^• /, '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={i} dangerouslySetInnerHTML={{
                        __html: para
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n• /g, '<br/>• ')
                      }} />
                    )
                  ))}
                </div>
              </div>
            ))}

            {/* Footer note */}
            <div className="priv-footer-note">
              <p>
                This Privacy Policy was last reviewed and updated on <strong>{LAST_UPDATED}</strong>.
                For any privacy-related concerns, contact us at{' '}
                <a href="mailto:privacy@eliteagrofoods.com">privacy@eliteagrofoods.com</a>.
              </p>
              <div className="priv-footer-links">
                <Link to="/terms">Terms & Conditions</Link>
                <Link to="/disclaimer">Disclaimer</Link>
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

export default Privacy;
