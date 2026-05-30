import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/categories.scss';

import RiceImg       from '../assets/categories/rice.png';
import DalImg        from '../assets/categories/dal.png';
import OilImg        from '../assets/categories/oil.png';
import AttaImg       from '../assets/categories/atta.png';
import DryFruitsImg  from '../assets/categories/dryfruits.png';
import JaggeryImg    from '../assets/categories/jaggery.png';
import TeaImg        from '../assets/categories/tea.png';
import BodyCareImg   from '../assets/categories/bodycare.png';
import DevotionalImg from '../assets/categories/devotional.png';
import BabyCareImg   from '../assets/categories/babycare.png';
import HomeCareImg   from '../assets/categories/homecare.png';

// ── All 25 categories — matches the header CategoryNav exactly ────────────────
const ALL_CATEGORIES = [
  { id: 1,  name: 'Baby Care',                 slug: 'baby-care',              img: BabyCareImg,   emoji: null,  bg: '#fff7ed' },
  { id: 2,  name: 'Cooking Oils',              slug: 'cooking-oils',           img: OilImg,        emoji: null,  bg: '#fefce8' },
  { id: 3,  name: 'Dairy & Beverages',         slug: 'dairy-beverages',        img: TeaImg,        emoji: null,  bg: '#f0fdf4' },
  { id: 4,  name: 'Dal & Pulses',              slug: 'dal-pulses',             img: DalImg,        emoji: null,  bg: '#fffbeb' },
  { id: 5,  name: 'Detergent & Fabric Care',   slug: 'detergent-fabric-care',  img: null,          emoji: '🧺',  bg: '#eff6ff' },
  { id: 6,  name: 'Disposable Products',       slug: 'disposable-products',    img: null,          emoji: '🛍️',  bg: '#f5f3ff' },
  { id: 7,  name: 'Dryfruits & Nuts',          slug: 'dryfruits-nuts',         img: DryFruitsImg,  emoji: null,  bg: '#fff7ed' },
  { id: 8,  name: 'Electricals & Accessories', slug: 'electricals-accessories',img: null,          emoji: '💡',  bg: '#fefce8' },
  { id: 9,  name: 'Flours & Grains',           slug: 'flours-grains',          img: AttaImg,       emoji: null,  bg: '#fef9c3' },
  { id: 10, name: 'Ghee & Dalda',              slug: 'ghee-dalda',             img: null,          emoji: '🧈',  bg: '#fff7ed' },
  { id: 11, name: 'Hair Care',                 slug: 'hair-care',              img: null,          emoji: '💆',  bg: '#fdf4ff' },
  { id: 12, name: 'Health Care & Nutritionals',slug: 'health-care-nutritionals',img: null,         emoji: '💊',  bg: '#ecfdf5' },
  { id: 13, name: 'Home Care',                 slug: 'home-care',              img: HomeCareImg,   emoji: null,  bg: '#eff6ff' },
  { id: 14, name: 'Masala & Spices',           slug: 'masala-spices',          img: null,          emoji: '🌶️',  bg: '#fff1f2' },
  { id: 15, name: 'Oral Care',                 slug: 'oral-care',              img: null,          emoji: '🦷',  bg: '#f0f9ff' },
  { id: 16, name: 'Packaged Food',             slug: 'packaged-food',          img: null,          emoji: '📦',  bg: '#fef3c7' },
  { id: 17, name: 'Pasta Noodles & Grains',    slug: 'pasta-noodles-grains',   img: null,          emoji: '🍜',  bg: '#fff7ed' },
  { id: 18, name: 'Personal Care',             slug: 'personal-care',          img: BodyCareImg,   emoji: null,  bg: '#fdf4ff' },
  { id: 19, name: 'Pickles & Chutneys',        slug: 'pickles-chutneys',       img: null,          emoji: '🫙',  bg: '#ecfdf5' },
  { id: 20, name: 'Pooja Items',               slug: 'pooja-items',            img: DevotionalImg, emoji: null,  bg: '#fef9c3' },
  { id: 21, name: 'Rice & Rice Products',      slug: 'rice-products',          img: RiceImg,       emoji: null,  bg: '#f0fdf4' },
  { id: 22, name: 'Salt, Sugar & Jaggery',     slug: 'salt-sugar-jaggery',     img: JaggeryImg,    emoji: null,  bg: '#fafafa' },
  { id: 23, name: 'Skin Care',                 slug: 'skin-care',              img: null,          emoji: '✨',  bg: '#fdf4ff' },
  { id: 24, name: 'Snacks & Bakery',           slug: 'snacks-bakery',          img: null,          emoji: '🍪',  bg: '#fff7ed' },
  { id: 25, name: 'Stationery & General',      slug: 'stationery-general',     img: null,          emoji: '✏️',  bg: '#f0f9ff' },
];

const STATS = [
  { icon: '🗂️', val: '25',      label: 'Categories' },
  { icon: '📦', val: '10,000+', label: 'Products' },
  { icon: '🏷️', val: '500+',    label: 'Brands' },
  { icon: '🚀', val: 'Daily',   label: 'New Arrivals' },
];

const SearchIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" />
  </svg>
);

const Categories = () => {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? ALL_CATEGORIES.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_CATEGORIES;

  return (
    <div className="cg-page">

      {/* ── Hero ── */}
      <div className="cg-hero">
        <div className="container-fluid px-3 px-xl-4">
          <div className="cg-hero-badge">All Categories</div>
          <h1 className="cg-hero-title">Shop by Category</h1>
          <p className="cg-hero-sub">
            Explore all {ALL_CATEGORIES.length} categories — fresh groceries to household essentials
          </p>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="cg-stats">
        {STATS.map(s => (
          <div key={s.label} className="cg-stat">
            <span className="icon">{s.icon}</span>
            <div>
              <p className="cg-stat-val">{s.val}</p>
              <p className="cg-stat-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="container-fluid px-3 px-xl-4">

        {/* ── Search ── */}
        <div className="cg-search-wrap">
          <span className="cg-search-icon"><SearchIcon /></span>
          <input
            type="search"
            className="cg-search-input"
            placeholder="Search categories…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && (
            <button className="cg-search-clear" onClick={() => setQuery('')} aria-label="Clear">
              <CloseIcon />
            </button>
          )}
        </div>

        {/* ── Grid ── */}
        <div className="cg-grid">
          {filtered.length === 0 && (
            <div className="cg-empty">
              <p>No categories found for "<strong>{query}</strong>".</p>
            </div>
          )}

          {filtered.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="cg-card"
            >
              {/* Icon / image area */}
              <div className="cg-card-icon" style={{ background: cat.bg }}>
                {cat.img
                  ? <img src={cat.img} alt={cat.name} loading="lazy" />
                  : <span className="cg-emoji">{cat.emoji}</span>
                }
              </div>

              {/* Name + arrow */}
              <div className="cg-card-label">
                <p className="cg-card-name">{cat.name}</p>
                <span className="cg-card-arrow"><ArrowIcon /></span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Categories;
