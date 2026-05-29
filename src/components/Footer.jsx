import { Link } from 'react-router-dom';
import '../styles/footer.scss';
import Logo from '../assets/logo-elite.svg';
import AppStoreImg from '../assets/appstore.png';
import GooglePlayImg from '../assets/googleplayicon.png';

const CATEGORIES = [
  { label: 'Rice & Grains',    to: '/category/rice' },
  { label: 'Dal & Pulses',     to: '/category/dal' },
  { label: 'Oils & Ghee',      to: '/category/oil' },
  { label: 'Atta & Flour',     to: '/category/atta' },
  { label: 'Dry Fruits & Nuts',to: '/category/dryfruits' },
  { label: 'Jaggery & Honey',  to: '/category/jaggery' },
  { label: 'Tea & Coffee',     to: '/category/tea' },
  { label: 'Body Care',        to: '/category/bodycare' },
  { label: 'Devotional',       to: '/category/devotional' },
  { label: 'Baby Care',        to: '/category/babycare' },
  { label: 'Home Care',        to: '/category/homecare' },
];

const COMPANY_LINKS = [
  { label: "FAQ's",                  to: '/faqs' },
  { label: 'Privacy Policy',         to: '/privacy' },
  { label: 'Pricing',                to: '/pricing' },
  { label: 'Delivery',               to: '/delivery' },
  { label: 'Return & Refund Policy', to: '/returns' },
  { label: 'Terms & Conditions',     to: '/terms' },
  { label: 'Disclaimer',             to: '/disclaimer' },
  { label: 'Contact Us',             to: '/contact' },
  { label: 'About Us',               to: '/about' },
  { label: 'Pickup Points',          to: '/pickup-points' },
];

const FacebookIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.54 6.42A2.78 2.78 0 0020.59 4.4C18.88 4 12 4 12 4s-6.88 0-8.59.4A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-2.02A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  return (
    <footer className="site-footer">

      {/* ── Main grid ── */}
      <div className="footer-main">
        <div className="container-fluid px-3 px-xl-4">
          <div className="row g-4 g-lg-5">

            {/* ── Col 1: Brand ── */}
            <div className="col-12 col-sm-6 col-lg-3">
              <Link to="/" className="footer-logo">
                <img src={Logo} alt="Elite Mart" />
              </Link>
              <p className="footer-brand-desc">
                India's trusted online grocery store delivering 40,000+ fresh products from
                1,000+ brands straight to your doorstep across 300+ cities.
              </p>
              <div className="footer-socials">
                <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="footer-social" aria-label="Facebook">  <FacebookIcon />  </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="Instagram"> <InstagramIcon /> </a>
                <a href="https://youtube.com"   target="_blank" rel="noreferrer" className="footer-social" aria-label="YouTube">   <YoutubeIcon />   </a>
                <a href="https://twitter.com"   target="_blank" rel="noreferrer" className="footer-social" aria-label="Twitter">   <TwitterIcon />   </a>
              </div>
            </div>

            {/* ── Col 2: Categories ── */}
            <div className="col-12 col-sm-6 col-lg-3">
              <h4 className="footer-heading">Categories</h4>
              <ul className="footer-links">
                {CATEGORIES.map((c) => (
                  <li key={c.to}>
                    <Link to={c.to} className="footer-link">
                      <ArrowRight /> {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Company ── */}
            <div className="col-12 col-sm-6 col-lg-3">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="footer-link">
                      <ArrowRight /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Download App ── */}
            <div className="col-12 col-sm-6 col-lg-3">
              <h4 className="footer-heading">Download Our App</h4>
              <p className="footer-app-desc">
                Shop smarter with the Elite Mart app. Exclusive deals, lightning-fast delivery &amp;
                real-time order tracking — right in your pocket.
              </p>
              <div className="footer-app-badges">
                <a
                  href="https://play.google.com/store"
                  target="_blank" rel="noreferrer"
                  className="footer-app-btn"
                  aria-label="Get it on Google Play"
                >
                  <img src={GooglePlayImg} alt="Google Play" />
                </a>
                <a
                  href="https://www.apple.com/in/app-store/"
                  target="_blank" rel="noreferrer"
                  className="footer-app-btn"
                  aria-label="Download on the App Store"
                >
                  <img src={AppStoreImg} alt="App Store" />
                </a>
              </div>

              <div className="footer-contact-block">
                <p className="footer-contact-item">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012.77 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +91 77 9977 1189
                </p>
                <p className="footer-contact-item">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  support@eliteagrofoods.com
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="container-fluid px-3 px-xl-4">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Elite Agro Foods | All rights reserved.
            </p>
<p className="footer-made">
              Designed &amp; Developed by <Link to="https://www.corewebpro.in" className='text-white' target="_blank">Core Web Pro</Link>
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
