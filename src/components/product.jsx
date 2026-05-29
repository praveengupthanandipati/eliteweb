import { useState } from 'react';
import '../styles/product.scss';
import { showToast } from './Toast';

// ── Cart icon ─────────────────────────────────────────────────────────────────
const CartIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── ProductCard ───────────────────────────────────────────────────────────────
const ProductCard = ({
  image,
  name,
  offerPrice,
  originalPrice,
  discount     = 0,
  weights      = ['500g', '1kg'],
  slug         = '#',
  inStock      = true,
  onAddToCart,
}) => {
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [qty, setQty] = useState(0);

  const handleAdd = () => {
    if (!inStock) return;
    setQty(1);
    onAddToCart?.({ name, offerPrice, weight: selectedWeight });
    showToast('Product Added to Cart Successfully');
  };

  const increase = () => {
    setQty(q => q + 1);
    onAddToCart?.({ name, offerPrice, weight: selectedWeight });
  };

  const decrease = () => {
    setQty(q => {
      if (q <= 1) { return 0; }
      return q - 1;
    });
  };

  return (
    <div className={`product-card${!inStock ? ' product-card--oos' : ''}`}>

      {/* ── Image area ── */}
      <a href={`/product/${slug}`} className="product-img-wrap" tabIndex={-1}>
        {discount > 0 && (
          <span className="product-discount">-{discount}%</span>
        )}
        <img
          src={image}
          alt={name}
          className="product-img"
          loading="lazy"
        />
        {!inStock && (
          <div className="product-oos-badge">Out of Stock</div>
        )}
      </a>

      {/* ── Body ── */}
      <div className="product-body">
        <a href={`/product/${slug}`} className="product-name" title={name}>
          {name}
        </a>

        {/* Prices */}
        <div className="product-prices">
          <span className="product-offer">₹{offerPrice}</span>
          <span className="product-mrp">₹{originalPrice}</span>
        </div>

        {/* Actions */}
        <div className="product-actions">
          <select
            className="product-weight-select"
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            disabled={!inStock}
            aria-label="Select weight"
          >
            {weights.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>

          {qty > 0 ? (
            <div className="product-stepper" aria-label={`${qty} in cart`}>
              <button className="product-stepper-btn" onClick={decrease} aria-label="Decrease">−</button>
              <span className="product-stepper-qty">{qty}</span>
              <button className="product-stepper-btn product-stepper-btn--plus" onClick={increase} aria-label="Increase">+</button>
            </div>
          ) : (
            <button
              className="product-add-btn"
              disabled={!inStock}
              onClick={handleAdd}
              aria-label={inStock ? `Add ${name} to cart` : 'Out of stock'}
            >
              <CartIcon />
              <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
