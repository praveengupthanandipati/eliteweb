import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/faqs.scss';

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    category: 'General',
    icon: '🏪',
    items: [
      { q: 'What is Elite Mart?', a: 'Elite Mart is an online and offline mini-supermarket brought to you by Elite Agro Foods. We offer 40,000+ products from 1,000+ trusted brands, delivering daily essentials right to your doorstep across 300+ cities in India.' },
      { q: 'Where is Elite Mart available?', a: 'Elite Mart currently operates across 300+ cities and towns in India. You can check if we deliver to your area by entering your pincode on the website or app.' },
      { q: 'What categories of products does Elite Mart offer?', a: 'We offer a wide range of products including Dal & Pulses, Rice & Grains, Cooking Oils, Ghee, Atta & Flour, Snacks, Beverages, Dairy, Personal Care, Baby Care, Home Care, Pooja Items, Dryfruits, Spices, and many more.' },
      { q: 'How do I download the Elite Mart mobile app?', a: 'You can download the Elite Mart app from the Google Play Store (Android) or the Apple App Store (iOS). Search for "Elite Mart" and install the app for free.' },
      { q: 'Is Elite Mart an online-only store?', a: 'No! Elite Mart offers both walk-in store experience and online delivery. You can visit our physical store or conveniently order from our website or mobile app.' },
      { q: 'How do I contact Elite Mart customer support?', a: 'You can reach our customer support at +91 77 9977 1189 or email us at support@eliteagrofoods.com. Our support team is available Monday to Saturday, 9:00 AM – 7:00 PM.' },
    ],
  },
  {
    category: 'Account & Login',
    icon: '🔐',
    items: [
      { q: 'How do I create an account on Elite Mart?', a: 'Click on the "Sign In" button in the top navigation bar, enter your 10-digit mobile number, and verify it with the OTP sent to your phone. Your account is created automatically on first login.' },
      { q: 'I did not receive an OTP. What should I do?', a: 'Please check that your mobile number is entered correctly. If you still did not receive the OTP, wait 30 seconds and click "Resend OTP". If the issue persists, contact our support team.' },
      { q: 'How do I reset or change my mobile number?', a: 'To update your registered mobile number, go to your Profile settings after logging in and request a change. You will need to verify your identity with an OTP on both your old and new numbers.' },
      { q: 'Can I use the same account on multiple devices?', a: 'Yes, you can log in to your Elite Mart account on multiple devices simultaneously. Your cart, order history, and saved addresses will sync across all devices.' },
      { q: 'How do I manage my saved addresses?', a: 'Go to "My Account" → "Address Management" to add, edit, or delete your saved delivery addresses. You can save multiple addresses (Home, Office, Others) for faster checkout.' },
      { q: 'How do I log out of my account?', a: 'Click on the user icon in the top navigation bar, then select "Logout" from the dropdown menu. For security, we recommend logging out if you are using a shared device.' },
    ],
  },
  {
    category: 'Delivery',
    icon: '🚚',
    items: [
      { q: 'What are Elite Mart\'s delivery hours?', a: 'We deliver from 7:00 AM to 10:00 PM, seven days a week. You can choose from morning (7–9 AM, 9–11 AM), afternoon (12–2 PM, 2–4 PM), evening (4–6 PM, 6–8 PM), or night (8–10 PM) delivery slots.' },
      { q: 'How do I select a delivery time slot?', a: 'During checkout, after confirming your delivery address, you will see the available delivery date and time slots. Select your preferred date (up to 5 days in advance) and a time window that suits you.' },
      { q: 'Can I get same-day delivery?', a: 'Yes! Orders placed before 6:00 PM are eligible for same-day delivery in select cities, subject to slot availability. Check the "Today" tab during checkout to see available same-day slots.' },
      { q: 'What is Elite Now – the instant delivery service?', a: 'Elite Now is our express delivery service that gets your essentials to your door within 15–30 minutes. It is available in select cities and covers 5,000+ frequently ordered products.' },
      { q: 'Can I reschedule or change my delivery slot?', a: 'Yes, you can reschedule your delivery slot up to 2 hours before the original delivery window by visiting "My Orders" and selecting "Change Delivery Slot". Rescheduling is subject to availability.' },
      { q: 'What happens if I am not available at the time of delivery?', a: 'Our delivery partner will attempt delivery twice. If both attempts fail, the order will be returned and a refund will be initiated. You can also leave a delivery note (e.g., "Leave at door") in your address details.' },
      { q: 'Do you deliver to remote or rural areas?', a: 'We deliver across 300+ cities and towns. For remote areas not currently covered, we are continuously expanding our network. Enter your pincode on our website to check availability.' },
      { q: 'How do I track my order?', a: 'Once your order is dispatched, you will receive a tracking link via SMS and email. You can also track your order in real-time under "My Orders" in your account.' },
      { q: 'Can I change my delivery address after placing an order?', a: 'Address changes are possible within 30 minutes of placing an order, before it is confirmed for dispatch. Contact our customer support immediately for assistance.' },
    ],
  },
  {
    category: 'Delivery Charges',
    icon: '💳',
    items: [
      { q: 'What are the delivery charges?', a: 'Delivery is FREE for orders above ₹500. For orders below ₹500, a nominal delivery charge of ₹49 is applied per order.' },
      { q: 'Is there a minimum order value?', a: 'Yes, the minimum order value is ₹500 to place a delivery order. This ensures we can deliver efficiently while keeping costs low for you.' },
      { q: 'Are there any extra charges for express or Elite Now delivery?', a: 'Elite Now instant delivery may carry an additional convenience fee of ₹19–₹29 depending on your location and order size. This will be clearly shown at checkout before you confirm.' },
      { q: 'Are there any packaging charges?', a: 'No, Elite Mart does not charge any separate packaging fees. What you see on the product page is the final price (inclusive of GST), with only applicable delivery charges added at checkout.' },
      { q: 'Do delivery charges apply to all cities?', a: 'Delivery charges may vary by city and order value. In most cities, orders above ₹500 qualify for free delivery. Check your specific delivery charge during checkout based on your pincode.' },
      { q: 'Can I get free delivery even for small orders?', a: 'Yes! You can use coupon codes and promotional offers that sometimes waive delivery charges. Also, adding a few more items to meet the ₹500 threshold will automatically make your delivery free.' },
    ],
  },
  {
    category: 'Pricing & Offers',
    icon: '🏷️',
    items: [
      { q: 'Are Elite Mart\'s prices competitive with local markets?', a: 'Yes! We regularly benchmark our prices against local markets and leading online platforms to ensure you get the best value. Many products are available at MRP or below, with frequent discounts.' },
      { q: 'How do discount percentages work?', a: 'The discount percentage shown on a product represents the saving on the MRP (Maximum Retail Price). For example, a 20% discount on a ₹100 product means you pay only ₹80.' },
      { q: 'How do I apply a coupon code?', a: 'In your cart, scroll down to find the "Apply Coupon Code" section. Enter your coupon code and click "Apply". The discount will be reflected immediately in your order total.' },
      { q: 'Where can I find active coupon codes?', a: 'Check our app\'s "Offers" section, subscribe to our newsletter, or follow our social media pages for the latest promo codes and seasonal deals.' },
      { q: 'Do prices change regularly?', a: 'Product prices may change due to brand pricing updates, seasonal fluctuations, or special promotions. The price shown at the time of placing your order is what you will be charged.' },
      { q: 'Are there special discounts for bulk orders?', a: 'Yes, many products offer better per-unit pricing for larger pack sizes (e.g., 5kg vs 1kg). Contact our business team at support@eliteagrofoods.com for institutional or bulk purchase inquiries.' },
      { q: 'Do app users get exclusive deals?', a: 'Yes! The Elite Mart mobile app frequently offers app-exclusive deals, early access to sales, and loyalty rewards that are not available on the website.' },
      { q: 'Is GST included in the displayed price?', a: 'Yes, all product prices displayed on Elite Mart are inclusive of applicable GST. There are no hidden taxes added at checkout.' },
    ],
  },
  {
    category: 'Quality & Products',
    icon: '⭐',
    items: [
      { q: 'How does Elite Mart ensure product quality?', a: 'Every product listed on Elite Mart is sourced directly from trusted brands and verified suppliers. We conduct regular quality checks and work only with brands that meet our quality standards.' },
      { q: 'Are the products on Elite Mart genuine and authentic?', a: 'Absolutely. We guarantee 100% genuine products sourced from authorised distributors and directly from brand manufacturers. All products come with proper batch numbers and expiry dates.' },
      { q: 'How do I know if a product is fresh?', a: 'Each product listing displays the shelf life and best-before date information. For perishables like dairy and fresh produce, we maintain strict cold-chain logistics to ensure maximum freshness.' },
      { q: 'What if a product I received is expired or damaged?', a: 'If you receive an expired or damaged product, please raise a complaint within 24 hours of delivery through "My Orders" with photos. We will issue an immediate replacement or full refund.' },
      { q: 'Can I return a product if I don\'t like it?', a: 'Yes, we have a customer-friendly return policy. Most products can be returned within 7 days if they are unopened and in original condition. Perishables have a 24-hour return window.' },
      { q: 'Are all products FSSAI certified?', a: 'Yes, all food products listed on Elite Mart are sourced from FSSAI-licensed manufacturers and comply with Indian food safety regulations. You can find the FSSAI license number on the product packaging.' },
      { q: 'Do you carry organic or natural products?', a: 'Yes! We carry a growing range of organic, natural, and health-focused products. Filter by "Organic" in the relevant category or search for specific organic products on our website.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: '↩️',
    items: [
      { q: 'What is Elite Mart\'s return policy?', a: 'Most non-perishable products can be returned within 7 days of delivery if they are unused, unopened, and in original packaging. Perishable items (dairy, fresh produce) must be reported within 24 hours of delivery.' },
      { q: 'How do I initiate a return?', a: 'Go to "My Orders", select the order and item you want to return, choose the reason, upload a photo if required, and submit. Our team will review and approve within 24–48 hours.' },
      { q: 'How long does a refund take?', a: 'Once a return is approved, refunds are processed within 5–7 working days to your original payment method (UPI, debit/credit card, net banking). Wallet refunds are processed within 24 hours.' },
      { q: 'What items are non-returnable?', a: 'The following items are non-returnable: opened food products, perishables after 24 hours, medicines (unless wrong product delivered), personal hygiene products (razors, intimate care), and items marked "Non-Returnable" on the product page.' },
      { q: 'Will I get a full refund if I return a product?', a: 'Yes, if the return meets our policy criteria, you will receive a 100% refund of the product price. Delivery charges are non-refundable unless the return is due to an error on our part.' },
      { q: 'What if I received a wrong product?', a: 'If you received the wrong product, raise a complaint immediately through "My Orders" with a photo. We will arrange for a replacement delivery and return pick-up at no additional cost to you.' },
      { q: 'Can I exchange a product instead of returning it?', a: 'Yes, product exchanges are available for eligible items. During the return process, select "Exchange" and choose your replacement item. The exchange will be delivered with the next available delivery slot.' },
      { q: 'Is the return pick-up free of charge?', a: 'Yes, all approved returns are picked up from your doorstep at no charge. Our delivery partner will collect the item at a time that\'s convenient for you.' },
    ],
  },
  {
    category: 'Address & Location',
    icon: '📍',
    items: [
      { q: 'How many delivery addresses can I save?', a: 'You can save an unlimited number of delivery addresses in your account. Each address can be labelled as Home, Office, or Others for easy identification.' },
      { q: 'Can I deliver to a different address than my billing address?', a: 'Yes, the delivery address and billing address can be different. You can set your preferred delivery address during checkout, which does not need to match your billing address.' },
      { q: 'How do I edit or delete a saved address?', a: 'Go to "My Account" → "Address Management". Click the edit (pencil) icon to update address details, or click delete to remove an address. You cannot delete an address that is being used in an active order.' },
      { q: 'Can I use my current location for delivery?', a: 'Yes! During checkout or when setting up your delivery location, you can click "Use Current Location" to auto-detect your GPS coordinates. Ensure location permissions are enabled in your browser or app.' },
      { q: 'What if my pincode is not serviceable?', a: 'If your pincode is not currently serviceable, you can enter your email and we will notify you when delivery becomes available in your area. We are expanding to new locations regularly.' },
      { q: 'Can I schedule delivery to my office address during working hours?', a: 'Absolutely! Save your office address and choose a delivery slot that fits your working hours. You can also add a note for the delivery partner (e.g., "Reception, Ground Floor").' },
    ],
  },
  {
    category: 'Payment',
    icon: '💰',
    items: [
      { q: 'What payment methods does Elite Mart accept?', a: 'We accept all major payment methods including UPI (GPay, PhonePe, Paytm, BHIM), debit cards, credit cards, net banking, and EMI options on eligible orders. We also accept Cash on Delivery for eligible pincodes.' },
      { q: 'Is it safe to enter my card details on Elite Mart?', a: 'Yes, Elite Mart uses PCI-DSS compliant payment gateways with 256-bit SSL encryption. Your card details are never stored on our servers and all transactions are fully secure.' },
      { q: 'Can I pay using Cash on Delivery (COD)?', a: 'COD is available in select areas for orders up to ₹5,000. Availability of COD is shown at checkout based on your pincode. Please have the exact change ready when your order arrives.' },
      { q: 'My payment failed but the amount was deducted. What do I do?', a: 'If the amount was deducted but the order was not placed, the amount will be automatically refunded to your account within 3–5 working days. If not received, contact us with your transaction reference number.' },
      { q: 'Can I use multiple payment methods for a single order?', a: 'Currently, each order supports one primary payment method. However, you can use a coupon code or wallet balance in addition to your chosen payment method to reduce the payable amount.' },
      { q: 'Do you offer EMI options?', a: 'Yes, EMI is available on credit cards for orders above ₹3,000. Eligible EMI options (3, 6, 9, 12 months) from partner banks will be displayed at checkout.' },
    ],
  },
  {
    category: 'Orders',
    icon: '📦',
    items: [
      { q: 'How do I place an order on Elite Mart?', a: 'Browse products, add them to your cart, proceed to checkout, confirm your delivery address, choose a delivery slot, and complete payment. You will receive an order confirmation SMS and email immediately.' },
      { q: 'Can I cancel my order after placing it?', a: 'Orders can be cancelled within 30 minutes of placement, before they are confirmed for processing. Go to "My Orders", select the order, and click "Cancel Order". After 30 minutes, cancellation may not be possible.' },
      { q: 'How do I check my order status?', a: 'Go to "My Orders" in your account to see real-time status updates: Order Placed → Confirmed → Being Packed → Out for Delivery → Delivered. You will also receive SMS and email updates at each stage.' },
      { q: 'Can I add items to an existing order?', a: 'Unfortunately, once an order is confirmed, you cannot add items to it. You would need to place a separate new order for the additional items.' },
      { q: 'What happens if an item in my order is out of stock?', a: 'If an item becomes unavailable after you place your order, we will notify you by SMS and email. The item will be removed from your order and a refund for that item will be processed within 3–5 working days.' },
      { q: 'Can I reorder a previous order?', a: 'Yes! Go to "My Orders", find the order you want to repeat, and click "Reorder". All available items from that order will be added to your cart in one click. You can then adjust quantities before checkout.' },
      { q: 'Do I get an invoice for my order?', a: 'Yes, a digital GST invoice is generated for every order and sent to your registered email. You can also download your invoice anytime from the "My Orders" section in your account.' },
    ],
  },
];

// ── Search icon ───────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronDown = ({ open }) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const Faqs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItem, setOpenItem]             = useState(null); // "catIndex-itemIndex"
  const [search, setSearch]                 = useState('');

  const totalQ = FAQ_DATA.reduce((s, c) => s + c.items.length, 0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQ_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      ),
    })).filter(cat =>
      (activeCategory === 'All' || cat.category === activeCategory) && cat.items.length > 0
    );
  }, [search, activeCategory]);

  const toggle = (key) => setOpenItem(prev => prev === key ? null : key);

  return (
    <div className="faq-page">

      {/* ── Hero ── */}
      <div className="faq-hero">
        <div className="container-fluid px-3 px-xl-4">
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-sub">Find answers to common questions about Elite Mart</p>
          <div className="faq-search-wrap">
            <span className="faq-search-icon"><SearchIcon /></span>
            <input
              type="search"
              className="faq-search-input"
              placeholder="Search questions..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCategory('All'); }}
              aria-label="Search FAQs"
            />
          </div>
          <p className="faq-count">{totalQ} questions across {FAQ_DATA.length} categories</p>
        </div>
      </div>

      <div className="container-fluid px-3 px-xl-4">

        {/* ── Category tabs ── */}
        <div className="faq-cats">
          <button
            className={`faq-cat-btn${activeCategory === 'All' ? ' faq-cat-btn--active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            🗂️ All
          </button>
          {FAQ_DATA.map(cat => (
            <button
              key={cat.category}
              className={`faq-cat-btn${activeCategory === cat.category ? ' faq-cat-btn--active' : ''}`}
              onClick={() => { setActiveCategory(cat.category); setSearch(''); setOpenItem(null); }}
            >
              {cat.icon} {cat.category}
            </button>
          ))}
        </div>

        {/* ── FAQ accordion ── */}
        {filtered.length === 0 ? (
          <div className="faq-empty">
            <span>🔍</span>
            <p>No results found for "<strong>{search}</strong>"</p>
            <button className="faq-clear-btn" onClick={() => setSearch('')}>Clear search</button>
          </div>
        ) : (
          <div className="faq-content">
            {filtered.map((cat, ci) => (
              <div key={cat.category} className="faq-category">
                <div className="faq-cat-header">
                  <span className="faq-cat-icon">{cat.icon}</span>
                  <h2 className="faq-cat-title">{cat.category}</h2>
                  <span className="faq-cat-badge">{cat.items.length}</span>
                </div>

                <div className="faq-accordion">
                  {cat.items.map((item, ii) => {
                    const key  = `${ci}-${ii}`;
                    const open = openItem === key;
                    return (
                      <div key={ii} className={`faq-item${open ? ' faq-item--open' : ''}`}>
                        <button
                          className="faq-question"
                          onClick={() => toggle(key)}
                          aria-expanded={open}
                        >
                          <span className="faq-q-num">{ii + 1}</span>
                          <span className="faq-q-text">{item.q}</span>
                          <ChevronDown open={open} />
                        </button>
                        {open && (
                          <div className="faq-answer">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Still need help ── */}
        <div className="faq-contact-banner">
          <div className="faq-contact-content">
            <span className="faq-contact-icon">💬</span>
            <div>
              <h3>Still have questions?</h3>
              <p>Our support team is available Mon–Sat, 9 AM to 7 PM</p>
            </div>
          </div>
          <div className="faq-contact-actions">
            <a href="tel:+917799771189" className="faq-contact-btn faq-contact-btn--call">📞 Call Us</a>
            <a href="mailto:support@eliteagrofoods.com" className="faq-contact-btn">✉️ Email Us</a>
            <Link to="/" className="faq-contact-btn faq-contact-btn--shop">🛒 Shop Now</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Faqs;
