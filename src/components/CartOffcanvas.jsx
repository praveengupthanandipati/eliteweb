import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cartoffcanvas.scss';

import Pro01 from '../assets/products/pro01.png';
import Pro04 from '../assets/products/pro04.png';
import Pro07 from '../assets/products/pro07.png';
import Pro13 from '../assets/products/pro13.png';
import Pro16 from '../assets/products/pro16.png';

const MIN_ORDER = 500;

const INITIAL_ITEMS = [
  { id: 1, image: Pro01, name: 'Tata Sampann Chana Dal',          weight: '500g', price: 60,  qty: 2 },
  { id: 2, image: Pro04, name: 'Tenali Double Horse Fried Gram',   weight: '500g', price: 68,  qty: 1 },
  { id: 3, image: Pro07, name: 'India Gate Classic Basmati Rice',  weight: '1kg',  price: 145, qty: 1 },
  { id: 4, image: Pro13, name: 'Fortune Sunflower Refined Oil',    weight: '1L',   price: 155, qty: 1 },
  { id: 5, image: Pro16, name: 'Patanjali Pure Cow Ghee',          weight: '500g', price: 399, qty: 1 },
];

const TrashIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CartOffcanvas = ({ isOpen, onClose }) => {
  const [items, setItems] = useState(INITIAL_ITEMS);

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const changeQty = (id, delta) => {
    setItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)
    );
  };

  const removeItem = (id) => setItems(prev => prev.filter(item => item.id !== id));

  const subtotal   = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const belowMin   = subtotal < MIN_ORDER;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Offcanvas panel */}
      <aside className="cart-offcanvas" role="dialog" aria-modal="true" aria-label="Shopping cart">

        {/* ── Header ── */}
        <div className="cart-oc-header">
          <div className="cart-oc-title">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            My Cart
            {totalItems > 0 && (
              <span className="cart-oc-count">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            )}
          </div>
          <button className="cart-oc-close" onClick={onClose} aria-label="Close cart">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Item list ── */}
        <div className="cart-oc-body">
          {items.length === 0 ? (
            <div className="cart-oc-empty">
              <svg width="56" height="56" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Your cart is empty</p>
              <span>Add items to get started</span>
            </div>
          ) : (
            <ul className="cart-oc-list">
              {items.map(item => (
                <li key={item.id} className="cart-oc-item">
                  <img src={item.image} alt={item.name} className="cart-oc-img" />

                  <div className="cart-oc-info">
                    <p className="cart-oc-name">{item.name}</p>
                    <span className="cart-oc-weight">{item.weight}</span>
                    <p className="cart-oc-price">₹{item.price * item.qty}
                      <span className="cart-oc-unit"> (₹{item.price} × {item.qty})</span>
                    </p>
                  </div>

                  <div className="cart-oc-actions">
                    <div className="cart-qty">
                      <button
                        className="cart-qty-btn"
                        onClick={() => changeQty(item.id, -1)}
                        aria-label={`Decrease qty of ${item.name}`}
                      >−</button>
                      <span className="cart-qty-val">{item.qty}</span>
                      <button
                        className="cart-qty-btn cart-qty-btn--plus"
                        onClick={() => changeQty(item.id, +1)}
                        aria-label={`Increase qty of ${item.name}`}
                      >+</button>
                    </div>
                    <button
                      className="cart-remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="cart-oc-footer">

            {/* Minimum order warning */}
            <div className={`cart-min-banner${belowMin ? '' : ' cart-min-banner--met'}`}>
              {belowMin ? (
                <>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Minimum Order Amount <strong>₹{MIN_ORDER}</strong>
                  &nbsp;— Add ₹{MIN_ORDER - subtotal} more
                </>
              ) : (
                <>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Minimum order amount met!
                </>
              )}
            </div>

            {/* Subtotal row */}
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="cart-summary-row cart-summary-row--total">
                <span>Cart Amount</span>
                <strong>₹{subtotal}</strong>
              </div>
            </div>

            {/* CTA */}
            <Link to="/cart" className="cart-oc-cta" onClick={onClose}>
              View Full Cart
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        )}

      </aside>
    </>
  );
};

export default CartOffcanvas;
