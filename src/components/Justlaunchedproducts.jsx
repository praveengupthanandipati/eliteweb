import ProductCard from './product';
import '../styles/justlaunchedproducts.scss';

import Pro13 from '../assets/products/pro13.png';
import Pro14 from '../assets/products/pro14.png';
import Pro15 from '../assets/products/pro15.png';
import Pro16 from '../assets/products/pro16.png';
import Pro17 from '../assets/products/pro17.png';
import Pro18 from '../assets/products/pro18.png';
import Pro19 from '../assets/products/pro19.png';
import Pro20 from '../assets/products/pro20.png';
import Pro21 from '../assets/products/pro21.png';
import Pro22 from '../assets/products/pro22.png';
import Pro23 from '../assets/products/pro23.png';
import Pro24 from '../assets/products/pro24.png';

const PRODUCTS = [
  // ── Row 1 · Snacks & Beverages ────────────────────────────────────────────
  {
    id: 1, image: Pro19,
    name: "Lay's Masala Magic Potato Chips",
    offerPrice: 20, originalPrice: 26, discount: 23,
    weights: ['26g', '52g', '104g'],
    slug: 'lays-masala-magic', inStock: true,
  },
  {
    id: 2, image: Pro20,
    name: 'Britannia NutriChoice Digestive Biscuits',
    offerPrice: 55, originalPrice: 65, discount: 15,
    weights: ['200g', '400g', '800g'],
    slug: 'britannia-nutrichoice-digestive', inStock: true,
  },
  {
    id: 3, image: Pro21,
    name: 'Amul Protein Spiced Buttermilk',
    offerPrice: 30, originalPrice: 38, discount: 21,
    weights: ['200ml', '500ml'],
    slug: 'amul-protein-buttermilk', inStock: true,
  },
  {
    id: 4, image: Pro22,
    name: 'Nestle KitKat Chunky Chocolate',
    offerPrice: 49, originalPrice: 60, discount: 18,
    weights: ['40g', '80g'],
    slug: 'nestle-kitkat-chunky', inStock: true,
  },
  {
    id: 5, image: Pro23,
    name: "Haldiram's Aloo Bhujia Sev Namkeen",
    offerPrice: 75, originalPrice: 90, discount: 17,
    weights: ['200g', '400g', '1kg'],
    slug: 'haldirams-aloo-bhujia', inStock: false,
  },
  {
    id: 6, image: Pro24,
    name: 'Horlicks NutriBar Chocolate Fudge',
    offerPrice: 40, originalPrice: 50, discount: 20,
    weights: ['38g', '6-pack'],
    slug: 'horlicks-nutribar-choco', inStock: true,
  },

  // ── Row 2 · Noodles & Personal Care ──────────────────────────────────────
  {
    id: 7, image: Pro13,
    name: 'Maggi 2-Minute Masala Noodles',
    offerPrice: 14, originalPrice: 18, discount: 22,
    weights: ['70g', '280g', '560g'],
    slug: 'maggi-masala-noodles', inStock: true,
  },
  {
    id: 8, image: Pro14,
    name: "Knorr Soupy Noodles Chicken",
    offerPrice: 25, originalPrice: 30, discount: 17,
    weights: ['70g', '3-pack'],
    slug: 'knorr-soupy-noodles-chicken', inStock: true,
  },
  {
    id: 9, image: Pro15,
    name: 'Surf Excel Quick Wash Detergent',
    offerPrice: 120, originalPrice: 145, discount: 17,
    weights: ['500g', '1kg', '3kg'],
    slug: 'surf-excel-quick-wash', inStock: true,
  },
  {
    id: 10, image: Pro16,
    name: 'Dettol Original Liquid Hand Wash',
    offerPrice: 85, originalPrice: 99, discount: 14,
    weights: ['200ml', '500ml', '1L'],
    slug: 'dettol-original-handwash', inStock: true,
  },
  {
    id: 11, image: Pro17,
    name: "Head & Shoulders Anti-Dandruff Shampoo",
    offerPrice: 175, originalPrice: 210, discount: 17,
    weights: ['180ml', '340ml', '650ml'],
    slug: 'head-shoulders-anti-dandruff', inStock: true,
  },
  {
    id: 12, image: Pro18,
    name: 'Colgate MaxFresh Cool Mint Toothpaste',
    offerPrice: 65, originalPrice: 79, discount: 18,
    weights: ['75g', '150g', '300g'],
    slug: 'colgate-maxfresh-mint', inStock: true,
  },
];

const ArrowRight = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Justlaunchedproducts = () => {
  const handleAddToCart = ({ name, offerPrice, weight }) => {
    console.log('Added to cart:', { name, offerPrice, weight });
  };

  return (
    <section className="justlaunched-section">
      <div className="container-fluid px-3 px-xl-4">

        <div className="justlaunched-head">
          <h2 className="justlaunched-title">Just Launched Products</h2>
          <div className="justlaunched-divider" />
        </div>

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

        <div className="justlaunched-footer">
          <a href="/products/new-arrivals" className="justlaunched-viewall">
            View All New Arrivals
            <ArrowRight />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Justlaunchedproducts;
