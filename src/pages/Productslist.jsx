import { useParams } from 'react-router-dom';
import ProductCard from '../components/product';
import '../styles/productslist.scss';

// ── Product images ────────────────────────────────────────────────────────────
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
import Pro19 from '../assets/products/pro19.png';
import Pro20 from '../assets/products/pro20.png';
import Pro21 from '../assets/products/pro21.png';
import Pro22 from '../assets/products/pro22.png';
import Pro23 from '../assets/products/pro23.png';
import Pro24 from '../assets/products/pro24.png';

// ── Category slug → display name map ─────────────────────────────────────────
const CATEGORY_NAMES = {
  'baby-care':             'Baby Care',
  'cooking-oils':          'Cooking Oils',
  'dairy-beverages':       'Dairy & Beverages',
  'dal-pulses':            'Dal & Pulses',
  'detergent-fabric-care': 'Detergent & Fabric Care',
  'disposable-products':   'Disposable Products',
  'dryfruits-nuts':        'Dryfruits & Nuts',
  'electricals-accessories':'Electricals & Accessories',
  'flours-grains':         'Flours & Grains',
  'ghee-dalda':            'Ghee & Dalda',
  'hair-care':             'Hair Care',
  'health-care-nutritionals':'Health Care & Nutritionals',
  'home-care':             'Home Care',
  'masala-spices':         'Masala & Spices',
  'oral-care':             'Oral Care',
  'packaged-food':         'Packaged Food',
  'pasta-noodles-grains':  'Pasta Noodles & Grains',
  'personal-care':         'Personal Care',
  'pickles-chutneys':      'Pickles & Chutneys',
  'pooja-items':           'Pooja Items',
  'rice-products':         'Rice & Rice Products',
  'salt-sugar-jaggery':    'Salt, Sugar & Jaggery',
  'skin-care':             'Skin Care',
  'snacks-bakery':         'Snacks & Bakery',
  'stationery-general':    'Stationery & General',
};

// ── 36 test products — 6 rows × 6 columns ────────────────────────────────────
const ALL_PRODUCTS = [
  // Row 1 — Dal & Pulses
  { id: 1,  image: Pro01, name: 'Tata Sampann Chana Dal',                    offerPrice: 60,  originalPrice: 75,  discount: 21, weights: ['500g','1kg','2kg'],       slug: 'tata-sampann-chana-dal',       inStock: true  },
  { id: 2,  image: Pro02, name: 'Tata Sampann Organic Unpolished Chana Dal',  offerPrice: 185, originalPrice: 230, discount: 20, weights: ['500g','1kg'],             slug: 'tata-sampann-organic-chana',   inStock: true  },
  { id: 3,  image: Pro03, name: 'DMart Healthy Choice Unpolished Chana Dal',  offerPrice: 107, originalPrice: 139, discount: 10, weights: ['500g','1kg'],             slug: 'dmart-healthy-chana-dal',      inStock: false },
  { id: 4,  image: Pro04, name: 'Tenali Double Horse Premium Fried Gram Dal', offerPrice: 68,  originalPrice: 73,  discount: 12, weights: ['250g','500g','1kg'],      slug: 'tenali-fried-gram-dal',        inStock: true  },
  { id: 5,  image: Pro05, name: 'Tenali Double Horse Chana Dal',              offerPrice: 63,  originalPrice: 68,  discount: 5,  weights: ['500g','1kg'],             slug: 'tenali-chana-dal',             inStock: true  },
  { id: 6,  image: Pro06, name: 'VSR Chana Dal Premium Quality',              offerPrice: 154, originalPrice: 168, discount: 10, weights: ['1kg','2kg','5kg'],        slug: 'vsr-chana-dal',                inStock: true  },

  // Row 2 — Rice & Grains
  { id: 7,  image: Pro07, name: 'India Gate Classic Basmati Rice',            offerPrice: 145, originalPrice: 170, discount: 15, weights: ['1kg','5kg','10kg'],       slug: 'india-gate-classic-basmati',   inStock: true  },
  { id: 8,  image: Pro08, name: 'Fortune Super Basmati Rice',                 offerPrice: 420, originalPrice: 499, discount: 16, weights: ['1kg','5kg','10kg'],       slug: 'fortune-super-basmati',        inStock: true  },
  { id: 9,  image: Pro09, name: 'Kohinoor Silver Seal Basmati Rice',          offerPrice: 160, originalPrice: 185, discount: 14, weights: ['1kg','5kg'],              slug: 'kohinoor-silver-seal',         inStock: false },
  { id: 10, image: Pro10, name: 'Double Horse Premium Raw Rice',              offerPrice: 72,  originalPrice: 82,  discount: 12, weights: ['1kg','5kg','10kg','25kg'],slug: 'double-horse-raw-rice',        inStock: true  },
  { id: 11, image: Pro11, name: 'Sakthi Idly & Dosa Raw Rice',               offerPrice: 310, originalPrice: 360, discount: 14, weights: ['5kg','10kg','25kg'],      slug: 'sakthi-raw-rice',              inStock: true  },
  { id: 12, image: Pro12, name: 'Aashirvaad Select Sharbati Wheat Atta',     offerPrice: 68,  originalPrice: 76,  discount: 11, weights: ['1kg','5kg','10kg'],       slug: 'aashirvaad-select-atta',       inStock: true  },

  // Row 3 — Oils, Ghee & Atta
  { id: 13, image: Pro13, name: 'Fortune Sunflower Refined Oil',              offerPrice: 155, originalPrice: 175, discount: 11, weights: ['500ml','1L','2L','5L'],   slug: 'fortune-sunflower-oil',        inStock: true  },
  { id: 14, image: Pro14, name: 'Gemini Sunflower Refined Cooking Oil',       offerPrice: 148, originalPrice: 165, discount: 10, weights: ['500ml','1L','2L'],        slug: 'gemini-sunflower-oil',         inStock: true  },
  { id: 15, image: Pro15, name: 'Aashirvaad Multigrain Atta',                 offerPrice: 285, originalPrice: 325, discount: 12, weights: ['1kg','5kg','10kg'],       slug: 'aashirvaad-multigrain-atta',   inStock: true  },
  { id: 16, image: Pro16, name: 'Patanjali Pure Cow Ghee',                    offerPrice: 399, originalPrice: 450, discount: 11, weights: ['200g','500g','1kg'],      slug: 'patanjali-cow-ghee',           inStock: true  },
  { id: 17, image: Pro17, name: 'Tata Salt Vacuum Evaporated Iodised',        offerPrice: 22,  originalPrice: 28,  discount: 21, weights: ['1kg','2kg'],              slug: 'tata-salt-vacuum',             inStock: true  },
  { id: 18, image: Pro18, name: 'MDH Chunky Chaat Masala Spice Mix',          offerPrice: 85,  originalPrice: 95,  discount: 11, weights: ['100g','200g','500g'],     slug: 'mdh-chaat-masala',             inStock: false },

  // Row 4 — Snacks & Beverages
  { id: 19, image: Pro19, name: "Lay's Masala Magic Potato Chips",            offerPrice: 20,  originalPrice: 26,  discount: 23, weights: ['26g','52g','104g'],       slug: 'lays-masala-magic',            inStock: true  },
  { id: 20, image: Pro20, name: 'Britannia NutriChoice Digestive Biscuits',   offerPrice: 55,  originalPrice: 65,  discount: 15, weights: ['200g','400g','800g'],     slug: 'britannia-nutrichoice',        inStock: true  },
  { id: 21, image: Pro21, name: 'Amul Protein Spiced Buttermilk',             offerPrice: 30,  originalPrice: 38,  discount: 21, weights: ['200ml','500ml'],          slug: 'amul-protein-buttermilk',      inStock: true  },
  { id: 22, image: Pro22, name: 'Nestle KitKat Chunky Chocolate Bar',         offerPrice: 49,  originalPrice: 60,  discount: 18, weights: ['40g','80g'],              slug: 'nestle-kitkat-chunky',         inStock: true  },
  { id: 23, image: Pro23, name: "Haldiram's Aloo Bhujia Sev Namkeen",         offerPrice: 75,  originalPrice: 90,  discount: 17, weights: ['200g','400g','1kg'],      slug: 'haldirams-aloo-bhujia',        inStock: false },
  { id: 24, image: Pro24, name: 'Horlicks NutriBar Chocolate Fudge',          offerPrice: 40,  originalPrice: 50,  discount: 20, weights: ['38g','6-pack'],           slug: 'horlicks-nutribar',            inStock: true  },

  // Row 5 — Noodles & Personal Care
  { id: 25, image: Pro01, name: 'Maggi 2-Minute Masala Noodles',              offerPrice: 14,  originalPrice: 18,  discount: 22, weights: ['70g','280g','560g'],      slug: 'maggi-masala-noodles',         inStock: true  },
  { id: 26, image: Pro02, name: "Knorr Soupy Noodles Chicken",                offerPrice: 25,  originalPrice: 30,  discount: 17, weights: ['70g','3-pack'],           slug: 'knorr-soupy-noodles',          inStock: true  },
  { id: 27, image: Pro03, name: 'Surf Excel Quick Wash Detergent Powder',     offerPrice: 120, originalPrice: 145, discount: 17, weights: ['500g','1kg','3kg'],       slug: 'surf-excel-quick-wash',        inStock: true  },
  { id: 28, image: Pro04, name: 'Dettol Original Liquid Hand Wash',           offerPrice: 85,  originalPrice: 99,  discount: 14, weights: ['200ml','500ml','1L'],     slug: 'dettol-original-handwash',     inStock: true  },
  { id: 29, image: Pro05, name: "Head & Shoulders Anti-Dandruff Shampoo",     offerPrice: 175, originalPrice: 210, discount: 17, weights: ['180ml','340ml','650ml'],  slug: 'head-shoulders-shampoo',       inStock: true  },
  { id: 30, image: Pro06, name: 'Colgate MaxFresh Cool Mint Toothpaste',      offerPrice: 65,  originalPrice: 79,  discount: 18, weights: ['75g','150g','300g'],      slug: 'colgate-maxfresh-mint',        inStock: true  },

  // Row 6 — Mixed Essentials
  { id: 31, image: Pro07, name: 'Tata Tea Gold Premium Blend',                offerPrice: 118, originalPrice: 140, discount: 16, weights: ['250g','500g','1kg'],      slug: 'tata-tea-gold',                inStock: true  },
  { id: 32, image: Pro08, name: 'Amul Butter Pasteurised',                    offerPrice: 52,  originalPrice: 58,  discount: 10, weights: ['100g','500g'],            slug: 'amul-butter-pasteurised',      inStock: true  },
  { id: 33, image: Pro09, name: "Parle-G Original Glucose Biscuits",          offerPrice: 10,  originalPrice: 12,  discount: 17, weights: ['100g','250g','500g'],     slug: 'parle-g-glucose',              inStock: true  },
  { id: 34, image: Pro10, name: 'Dabur Honey Pure Natural',                   offerPrice: 180, originalPrice: 215, discount: 16, weights: ['250g','500g','1kg'],      slug: 'dabur-honey-pure',             inStock: false },
  { id: 35, image: Pro11, name: 'Lux Strawberry & Cream Beauty Soap',         offerPrice: 38,  originalPrice: 45,  discount: 16, weights: ['75g','125g','3-pack'],    slug: 'lux-strawberry-soap',          inStock: true  },
  { id: 36, image: Pro12, name: 'Nivea Soft Light Moisturising Cream',        offerPrice: 145, originalPrice: 175, discount: 17, weights: ['50ml','100ml','200ml'],   slug: 'nivea-soft-cream',             inStock: true  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const Productslist = () => {
  const { slug } = useParams();
  const categoryName = CATEGORY_NAMES[slug] || 'All Products';
  const totalProducts = ALL_PRODUCTS.length;

  const handleAddToCart = ({ name, offerPrice, weight }) => {
    console.log('Added to cart:', { name, offerPrice, weight });
  };

  return (
    <div className="products-list-page">
      <div className="container-fluid px-3 px-xl-4">

        {/* ── Breadcrumb ── */}
        <nav className="pl-breadcrumb" aria-label="Breadcrumb">
          <a href="/" className="pl-breadcrumb-link">
            <HomeIcon /> Home
          </a>
          <ChevronRight />
          <span className="pl-breadcrumb-current">{categoryName}</span>
        </nav>

        {/* ── Category header ── */}
        <div className="pl-cat-header">
          <div className="pl-cat-title-wrap">
            <h1 className="pl-cat-title">{categoryName}</h1>
            <span className="pl-cat-count">{totalProducts} Products</span>
          </div>
          <div className="pl-sort-wrap">
            <label className="pl-sort-label" htmlFor="pl-sort">Sort by:</label>
            <select id="pl-sort" className="pl-sort-select">
              <option value="default">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        {/* ── Product grid — 6 columns × 6 rows ── */}
        <div className="row g-3">
          {ALL_PRODUCTS.map((product) => (
            <div key={product.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
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

      </div>
    </div>
  );
};

export default Productslist;
