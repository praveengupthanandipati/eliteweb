import { useState, useRef, useEffect } from 'react';
import '../styles/header.scss';
import EliteLogo from '../assets/logo-elite.svg';

// ── Static data ──────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'Rice', 'Dal', 'Wheat Flour', 'Sugar', 'Salt', 'Atta',
  'Milk', 'Butter', 'Cheese', 'Yogurt', 'Paneer', 'Ghee',
  'Tomatoes', 'Onions', 'Potatoes', 'Ginger', 'Garlic', 'Green Chilli',
  'Shampoo', 'Soap', 'Toothpaste', 'Face Wash', 'Detergent', 'Dish Wash',
  'Tea', 'Coffee', 'Juice', 'Biscuits', 'Chips', 'Instant Noodles',
  'Baby Diapers', 'Baby Wipes', 'Baby Oil', 'Baby Powder',
  'Incense Sticks', 'Camphor', 'Coconut Oil', 'Turmeric', 'Agarbatti',
];

const CATEGORIES = [
  { id: 1, name: 'Kitchen Essentials',      emoji: '🍳', slug: 'kitchen-essentials' },
  { id: 2, name: 'Beverages & Wellness',    emoji: '🥤', slug: 'beverages-wellness' },
  { id: 3, name: 'Personal & Body Care',    emoji: '🧴', slug: 'personal-body-care' },
  { id: 4, name: 'Home Care Essentials',    emoji: '🏠', slug: 'home-care-essentials' },
  { id: 5, name: 'Pooja & Spiritual Needs', emoji: '🪔', slug: 'pooja-spiritual' },
  { id: 6, name: 'Baby Care',               emoji: '👶', slug: 'baby-care' },
];

// ── SVG icon components (keep markup clean) ──────────────────────────────────
const SearchIcon  = ({ size = 18 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const ClockIcon = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CartIcon = ({ size = 24 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = ({ size = 24 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = ({ size = 22 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TargetIcon = ({ size = 18 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SignInIcon = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProfileIcon = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddressIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const OrdersIcon = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridIcon = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
const Header = () => {
  const [query, setQuery]           = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [location, setLocation]     = useState('500074 Hyderabad');
  const [locInput, setLocInput]     = useState('');
  const [cartCount]                 = useState(12);

  const searchRef = useRef(null);

  // ── search logic ──────────────────────────────────────────────────────────
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      const filtered = SUGGESTIONS.filter(s =>
        s.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 7);
      setSuggestions(filtered);
      setShowSuggest(true);
    } else {
      setSuggestions([]);
      setShowSuggest(false);
    }
  };

  const handleSuggestClick = (item) => {
    setQuery(item);
    setShowSuggest(false);
  };

  // close suggestions on outside click
  useEffect(() => {
    const onOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  // ── modal helpers ─────────────────────────────────────────────────────────
  const closeModal = () => {
    /* Bootstrap 5 modal via JS bundle */
    const el = document.getElementById('locationModal');
    if (!el) return;
    const modal = window.bootstrap?.Modal?.getInstance(el)
                  || new window.bootstrap.Modal(el);
    modal.hide();
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported.');
    navigator.geolocation.getCurrentPosition(
      () => { setLocation('Current Location'); closeModal(); },
      () => alert('Unable to fetch location. Please enter manually.')
    );
  };

  const handleSaveLocation = () => {
    if (locInput.trim()) {
      setLocation(locInput.trim());
      setLocInput('');
    }
    closeModal();
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 01 — TOP HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <header className="elite-header">
        <div className="container-fluid px-3 px-xl-4">
          <div className="header-inner">

            {/* ── (a) Logo ── */}
            <a href="/" className="header-logo" aria-label="Elite Mart Home">
              <img src={EliteLogo} alt="Elite Mart" className="logo-img" />
            </a>

            {/* ── (b) Search bar ── */}
            <div className="header-search" ref={searchRef}>
              <div className="search-wrapper">
                <span className="search-icon" aria-hidden="true">
                  <SearchIcon size={17} />
                </span>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search your products, Categories, Brands"
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={() => query && setShowSuggest(true)}
                  aria-label="Search products"
                  autoComplete="off"
                />
                {showSuggest && suggestions.length > 0 && (
                  <ul className="search-suggestions" role="listbox">
                    {suggestions.map((item, i) => (
                      <li
                        key={i}
                        role="option"
                        onClick={() => handleSuggestClick(item)}
                      >
                        <span className="suggest-icon"><SearchIcon size={13} /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* ── (c) Location pin ── */}
            <button
              className="header-location"
              data-bs-toggle="modal"
              data-bs-target="#locationModal"
              aria-label="Select delivery location"
            >
              <span className="loc-icon"><PinIcon size={17} /></span>
              <span className="loc-text">{location}</span>
            </button>

            {/* ── (d) Delivery info — hidden below xl ── */}
            <div className="header-delivery d-none d-xl-block">
              <p className="delivery-label">Available Home Delivery</p>
              <p className="delivery-time">
                <span className="clock-icon"><ClockIcon size={13} /></span>
                Today:&nbsp;<span className="time-hi">2.00 PM – 4:00 PM</span>
              </p>
            </div>

            {/* ── Right actions ── */}
            <div className="header-actions">

              {/* Cart */}
              <a href="/cart" className="header-cart" aria-label={`Cart, ${cartCount} items`}>
                <div className="cart-pill">
                  <CartIcon size={22} />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </div>
                <span className="cart-label d-none d-lg-block">CART</span>
              </a>

              {/* Sign In / User dropdown */}
              <div className="dropdown header-user">
                <button
                  className="btn-user dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Account menu"
                >
                  <div className="user-pill"><UserIcon size={22} /></div>
                  <span className="user-label d-none d-lg-block">SIGN IN</span>
                </button>

                <ul className="dropdown-menu user-menu">
                  <li>
                    <a className="dropdown-item menu-item" href="/signin">
                      <span className="mi-icon"><SignInIcon /></span>
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item menu-item" href="/profile">
                      <span className="mi-icon"><ProfileIcon /></span>
                      Profile Management
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item menu-item" href="/addresses">
                      <span className="mi-icon"><AddressIcon /></span>
                      Address Management
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item menu-item" href="/orders">
                      <span className="mi-icon"><OrdersIcon /></span>
                      My Orders
                    </a>
                  </li>
                  <li><hr className="dropdown-divider menu-divider" /></li>
                  <li>
                    <a className="dropdown-item menu-item danger" href="/logout">
                      <span className="mi-icon"><LogoutIcon /></span>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>

              {/* Mobile hamburger */}
              <button
                className="btn-hamburger d-lg-none"
                type="button"
                aria-label="Open navigation"
              >
                <MenuIcon size={20} />
              </button>
            </div>{/* /header-actions */}

          </div>{/* /header-inner */}
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 02 — CATEGORY NAV
      ══════════════════════════════════════════════════════════════════════ */}
      <nav className="elite-category-nav" aria-label="Popular categories">
        <div className="container-fluid px-3 px-xl-4">
          <div className="category-inner">

            {/* Label */}
            <span className="cat-heading d-none d-md-flex">
              <GridIcon size={14} />
              Popular Categories
            </span>

            {/* Links */}
            <ul className="cat-list" role="list">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <a
                    href={`/category/${cat.slug}`}
                    className="cat-link"
                    aria-label={cat.name}
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          LOCATION MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="modal fade location-modal"
        id="locationModal"
        tabIndex="-1"
        aria-labelledby="locationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="locationModalLabel">
                <PinIcon size={20} />
                Select Delivery Location
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              {/* Use current location */}
              <button
                type="button"
                className="btn-use-location"
                onClick={handleUseCurrentLocation}
              >
                <TargetIcon size={18} />
                Use Current Location
              </button>

              {/* Divider */}
              <div className="or-divider">or enter manually</div>

              {/* Manual input */}
              <label className="form-label form-label-custom" htmlFor="locInput">
                Enter Your Pincode / Location to Deliver
              </label>
              <div className="input-group loc-input-group">
                <span className="input-group-text">
                  <PinIcon size={16} />
                </span>
                <input
                  id="locInput"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 500074 or Hyderabad"
                  value={locInput}
                  onChange={e => setLocInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSaveLocation()}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary btn-cancel"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-save"
                onClick={handleSaveLocation}
              >
                Save Location
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
