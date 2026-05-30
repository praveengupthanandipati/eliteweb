import { useState, useRef, useEffect } from 'react';
import Usernav from './Usernav';
import '../../styles/profile.scss';

// ── Mock logged-in user (replace with real auth context / API) ────────────────
const MOCK_USER = {
  firstName: 'Ravi',
  lastName:  'Kumar',
  email:     'ravi.kumar@example.com',
  phone:     '9876543210',
  memberSince: 'June 2024',
};

const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditIcon = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7
             M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SaveIcon = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="17 21 17 13 7 13 7 21" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="7 3 7 8 15 8" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6
             M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProfileManagement = () => {
  // ── Profile form state ───────────────────────────────────────────────────
  const [user,      setUser]      = useState(MOCK_USER);
  const [form,      setForm]      = useState({ ...MOCK_USER });
  const [isEditing, setIsEditing] = useState(false);
  const [errors,    setErrors]    = useState({});
  const [saving,    setSaving]    = useState(false);
  const [saved,     setSaved]     = useState(false);

  // ── Phone edit state ─────────────────────────────────────────────────────
  // 'view' | 'edit' | 'otp'
  const [phoneMode,    setPhoneMode]    = useState('view');
  const [newPhone,     setNewPhone]     = useState('');
  const [phoneError,   setPhoneError]   = useState('');
  const [otp,          setOtp]          = useState(['', '', '', '', '', '']);
  const [otpError,     setOtpError]     = useState('');
  const [otpTimer,     setOtpTimer]     = useState(30);
  const [canResend,    setCanResend]    = useState(false);
  const otpRefs    = useRef([]);
  const timerRef   = useRef(null);

  // ── Delete confirm state ─────────────────────────────────────────────────
  const [showDelete, setShowDelete] = useState(false);

  // ── Derived initials for avatar ──────────────────────────────────────────
  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();

  // ── Main form handlers ───────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errs = {};
    if (!form.firstName.trim() || form.firstName.trim().length < 2)
      errs.firstName = 'First name must be at least 2 characters.';
    if (!form.lastName.trim() || form.lastName.trim().length < 2)
      errs.lastName = 'Last name must be at least 2 characters.';
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email))
      errs.email = 'Please enter a valid email address.';
    return errs;
  };

  const handleSave = async () => {
    const errs = validateForm();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // simulate API call
    setUser(prev => ({ ...prev, ...form }));
    setSaving(false);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleCancelEdit = () => {
    setForm({ ...user });
    setErrors({});
    setIsEditing(false);
  };

  // ── Phone edit handlers ──────────────────────────────────────────────────
  const startOtpTimer = () => {
    setOtpTimer(30);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const handleSendPhoneOtp = () => {
    if (!newPhone.trim()) { setPhoneError('Please enter a new mobile number.'); return; }
    if (!PHONE_REGEX.test(newPhone)) { setPhoneError('Enter a valid 10-digit number (starts 6–9).'); return; }
    if (newPhone === user.phone) { setPhoneError('New number is same as current number.'); return; }
    setPhoneError('');
    setPhoneMode('otp');
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    startOtpTimer();
    setTimeout(() => otpRefs.current[0]?.focus(), 60);
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (otpError) setOtpError('');
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }, (_, idx) => pasted[idx] || '');
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerifyPhone = () => {
    if (otp.join('').length < 6) { setOtpError('Enter the complete 6-digit OTP.'); return; }
    // Demo: accept any 6-digit OTP — replace with real API call
    clearInterval(timerRef.current);
    setUser(prev => ({ ...prev, phone: newPhone }));
    setForm(prev => ({ ...prev, phone: newPhone }));
    setPhoneMode('view');
    setNewPhone('');
    setOtp(['', '', '', '', '', '']);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleCancelPhone = () => {
    clearInterval(timerRef.current);
    setPhoneMode('view');
    setNewPhone('');
    setPhoneError('');
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
  };

  // ── Delete handler ───────────────────────────────────────────────────────
  const handleDeleteConfirm = () => {
    // Replace with real API call + auth context clear
    alert('Profile deleted. (demo only)');
    setShowDelete(false);
  };

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="pf-page">
      <div className="container-fluid px-3 px-xl-4">
        <div className="row g-4 pf-layout">

          {/* ── Sidebar (desktop sticky + mobile horizontal scroll) ── */}
          <div className="col-12 col-lg-3">
            <Usernav user={user} />
          </div>

          {/* ── Main card ── */}
          <div className="col-12 col-lg-9">
            <div className="pf-card">

              {/* Card header */}
              <div className="pf-card-header">
                <div className="pf-avatar">{initials}</div>
                <div>
                  <p className="pf-header-name">{user.firstName} {user.lastName}</p>
                  <p className="pf-header-since">Member since {user.memberSince}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="pf-card-body">

                {/* Section heading */}
                <div className="pf-section-head">
                  <h2 className="pf-section-title">Personal Information</h2>
                  {!isEditing && (
                    <button
                      className="pf-edit-toggle"
                      onClick={() => { setIsEditing(true); setSaved(false); }}
                    >
                      <EditIcon /> Edit Profile
                    </button>
                  )}
                </div>

                <div className="row g-3">

                  {/* ── Phone Number ── */}
                  <div className="col-12">
                    <div className="pf-field">
                      <label className="pf-label">
                        Phone Number <span className="req">*</span>
                      </label>

                      {/* View / Edit-entry mode */}
                      {phoneMode !== 'otp' && (
                        <div className="pf-phone-row">
                          <div className="pf-phone-input-wrap">
                            <div className={`pf-phone-prefix${phoneMode === 'edit' ? ' pf-phone-prefix--active' : ''}${phoneError ? ' pf-phone-prefix--error' : ''}`}>
                              <span>🇮🇳 +91</span>
                              <span style={{ width: 1, background: '#e4e4e4', alignSelf: 'stretch', margin: '0 4px' }} />
                              <input
                                type="tel"
                                inputMode="numeric"
                                maxLength={10}
                                placeholder="Enter 10-digit number"
                                value={phoneMode === 'edit' ? newPhone : user.phone}
                                disabled={phoneMode === 'view'}
                                onChange={e => {
                                  setNewPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                                  if (phoneError) setPhoneError('');
                                }}
                              />
                            </div>
                            {phoneError && <p className="pf-error">⚠ {phoneError}</p>}
                          </div>

                          {phoneMode === 'view' && (
                            <button
                              className="pf-phone-edit-btn"
                              onClick={() => { setPhoneMode('edit'); setNewPhone(''); }}
                            >
                              <EditIcon size={13} /> Edit Phone Number
                            </button>
                          )}
                          {phoneMode === 'edit' && (
                            <>
                              <button
                                className="pf-phone-edit-btn"
                                onClick={handleSendPhoneOtp}
                              >
                                Send OTP
                              </button>
                              <button
                                className="pf-phone-edit-btn pf-phone-edit-btn--cancel"
                                onClick={handleCancelPhone}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      )}

                      {/* OTP verification block */}
                      {phoneMode === 'otp' && (
                        <div className="pf-otp-block">
                          <p className="pf-otp-label">
                            Enter the 6-digit OTP sent to +91 {newPhone}
                          </p>
                          <div className="pf-otp-row" onPaste={handleOtpPaste}>
                            <div className="pf-otp-boxes">
                              {otp.map((digit, i) => (
                                <input
                                  key={i}
                                  ref={el => (otpRefs.current[i] = el)}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={1}
                                  className={`pf-otp-box${digit ? ' pf-otp-box--filled' : ''}${otpError ? ' pf-otp-box--error' : ''}`}
                                  value={digit}
                                  onChange={e => handleOtpChange(i, e.target.value)}
                                  onKeyDown={e => handleOtpKeyDown(i, e)}
                                  aria-label={`OTP digit ${i + 1}`}
                                />
                              ))}
                            </div>
                            <button
                              className="pf-otp-verify-btn"
                              onClick={handleVerifyPhone}
                              disabled={otp.join('').length < 6}
                            >
                              Verify &amp; Save
                            </button>
                            <button
                              className="pf-phone-edit-btn pf-phone-edit-btn--cancel"
                              onClick={handleCancelPhone}
                            >
                              Cancel
                            </button>
                          </div>
                          {otpError && <p className="pf-error" style={{ marginTop: '0.5rem' }}>⚠ {otpError}</p>}
                          <p className="pf-otp-timer">
                            {canResend ? (
                              <>Didn't receive it?{' '}
                                <button onClick={() => { setOtp(['','','','','','']); startOtpTimer(); }}>
                                  Resend OTP
                                </button>
                              </>
                            ) : (
                              <>Resend OTP in <strong>{otpTimer}s</strong></>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── First Name ── */}
                  <div className="col-12 col-sm-6">
                    <div className="pf-field">
                      <label className="pf-label" htmlFor="pf-firstName">
                        First Name <span className="req">*</span>
                      </label>
                      <input
                        id="pf-firstName"
                        type="text"
                        name="firstName"
                        className={`pf-input${errors.firstName ? ' pf-input--error' : ''}`}
                        value={form.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter first name"
                        autoComplete="given-name"
                      />
                      {errors.firstName && <p className="pf-error">⚠ {errors.firstName}</p>}
                    </div>
                  </div>

                  {/* ── Last Name ── */}
                  <div className="col-12 col-sm-6">
                    <div className="pf-field">
                      <label className="pf-label" htmlFor="pf-lastName">
                        Last Name <span className="req">*</span>
                      </label>
                      <input
                        id="pf-lastName"
                        type="text"
                        name="lastName"
                        className={`pf-input${errors.lastName ? ' pf-input--error' : ''}`}
                        value={form.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter last name"
                        autoComplete="family-name"
                      />
                      {errors.lastName && <p className="pf-error">⚠ {errors.lastName}</p>}
                    </div>
                  </div>

                  {/* ── Email ── */}
                  <div className="col-12">
                    <div className="pf-field">
                      <label className="pf-label" htmlFor="pf-email">
                        Email Address <span className="req">*</span>
                      </label>
                      <input
                        id="pf-email"
                        type="email"
                        name="email"
                        className={`pf-input${errors.email ? ' pf-input--error' : ''}`}
                        value={form.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter email address"
                        autoComplete="email"
                      />
                      {errors.email && <p className="pf-error">⚠ {errors.email}</p>}
                    </div>
                  </div>

                </div>{/* /row */}

                {/* ── Form action buttons ── */}
                {isEditing && (
                  <div className="pf-form-actions">
                    <button
                      className="pf-btn pf-btn--primary"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving
                        ? <><div className="pf-spinner" /> Saving…</>
                        : <><SaveIcon /> Save Changes</>}
                    </button>
                    <button
                      className="pf-btn pf-btn--outline"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      className="pf-btn pf-btn--danger"
                      onClick={() => { setShowDelete(true); setIsEditing(false); }}
                    >
                      <TrashIcon /> Delete Profile
                    </button>
                  </div>
                )}

                {/* Delete button always visible (outside edit mode) */}
                {!isEditing && (
                  <div className="pf-form-actions">
                    <button
                      className="pf-btn pf-btn--danger"
                      style={{ marginLeft: 'auto' }}
                      onClick={() => setShowDelete(true)}
                    >
                      <TrashIcon /> Delete Profile
                    </button>
                  </div>
                )}

                {/* ── Saved success toast ── */}
                {saved && (
                  <div className="pf-save-toast">
                    ✅ Your profile has been updated successfully.
                  </div>
                )}

                {/* ── Delete confirmation panel ── */}
                {showDelete && (
                  <div className="pf-delete-panel">
                    <p className="pf-delete-title">⚠ Delete Your Profile?</p>
                    <p className="pf-delete-desc">
                      This action is <strong>permanent and irreversible</strong>. All your saved
                      addresses, order history, and wallet credits will be permanently deleted.
                      You will not be able to recover your account after this action.
                    </p>
                    <div className="pf-delete-actions">
                      <button
                        className="pf-delete-confirm-btn pf-delete-confirm-btn--yes"
                        onClick={handleDeleteConfirm}
                      >
                        <TrashIcon /> Yes, Delete My Profile
                      </button>
                      <button
                        className="pf-delete-confirm-btn pf-delete-confirm-btn--no"
                        onClick={() => setShowDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              </div>{/* /pf-card-body */}
            </div>{/* /pf-card */}
          </div>

        </div>{/* /row */}
      </div>
    </div>
  );
};

export default ProfileManagement;
