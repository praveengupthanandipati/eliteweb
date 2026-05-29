import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

const ALL_CATEGORIES = [
  { id: 1,  name: 'Baby Care',                  slug: 'baby-care' },
  { id: 2,  name: 'Cooking Oils',                slug: 'cooking-oils' },
  { id: 3,  name: 'Dairy & Beverages',           slug: 'dairy-beverages' },
  { id: 4,  name: 'Dal & Pulses',                slug: 'dal-pulses' },
  { id: 5,  name: 'Detergent & Fabric Care',     slug: 'detergent-fabric-care' },
  { id: 6,  name: 'Disposable Products',         slug: 'disposable-products' },
  { id: 7,  name: 'Dryfruits & Nuts',            slug: 'dryfruits-nuts' },
  { id: 8,  name: 'Electricals & Accessories',   slug: 'electricals-accessories' },
  { id: 9,  name: 'Flours & Grains',             slug: 'flours-grains' },
  { id: 10, name: 'Ghee & Dalda',                slug: 'ghee-dalda' },
  { id: 11, name: 'Hair Care',                   slug: 'hair-care' },
  { id: 12, name: 'Health Care & Nutritionals',  slug: 'health-care-nutritionals' },
  { id: 13, name: 'Home Care',                   slug: 'home-care' },
  { id: 14, name: 'Masala & Spices',             slug: 'masala-spices' },
  { id: 15, name: 'Oral Care',                   slug: 'oral-care' },
  { id: 16, name: 'Packaged Food',               slug: 'packaged-food' },
  { id: 17, name: 'Pasta Noodles & Grains',      slug: 'pasta-noodles-grains' },
  { id: 18, name: 'Personal Care',               slug: 'personal-care' },
  { id: 19, name: 'Pickles & Chutneys',          slug: 'pickles-chutneys' },
  { id: 20, name: 'Pooja Items',                 slug: 'pooja-items' },
  { id: 21, name: 'Rice & Rice Products',        slug: 'rice-products' },
  { id: 22, name: 'Salt, Sugar & Jaggery',       slug: 'salt-sugar-jaggery' },
  { id: 23, name: 'Skin Care',                   slug: 'skin-care' },
  { id: 24, name: 'Snacks & Bakery',             slug: 'snacks-bakery' },
  { id: 25, name: 'Stationery & General',        slug: 'stationery-general' },
];

const GridIcon = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3"  y="3"  width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3"  width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="3"  y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ChevronDown = ({ size = 12, up = false }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" aria-hidden="true"
    style={{ transform: up ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CategoryNav = () => {
  const [visibleCount, setVisibleCount] = useState(ALL_CATEGORIES.length);
  const [moreOpen, setMoreOpen]         = useState(false);

  const wrapRef  = useRef(null); // flex: 1 container — drives the calculation
  const ghostRef = useRef(null); // hidden measurement list
  const moreRef  = useRef(null); // "More Categories" wrapper

  // ── Recalculate how many items fit ─────────────────────────────────────────
  const recalculate = useCallback(() => {
    const wrap  = wrapRef.current;
    const ghost = ghostRef.current;
    const more  = moreRef.current;
    if (!wrap || !ghost) return;

    const containerW = wrap.offsetWidth;
    const moreW      = (more?.offsetWidth ?? 145) + 8; // gap between last item and More btn
    const items      = [...ghost.children];
    const GAP        = 0; // gap already included in padding of each .cat-link

    // Check if all items fit without a "More" button
    const totalW = items.reduce((sum, el) => sum + el.offsetWidth + GAP, 0);
    if (totalW <= containerW) {
      setVisibleCount(ALL_CATEGORIES.length);
      return;
    }

    // Calculate with "More" button reserved
    let used  = 0;
    let count = 0;
    for (const el of items) {
      const w = el.offsetWidth + GAP;
      if (used + w + moreW <= containerW) {
        used += w;
        count++;
      } else break;
    }
    setVisibleCount(count);
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(recalculate);
    if (wrapRef.current) ro.observe(wrapRef.current);
    recalculate();
    return () => ro.disconnect();
  }, [recalculate]);

  // ── Close on Escape key ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMoreOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const visible  = ALL_CATEGORIES.slice(0, visibleCount);
  const overflow = ALL_CATEGORIES.slice(visibleCount);

  return (
    <nav className="elite-category-nav" aria-label="Product categories">
      <div className="container-fluid px-3 px-xl-4">

        {/* ── Ghost list (position absolute, invisible — for measurement only) ── */}
        <ul className="cat-ghost" ref={ghostRef} aria-hidden="true">
          {ALL_CATEGORIES.map((cat) => (
            <li key={cat.id}><span className="cat-link">{cat.name}</span></li>
          ))}
        </ul>

        <div className="category-inner">

          {/* "Categories" label */}
          <span className="cat-heading d-none d-md-flex">
            <GridIcon size={14} />
            Categories
          </span>

          {/* Visible list + More button */}
          <div className="cat-list-wrap" ref={wrapRef}>
            <div className="cat-list-clip">
              <ul className="cat-list">
                {visible.map((cat) => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.slug}`} className="cat-link">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Categories */}
            {overflow.length > 0 && (
              <div
                className="cat-more-wrap"
                ref={moreRef}
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  className={`cat-link cat-more-btn${moreOpen ? ' cat-more-btn--open' : ''}`}
                  aria-expanded={moreOpen}
                  aria-haspopup="listbox"
                >
                  More Categories
                  <ChevronDown size={12} up={moreOpen} />
                </button>

                {moreOpen && (
                  <ul className="cat-more-dropdown" role="listbox" aria-label="More categories">
                    {overflow.map((cat) => (
                      <li key={cat.id} role="option">
                        <Link
                          to={`/category/${cat.slug}`}
                          className="cat-more-item"
                          onClick={() => setMoreOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default CategoryNav;
