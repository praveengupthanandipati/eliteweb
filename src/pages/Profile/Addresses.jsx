import { useState, useEffect, useRef } from 'react';
import Usernav from './Usernav';
import '../../styles/profile.scss';
import '../../styles/addresses.scss';

// ── Mock saved addresses ──────────────────────────────────────────────────────
const INITIAL_ADDRESSES = [
  {
    id: 1,
    name: 'Praveen Nandipati',
    mobile: '9876543210',
    address: 'Flat 302, Green Valley Apartments, Madhapur',
    pincode: '500081',
    city: 'Hyderabad',
    landmark: 'Near Cyber Towers',
    type: 'Home',
    isPrimary: true,
  },
  {
    id: 2,
    name: 'Sai Kumar',
    mobile: '9123456780',
    address: 'Office Block B, Tech Park, Gachibowli',
    pincode: '500032',
    city: 'Hyderabad',
    landmark: 'Next to DLF Building',
    type: 'Office',
    isPrimary: false,
  },
];

const MOCK_USER = { firstName: 'Praveen', lastName: 'Nandipati', phone: '9876543210' };

const PHONE_RE = /^[6-9]\d{9}$/;
const PIN_RE   = /^\d{6}$/;

const EMPTY_FORM = {
  name: '', mobile: '', address: '',
  pincode: '', city: '', landmark: '', type: 'Home',
};

const TYPE_CLASS = { Home: 'home', Office: 'office', Others: 'other' };
const TYPE_ICON  = { Home: '🏠', Office: '🏢', Others: '📍' };

// ── Icons ─────────────────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
const EditIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7
             M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ═════════════════════════════════════════════════════════════════════════════
// Address Modal
// ═════════════════════════════════════════════════════════════════════════════
const AddressModal = ({ isOpen, onClose, onSave, editData }) => {
  const [form,   setForm]   = useState(EMPTY_FORM);
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
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = 'Enter a valid name (min 3 characters).';
    if (!PHONE_RE.test(form.mobile))
      e.mobile = 'Enter a valid 10-digit mobile number.';
    if (!form.address.trim() || form.address.trim().length < 10)
      e.address = 'Enter a complete address (min 10 characters).';
    if (!PIN_RE.test(form.pincode))
      e.pincode = 'Enter a valid 6-digit pincode.';
    if (!form.city.trim())
      e.city = 'City is required.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="ad-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="ad-modal" role="dialog" aria-modal="true" aria-label="Address form">

        {/* Head */}
        <div className="ad-modal-head">
          <h3>{editData ? 'Edit Address' : 'Add New Address'}</h3>
          <button className="ad-modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="ad-modal-body">
          <div className="row g-3">

            {/* Recipient Name */}
            <div className="col-12 col-sm-6">
              <label className="ad-label" htmlFor="ad-name">
                Recipient Name <span className="req">*</span>
              </label>
              <input
                id="ad-name"
                ref={firstRef}
                type="text"
                className={`ad-input${errors.name ? ' ad-input--err' : ''}`}
                placeholder="Full name"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                autoComplete="name"
              />
              {errors.name && <p className="ad-err">⚠ {errors.name}</p>}
            </div>

            {/* Mobile */}
            <div className="col-12 col-sm-6">
              <label className="ad-label" htmlFor="ad-mobile">
                Recipient Mobile <span className="req">*</span>
              </label>
              <div className={`ad-phone-wrap${errors.mobile ? ' ad-phone-wrap--err' : ''}`}>
                <span className="ad-cc">🇮🇳 +91</span>
                <input
                  id="ad-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit number"
                  value={form.mobile}
                  onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>
              {errors.mobile && <p className="ad-err">⚠ {errors.mobile}</p>}
            </div>

            {/* Address */}
            <div className="col-12">
              <label className="ad-label" htmlFor="ad-address">
                Full Address <span className="req">*</span>
              </label>
              <textarea
                id="ad-address"
                className={`ad-textarea${errors.address ? ' ad-input--err' : ''}`}
                placeholder="House / Flat No., Street, Area, Locality"
                value={form.address}
                onChange={e => set('address', e.target.value)}
              />
              {errors.address && <p className="ad-err">⚠ {errors.address}</p>}
            </div>

            {/* Pincode */}
            <div className="col-12 col-sm-4">
              <label className="ad-label" htmlFor="ad-pincode">
                Pincode <span className="req">*</span>
              </label>
              <input
                id="ad-pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                className={`ad-input${errors.pincode ? ' ad-input--err' : ''}`}
                placeholder="6-digit pincode"
                value={form.pincode}
                onChange={e => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
              {errors.pincode && <p className="ad-err">⚠ {errors.pincode}</p>}
            </div>

            {/* City */}
            <div className="col-12 col-sm-4">
              <label className="ad-label" htmlFor="ad-city">
                City <span className="req">*</span>
              </label>
              <input
                id="ad-city"
                type="text"
                className={`ad-input${errors.city ? ' ad-input--err' : ''}`}
                placeholder="City"
                value={form.city}
                onChange={e => set('city', e.target.value)}
              />
              {errors.city && <p className="ad-err">⚠ {errors.city}</p>}
            </div>

            {/* Landmark */}
            <div className="col-12 col-sm-4">
              <label className="ad-label" htmlFor="ad-landmark">Landmark</label>
              <input
                id="ad-landmark"
                type="text"
                className="ad-input"
                placeholder="Nearby landmark (optional)"
                value={form.landmark}
                onChange={e => set('landmark', e.target.value)}
              />
            </div>

            {/* Address Type */}
            <div className="col-12">
              <p className="ad-label">Address Type <span className="req">*</span></p>
              <div className="ad-type-group">
                {['Home', 'Office', 'Others'].map(t => (
                  <label
                    key={t}
                    className={`ad-type-pill${form.type === t ? ' ad-type-pill--active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="ad-type"
                      value={t}
                      checked={form.type === t}
                      onChange={() => set('type', t)}
                    />
                    {TYPE_ICON[t]} {t}
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="ad-modal-foot">
          <button className="ad-modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="ad-modal-save-btn" onClick={handleSave}>
            <CheckIcon /> Save Address
          </button>
        </div>

      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Addresses Page
// ═════════════════════════════════════════════════════════════════════════════
const Addresses = () => {
  const [addresses,    setAddresses]    = useState(INITIAL_ADDRESSES);
  const [modalOpen,    setModalOpen]    = useState(false);
  const [editingAddr,  setEditingAddr]  = useState(null);
  const [deleteId,     setDeleteId]     = useState(null); // id awaiting delete confirm
  const [notice,       setNotice]       = useState('');

  const primaryId = addresses.find(a => a.isPrimary)?.id ?? addresses[0]?.id;

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3200);
  };

  // ── Add ──────────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingAddr(null);
    setModalOpen(true);
  };

  // ── Edit ─────────────────────────────────────────────────────────────────
  const openEdit = (addr) => {
    setEditingAddr(addr);
    setModalOpen(true);
  };

  // ── Save (add or update) ─────────────────────────────────────────────────
  const handleSave = (form) => {
    if (editingAddr) {
      setAddresses(prev =>
        prev.map(a => a.id === editingAddr.id ? { ...a, ...form } : a)
      );
      flash('Address updated successfully.');
    } else {
      const newAddr = {
        ...form,
        id: Date.now(),
        isPrimary: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddr]);
      flash('New address added.');
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDeleteConfirm = (id) => {
    const isRemovingPrimary = addresses.find(a => a.id === id)?.isPrimary;
    const remaining = addresses.filter(a => a.id !== id);
    if (isRemovingPrimary && remaining.length > 0) {
      remaining[0].isPrimary = true;
    }
    setAddresses(remaining);
    setDeleteId(null);
    flash('Address deleted.');
  };

  // ── Set Primary ──────────────────────────────────────────────────────────
  const handleSetPrimary = (id) => {
    setAddresses(prev =>
      prev.map(a => ({ ...a, isPrimary: a.id === id }))
    );
    flash('Primary delivery address updated.');
  };

  return (
    <div className="pf-page">
      <div className="container-fluid px-3 px-xl-4">
        <div className="row g-4 ad-layout">

          {/* ── Sidebar ── */}
          <div className="col-12 col-lg-3">
            <Usernav user={MOCK_USER} />
          </div>

          {/* ── Main content ── */}
          <div className="col-12 col-lg-9">

            {/* Page header */}
            <div className="ad-page-header">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <h1 className="ad-page-title">My Saved Addresses</h1>
                <span className="ad-page-count">({addresses.length} saved)</span>
              </div>
              <button className="ad-add-btn" onClick={openAdd}>
                <PlusIcon /> Add New Address
              </button>
            </div>

            {/* Success notice */}
            {notice && (
              <div className="ad-notice">✅ {notice}</div>
            )}

            {/* Address grid */}
            <div className="ad-grid">
              {addresses.length === 0 && (
                <div className="ad-empty">
                  <div className="ad-empty-icon">📭</div>
                  <p>No saved addresses yet.</p>
                  <button className="ad-add-btn" onClick={openAdd}>
                    <PlusIcon /> Add Your First Address
                  </button>
                </div>
              )}

              {addresses.map(addr => (
                <div
                  key={addr.id}
                  className={`ad-card${addr.isPrimary ? ' ad-card--primary' : ''}`}
                >
                  {/* Top bar */}
                  <div className="ad-card-topbar">
                    <span className={`ad-type-badge ad-type-badge--${TYPE_CLASS[addr.type] ?? 'other'}`}>
                      {TYPE_ICON[addr.type]} {addr.type}
                    </span>
                    {addr.isPrimary && (
                      <span className="ad-primary-badge">
                        <StarIcon /> Primary
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="ad-card-body">
                    <p className="ad-recipient-name">{addr.name}</p>
                    <p className="ad-address-text">{addr.address}</p>
                    <p className="ad-city-pin">{addr.city} – {addr.pincode}</p>
                    {addr.landmark && (
                      <p className="ad-landmark">Near {addr.landmark}</p>
                    )}
                    <p className="ad-mobile">📞 +91 {addr.mobile}</p>
                  </div>

                  {/* Footer actions */}
                  <div className="ad-card-footer">
                    {deleteId === addr.id ? (
                      /* ── Delete confirmation inline ── */
                      <>
                        <p className="ad-delete-confirm-label">Delete this address?</p>
                        <button
                          className="ad-action-btn ad-action-btn--confirm-del"
                          onClick={() => handleDeleteConfirm(addr.id)}
                        >
                          <TrashIcon /> Yes, Delete
                        </button>
                        <button
                          className="ad-action-btn ad-action-btn--cancel"
                          onClick={() => setDeleteId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      /* ── Normal actions ── */
                      <>
                        <button
                          className="ad-action-btn ad-action-btn--edit"
                          onClick={() => openEdit(addr)}
                        >
                          <EditIcon /> Edit
                        </button>
                        <button
                          className="ad-action-btn ad-action-btn--delete"
                          onClick={() => setDeleteId(addr.id)}
                        >
                          <TrashIcon /> Delete
                        </button>
                        {!addr.isPrimary && (
                          <button
                            className="ad-action-btn ad-action-btn--primary-set"
                            onClick={() => handleSetPrimary(addr.id)}
                          >
                            <StarIcon /> Set as Primary
                          </button>
                        )}
                        {addr.isPrimary && (
                          <span
                            className="ad-action-btn ad-action-btn--primary"
                            style={{ cursor: 'default', marginLeft: 'auto' }}
                          >
                            <StarIcon /> Primary Address
                          </span>
                        )}
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AddressModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editData={editingAddr}
      />
    </div>
  );
};

export default Addresses;
