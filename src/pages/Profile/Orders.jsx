import { useState } from 'react';
import Usernav from './Usernav';
import '../../styles/profile.scss';
import '../../styles/orders.scss';
import { showToast } from '../../components/Toast';

import Pro01 from '../../assets/products/pro01.png';
import Pro02 from '../../assets/products/pro02.png';
import Pro03 from '../../assets/products/pro03.png';
import Pro04 from '../../assets/products/pro04.png';
import Pro05 from '../../assets/products/pro05.png';
import Pro06 from '../../assets/products/pro06.png';
import Pro07 from '../../assets/products/pro07.png';
import Pro08 from '../../assets/products/pro08.png';
import Pro09 from '../../assets/products/pro09.png';
import Pro13 from '../../assets/products/pro13.png';
import Pro16 from '../../assets/products/pro16.png';
import Pro18 from '../../assets/products/pro18.png';

const MOCK_USER = { firstName: 'Praveen', lastName: 'Nandipati', phone: '9876543210' };

// ── Test order data ───────────────────────────────────────────────────────────
const ORDERS = [
  {
    id: 'EM-2025-00847',
    date: '28 May 2025',
    paymentMode: 'UPI – Google Pay',
    totalAmount: 1124,
    totalSaved: 198,
    slot: 'Morning · 9:00 AM – 11:00 AM',
    status: 'delivered',
    statusLabel: 'Delivered',
    address: 'Flat 302, Green Valley Apartments, Madhapur, Hyderabad – 500 081\nNear Cyber Towers · 📞 +91 98765 43210',
    items: [
      { img: Pro01, name: 'Tata Sampann Chana Dal',          weight: '500g',  qty: 2, price: 60  },
      { img: Pro07, name: 'India Gate Classic Basmati Rice', weight: '1 kg',  qty: 1, price: 145 },
      { img: Pro13, name: 'Fortune Sunflower Refined Oil',   weight: '1 L',   qty: 1, price: 155 },
      { img: Pro16, name: 'Patanjali Pure Cow Ghee',         weight: '500g',  qty: 1, price: 399 },
      { img: Pro18, name: 'MDH Chunky Chaat Masala',         weight: '100g',  qty: 1, price: 85  },
      { img: Pro03, name: 'Aashirvaad Atta',                 weight: '5 kg',  qty: 1, price: 245 },
      { img: Pro05, name: 'Tata Tea Gold',                   weight: '500g',  qty: 1, price: 130 },
      { img: Pro08, name: 'Maggi 2-Minute Noodles',          weight: '420g',  qty: 2, price: 89  },
    ],
    timeline: [
      { label: 'Order Placed',       sub: '28 May 2025 · 8:14 AM',  state: 'done'    },
      { label: 'Order Confirmed',    sub: '28 May 2025 · 8:15 AM',  state: 'done'    },
      { label: 'Packed & Dispatched',sub: '28 May 2025 · 8:50 AM',  state: 'done'    },
      { label: 'Out for Delivery',   sub: '28 May 2025 · 9:35 AM',  state: 'done'    },
      { label: 'Delivered',          sub: '28 May 2025 · 10:22 AM', state: 'done'    },
    ],
  },
  {
    id: 'EM-2025-00921',
    date: '30 May 2025',
    paymentMode: 'Cash on Delivery',
    totalAmount: 743,
    totalSaved: 92,
    slot: 'Evening · 4:00 PM – 6:00 PM',
    status: 'outdelivery',
    statusLabel: 'Out for Delivery',
    address: 'Office Block B, 3rd Floor, Tech Park, Gachibowli, Hyderabad – 500 032\nNext to DLF Building · 📞 +91 91234 56780',
    items: [
      { img: Pro04, name: 'Tenali Double Horse Fried Gram Dal', weight: '500g',  qty: 2, price: 68  },
      { img: Pro02, name: 'Surf Excel Easy Wash',               weight: '1 kg',  qty: 1, price: 185 },
      { img: Pro06, name: 'Amul Butter',                        weight: '500g',  qty: 1, price: 275 },
      { img: Pro09, name: 'Mother Dairy Dahi',                  weight: '400g',  qty: 2, price: 55  },
      { img: Pro13, name: 'Fortune Sunflower Refined Oil',      weight: '1 L',   qty: 1, price: 155 },
      { img: Pro18, name: 'MDH Chunky Chaat Masala',            weight: '100g',  qty: 1, price: 85  },
      { img: Pro05, name: 'Tata Tea Gold',                      weight: '500g',  qty: 1, price: 130 },
    ],
    timeline: [
      { label: 'Order Placed',       sub: '30 May 2025 · 10:02 AM', state: 'done'   },
      { label: 'Order Confirmed',    sub: '30 May 2025 · 10:03 AM', state: 'done'   },
      { label: 'Packed & Dispatched',sub: '30 May 2025 · 2:45 PM',  state: 'done'   },
      { label: 'Out for Delivery',   sub: 'Expected by 6:00 PM',    state: 'active' },
      { label: 'Delivered',          sub: 'Pending',                state: 'pending'},
    ],
  },
  {
    id: 'EM-2025-00876',
    date: '29 May 2025',
    paymentMode: 'Credit Card – HDFC',
    totalAmount: 1345,
    totalSaved: 215,
    slot: 'Afternoon · 12:00 PM – 2:00 PM',
    status: 'processing',
    statusLabel: 'Processing',
    address: 'Flat 302, Green Valley Apartments, Madhapur, Hyderabad – 500 081\nNear Cyber Towers · 📞 +91 98765 43210',
    items: [
      { img: Pro07, name: 'India Gate Classic Basmati Rice', weight: '5 kg',  qty: 1, price: 630 },
      { img: Pro16, name: 'Patanjali Pure Cow Ghee',         weight: '1 kg',  qty: 1, price: 749 },
      { img: Pro01, name: 'Tata Sampann Chana Dal',          weight: '1 kg',  qty: 1, price: 115 },
      { img: Pro03, name: 'Aashirvaad Atta',                 weight: '10 kg', qty: 1, price: 480 },
      { img: Pro05, name: 'Tata Tea Gold',                   weight: '250g',  qty: 2, price: 72  },
      { img: Pro08, name: 'Maggi 2-Minute Noodles',          weight: '420g',  qty: 1, price: 89  },
      { img: Pro06, name: 'Amul Butter',                     weight: '500g',  qty: 1, price: 275 },
      { img: Pro09, name: 'Mother Dairy Dahi',               weight: '400g',  qty: 1, price: 55  },
      { img: Pro02, name: 'Surf Excel Easy Wash',            weight: '1 kg',  qty: 1, price: 185 },
    ],
    timeline: [
      { label: 'Order Placed',       sub: '29 May 2025 · 9:30 AM',  state: 'done'   },
      { label: 'Order Confirmed',    sub: '29 May 2025 · 9:31 AM',  state: 'done'   },
      { label: 'Packed & Dispatched',sub: 'In Progress',             state: 'active' },
      { label: 'Out for Delivery',   sub: 'Pending',                state: 'pending'},
      { label: 'Delivered',          sub: 'Pending',                state: 'pending'},
    ],
  },
  {
    id: 'EM-2025-00713',
    date: '15 May 2025',
    paymentMode: 'Debit Card – SBI',
    totalAmount: 567,
    totalSaved: 0,
    slot: 'Morning · 7:00 AM – 9:00 AM',
    status: 'cancelled',
    statusLabel: 'Cancelled',
    address: 'Office Block B, 3rd Floor, Tech Park, Gachibowli, Hyderabad – 500 032\nNext to DLF Building · 📞 +91 91234 56780',
    items: [
      { img: Pro04, name: 'Tenali Double Horse Fried Gram Dal', weight: '500g',  qty: 2, price: 68  },
      { img: Pro01, name: 'Tata Sampann Chana Dal',             weight: '500g',  qty: 1, price: 60  },
      { img: Pro18, name: 'MDH Chunky Chaat Masala',            weight: '100g',  qty: 2, price: 85  },
      { img: Pro13, name: 'Fortune Sunflower Refined Oil',      weight: '1 L',   qty: 1, price: 155 },
      { img: Pro05, name: 'Tata Tea Gold',                      weight: '500g',  qty: 1, price: 130 },
      { img: Pro09, name: 'Mother Dairy Dahi',                  weight: '400g',  qty: 1, price: 55  },
      { img: Pro08, name: 'Maggi 2-Minute Noodles',             weight: '420g',  qty: 1, price: 89  },
    ],
    timeline: [
      { label: 'Order Placed',        sub: '15 May 2025 · 6:44 AM', state: 'done'   },
      { label: 'Order Confirmed',     sub: '15 May 2025 · 6:45 AM', state: 'done'   },
      { label: 'Cancelled by Customer', sub: '15 May 2025 · 7:02 AM', state: 'cancel'},
    ],
  },
];

const FILTERS = ['All', 'Delivered', 'Active', 'Cancelled'];

// ── Icons ─────────────────────────────────────────────────────────────────────
const ChevronIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EyeIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg width="9" height="9" fill="none" viewBox="0 0 24 24">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CrossIcon = () => (
  <svg width="9" height="9" fill="none" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Single order accordion ────────────────────────────────────────────────────
const OrderAccordion = ({ order }) => {
  const [open, setOpen] = useState(false);

  const totalItems = order.items.reduce((s, i) => s + i.qty, 0);
  const isActive   = order.status === 'outdelivery' || order.status === 'processing';

  const dotState = (s) => {
    if (s === 'done')    return 'or-timeline-dot--done';
    if (s === 'active')  return 'or-timeline-dot--active';
    if (s === 'cancel')  return 'or-timeline-dot--cancel';
    return 'or-timeline-dot--pending';
  };

  const handleReorder = (e) => {
    e.stopPropagation();
    showToast('Items added to cart!');
  };
  const handleInvoice = (e) => {
    e.stopPropagation();
    if (order.status === 'cancelled') { showToast('Invoice not available for cancelled orders.'); return; }
    showToast(`Invoice for ${order.id} downloading…`);
  };
  const handleViewDetails = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div className={`or-accordion${open ? ' or-accordion--open' : ''}`}>

      {/* ── Header ── */}
      <div
        className="or-acc-header"
        onClick={() => setOpen(p => !p)}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(p => !p)}
      >
        {/* Chevron */}
        <div className={`or-chevron${open ? ' or-chevron--open' : ''}`}>
          <ChevronIcon />
        </div>

        {/* Order meta */}
        <div className="or-header-meta">
          <p className="or-order-num">
            Order #{order.id}
          </p>
          <div className="or-header-pills">
            <span className="or-items-chip">{totalItems} Items</span>
            <span className="or-amount-chip">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            <span className="or-date-chip">· {order.date}</span>
          </div>
        </div>

        {/* Status badge */}
        <span className={`or-status-badge or-status-badge--${order.status}`}>
          {order.status === 'delivered'   && '✓ '}
          {order.status === 'outdelivery' && '🚚 '}
          {order.status === 'processing'  && '⏳ '}
          {order.status === 'cancelled'   && '✕ '}
          {order.statusLabel}
        </span>

        {/* Action links */}
        <div className="or-header-actions" onClick={e => e.stopPropagation()}>
          <button className="or-action-link or-action-link--view" onClick={handleViewDetails}>
            <EyeIcon /> View Details
          </button>
          <button
            className={`or-action-link or-action-link--reorder${order.status === 'cancelled' ? '' : ''}`}
            onClick={handleReorder}
          >
            <RefreshIcon /> Re-order
          </button>
          <button
            className={`or-action-link or-action-link--invoice${order.status === 'cancelled' ? ' or-action-link--disabled' : ''}`}
            onClick={handleInvoice}
            disabled={order.status === 'cancelled'}
          >
            <DownloadIcon /> Invoice
          </button>
        </div>
      </div>

      {/* ── Body (expanded) ── */}
      {open && (
        <div className="or-acc-body">

          {/* Details grid */}
          <div className="or-details-grid">
            <div className="or-detail-cell">
              <p className="or-detail-label">Order No.</p>
              <p className="or-detail-value">#{order.id}</p>
            </div>
            <div className="or-detail-cell">
              <p className="or-detail-label">Order Date</p>
              <p className="or-detail-value">{order.date}</p>
            </div>
            <div className="or-detail-cell">
              <p className="or-detail-label">Total Amount</p>
              <p className="or-detail-value">₹{order.totalAmount.toLocaleString('en-IN')}</p>
            </div>
            <div className="or-detail-cell">
              <p className="or-detail-label">Total Saved</p>
              <p className={`or-detail-value${order.totalSaved > 0 ? ' or-detail-value--saved' : order.status === 'cancelled' ? ' or-detail-value--cancelled' : ''}`}>
                {order.totalSaved > 0 ? `₹${order.totalSaved}` : order.status === 'cancelled' ? '—' : '₹0'}
              </p>
            </div>
            <div className="or-detail-cell">
              <p className="or-detail-label">Total Items</p>
              <p className="or-detail-value">{totalItems}</p>
            </div>
            <div className="or-detail-cell">
              <p className="or-detail-label">Payment Mode</p>
              <p className="or-detail-value">{order.paymentMode}</p>
            </div>
            <div className="or-detail-cell">
              <p className="or-detail-label">Delivery Slot</p>
              <p className="or-detail-value">{order.slot}</p>
            </div>
            <div className="or-detail-cell">
              <p className="or-detail-label">Status</p>
              <span className={`or-status-badge or-status-badge--${order.status}`} style={{ fontSize: '0.68rem' }}>
                {order.statusLabel}
              </span>
            </div>
          </div>

          {/* Delivery address */}
          <div className="or-address-block">
            <div className="or-address-icon">📍</div>
            <div>
              <p className="or-address-label">Delivery Address</p>
              <p className="or-address-text" style={{ whiteSpace: 'pre-line' }}>
                {order.address}
              </p>
            </div>
          </div>

          {/* Two-column body */}
          <div className="row g-4 or-body-cols">

            {/* Order Summary */}
            <div className="col-12 col-lg-7">
              <p className="or-summary-title">Order Summary</p>
              <ul className="or-item-list">
                {order.items.map((item, idx) => (
                  <li key={idx} className="or-item">
                    <img src={item.img} alt={item.name} className="or-item-img" />
                    <div>
                      <p className="or-item-name">{item.name}</p>
                      <span className="or-item-weight">{item.weight}</span>
                    </div>
                    <div className="or-item-right">
                      <span className="or-item-qty">×{item.qty}</span>
                      <span className="or-item-price">₹{item.price * item.qty}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Timeline + Actions */}
            <div className="col-12 col-lg-5">
              <div className="or-right-panel">
                <p className="or-timeline-title">Delivery Status</p>
                <div className="or-timeline">
                  {order.timeline.map((step, idx) => (
                    <div key={idx} className="or-timeline-step">
                      <div className={`or-timeline-dot ${dotState(step.state)}`}>
                        {step.state === 'done'   && <CheckIcon />}
                        {step.state === 'cancel' && <CrossIcon />}
                        {step.state === 'active' && (
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1d4ed8', display: 'block' }} />
                        )}
                      </div>
                      <p className={`or-timeline-label${step.state === 'pending' ? ' or-timeline-label--muted' : ''}`}>
                        {step.label}
                      </p>
                      <p className="or-timeline-sub">{step.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Panel action buttons */}
                <div className="or-panel-actions">
                  <button
                    className="or-panel-btn or-panel-btn--primary"
                    onClick={handleViewDetails}
                  >
                    <EyeIcon /> View Full Details
                  </button>
                  <button
                    className="or-panel-btn or-panel-btn--outline"
                    onClick={handleReorder}
                  >
                    <RefreshIcon /> Re-order All Items
                  </button>
                  <button
                    className={`or-panel-btn or-panel-btn--ghost${order.status === 'cancelled' ? ' or-panel-btn--disabled' : ''}`}
                    onClick={handleInvoice}
                    disabled={order.status === 'cancelled'}
                  >
                    <DownloadIcon /> Download Invoice
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

// ── Orders page ───────────────────────────────────────────────────────────────
const FILTER_MAP = {
  'All':       () => true,
  'Delivered': o => o.status === 'delivered',
  'Active':    o => o.status === 'outdelivery' || o.status === 'processing',
  'Cancelled': o => o.status === 'cancelled',
};

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const visible = ORDERS.filter(FILTER_MAP[activeFilter]);

  return (
    <div className="pf-page">
      <div className="container-fluid px-3 px-xl-4">
        <div className="row g-4 or-layout">

          {/* ── Sidebar ── */}
          <div className="col-12 col-lg-3">
            <Usernav user={MOCK_USER} />
          </div>

          {/* ── Main content ── */}
          <div className="col-12 col-lg-9">

            {/* Page header */}
            <div className="or-page-header">
              <div>
                <span className="or-page-title">My Orders</span>
                <span className="or-page-count">({ORDERS.length} orders)</span>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="or-filters">
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`or-filter-btn${activeFilter === f ? ' or-filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                  {f !== 'All' && (
                    <span style={{ marginLeft: '0.3rem', opacity: 0.7 }}>
                      ({ORDERS.filter(FILTER_MAP[f]).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Order list */}
            {visible.length === 0 ? (
              <div className="or-empty">
                <div className="or-empty-icon">📦</div>
                <p>No orders found for "{activeFilter}".</p>
              </div>
            ) : (
              <div className="or-list">
                {visible.map(order => (
                  <OrderAccordion key={order.id} order={order} />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
