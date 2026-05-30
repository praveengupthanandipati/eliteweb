import '../styles/stores.scss';

const STORES = [
  {
    id: 'S001',
    name: 'Elite Mart – Banjara Hills',
    area: 'Banjara Hills, Hyderabad',
    banner: 'green',
    status: 'open',
    address: 'Plot No. 8-2-293, Road No. 12,\nBanjara Hills, Hyderabad,\nTelangana – 500 034',
    phone: '+91 77 9977 1101',
    email: 'banjarahills@elitemart.co.in',
    hours: [
      { label: 'Mon – Sat', time: '7:00 AM – 10:00 PM' },
      { label: 'Sunday',    time: '8:00 AM – 9:00 PM' },
    ],
    mapSrc:
      'https://maps.google.com/maps?q=17.4156,78.4475&z=16&output=embed',
    directionsUrl:
      'https://maps.google.com/maps?q=17.4156,78.4475',
  },
  {
    id: 'S002',
    name: 'Elite Mart – Jubilee Hills',
    area: 'Jubilee Hills, Hyderabad',
    banner: 'blue',
    status: 'open',
    address: 'H.No. 6-3-871, Road No. 36,\nJubilee Hills, Hyderabad,\nTelangana – 500 033',
    phone: '+91 77 9977 1102',
    email: 'jubileehills@elitemart.co.in',
    hours: [
      { label: 'Mon – Sat', time: '7:00 AM – 10:30 PM' },
      { label: 'Sunday',    time: '8:00 AM – 9:30 PM' },
    ],
    mapSrc:
      'https://maps.google.com/maps?q=17.4325,78.4077&z=16&output=embed',
    directionsUrl:
      'https://maps.google.com/maps?q=17.4325,78.4077',
  },
  {
    id: 'S003',
    name: 'Elite Mart – Madhapur',
    area: 'Madhapur / Hitech City, Hyderabad',
    banner: 'purple',
    status: 'open',
    address: 'Ground Floor, Cyber Pearl Building,\nHitech City Rd, Madhapur,\nHyderabad, Telangana – 500 081',
    phone: '+91 77 9977 1103',
    email: 'madhapur@elitemart.co.in',
    hours: [
      { label: 'Mon – Sat', time: '7:00 AM – 11:00 PM' },
      { label: 'Sunday',    time: '8:00 AM – 10:00 PM' },
    ],
    mapSrc:
      'https://maps.google.com/maps?q=17.4477,78.3878&z=16&output=embed',
    directionsUrl:
      'https://maps.google.com/maps?q=17.4477,78.3878',
  },
  {
    id: 'S004',
    name: 'Elite Mart – Kondapur',
    area: 'Kondapur, Hyderabad',
    banner: 'amber',
    status: 'open',
    address: 'Plot No. 14, Kondapur Main Road,\nSerilingampally Mandal,\nHyderabad, Telangana – 500 084',
    phone: '+91 77 9977 1104',
    email: 'kondapur@elitemart.co.in',
    hours: [
      { label: 'Mon – Sat', time: '7:00 AM – 10:00 PM' },
      { label: 'Sunday',    time: '8:00 AM – 9:00 PM' },
    ],
    mapSrc:
      'https://maps.google.com/maps?q=17.4599,78.3574&z=16&output=embed',
    directionsUrl:
      'https://maps.google.com/maps?q=17.4599,78.3574',
  },
];

const STATS = [
  { icon: '🏪', val: '4',         label: 'Outlet Stores' },
  { icon: '🏙️', val: 'Hyderabad', label: 'City' },
  { icon: '📦', val: '10,000+',   label: 'Products Stocked' },
  { icon: '🕐', val: '7 AM–11 PM',label: 'Store Hours' },
];

const Stores = () => (
  <div className="st-page">

    {/* ── Hero ── */}
    <div className="st-hero">
      <div className="container-fluid px-3 px-xl-4">
        <div className="st-hero-badge">Our Stores</div>
        <h1 className="st-hero-title">Find an Elite Mart Near You</h1>
        <p className="st-hero-sub">
          Visit any of our 4 outlet stores across Hyderabad for the freshest groceries,
          exclusive in-store deals, and instant pickup.
        </p>
      </div>
    </div>

    {/* ── Stats strip ── */}
    <div className="st-stats">
      {STATS.map(s => (
        <div key={s.label} className="st-stat-item">
          <span className="st-stat-icon">{s.icon}</span>
          <div>
            <p className="st-stat-val">{s.val}</p>
            <p className="st-stat-label">{s.label}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="container-fluid px-3 px-xl-4">
      <div className="st-grid">
        {STORES.map(store => (
          <div key={store.id} className="st-card">

            {/* ── Banner ── */}
            <div className={`st-card-banner st-card-banner--${store.banner}`}>
              <span className="st-banner-num">{store.id}</span>
              <span className={`st-banner-badge st-banner-badge--${store.status}`}>
                {store.status === 'open' ? '● Open Now' : '⏳ Coming Soon'}
              </span>
              <div className="st-banner-info">
                <h2 className="st-banner-name">{store.name}</h2>
                <p className="st-banner-area">📍 {store.area}</p>
              </div>
            </div>

            {/* ── Body: details + map ── */}
            <div className="st-card-body">

              {/* Details */}
              <div className="st-card-details">

                <div className="st-detail-item">
                  <div className="st-detail-icon">📍</div>
                  <div>
                    <p className="st-detail-label">Address</p>
                    <p className="st-detail-value" style={{ whiteSpace: 'pre-line' }}>
                      {store.address}
                    </p>
                  </div>
                </div>

                <div className="st-detail-item">
                  <div className="st-detail-icon">📞</div>
                  <div>
                    <p className="st-detail-label">Phone</p>
                    <p className="st-detail-value">
                      <a href={`tel:${store.phone.replace(/\s/g, '')}`}>{store.phone}</a>
                    </p>
                  </div>
                </div>

                <div className="st-detail-item">
                  <div className="st-detail-icon">✉️</div>
                  <div>
                    <p className="st-detail-label">Email</p>
                    <p className="st-detail-value">
                      <a href={`mailto:${store.email}`}>{store.email}</a>
                    </p>
                  </div>
                </div>

                <div className="st-detail-item">
                  <div className="st-detail-icon">🕐</div>
                  <div>
                    <p className="st-detail-label">Store Hours</p>
                    <div className="st-hours-row">
                      {store.hours.map(h => (
                        <span key={h.label} className="st-hours-chip">
                          {h.label}: {h.time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="st-card-actions">
                  <a
                    href={store.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="st-btn st-btn--primary"
                  >
                    🗺️ Get Directions
                  </a>
                  <a
                    href={`tel:${store.phone.replace(/\s/g, '')}`}
                    className="st-btn st-btn--outline"
                  >
                    📞 Call Store
                  </a>
                </div>

              </div>

              {/* Map */}
              <div className="st-card-map">
                <iframe
                  src={store.mapSrc}
                  title={`Map – ${store.name}`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Stores;
