import { Link } from 'react-router-dom';
import '../styles/about.scss';

const CATEGORIES = [
  {
    icon: '🍳',
    title: 'Kitchen Essentials',
    desc: 'From cooking oils, rice, and pulses to spices, sauces, and baking supplies, we have everything to keep your kitchen well-stocked.',
  },
  {
    icon: '🥤',
    title: 'Beverages & Wellness',
    desc: 'Stay refreshed with a selection of teas, coffees, juices, and health drinks, along with vitamins and wellness supplements.',
  },
  {
    icon: '🧴',
    title: 'Personal & Body Care',
    desc: 'Take care of yourself with soaps, shampoos, skincare, oral care, and hygiene products from trusted brands.',
  },
  {
    icon: '🏠',
    title: 'Home Care Essentials',
    desc: 'Keep your home sparkling with detergents, dishwashing liquids, fresheners, and cleaning tools.',
  },
  {
    icon: '🪔',
    title: 'Pooja & Spiritual Needs',
    desc: 'Find everything for your spiritual rituals, including incense sticks, camphor, lamps, and ready-to-use pooja kits.',
  },
  {
    icon: '👶',
    title: 'Baby Care',
    desc: 'Gentle, safe, and reliable products for your little ones, including diapers, baby food, wipes, and more.',
  },
];

const PROMISES = [
  { icon: '✅', text: 'Offer top-quality products at fair prices' },
  { icon: '✅', text: 'Provide a clean, welcoming, and efficient shopping experience' },
  { icon: '✅', text: 'Ensure fast and reliable home delivery' },
  { icon: '✅', text: 'Continuously expand our range based on your needs' },
];

const WAYS = [
  {
    icon: '🏪',
    title: 'Walk-In Store',
    desc: 'Enjoy a well-organized, friendly shopping experience with helpful staff ready to assist you.',
  },
  {
    icon: '🚚',
    title: 'Online Delivery',
    desc: "Can't visit the store? No problem! Place your order online and we'll deliver your essentials right to your doorstep.",
  },
];

const About = () => {
  return (
    <div className="about-page">

      {/* ── Hero banner ── */}
      <section className="about-hero">
        <div className="container-fluid px-3 px-xl-4">
          <p className="about-hero-eyebrow">Elite Agro Foods Presents</p>
          <h1 className="about-hero-title">Welcome to <span>Elite Mart</span></h1>
          <p className="about-hero-sub">Your Trusted Neighborhood Mini-Supermarket!</p>
          <Link to="/" className="about-hero-btn">Shop Now →</Link>
        </div>
      </section>

      <div className="container-fluid px-3 px-xl-4">

        {/* ── Intro ── */}
        <section className="about-section">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-12 col-lg-7">
              <div className="about-text-block">
                <p className="about-lead">
                  At <strong>Elite Mart</strong>, we believe that shopping for daily essentials should be
                  simple, convenient, and enjoyable. Brought to you by <strong>Elite Agro Foods</strong>, a
                  name synonymous with quality and trust, we are your one-stop destination for all
                  household needs. Whether you're stocking up your kitchen, caring for your family, or
                  looking for quick home delivery, Elite Mart is here to make your life easier.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="about-stats-grid">
                {[
                  { value: '40,000+', label: 'Products' },
                  { value: '1,000+',  label: 'Brands' },
                  { value: '10M+',    label: 'Happy Customers' },
                  { value: '300+',    label: 'Cities Served' },
                ].map(s => (
                  <div key={s.label} className="about-stat">
                    <span className="about-stat-value">{s.value}</span>
                    <span className="about-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Convenient shopping ── */}
        <section className="about-section">
          <div className="about-section-head">
            <h2>Your Convenient Shopping Destination</h2>
          </div>
          <p className="about-body-text">
            Gone are the days of running to multiple stores for groceries, home care, or baby products.
            At Elite Mart, we've carefully curated a wide selection of everyday essentials so you can
            find everything you need in one place. Our mini-supermarket is designed for hassle-free
            shopping—whether you prefer to walk in and browse our well-organised aisles or order from
            the comfort of your home through our online delivery service.
          </p>
          <p className="about-body-text">
            We understand that time is precious, which is why we prioritise fast service, affordable
            prices, and a pleasant shopping experience. No long queues, no confusing layouts—just a
            smooth, efficient way to shop for what you need.
          </p>
        </section>

        {/* ── Quality ── */}
        <section className="about-section about-section--accent">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-2 text-center">
              <span className="about-big-icon">🛡️</span>
            </div>
            <div className="col-12 col-md-10">
              <h2 className="about-section-head-inline">Quality You Can Trust</h2>
              <p className="about-body-text mb-0">
                As part of the Elite Agro Foods family, we take pride in offering only the best products
                to our customers. Every item on our shelves is carefully selected to ensure quality,
                freshness, and value for money. Whether it's premium spices for your kitchen, gentle baby
                care products, or trusted home care brands, you can shop with confidence knowing that
                Elite Mart delivers reliability in every purchase.
              </p>
            </div>
          </div>
        </section>

        {/* ── Affordable prices ── */}
        <section className="about-section about-section--accent">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-2 text-center">
              <span className="about-big-icon">💰</span>
            </div>
            <div className="col-12 col-md-10">
              <h2 className="about-section-head-inline">Affordable Prices for Every Home</h2>
              <p className="about-body-text mb-0">
                We know that managing household expenses is important, which is why we keep our prices
                competitive without compromising on quality. From budget-friendly staples to premium
                choices, Elite Mart ensures that you get the best deals on all your daily needs. Plus,
                with regular discounts and offers, you can save even more while shopping smart!
              </p>
            </div>
          </div>
        </section>

        {/* ── Category grid ── */}
        <section className="about-section">
          <div className="about-section-head">
            <h2>A Store Designed for Your Needs</h2>
            <p className="about-section-sub">
              Elite Mart is more than just a supermarket—it's a place where convenience meets variety.
              Our product range is thoughtfully categorised to help you find what you need quickly.
            </p>
          </div>
          <div className="row g-3">
            {CATEGORIES.map(cat => (
              <div key={cat.title} className="col-12 col-sm-6 col-lg-4">
                <div className="about-cat-card">
                  <span className="about-cat-icon">{cat.icon}</span>
                  <div>
                    <h4 className="about-cat-title">{cat.title}</h4>
                    <p className="about-cat-desc">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Shop your way ── */}
        <section className="about-section">
          <div className="about-section-head">
            <h2>Shop Your Way – In-Store or Online!</h2>
            <p className="about-section-sub">
              Whether you're a busy parent, a working professional, or someone who prefers quick and easy
              shopping, Elite Mart adapts to your lifestyle.
            </p>
          </div>
          <div className="row g-3 justify-content-center">
            {WAYS.map(w => (
              <div key={w.title} className="col-12 col-md-5">
                <div className="about-way-card">
                  <span className="about-way-icon">{w.icon}</span>
                  <h4 className="about-way-title">{w.title}</h4>
                  <p className="about-way-desc">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Promise ── */}
        <section className="about-section about-promise-section">
          <div className="about-section-head">
            <h2>Our Promise to You</h2>
            <p className="about-section-sub">
              At Elite Mart, customer satisfaction is at the heart of everything we do. We strive to:
            </p>
          </div>
          <div className="about-promises">
            {PROMISES.map((p, i) => (
              <div key={i} className="about-promise-item">
                <span className="about-promise-icon">{p.icon}</span>
                <span className="about-promise-text">{p.text}</span>
              </div>
            ))}
          </div>
          <div className="about-closing">
            <p>
              Thank you for choosing <strong>Elite Mart</strong> — where <em>smart shopping meets happy living!</em>
              Visit us today and discover the ease of finding all your daily essentials in one place.
            </p>
            <Link to="/" className="about-shop-btn">Start Shopping →</Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
