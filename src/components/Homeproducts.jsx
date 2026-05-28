import ProductCard from './product';
import '../styles/homeproducts.scss';

// ── Product image imports (pro01 – pro18 for 3 rows × 6) ─────────────────────
import Pro01 from '../assets/products/pro01.png';
import Pro02 from '../assets/products/pro02.png';
import Pro03 from '../assets/products/pro03.png';
import Pro04 from '../assets/products/pro04.png';
import Pro05 from '../assets/products/pro05.png';
import Pro06 from '../assets/products/pro06.png';
import Pro07 from '../assets/products/pro07.png';
import Pro08 from '../assets/products/pro08.png';
import Pro09 from '../assets/products/pro09.png';
import Pro10 from '../assets/products/pro10.png';
import Pro11 from '../assets/products/pro11.png';
import Pro12 from '../assets/products/pro12.png';
import Pro13 from '../assets/products/pro13.png';
import Pro14 from '../assets/products/pro14.png';
import Pro15 from '../assets/products/pro15.png';
import Pro16 from '../assets/products/pro16.png';
import Pro17 from '../assets/products/pro17.png';
import Pro18 from '../assets/products/pro18.png';

// ── Product data — 18 items (3 rows × 6 columns) ─────────────────────────────
const PRODUCTS = [
  // ── Row 1 · Dal & Pulses ──────────────────────────────────────────────────
  {
    id: 1, image: Pro01,
    name: 'Tata Sampann Chana Dal',
    offerPrice: 60, originalPrice: 75, discount: 21,
    weights: ['500g', '1kg', '2kg'],
    slug: 'tata-sampann-chana-dal', inStock: true,
  },
  {
    id: 2, image: Pro02,
    name: 'Tata Sampann Organic Unpolished Chana Dal',
    offerPrice: 185, originalPrice: 230, discount: 21,
    weights: ['500g', '1kg'],
    slug: 'tata-sampann-organic-chana-dal', inStock: true,
  },
  {
    id: 3, image: Pro03,
    name: 'DMart Healthy Choice Unpolished Chana Dal',
    offerPrice: 107, originalPrice: 139, discount: 10,
    weights: ['500g', '1kg'],
    slug: 'dmart-healthy-chana-dal', inStock: false,
  },
  {
    id: 4, image: Pro04,
    name: 'Tenali Double Horse Premium Fried Gram Dal',
    offerPrice: 68, originalPrice: 73, discount: 12,
    weights: ['250g', '500g', '1kg'],
    slug: 'tenali-double-horse-fried-gram', inStock: true,
  },
  {
    id: 5, image: Pro05,
    name: 'Tenali Double Horse Chana Dal',
    offerPrice: 63, originalPrice: 68, discount: 5,
    weights: ['500g', '1kg'],
    slug: 'tenali-double-horse-chana-dal', inStock: true,
  },
  {
    id: 6, image: Pro06,
    name: 'VSR Chana Dal Premium Quality',
    offerPrice: 154, originalPrice: 168, discount: 10,
    weights: ['1kg', '2kg', '5kg'],
    slug: 'vsr-chana-dal', inStock: true,
  },

  // ── Row 2 · Rice & Grains ─────────────────────────────────────────────────
  {
    id: 7, image: Pro07,
    name: 'India Gate Classic Basmati Rice',
    offerPrice: 145, originalPrice: 170, discount: 15,
    weights: ['1kg', '5kg', '10kg'],
    slug: 'india-gate-classic-basmati', inStock: true,
  },
  {
    id: 8, image: Pro08,
    name: 'Fortune Super Basmati Rice',
    offerPrice: 420, originalPrice: 499, discount: 16,
    weights: ['1kg', '5kg', '10kg'],
    slug: 'fortune-super-basmati', inStock: true,
  },
  {
    id: 9, image: Pro09,
    name: 'Kohinoor Silver Seal Basmati Rice',
    offerPrice: 160, originalPrice: 185, discount: 14,
    weights: ['1kg', '5kg'],
    slug: 'kohinoor-silver-seal-basmati', inStock: false,
  },
  {
    id: 10, image: Pro10,
    name: 'Double Horse Premium Raw Rice',
    offerPrice: 72, originalPrice: 82, discount: 12,
    weights: ['1kg', '5kg', '10kg', '25kg'],
    slug: 'double-horse-raw-rice', inStock: true,
  },
  {
    id: 11, image: Pro11,
    name: 'Sakthi Idly & Dosa Raw Rice',
    offerPrice: 310, originalPrice: 360, discount: 14,
    weights: ['5kg', '10kg', '25kg'],
    slug: 'sakthi-raw-rice', inStock: true,
  },
  {
    id: 12, image: Pro12,
    name: 'Aashirvaad Select Sharbati Wheat Atta',
    offerPrice: 68, originalPrice: 76, discount: 11,
    weights: ['1kg', '5kg', '10kg'],
    slug: 'aashirvaad-select-atta', inStock: true,
  },

  // ── Row 3 · Oils, Ghee & Atta ─────────────────────────────────────────────
  {
    id: 13, image: Pro13,
    name: 'Fortune Sunflower Refined Oil',
    offerPrice: 155, originalPrice: 175, discount: 11,
    weights: ['500ml', '1L', '2L', '5L'],
    slug: 'fortune-sunflower-oil', inStock: true,
  },
  {
    id: 14, image: Pro14,
    name: 'Gemini Sunflower Refined Cooking Oil',
    offerPrice: 148, originalPrice: 165, discount: 10,
    weights: ['500ml', '1L', '2L'],
    slug: 'gemini-sunflower-oil', inStock: true,
  },
  {
    id: 15, image: Pro15,
    name: 'Aashirvaad Multigrain Atta',
    offerPrice: 285, originalPrice: 325, discount: 12,
    weights: ['1kg', '5kg', '10kg'],
    slug: 'aashirvaad-multigrain-atta', inStock: true,
  },
  {
    id: 16, image: Pro16,
    name: 'Patanjali Pure Cow Ghee',
    offerPrice: 399, originalPrice: 450, discount: 11,
    weights: ['200g', '500g', '1kg'],
    slug: 'patanjali-cow-ghee', inStock: true,
  },
  {
    id: 17, image: Pro17,
    name: 'Tata Salt Vacuum Evaporated Iodised',
    offerPrice: 22, originalPrice: 28, discount: 21,
    weights: ['1kg', '2kg'],
    slug: 'tata-salt-vacuum', inStock: true,
  },
  {
    id: 18, image: Pro18,
    name: 'MDH Chunky Chaat Masala Spice Mix',
    offerPrice: 85, originalPrice: 95, discount: 11,
    weights: ['100g', '200g', '500g'],
    slug: 'mdh-chaat-masala', inStock: false,
  },
];

// ── Arrow icon ────────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
const Homeproducts = () => {
  const handleAddToCart = ({ name, offerPrice, weight }) => {
    // cart logic will connect here — console for now
    console.log('Added to cart:', { name, offerPrice, weight });
  };

  return (
    <section className="homeproducts-section">
      <div className="container-fluid px-3 px-xl-4">

        {/* ── Section title ── */}
        <div className="homeproducts-head">
          <h2 className="homeproducts-title">Popular Offer Products</h2>
          <div className="homeproducts-divider" />
        </div>

        {/* ── Product grid — 6 columns × 3 rows ── */}
        <div className="row g-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <ProductCard
                image={product.image}
                name={product.name}
                offerPrice={product.offerPrice}
                originalPrice={product.originalPrice}
                discount={product.discount}
                weights={product.weights}
                slug={product.slug}
                inStock={product.inStock}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>

        {/* ── View all ── */}
        <div className="homeproducts-footer">
          <a href="/products/offers" className="homeproducts-viewall">
            View All Products
            <ArrowRight />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Homeproducts;
