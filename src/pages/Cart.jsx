import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/cart.scss';

import Pro01 from '../assets/products/pro01.png';
import Pro04 from '../assets/products/pro04.png';
import Pro07 from '../assets/products/pro07.png';
import Pro13 from '../assets/products/pro13.png';
import Pro16 from '../assets/products/pro16.png';
import Pro18 from '../assets/products/pro18.png';

const MIN_ORDER    = 500;
const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 500;

const INITIAL_CART = [
  { id: 1, image: Pro01, name: 'Tata Sampann Chana Dal',              weight: '500g', price: 60,  qty: 2, slug: 'tata-sampann-chana-dal' },
  { id: 2, image: Pro04, name: 'Tenali Double Horse Fried Gram Dal',   weight: '500g', price: 68,  qty: 1, slug: 'tenali-fried-gram-dal' },
  { id: 3, image: Pro07, name: 'India Gate Classic Basmati Rice',      weight: '1kg',  price: 145, qty: 1, slug: 'india-gate-classic-basmati' },
  { id: 4, image: Pro13, name: 'Fortune Sunflower Refined Oil',        weight: '1L',   price: 155, qty: 1, slug: 'fortune-sunflower-oil' },
  { id: 5, image: Pro16, name: 'Patanjali Pure Cow Ghee',              weight: '500g', price: 399, qty: 1, slug: 'patanjali-cow-ghee' },
  { id: 6, image: Pro18, name: 'MDH Chunky Chaat Masala Spice Mix',    weight: '100g', price: 85,  qty: 2, slug: 'mdh-chaat-masala' },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
const TrashIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const TagIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const TruckIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 8h4l3 4v5h-7V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevRight = () => (
  <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const LockIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Cart Page ─────────────────────────────────────────────────────────────────
const Cart = () => {
  const [items, setItems]       = useState(INITIAL_CART);
  const [coupon, setCoupon]     = useState('');
  const [couponMsg, setCouponMsg] = useState(null); // { type: 'success'|'error', text }
  const [discount, setDiscount] = useState(0);

  const changeQty = (id, delta) => {
    setItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const navigate     = useNavigate();
  const subtotal     = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems   = items.reduce((s, i) => s + i.qty, 0);
  const delivery     = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const gst          = Math.round(subtotal * 0.05);
  const grandTotal   = subtotal + delivery + gst - discount;
  const savings      = items.reduce((s, i) => s + (i.price * 0.15) * i.qty, 0); // mock 15% saving
  const belowMin     = subtotal < MIN_ORDER;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'ELITE10') {
      const amt = Math.round(subtotal * 0.1);
      setDiscount(amt);
      setCouponMsg({ type: 'success', text: `Coupon applied! You saved ₹${amt}.` });
    } else if (coupon.trim() === '') {
      setCouponMsg({ type: 'error', text: 'Please enter a coupon code.' });
    } else {
      setDiscount(0);
      setCouponMsg({ type: 'error', text: 'Invalid coupon code. Try ELITE10.' });
    }
  };

  const removeCoupon = () => { setDiscount(0); setCoupon(''); setCouponMsg(null); };

  return (
    <div className="cart-page">
      <div className="container-fluid px-3 px-xl-4">

        {/* ── Breadcrumb ── */}
        <nav className="cart-breadcrumb">
          <Link to="/" className="cart-bc-link"><HomeIcon /> Home</Link>
          <ChevRight />
          <span className="cart-bc-cur">Shopping Cart</span>
        </nav>

        <h1 className="cart-page-title">
          Shopping Cart
          <span className="cart-page-count">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </h1>

        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="cart-empty">
            <svg width="80" height="80" fill="none" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/" className="cart-empty-btn">Continue Shopping</Link>
          </div>
        ) : (
          <div className="row g-4 align-items-start">

            {/* ══════════════════════════════════════════
                LEFT — Cart Items
            ══════════════════════════════════════════ */}
            <div className="col-12 col-lg-8">

              {/* Min order banner */}
              {belowMin && (
                <div className="cart-min-alert">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Minimum order amount is <strong>₹{MIN_ORDER}</strong>.
                  Add <strong>₹{MIN_ORDER - subtotal}</strong> more to proceed.
                </div>
              )}

              {/* Item list */}
              <div className="cart-items-card">
                <div className="cart-items-header">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Qty</span>
                  <span>Total</span>
                  <span></span>
                </div>

                {items.map((item, idx) => (
                  <div key={item.id} className={`cart-row${idx < items.length - 1 ? ' cart-row--border' : ''}`}>

                    {/* Image + Name */}
                    <div className="cart-row-product">
                      <Link to={`/product/${item.slug}`} className="cart-row-imglink">
                        <img src={item.image} alt={item.name} className="cart-row-img" />
                      </Link>
                      <div className="cart-row-info">
                        <Link to={`/product/${item.slug}`} className="cart-row-name">{item.name}</Link>
                        <span className="cart-row-weight">{item.weight}</span>
                      </div>
                    </div>

                    {/* Unit price */}
                    <div className="cart-row-price">₹{item.price}</div>

                    {/* Qty stepper */}
                    <div className="cart-row-qty">
                      <div className="cqty">
                        <button className="cqty-btn" onClick={() => changeQty(item.id, -1)} aria-label="Decrease">−</button>
                        <span className="cqty-val">{item.qty}</span>
                        <button className="cqty-btn cqty-btn--plus" onClick={() => changeQty(item.id, +1)} aria-label="Increase">+</button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="cart-row-total">₹{item.price * item.qty}</div>

                    {/* Remove */}
                    <button className="cart-row-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon code */}
              <div className="cart-coupon-card">
                <div className="cart-coupon-head">
                  <TagIcon />
                  <span>Apply Coupon Code</span>
                </div>
                <div className="cart-coupon-row">
                  <input
                    type="text"
                    className={`cart-coupon-input${couponMsg?.type === 'error' ? ' cart-coupon-input--error' : ''}`}
                    placeholder="Enter coupon code (try ELITE10)"
                    value={coupon}
                    onChange={e => { setCoupon(e.target.value); setCouponMsg(null); }}
                    onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                    disabled={discount > 0}
                  />
                  {discount > 0 ? (
                    <button className="cart-coupon-btn cart-coupon-btn--remove" onClick={removeCoupon}>Remove</button>
                  ) : (
                    <button className="cart-coupon-btn" onClick={applyCoupon}>Apply</button>
                  )}
                </div>
                {couponMsg && (
                  <p className={`cart-coupon-msg cart-coupon-msg--${couponMsg.type}`}>{couponMsg.text}</p>
                )}
              </div>

              {/* Continue shopping */}
              <Link to="/" className="cart-continue-link">
                ← Continue Shopping
              </Link>
            </div>

            {/* ══════════════════════════════════════════
                RIGHT — Order Summary
            ══════════════════════════════════════════ */}
            <div className="col-12 col-lg-4">
              <div className="cart-summary-card">
                <h2 className="cart-summary-title">Order Summary</h2>

                <div className="cart-summary-rows">
                  <div className="cart-sr">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="cart-sr">
                    <span>Delivery Charges</span>
                    <span className={delivery === 0 ? 'cart-sr-free' : ''}>
                      {delivery === 0 ? 'FREE' : `₹${delivery}`}
                    </span>
                  </div>
                  {delivery === 0 && (
                    <p className="cart-free-del-note">🎉 You qualify for free delivery!</p>
                  )}
                  {delivery > 0 && (
                    <p className="cart-free-del-note cart-free-del-note--warn">
                      Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery
                    </p>
                  )}
                  <div className="cart-sr">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  {discount > 0 && (
                    <div className="cart-sr cart-sr--discount">
                      <span>Coupon Discount</span>
                      <span>−₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-sr cart-sr--total">
                  <span>Grand Total</span>
                  <strong>₹{grandTotal}</strong>
                </div>

                {savings > 0 && (
                  <div className="cart-savings">
                    You are saving <strong>₹{Math.round(savings)}</strong> on this order!
                  </div>
                )}

                <button
                  className={`cart-checkout-btn${belowMin ? ' cart-checkout-btn--disabled' : ''}`}
                  disabled={belowMin}
                  title={belowMin ? `Minimum order ₹${MIN_ORDER} required` : undefined}
                  onClick={() => !belowMin && navigate('/checkout')}
                >
                  <LockIcon />
                  Proceed to Checkout
                </button>

                {belowMin && (
                  <p className="cart-checkout-note">
                    Minimum order amount ₹{MIN_ORDER} required to checkout.
                  </p>
                )}

                {/* Trust strip */}
                <div className="cart-trust">
                  <div className="cart-trust-item">
                    <ShieldIcon />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="cart-trust-item">
                    <TruckIcon />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
