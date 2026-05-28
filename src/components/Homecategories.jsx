import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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

import '../styles/homecategories.scss';

// ── Category data ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1,  img: RiceImg,       title: 'Rice & Grains',      sub: 'Basmati, Brown, Sona Masoori',           slug: 'rice-grains'    },
  { id: 2,  img: DalImg,        title: 'Dal & Pulses',        sub: 'Moong, Chana, Toor, Masoor',             slug: 'dal-pulses'     },
  { id: 3,  img: OilImg,        title: 'Oils & Ghee',         sub: 'Sunflower, Mustard, Coconut',            slug: 'oils-ghee'      },
  { id: 4,  img: AttaImg,       title: 'Atta & Flour',        sub: 'Wheat, Multigrain, Maida',               slug: 'atta-flour'     },
  { id: 5,  img: DryFruitsImg,  title: 'Dry Fruits & Nuts',   sub: 'Almonds, Cashews, Raisins, Walnuts',     slug: 'dry-fruits'     },
  { id: 6,  img: JaggeryImg,    title: 'Jaggery & Sugar',     sub: 'Organic Jaggery, Brown Sugar',           slug: 'jaggery-sugar'  },
  { id: 7,  img: TeaImg,        title: 'Beverages',           sub: 'Tea, Coffee, Juices, Health Drinks',     slug: 'beverages'      },
  { id: 8,  img: BodyCareImg,   title: 'Personal Care',       sub: 'Soaps, Shampoos, Skincare Products',     slug: 'personal-care'  },
  { id: 9,  img: DevotionalImg, title: 'Pooja & Spiritual',   sub: 'Incense Sticks, Camphor, Idols',         slug: 'pooja-spiritual'},
  { id: 10, img: BabyCareImg,   title: 'Baby Care',           sub: 'Baby Soaps, Diapers, Baby Food',         slug: 'baby-care'      },
  { id: 11, img: HomeCareImg,   title: 'Home Care',           sub: 'Cleaning Supplies, Laundry Detergents',  slug: 'home-care'      },
];

// ── Nav icons ─────────────────────────────────────────────────────────────────
const PrevIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const NextIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
const Homecategories = () => {
  const swiperRef = useRef(null);

  return (
    <section className="homecategories-section">
      <div className="container-fluid px-3 px-xl-4">

        {/* ── Section header ── */}
        <div className="categories-header">
          <div className="categories-header__left">
            <h2 className="categories-title">Shop by Category</h2>
            <p className="categories-subtitle">Browse our wide range of grocery essentials</p>
          </div>
          <a href="/categories" className="categories-viewall">
            View All
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* ── Carousel + nav ── */}
        <div className="categories-wrap">

          <button
            className="categories-prev"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
          >
            <PrevIcon />
          </button>

          <Swiper
            modules={[Autoplay]}
            onSwiper={(s) => { swiperRef.current = s; }}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              0:    { slidesPerView: 1.6, spaceBetween: 12 },
              480:  { slidesPerView: 2.3, spaceBetween: 14 },
              640:  { slidesPerView: 3,   spaceBetween: 16 },
              768:  { slidesPerView: 3.5, spaceBetween: 16 },
              992:  { slidesPerView: 4,   spaceBetween: 18 },
              1200: { slidesPerView: 5,   spaceBetween: 18 },
            }}
            className="homecategories-swiper py-5"
          >
            {CATEGORIES.map((cat) => (
              <SwiperSlide key={cat.id}>
                <a href={`/category/${cat.slug}`} className="category-card">
                  <div className="category-card__text">
                    <h3 className="category-card__title">{cat.title}</h3>
                    <p className="category-card__sub">{cat.sub}</p>
                  </div>
                  <div className="category-card__img-area">
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="category-card__img"
                      loading="lazy"
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="categories-next"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
          >
            <NextIcon />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Homecategories;
