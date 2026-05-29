import { useState } from 'react';
import '../styles/homesubscribe.scss';
import CouponImg from '../assets/subscribe-trans.png';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HomeSubscribe = () => {
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!email.trim()) return 'Email address is required.';
    if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setSuccess(true);
    setEmail('');
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
    if (success) setSuccess(false);
  };

  return (
    <section className="subscribe-section">
      <div className="container-fluid px-3 px-xl-4">
        <div className="subscribe-card">
          <div className="row align-items-center g-0">

            {/* ── Left content ── */}
            <div className="col-12 col-md-7 subscribe-left">
              <p className="subscribe-eyebrow">Upto 20% discount for your first order</p>
              <h2 className="subscribe-heading">Join our newsletter and get....</h2>
              <p className="subscribe-sub">
                Join our email subscription now to get updates on promotions and coupons.
              </p>

              {success ? (
                <div className="subscribe-success">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You're subscribed! Check your inbox for your discount code.
                </div>
              ) : (
                <form className="subscribe-form" onSubmit={handleSubmit} noValidate>
                  <div className={`subscribe-inputwrap${error ? ' subscribe-inputwrap--error' : ''}`}>
                    <svg className="subscribe-icon" width="18" height="18" fill="none"
                      viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="email"
                      className="subscribe-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      aria-label="Email address"
                      aria-invalid={!!error}
                      aria-describedby={error ? 'subscribe-error' : undefined}
                    />
                    <button type="submit" className="subscribe-btn">Subscribe</button>
                  </div>
                  {error && (
                    <p id="subscribe-error" className="subscribe-error" role="alert">{error}</p>
                  )}
                </form>
              )}
            </div>

            {/* ── Right decorative ── */}
            <div className="col-12 col-md-5 subscribe-right">
              {/* SVG decorations */}
              <div className="subscribe-deco" aria-hidden="true">
                {/* gift box top-left */}
                <svg className="deco deco--gift deco--tl" width="36" height="36" fill="none" viewBox="0 0 24 24">
                  <rect x="2" y="9" width="20" height="13" rx="1" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                  <path d="M12 9v13M2 13h20" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                  <path d="M12 9c0 0-2-4 0-6s4 2 0 6M12 9c0 0 2-4 0-6s-4 2 0 6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                </svg>
                {/* gift box top-right */}
                <svg className="deco deco--gift deco--tr" width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <rect x="2" y="9" width="20" height="13" rx="1" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <path d="M12 9v13M2 13h20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <path d="M12 9c0 0-2-4 0-6s4 2 0 6M12 9c0 0 2-4 0-6s-4 2 0 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                </svg>
                {/* star */}
                <svg className="deco deco--star deco--s1" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
                    stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                </svg>
                <svg className="deco deco--star deco--s2" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                </svg>
                {/* circles */}
                <span className="deco deco--circle deco--c1" />
                <span className="deco deco--circle deco--c2" />
                <span className="deco deco--circle deco--c3" />
              </div>

              <img src={CouponImg} alt="Discount coupon" className="subscribe-coupon" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSubscribe;
