import { useState, useRef, useEffect } from 'react';
import '../styles/signinmodal.scss';

const PHONE_REGEX = /^[6-9]\d{9}$/;

const SignInModal = ({ isOpen, onClose }) => {
  const [step, setStep]           = useState('phone');
  const [phone, setPhone]         = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otp, setOtp]             = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError]   = useState('');
  const [timer, setTimer]         = useState(30);
  const [canResend, setCanResend] = useState(false);

  const otpRefs  = useRef([]);
  const timerRef = useRef(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      clearInterval(timerRef.current);
      setStep('phone');
      setPhone('');
      setPhoneError('');
      setOtp(['', '', '', '', '', '']);
      setOtpError('');
      setTimer(30);
      setCanResend(false);
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const startTimer = () => {
    setTimer(30);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Phone step handlers ───────────────────────────────────────────────────
  const handlePhoneChange = (e) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
    if (phoneError) setPhoneError('');
  };

  const handleSendOTP = () => {
    if (!phone.trim()) { setPhoneError('Please enter your mobile number.'); return; }
    if (!PHONE_REGEX.test(phone)) { setPhoneError('Enter a valid 10-digit mobile number (starts with 6–9).'); return; }
    setPhoneError('');
    setStep('otp');
    startTimer();
    // auto-focus first OTP box after render
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  // ── OTP step handlers ─────────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (otpError) setOtpError('');
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }, (_, i) => pasted[i] || '');
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = () => {
    if (otp.join('').length < 6) { setOtpError('Please enter the complete 6-digit OTP.'); return; }
    // Demo: accept any 6-digit OTP — replace with real API call
    clearInterval(timerRef.current);
    onClose();
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    startTimer();
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const handleBackToPhone = () => {
    clearInterval(timerRef.current);
    setStep('phone');
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="si-overlay"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="si-modal" role="dialog" aria-modal="true" aria-label="Sign In">

        {/* ── Close ── */}
        <button className="si-close" onClick={onClose} aria-label="Close sign-in">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Green header band ── */}
        <div className="si-head">
          <div className="si-avatar">
            <svg width="34" height="34" fill="none" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {step === 'phone' ? (
            <>
              <h2 className="si-head-title">Sign In</h2>
              <p className="si-head-sub">Welcome back! Enter your mobile number</p>
            </>
          ) : (
            <>
              <h2 className="si-head-title">Verify OTP</h2>
              <p className="si-head-sub">Code sent to +91 {phone}</p>
            </>
          )}

          {/* Step dots */}
          <div className="si-steps" aria-hidden="true">
            <span className="si-step si-step--active" />
            <span className={`si-step${step === 'otp' ? ' si-step--active' : ''}`} />
          </div>
        </div>

        {/* ── Body ── */}
        <div className="si-body">

          {step === 'phone' ? (
            /* ═══ PHONE STEP ═══ */
            <>
              <label className="si-label" htmlFor="si-phone">Mobile Number</label>
              <div className={`si-phone-wrap${phoneError ? ' si-phone-wrap--error' : ''}`}>
                <span className="si-cc">🇮🇳 +91</span>
                <div className="si-cc-divider" />
                <input
                  id="si-phone"
                  type="tel"
                  inputMode="numeric"
                  className="si-phone-input"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                  autoFocus
                />
                {phone.length === 10 && !phoneError && (
                  <span className="si-input-ok" aria-hidden="true">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              {phoneError && <p className="si-error" role="alert">{phoneError}</p>}

              <button className="si-btn" onClick={handleSendOTP}>
                Get OTP
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p className="si-terms">
                By continuing, you agree to our{' '}
                <a href="/terms">Terms of Service</a> &amp;{' '}
                <a href="/privacy">Privacy Policy</a>
              </p>
            </>
          ) : (
            /* ═══ OTP STEP ═══ */
            <>
              <button className="si-back" onClick={handleBackToPhone}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Change Number
              </button>

              <label className="si-label">Enter 6-digit OTP</label>
              <div className="si-otp-wrap" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={`si-otp-box${digit ? ' si-otp-box--filled' : ''}${otpError ? ' si-otp-box--error' : ''}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    aria-label={`OTP digit ${i + 1}`}
                  />
                ))}
              </div>
              {otpError && <p className="si-error" role="alert">{otpError}</p>}

              <div className="si-resend">
                {canResend ? (
                  <button className="si-resend-btn" onClick={handleResend}>
                    Resend OTP
                  </button>
                ) : (
                  <span>Resend OTP in <strong className="si-timer">{timer}s</strong></span>
                )}
              </div>

              <button
                className={`si-btn${otp.join('').length < 6 ? ' si-btn--disabled' : ''}`}
                onClick={handleVerify}
                disabled={otp.join('').length < 6}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4M22 12A10 10 0 1112 2a10 10 0 0110 10z"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verify &amp; Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
