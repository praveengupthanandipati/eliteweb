import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { showToast } from "../components/Toast";
import "../styles/checkout.scss";

import Pro01 from "../assets/products/pro01.png";
import Pro04 from "../assets/products/pro04.png";
import Pro07 from "../assets/products/pro07.png";
import Pro13 from "../assets/products/pro13.png";
import Pro16 from "../assets/products/pro16.png";
import Pro18 from "../assets/products/pro18.png";

// ── Test data ─────────────────────────────────────────────────────────────────
const SAVED_ADDRESSES = [
  {
    id: 1,
    name: "Praveen Nandipati",
    mobile: "9876543210",
    address: "Flat 302, Green Valley Apartments, Madhapur",
    pincode: "500081",
    city: "Hyderabad",
    landmark: "Near Cyber Towers",
    type: "Home",
  },
  {
    id: 2,
    name: "Sai Kumar",
    mobile: "9123456780",
    address: "Office Block B, Tech Park, Gachibowli",
    pincode: "500032",
    city: "Hyderabad",
    landmark: "Next to DLF Building",
    type: "Office",
  },
];

const ORDER_ITEMS = [
  {
    id: 1,
    image: Pro01,
    name: "Tata Sampann Chana Dal",
    weight: "500g",
    price: 60,
    qty: 2,
  },
  {
    id: 2,
    image: Pro04,
    name: "Tenali Double Horse Fried Gram Dal",
    weight: "500g",
    price: 68,
    qty: 1,
  },
  {
    id: 3,
    image: Pro07,
    name: "India Gate Classic Basmati Rice",
    weight: "1kg",
    price: 145,
    qty: 1,
  },
  {
    id: 4,
    image: Pro13,
    name: "Fortune Sunflower Refined Oil",
    weight: "1L",
    price: 155,
    qty: 1,
  },
  {
    id: 5,
    image: Pro16,
    name: "Patanjali Pure Cow Ghee",
    weight: "500g",
    price: 399,
    qty: 1,
  },
  {
    id: 6,
    image: Pro18,
    name: "MDH Chunky Chaat Masala Spice Mix",
    weight: "100g",
    price: 85,
    qty: 2,
  },
];

const TIME_SLOT_GROUPS = [
  { id: "morning",   label: "Morning",   icon: "🌅", slots: [
    { id: "morning-1",   time: "7:00 AM – 9:00 AM"   },
    { id: "morning-2",   time: "9:00 AM – 11:00 AM"  },
  ]},
  { id: "afternoon", label: "Afternoon", icon: "☀️", slots: [
    { id: "afternoon-1", time: "12:00 PM – 2:00 PM"  },
    { id: "afternoon-2", time: "2:00 PM – 4:00 PM"   },
  ]},
  { id: "evening",   label: "Evening",   icon: "🌇", slots: [
    { id: "evening-1",   time: "4:00 PM – 6:00 PM"   },
    { id: "evening-2",   time: "6:00 PM – 8:00 PM"   },
  ]},
  { id: "night",     label: "Night",     icon: "🌙", slots: [
    { id: "night-1",     time: "8:00 PM – 10:00 PM"  },
  ]},
];

// flat lookup for summary display
const ALL_SLOTS = TIME_SLOT_GROUPS.flatMap(g => g.slots.map(s => ({ ...s, groupLabel: g.label })));

const PHONE_RE = /^[6-9]\d{9}$/;
const PIN_RE = /^\d{6}$/;

const EMPTY_FORM = {
  name: "",
  mobile: "",
  address: "",
  pincode: "",
  city: "",
  landmark: "",
  type: "Home",
};

// ── Delivery dates ─────────────────────────────────────────────────────────────
function getDeliveryDates() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      id: i,
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[d.getDay()],
      date: `${d.getDate()} ${months[d.getMonth()]}`,
      raw: d,
    };
  });
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="9 22 9 12 15 12 15 22"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const ChevRight = () => (
  <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path
      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const LockIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M7 11V7a5 5 0 0110 0v4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ══════════════════════════════════════════════════════════════════════════════
// Address Modal
// ══════════════════════════════════════════════════════════════════════════════
const AddressModal = ({ isOpen, onClose, onSave, editData }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const firstRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm(editData ? { ...editData } : { ...EMPTY_FORM });
      setErrors({});
      setTimeout(() => firstRef.current?.focus(), 60);
    }
  }, [isOpen, editData]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "Enter a valid name (min 3 chars).";
    if (!PHONE_RE.test(form.mobile))
      e.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.address.trim() || form.address.trim().length < 10)
      e.address = "Enter a complete address (min 10 chars).";
    if (!PIN_RE.test(form.pincode))
      e.pincode = "Enter a valid 6-digit pincode.";
    if (!form.city.trim()) e.city = "City is required.";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="addr-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="addr-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Address form"
      >
        <div className="addr-modal-head">
          <h3>{editData ? "Edit Address" : "Add New Address"}</h3>
          <button className="addr-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="addr-modal-body">
          <div className="row g-3">
            {/* Recipient Name */}
            <div className="col-12 col-sm-6">
              <label className="ck-label" htmlFor="addr-name">
                Recipient Name <span className="ck-req">*</span>
              </label>
              <input
                id="addr-name"
                ref={firstRef}
                className={`ck-input${errors.name ? " ck-input--err" : ""}`}
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
              {errors.name && <p className="ck-err">{errors.name}</p>}
            </div>

            {/* Mobile */}
            <div className="col-12 col-sm-6">
              <label className="ck-label" htmlFor="addr-mob">
                Recipient Mobile <span className="ck-req">*</span>
              </label>
              <div
                className={`ck-phone-wrap${errors.mobile ? " ck-phone-wrap--err" : ""}`}
              >
                <span className="ck-cc">🇮🇳 +91</span>
                <input
                  id="addr-mob"
                  className="ck-phone-input"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit number"
                  value={form.mobile}
                  onChange={(e) =>
                    set(
                      "mobile",
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                />
              </div>
              {errors.mobile && <p className="ck-err">{errors.mobile}</p>}
            </div>

            {/* Address */}
            <div className="col-12">
              <label className="ck-label" htmlFor="addr-addr">
                Recipient Address <span className="ck-req">*</span>
              </label>
              <textarea
                id="addr-addr"
                rows={3}
                className={`ck-input ck-textarea${errors.address ? " ck-input--err" : ""}`}
                placeholder="House / Flat No., Street, Area, Locality"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
              {errors.address && <p className="ck-err">{errors.address}</p>}
            </div>

            {/* Pincode */}
            <div className="col-12 col-sm-4">
              <label className="ck-label" htmlFor="addr-pin">
                Pincode <span className="ck-req">*</span>
              </label>
              <input
                id="addr-pin"
                className={`ck-input${errors.pincode ? " ck-input--err" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit pincode"
                value={form.pincode}
                onChange={(e) =>
                  set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
              {errors.pincode && <p className="ck-err">{errors.pincode}</p>}
            </div>

            {/* City */}
            <div className="col-12 col-sm-4">
              <label className="ck-label" htmlFor="addr-city">
                City <span className="ck-req">*</span>
              </label>
              <input
                id="addr-city"
                className={`ck-input${errors.city ? " ck-input--err" : ""}`}
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
              {errors.city && <p className="ck-err">{errors.city}</p>}
            </div>

            {/* Landmark */}
            <div className="col-12 col-sm-4">
              <label className="ck-label" htmlFor="addr-land">
                Landmark
              </label>
              <input
                id="addr-land"
                className="ck-input"
                type="text"
                placeholder="Nearby landmark (optional)"
                value={form.landmark}
                onChange={(e) => set("landmark", e.target.value)}
              />
            </div>

            {/* Address Type */}
            <div className="col-12">
              <p className="ck-label">
                Address Type <span className="ck-req">*</span>
              </p>
              <div className="addr-type-group">
                {["Home", "Office", "Others"].map((t) => (
                  <label
                    key={t}
                    className={`addr-type-pill${form.type === t ? " addr-type-pill--active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="addr-type"
                      value={t}
                      checked={form.type === t}
                      onChange={() => set("type", t)}
                    />
                    {t === "Home" ? "🏠" : t === "Office" ? "🏢" : "📍"} {t}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="addr-modal-foot">
          <button className="addr-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="addr-save-btn" onClick={handleSave}>
            <CheckIcon /> Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// Checkout Page
// ══════════════════════════════════════════════════════════════════════════════
const Checkout = () => {
  const DATES = getDeliveryDates();

  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  const [selectedAddr, setSelectedAddr] = useState(SAVED_ADDRESSES[0].id);
  const [confirmedAddr, setConfirmedAddr] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);
  const [selectedDate, setSelectedDate] = useState(DATES[0].id);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 500 ? 0 : 49;
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + delivery + gst;
  const totalItems = ORDER_ITEMS.reduce((s, i) => s + i.qty, 0);

  const displayItems = showAllItems ? ORDER_ITEMS : ORDER_ITEMS.slice(0, 3);

  const openAdd = () => {
    setEditingAddr(null);
    setModalOpen(true);
  };
  const openEdit = (addr) => {
    setEditingAddr(addr);
    setModalOpen(true);
  };

  const handleSave = (form) => {
    if (editingAddr) {
      setAddresses((p) =>
        p.map((a) => (a.id === editingAddr.id ? { ...a, ...form } : a)),
      );
      showToast("Address updated successfully!");
    } else {
      const newAddr = { ...form, id: Date.now() };
      setAddresses((p) => [...p, newAddr]);
      setSelectedAddr(newAddr.id);
      showToast("New address added!");
    }
  };

  const confirmAddress = () => {
    if (!selectedSlot) {
      showToast("Please select a delivery time slot.");
      return;
    }
    setConfirmedAddr(selectedAddr);
    showToast("Address & delivery slot confirmed!");
  };

  const canPay = confirmedAddr && selectedSlot;

  const typeColor = { Home: "home", Office: "office", Others: "other" };

  return (
    <div className="ck-page">
      <div className="container-fluid px-3 px-xl-4">
        {/* Breadcrumb */}
        <nav className="ck-breadcrumb">
          <Link to="/" className="ck-bc-link">
            <HomeIcon /> Home
          </Link>
          <ChevRight />
          <Link to="/cart" className="ck-bc-link">
            Cart
          </Link>
          <ChevRight />
          <span className="ck-bc-cur">Checkout</span>
        </nav>

        <h1 className="ck-page-title">Checkout</h1>

        <div className="row g-4 align-items-start">
          {/* ══════════════════════════════════════════
              LEFT
          ══════════════════════════════════════════ */}
          <div className="col-12 col-lg-7">
            {/* ── Step 1: Delivery Address ── */}
            <div className="ck-section">
              <div className="ck-section-head">
                <div className="ck-step-badge">1</div>
                <h2 className="ck-section-title">Delivery Address</h2>
                <button className="ck-add-addr-btn" onClick={openAdd}>
                  <PlusIcon /> Add New Address
                </button>
              </div>

              {/* Address list */}
              <div className="addr-list">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`addr-card${selectedAddr === addr.id ? " addr-card--selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="delivery-address"
                      value={addr.id}
                      checked={selectedAddr === addr.id}
                      onChange={() => setSelectedAddr(addr.id)}
                      className="addr-radio"
                    />
                    <div className="addr-card-body">
                      <div className="addr-card-top">
                        <span className="addr-name">{addr.name}</span>
                        <span
                          className={`addr-type-badge addr-type-badge--${typeColor[addr.type] || "other"}`}
                        >
                          {addr.type === "Home"
                            ? "🏠"
                            : addr.type === "Office"
                              ? "🏢"
                              : "📍"}{" "}
                          {addr.type}
                        </span>
                        <button
                          className="addr-edit-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            openEdit(addr);
                          }}
                          aria-label="Edit address"
                        >
                          <EditIcon /> Edit
                        </button>
                      </div>
                      <p className="addr-text">{addr.address}</p>
                      <p className="addr-meta">
                        {addr.city} – {addr.pincode}
                        {addr.landmark ? ` · Near ${addr.landmark}` : ""}
                      </p>
                      <p className="addr-mobile">📞 +91 {addr.mobile}</p>
                    </div>
                    {selectedAddr === addr.id && (
                      <span className="addr-selected-tick" aria-hidden="true">
                        <CheckIcon />
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* ── Step 2: Delivery Date & Slot ── */}
            <div className="ck-section">
              <div className="ck-section-head">
                <div className="ck-step-badge">2</div>
                <h2 className="ck-section-title">Delivery Date &amp; Time</h2>
              </div>

              {/* Date picker */}
              <p className="ck-sub-label">Select Delivery Date</p>
              <div className="date-slots">
                {DATES.map((d) => (
                  <button
                    key={d.id}
                    className={`date-slot${selectedDate === d.id ? " date-slot--active" : ""}`}
                    onClick={() => setSelectedDate(d.id)}
                  >
                    <span className="date-slot-day">{d.label}</span>
                    <span className="date-slot-date">{d.date}</span>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              <p className="ck-sub-label" style={{ marginTop: "1.25rem" }}>
                Select Time Slot
              </p>
              <div className="time-slot-groups">
                {TIME_SLOT_GROUPS.map((group) => (
                  <div key={group.id} className="time-slot-group">
                    <div className="tsg-label">
                      <span className="tsg-icon">{group.icon}</span>
                      <span className="tsg-name">{group.label}</span>
                    </div>
                    <div className="tsg-slots">
                      {group.slots.map((s) => (
                        <button
                          key={s.id}
                          className={`tsg-slot-btn${selectedSlot === s.id ? " tsg-slot-btn--active" : ""}`}
                          onClick={() => setSelectedSlot(s.id)}
                        >
                          {s.time}
                          {selectedSlot === s.id && (
                            <span className="tsg-slot-check"><CheckIcon /></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Confirm button */}
              <button
                className={`ck-confirm-btn${confirmedAddr && selectedSlot ? " ck-confirm-btn--done" : ""}`}
                onClick={confirmAddress}
                disabled={!selectedSlot}
              >
                {confirmedAddr && selectedSlot ? (
                  <>
                    <CheckIcon /> Address &amp; Slot Confirmed
                  </>
                ) : (
                  "Confirm Address & Delivery Slot"
                )}
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              RIGHT — Order Summary
          ══════════════════════════════════════════ */}
          <div className="col-12 col-lg-5">
            <div className="ck-summary-card">
              <h2 className="ck-summary-title">Order Summary</h2>

              {/* Item list */}
              <ul className="ck-item-list">
                {displayItems.map((item) => (
                  <li key={item.id} className="ck-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="ck-item-img"
                    />
                    <div className="ck-item-info">
                      <p className="ck-item-name">{item.name}</p>
                      <span className="ck-item-weight">{item.weight}</span>
                    </div>
                    <div className="ck-item-pricing">
                      <span className="ck-item-qty">×{item.qty}</span>
                      <span className="ck-item-price">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {ORDER_ITEMS.length > 3 && (
                <button
                  className="ck-show-more"
                  onClick={() => setShowAllItems((p) => !p)}
                >
                  {showAllItems
                    ? "Show less ▲"
                    : `+${ORDER_ITEMS.length - 3} more items ▼`}
                </button>
              )}

              <div className="ck-summary-divider" />

              {/* Price rows */}
              <div className="ck-price-rows">
                <div className="ck-pr">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="ck-pr">
                  <span>Delivery Charges</span>
                  <span className={delivery === 0 ? "ck-free" : ""}>
                    {delivery === 0 ? "FREE" : `₹${delivery}`}
                  </span>
                </div>
                <div className="ck-pr">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
              </div>

              <div className="ck-summary-divider" />

              <div className="ck-pr ck-pr--total">
                <span>Total Amount</span>
                <strong>₹{grandTotal}</strong>
              </div>

              {delivery === 0 && (
                <p className="ck-free-del">
                  🎉 You're getting <strong>Free Delivery</strong>!
                </p>
              )}

              {/* Delivery summary */}
              {confirmedAddr && selectedSlot && (
                <div className="ck-delivery-info">
                  <p className="ck-delivery-label">Delivering to:</p>
                  <p className="ck-delivery-addr">
                    {addresses.find((a) => a.id === confirmedAddr)?.address},{" "}
                    {addresses.find((a) => a.id === confirmedAddr)?.city}
                  </p>
                  <p className="ck-delivery-slot">
                    📅 {DATES.find((d) => d.id === selectedDate)?.label},{" "}
                    {DATES.find((d) => d.id === selectedDate)?.date}
                    &nbsp;·&nbsp; ⏰{" "}
                    {ALL_SLOTS.find((s) => s.id === selectedSlot)?.time}
                  </p>
                </div>
              )}

              {/* Pay Now */}
              <button
                className={`ck-pay-btn${!canPay ? " ck-pay-btn--disabled" : ""}`}
                disabled={!canPay}
                onClick={() =>
                  canPay && showToast("Payment gateway coming soon!")
                }
                title={
                  !canPay ? "Confirm address & delivery slot first" : undefined
                }
              >
                <LockIcon />
                Pay Now · ₹{grandTotal}
              </button>

              {!canPay && (
                <p className="ck-pay-note">
                  Please confirm your address and delivery slot to proceed.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editData={editingAddr}
      />
    </div>
  );
};

export default Checkout;
