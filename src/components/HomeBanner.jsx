import { useEffect, useRef } from 'react';
import DryFruitImg from '../assets/dryfruit-img.png';
import '../styles/homebanner.scss';

const ArrowRight = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HomeBanner = () => {
  const sectionRef = useRef(null);

  // ── Intersection Observer — adds .in-view once section enters viewport ────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="homebanner-section" ref={sectionRef}>
      <div className="container-fluid px-3 px-xl-4">
        <div className="homebanner-inner">

          {/* ── Left: text content ── */}
          <div className="homebanner-content">
            <h2 className="homebanner-title">
              Nature's Choice for<br />Healthy Living!
            </h2>
            <p className="homebanner-desc">
              Enjoy 100% natural, premium dry fruits &amp; nuts for healthy
              snacking. Nutrient-rich almonds, cashews &amp; raisins for your
              family's wellness. Snack smarter, live better!
            </p>
            <a href="/category/dry-fruits" className="homebanner-cta">
              Buy Now <ArrowRight />
            </a>
          </div>

          {/* ── Right: product image ── */}
          <div className="homebanner-img-wrap">
            <img
              src={DryFruitImg}
              alt="Premium Dry Fruits & Nuts — Almonds, Cashews, Raisins"
              className="homebanner-img"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
