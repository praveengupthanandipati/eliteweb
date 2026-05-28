import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/homehero.scss';

// ── Decorative SVG icons ──────────────────────────────────────────────────────

const FarmIcon = () => (
  <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="slide-svg" aria-hidden="true">
    <circle cx="130" cy="130" r="118" fill="rgba(255,255,255,0.04)" />
    <circle cx="130" cy="130" r="90"  fill="rgba(255,255,255,0.06)" />
    <circle cx="130" cy="130" r="65"  fill="rgba(255,255,255,0.07)" />
    <path d="M82 195 Q82 182 95 178 L165 178 Q178 182 178 195 L168 225 Q130 235 92 225 Z" fill="rgba(255,255,255,0.18)" />
    <rect x="90" y="172" width="80" height="13" rx="6.5" fill="rgba(255,255,255,0.28)" />
    <ellipse cx="130" cy="178" rx="40" ry="9" fill="rgba(120,72,28,0.55)" />
    <line x1="130" y1="172" x2="130" y2="105" stroke="#DAED35" strokeWidth="4" strokeLinecap="round" />
    <path d="M130 140 Q98 122 82 90 Q112 92 130 140Z" fill="#4CAF50" />
    <path d="M130 140 Q98 122 82 90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <path d="M130 120 Q160 103 168 72 Q140 76 130 120Z" fill="#388E3C" />
    <path d="M130 120 Q160 103 168 72" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <path d="M130 105 Q119 84 122 65 Q133 76 130 105Z" fill="#66BB6A" />
    <path d="M130 105 Q141 84 138 65 Q127 76 130 105Z" fill="#4CAF50" />
    <path d="M100 162 Q95 178 106 181 Q114 183 110 166 Z" fill="#F57C00" />
    <path d="M105 162 Q104 150 102 138" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="152" cy="165" r="13" fill="#E53935" />
    <path d="M150 152 Q152 145 154 152" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M146 153 Q152 147 158 153" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="60"  cy="100" r="5" fill="#DAED35" opacity="0.65" />
    <circle cx="205" cy="88"  r="6" fill="#DAED35" opacity="0.5"  />
    <circle cx="55"  cy="165" r="4" fill="rgba(255,255,255,0.45)" />
    <circle cx="212" cy="158" r="5" fill="rgba(255,255,255,0.35)" />
    <path d="M58 120 Q50 108 62 102 Q65 114 58 120Z" fill="#4CAF50" opacity="0.55" />
    <path d="M204 130 Q212 118 216 124 Q210 136 204 130Z" fill="#66BB6A" opacity="0.55" />
  </svg>
);

const SaleIcon = () => (
  <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="slide-svg" aria-hidden="true">
    <circle cx="130" cy="130" r="118" fill="rgba(0,62,28,0.05)" />
    <circle cx="130" cy="130" r="88"  fill="rgba(0,62,28,0.06)" />
    <path d="M60 108 Q60 96 72 93 L188 93 Q200 96 200 108 L214 208 Q214 218 202 220 L58 220 Q46 218 46 208 Z" fill="#003d1c" opacity="0.9" />
    <path d="M63 108 Q63 99 73 97 L187 97 Q197 99 197 108 L199 124 L61 124 Z" fill="rgba(255,255,255,0.08)" />
    <path d="M95 93 Q95 60 130 58 Q165 60 165 93" stroke="#003d1c" strokeWidth="9" fill="none" strokeLinecap="round" />
    <path d="M98 93 Q98 63 130 61" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="130" cy="163" r="48" fill="rgba(218,237,53,0.12)" />
    <circle cx="110" cy="145" r="11" fill="none" stroke="#DAED35" strokeWidth="5" />
    <circle cx="110" cy="145" r="4"  fill="#DAED35" />
    <circle cx="150" cy="181" r="11" fill="none" stroke="#DAED35" strokeWidth="5" />
    <circle cx="150" cy="181" r="4"  fill="#DAED35" />
    <line x1="155" y1="138" x2="105" y2="188" stroke="#DAED35" strokeWidth="5" strokeLinecap="round" />
    <rect x="88" y="95" width="84" height="28" rx="8" fill="rgba(218,237,53,0.18)" />
    <text x="130" y="115" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="18" fontWeight="900" fill="#DAED35">30% OFF</text>
    <circle cx="190" cy="70" r="22" fill="#E53935" />
    <text x="190" y="65" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="white">MEGA</text>
    <text x="190" y="77" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="white">SALE</text>
    <path d="M42 80 L45 70 L48 80 L58 83 L48 86 L45 96 L42 86 L32 83Z" fill="#003d1c" opacity="0.35" />
    <path d="M210 48 L212 41 L214 48 L221 50 L214 52 L212 59 L210 52 L203 50Z" fill="#003d1c" opacity="0.28" />
    <circle cx="44"  cy="160" r="5" fill="#003d1c" opacity="0.18" />
    <circle cx="218" cy="145" r="7" fill="#003d1c" opacity="0.14" />
  </svg>
);

const DeliveryIcon = () => (
  <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="slide-svg" aria-hidden="true">
    <circle cx="140" cy="125" r="105" fill="rgba(255,255,255,0.04)" />
    <circle cx="140" cy="125" r="78"  fill="rgba(255,255,255,0.06)" />
    <path d="M18 192 Q140 188 262 192" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeDasharray="12 7" strokeLinecap="round" />
    <path d="M88 178 Q92 148 118 142 L178 142 Q196 142 200 158 L205 178" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.75)" strokeWidth="3.5" strokeLinejoin="round" />
    <rect x="115" y="172" width="72" height="8" rx="4" fill="rgba(255,255,255,0.35)" />
    <path d="M118 142 Q138 126 158 130 Q166 134 166 142" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M92 150 Q88 138 92 128 Q98 124 108 126" stroke="rgba(255,255,255,0.55)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <line x1="83" y1="128" x2="113" y2="128" stroke="rgba(255,255,255,0.6)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="98"  cy="185" r="22" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="4.5" />
    <circle cx="98"  cy="185" r="9"  fill="rgba(255,255,255,0.2)" />
    <circle cx="98"  cy="185" r="3"  fill="white" />
    <circle cx="202" cy="185" r="22" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="4.5" />
    <circle cx="202" cy="185" r="9"  fill="rgba(255,255,255,0.2)" />
    <circle cx="202" cy="185" r="3"  fill="white" />
    <rect x="160" y="112" width="46" height="34" rx="5" fill="#DAED35" />
    <rect x="160" y="112" width="46" height="9"  rx="5" fill="rgba(0,0,0,0.14)" />
    <line x1="183" y1="112" x2="183" y2="146" stroke="rgba(0,0,0,0.18)" strokeWidth="2" />
    <line x1="160" y1="129" x2="206" y2="129" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
    <path d="M176 112 Q183 104 190 112" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M58 102 Q46 82 58 68 Q74 50 90 68 Q102 82 90 102 L74 122 Z" fill="#E53935" />
    <circle cx="74" cy="82" r="9" fill="white" opacity="0.85" />
    <line x1="28"  y1="152" x2="66"  y2="152" stroke="rgba(255,255,255,0.6)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="18"  y1="164" x2="56"  y2="164" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32"  y1="174" x2="62"  y2="174" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="236" cy="78"  r="5" fill="#DAED35" opacity="0.7" />
    <circle cx="256" cy="112" r="3" fill="rgba(255,255,255,0.5)" />
    <circle cx="58"  cy="62"  r="3" fill="#DAED35" opacity="0.5" />
    <path d="M246 56 L248 49 L250 56 L257 58 L250 60 L248 67 L246 60 L239 58Z" fill="rgba(255,255,255,0.4)" />
  </svg>
);

const OrganicIcon = () => (
  <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="slide-svg" aria-hidden="true">
    <circle cx="130" cy="130" r="118" fill="rgba(255,255,255,0.04)" />
    <circle cx="130" cy="130" r="90"  fill="rgba(255,255,255,0.06)" />
    <circle cx="130" cy="130" r="78" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="2.5" strokeDasharray="9 6" />
    <circle cx="130" cy="130" r="70" fill="rgba(255,255,255,0.05)" />
    <path d="M130 175 Q68 154 72 95 Q92 48 130 52 Q168 48 188 95 Q192 154 130 175Z" fill="#4CAF50" opacity="0.9" />
    <path d="M130 175 Q72 152 74 96 Q93 51 130 55" fill="#66BB6A" opacity="0.45" />
    <line x1="130" y1="172" x2="130" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M130 148 Q108 136 95 118" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M130 130 Q110 118 100 100" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M130 112 Q115 102 110 87"  stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M130 148 Q152 136 165 118" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M130 130 Q150 118 160 100" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M130 112 Q145 102 150 87"  stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="165" cy="64" r="20" fill="#DAED35" />
    <path d="M155 64 L161 71 L175 57" stroke="#003d1c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="88" y="178" width="84" height="24" rx="12" fill="rgba(255,255,255,0.15)" />
    <text x="130" y="195" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" fill="white" letterSpacing="0.8">100% ORGANIC</text>
    <path d="M55 86 Q47 72 59 64 Q67 75 55 86Z" fill="#81C784" opacity="0.65" />
    <path d="M200 96 Q208 82 214 88 Q207 100 200 96Z" fill="#4CAF50" opacity="0.6" />
    <circle cx="55"  cy="154" r="5" fill="#DAED35" opacity="0.55" />
    <circle cx="208" cy="150" r="6" fill="rgba(255,255,255,0.4)" />
    <circle cx="180" cy="48"  r="3" fill="rgba(255,255,255,0.5)" />
    <circle cx="56"  cy="116" r="3" fill="rgba(255,255,255,0.35)" />
  </svg>
);

// ── Inline SVGs for CTA arrow and nav arrows ──────────────────────────────────
const ArrowRight = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="cta-arrow">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    badge: '🌱  Farm Fresh',
    title: 'Fresh Farm Produce Daily',
    desc:  'Get the freshest organic vegetables and fruits delivered to your doorstep. Supporting local farmers with premium quality produce you can trust every single day.',
    cta:   'Shop Fresh Now',
    href:  '/category/fresh-produce',
    theme: 'slide-fresh',
    Icon:  FarmIcon,
  },
  {
    id: 2,
    badge: '🏷️  Limited Offer',
    title: '30% Off on Grocery Haul',
    desc:  'Limited time mega sale! Stock up your pantry with our massive discount on all grocery items. Save big on your monthly shopping with Elite Mart exclusive deals.',
    cta:   'Grab the Deal',
    href:  '/offers',
    theme: 'slide-sale',
    Icon:  SaleIcon,
  },
  {
    id: 3,
    badge: '🚚  Express Delivery',
    title: 'Free Delivery On First Order',
    desc:  "Sign up today and get free home delivery on your very first purchase. Experience convenience with Elite Mart's express service. Quality groceries at your doorstep fast.",
    cta:   'Order Now',
    href:  '/signup',
    theme: 'slide-delivery',
    Icon:  DeliveryIcon,
  },
  {
    id: 4,
    badge: '🍃  100% Certified',
    title: 'Organic & Natural Products',
    desc:  'Discover our curated collection of certified organic foods, dairy, and pantry essentials. Healthy eating made easy with chemical-free, natural grocery options for your family.',
    cta:   'Explore Organic',
    href:  '/category/organic',
    theme: 'slide-organic',
    Icon:  OrganicIcon,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const HomeHero = () => {
  const swiperRef  = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey,   setAnimKey]   = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIdx(swiper.realIndex);
    setAnimKey(k => k + 1);
  };

  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination]}
        speed={850}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        onSwiper={(s) => { swiperRef.current = s; }}
        onSlideChange={handleSlideChange}
        className="hero-swiper"
      >
        {SLIDES.map((slide, i) => {
          const isActive = activeIdx === i;
          return (
            <SwiperSlide key={slide.id} className={`hero-slide ${slide.theme}`}>
              <div className="container-fluid px-3 px-xl-5">
                <div className="slide-body">

                  {/*
                    key changes every time this slide becomes active →
                    React remounts the div → CSS animations restart fresh
                  */}
                  <div
                    className="slide-content"
                    key={isActive ? `act-${animKey}` : `idl-${i}`}
                  >
                    <span className="slide-badge">{slide.badge}</span>
                    <h2 className="slide-title">{slide.title}</h2>
                    <p className="slide-desc">{slide.desc}</p>
                    <a href={slide.href} className="slide-cta">
                      {slide.cta}
                      <ArrowRight />
                    </a>
                  </div>

                  <div className="slide-artwork">
                    <slide.Icon />
                  </div>

                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* ── Custom prev / next ── */}
      <button
        className="hero-prev"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>
      <button
        className="hero-next"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default HomeHero;
