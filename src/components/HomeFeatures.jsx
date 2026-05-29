import '../styles/homefeatures.scss';
import QualityIcon  from '../assets/qualityproduct-icon.png';
import OrderIcon    from '../assets/onlineorder-icon.png';
import DeliveryIcon from '../assets/fast-delivery-icon.png';
import DiscountIcon from '../assets/discount-icon.png';

const FEATURES = [
  {
    id: 1,
    icon: QualityIcon,
    title: 'Quality Products',
    desc: 'Handpicked fresh and premium quality products sourced directly from trusted suppliers.',
  },
  {
    id: 2,
    icon: OrderIcon,
    title: 'Easy Online Order',
    desc: 'Order all your daily groceries online in just a few simple clicks from anywhere.',
  },
  {
    id: 3,
    icon: DeliveryIcon,
    title: 'Fast Delivery',
    desc: 'Swift and reliable delivery to your doorstep — get essentials in as fast as 15 minutes.',
  },
  {
    id: 4,
    icon: DiscountIcon,
    title: 'Best Discounts',
    desc: 'Enjoy exclusive app-only deals, seasonal offers, and savings on every single order.',
  },
];

const HomeFeatures = () => {
  return (
    <section className="homefeatures-section">
      <div className="container-fluid px-3 px-xl-4">
        <div className="homefeatures-strip">
          {FEATURES.map((f, i) => (
            <div key={f.id} className="homefeature-item">
              <div className="homefeature-iconwrap">
                <img src={f.icon} alt={f.title} className="homefeature-icon" />
              </div>
              <div className="homefeature-body">
                <h3 className="homefeature-title">{f.title}</h3>
                <p className="homefeature-desc">{f.desc}</p>
              </div>
              {i < FEATURES.length - 1 && (
                <span className="homefeature-divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
