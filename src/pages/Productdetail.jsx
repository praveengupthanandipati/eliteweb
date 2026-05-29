import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product';
import { showToast } from '../components/Toast';
import '../styles/productdetail.scss';

// Gallery images (4 angles of the same product)
import Img1 from '../assets/products/pro01.png';
import Img2 from '../assets/products/pro02.png';
import Img3 from '../assets/products/pro03.png';
import Img4 from '../assets/products/pro04.png';

// Similar products images
import Pro05 from '../assets/products/pro05.png';
import Pro06 from '../assets/products/pro06.png';
import Pro07 from '../assets/products/pro07.png';
import Pro08 from '../assets/products/pro08.png';
import Pro09 from '../assets/products/pro09.png';
import Pro10 from '../assets/products/pro10.png';

// ── Static test product ───────────────────────────────────────────────────────
const PRODUCT = {
  name:          'Tata Sampann Unpolished Chana Dal',
  category:      'Dal & Pulses',
  categorySlug:  'dal-pulses',
  brand:         'Tata Sampann',
  offerPrice:    60,
  originalPrice: 75,
  discount:      21,
  sku:           'TS-CHANA-500G',
  weights:       ['250g', '500g', '1kg', '2kg'],
  gallery:       [Img1, Img2, Img3, Img4],
  inStock:       true,
  rating:        4.3,
  reviews:       128,
  info: [
    { label: 'Brand',         value: 'Tata Sampann' },
    { label: 'Type',          value: 'Chana Dal (Split Chickpeas)' },
    { label: 'Form',          value: 'Unpolished (Washed)' },
    { label: 'Specialty',     value: 'High Protein, Rich in Fibre' },
    { label: 'Shelf Life',    value: '12 months from date of packaging' },
    { label: 'Country',       value: 'India' },
    { label: 'Allergen Info', value: 'Contains Gluten — may contain traces of tree nuts' },
    { label: 'Storage',       value: 'Store in a cool, dry place. Keep away from moisture.' },
  ],
  description: `Tata Sampann Unpolished Chana Dal is carefully sourced from the finest farms across India. Unlike polished dals, this unpolished variant retains its natural bran layer, preserving essential nutrients, dietary fibre, and proteins. It cooks evenly, has a rich earthy flavour, and is ideal for everyday dals, soups, curries, and snack preparations like pakoras.

Rich in plant-based protein and complex carbohydrates, it helps maintain sustained energy levels. The high fibre content supports digestive health, making it an excellent choice for health-conscious families. Free from artificial colours, preservatives, or added flavours.`,
  disclaimer: `The product images are for representation purposes only. Actual product packaging and appearance may vary. Nutritional values are indicative and may vary with the actual product batch. Please read all product labels and information before use. The product is not intended to diagnose, treat, cure, or prevent any disease. In case of known allergies to legumes, consult your healthcare provider before consumption. Prices are subject to change without prior notice.`,
};

// ── Similar products ──────────────────────────────────────────────────────────
const SIMILAR = [
  { id: 5,  image: Pro05, name: 'Tenali Double Horse Chana Dal',             offerPrice: 63,  originalPrice: 68,  discount: 5,  weights: ['500g','1kg'],        slug: 'tenali-chana-dal',        inStock: true  },
  { id: 6,  image: Pro06, name: 'VSR Chana Dal Premium Quality',             offerPrice: 154, originalPrice: 168, discount: 10, weights: ['1kg','2kg','5kg'],   slug: 'vsr-chana-dal',           inStock: true  },
  { id: 7,  image: Pro07, name: 'India Gate Classic Basmati Rice',           offerPrice: 145, originalPrice: 170, discount: 15, weights: ['1kg','5kg','10kg'],  slug: 'india-gate-basmati',      inStock: true  },
  { id: 8,  image: Pro08, name: 'Fortune Super Basmati Rice',                offerPrice: 420, originalPrice: 499, discount: 16, weights: ['1kg','5kg','10kg'],  slug: 'fortune-super-basmati',   inStock: true  },
  { id: 9,  image: Pro09, name: 'Kohinoor Silver Seal Basmati Rice',         offerPrice: 160, originalPrice: 185, discount: 14, weights: ['1kg','5kg'],         slug: 'kohinoor-silver-seal',    inStock: false },
  { id: 10, image: Pro10, name: 'Double Horse Premium Raw Rice',             offerPrice: 72,  originalPrice: 82,  discount: 12, weights: ['1kg','5kg','10kg'],  slug: 'double-horse-raw-rice',   inStock: true  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevRight = () => (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#f59e0b' : 'none'} aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CartIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const TruckIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 8h4l3 4v5h-7V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const ReturnIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
const Productdetail = () => {
  const [activeImg, setActiveImg]   = useState(0);
  const [selWeight, setSelWeight]   = useState(PRODUCT.weights[1]);
  const [qty, setQty]               = useState(1);
  const [activeTab, setActiveTab]   = useState('info');

  const handleAddToCart = () => {
    showToast(`${PRODUCT.name} (${selWeight} × ${qty}) added to cart!`);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(PRODUCT.rating));

  return (
    <div className="pd-page">
      <div className="container-fluid px-3 px-xl-4">

        {/* ── Breadcrumb ── */}
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="pd-bc-link"><HomeIcon /> Home</Link>
          <ChevRight />
          <Link to={`/category/${PRODUCT.categorySlug}`} className="pd-bc-link">{PRODUCT.category}</Link>
          <ChevRight />
          <span className="pd-bc-current">{PRODUCT.name}</span>
        </nav>

        {/* ── Main detail row ── */}
        <div className="row g-4 g-lg-5 mb-5">

          {/* ═══ a) Gallery ═══ */}
          <div className="col-12 col-lg-5">
            <div className="pd-gallery">

              {/* Main image */}
              <div className="pd-main-wrap">
                {PRODUCT.discount > 0 && (
                  <span className="pd-discount-badge">-{PRODUCT.discount}% OFF</span>
                )}
                <img
                  src={PRODUCT.gallery[activeImg]}
                  alt={PRODUCT.name}
                  className="pd-main-img"
                />
              </div>

              {/* Thumbnails */}
              <div className="pd-thumbs">
                {PRODUCT.gallery.map((img, i) => (
                  <button
                    key={i}
                    className={`pd-thumb${activeImg === i ? ' pd-thumb--active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt={`thumb-${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ b–h) Product Info ═══ */}
          <div className="col-12 col-lg-7">
            <div className="pd-info">

              {/* b) Name & brand */}
              <p className="pd-brand">{PRODUCT.brand}</p>
              <h1 className="pd-name">{PRODUCT.name}</h1>

              {/* Rating */}
              <div className="pd-rating">
                <div className="pd-stars">
                  {stars.map((filled, i) => <StarIcon key={i} filled={filled} />)}
                </div>
                <span className="pd-rating-val">{PRODUCT.rating}</span>
                <span className="pd-reviews">({PRODUCT.reviews} reviews)</span>
              </div>

              <div className="pd-divider" />

              {/* c) d) e) Pricing */}
              <div className="pd-pricing">
                <span className="pd-offer-price">₹{selWeight === '250g' ? Math.round(PRODUCT.offerPrice * 0.6) : selWeight === '1kg' ? PRODUCT.offerPrice * 2 : selWeight === '2kg' ? PRODUCT.offerPrice * 3.8 : PRODUCT.offerPrice}</span>
                <span className="pd-original-price">₹{selWeight === '250g' ? Math.round(PRODUCT.originalPrice * 0.6) : selWeight === '1kg' ? PRODUCT.originalPrice * 2 : selWeight === '2kg' ? PRODUCT.originalPrice * 3.8 : PRODUCT.originalPrice}</span>
                <span className="pd-offer-pill">{PRODUCT.discount}% OFF</span>
              </div>
              <p className="pd-tax-note">Inclusive of all taxes. MRP shown is per unit.</p>

              <div className="pd-divider" />

              {/* f) Weight / Size selector */}
              <div className="pd-section">
                <p className="pd-section-label">Select Weight</p>
                <div className="pd-weights">
                  {PRODUCT.weights.map((w) => (
                    <button
                      key={w}
                      className={`pd-weight-btn${selWeight === w ? ' pd-weight-btn--active' : ''}`}
                      onClick={() => setSelWeight(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* g) Quantity */}
              <div className="pd-section">
                <p className="pd-section-label">Quantity</p>
                <div className="pd-qty">
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                  >−</button>
                  <span className="pd-qty-val">{qty}</span>
                  <button
                    className="pd-qty-btn pd-qty-btn--plus"
                    onClick={() => setQty(q => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    disabled={qty >= 20}
                  >+</button>
                </div>
              </div>

              {/* h) Add to Cart */}
              <div className="pd-cta-wrap">
                <button
                  className="pd-add-btn"
                  onClick={handleAddToCart}
                  disabled={!PRODUCT.inStock}
                >
                  <CartIcon />
                  {PRODUCT.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="pd-wish-btn" aria-label="Add to wishlist">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pd-trust">
                <div className="pd-trust-item">
                  <ShieldIcon />
                  <span>100% Genuine Product</span>
                </div>
                <div className="pd-trust-item">
                  <TruckIcon />
                  <span>Free Delivery on ₹500+</span>
                </div>
                <div className="pd-trust-item">
                  <ReturnIcon />
                  <span>Easy Return Policy</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═══ i) j) Product Info & Disclaimer — Tabs ═══ */}
        <div className="pd-tabs-section mb-5">
          <div className="pd-tabs">
            <button
              className={`pd-tab${activeTab === 'info' ? ' pd-tab--active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Product Information
            </button>
            <button
              className={`pd-tab${activeTab === 'disclaimer' ? ' pd-tab--active' : ''}`}
              onClick={() => setActiveTab('disclaimer')}
            >
              Disclaimer
            </button>
          </div>

          <div className="pd-tab-body">
            {activeTab === 'info' && (
              <div className="pd-info-content">
                <p className="pd-description">{PRODUCT.description}</p>
                <table className="pd-info-table">
                  <tbody>
                    {PRODUCT.info.map((row) => (
                      <tr key={row.label}>
                        <td className="pd-info-key">{row.label}</td>
                        <td className="pd-info-val">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'disclaimer' && (
              <div className="pd-disclaimer-content">
                <p>{PRODUCT.disclaimer}</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══ k) Similar Products ═══ */}
        <div className="pd-similar-section">
          <div className="pd-section-head">
            <h2 className="pd-section-title">Similar Products</h2>
            <div className="pd-section-divider" />
          </div>
          <div className="row g-3">
            {SIMILAR.map((p) => (
              <div key={p.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <ProductCard
                  image={p.image}
                  name={p.name}
                  offerPrice={p.offerPrice}
                  originalPrice={p.originalPrice}
                  discount={p.discount}
                  weights={p.weights}
                  slug={p.slug}
                  inStock={p.inStock}
                  onAddToCart={({ name, offerPrice, weight }) =>
                    showToast(`${name} added to cart!`)
                  }
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Productdetail;
