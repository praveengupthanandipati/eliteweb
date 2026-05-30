import { useState } from 'react';
import '../styles/contact.scss';
import { sendContactEmail } from '../utils/sendContactEmail';

const SUBJECTS = [
  'Select a subject',
  'Order Issue',
  'Delivery Problem',
  'Return / Refund Request',
  'Product Quality Complaint',
  'Account & Login Support',
  'Bulk Order Enquiry',
  'Partnership / Business',
  'Feedback & Suggestions',
  'Other',
];

const INFO_CARDS = [
  {
    icon: '📞',
    label: 'Call / WhatsApp',
    value: '+91 77 9977 1189',
    href: 'tel:+917799771189',
    note: 'Mon – Sat, 9 AM – 7 PM IST',
  },
  {
    icon: '✉️',
    label: 'Email Support',
    value: 'support@elitemart.co.in',
    href: 'mailto:support@elitemart.co.in',
    note: 'Reply within 24 hours',
  },
  {
    icon: '🏢',
    label: 'Registered Office',
    value: 'Elite Agro Foods Pvt. Ltd.',
    note: 'Hyderabad, Telangana – 500081, India',
  },
  {
    icon: '🕐',
    label: 'Support Hours',
    value: 'Mon – Sat: 9 AM – 7 PM',
    note: 'Closed on Sundays & public holidays',
  },
];

const HOURS = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM', open: true },
  { day: 'Saturday',        time: '9:00 AM – 5:00 PM', open: true },
  { day: 'Sunday',          time: 'Closed',             open: false },
  { day: 'Public Holidays', time: 'Closed',             open: false },
];

const INITIAL_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

const validate = (form) => {
  const errs = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errs.name = 'Full name must be at least 2 characters.';
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = 'Please enter a valid email address.';
  if (form.phone.trim() && !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
    errs.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!form.subject || form.subject === 'Select a subject')
    errs.subject = 'Please select a subject.';
  if (!form.message.trim() || form.message.trim().length < 20)
    errs.message = 'Message must be at least 20 characters.';
  return errs;
};

const Contact = () => {
  const [form,   setForm]   = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      await sendContactEmail(form);
      setStatus('success');
      setForm(INITIAL_FORM);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `ct-input${errors[field] ? ' ct-input--error' : ''}`;

  return (
    <div className="ct-page">

      {/* ── Hero ── */}
      <div className="ct-hero">
        <div className="container-fluid px-3 px-xl-4">
          <div className="ct-hero-badge">Get in Touch</div>
          <h1 className="ct-hero-title">Contact Us</h1>
          <p className="ct-hero-sub">
            Have a question, feedback, or need help with your order? We're here for you —
            reach out and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-fluid px-3 px-xl-4">

        {/* ── Info Cards ── */}
        <div className="ct-info-strip">
          {INFO_CARDS.map(card => (
            <div key={card.label} className="ct-info-card">
              <div className="ct-info-icon">{card.icon}</div>
              <div>
                <p className="ct-info-label">{card.label}</p>
                <p className="ct-info-value">
                  {card.href
                    ? <a href={card.href}>{card.value}</a>
                    : card.value}
                </p>
                <p className="ct-info-note">{card.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 ct-layout-row">

          {/* ── Left: Details ── */}
          <div className="col-12 col-lg-4">

            {/* Office details */}
            <div className="ct-detail-card">
              <p className="ct-detail-heading">Office Details</p>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text">
                  <strong>Registered Office</strong>
                  Elite Agro Foods Private Limited<br />
                  Plot No. 42, Industrial Area,<br />
                  Medchal–Malkajgiri District,<br />
                  Hyderabad, Telangana – 500081, India
                </p>
              </div>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text">
                  <strong>Customer Support</strong>
                  <a href="mailto:support@elitemart.co.in">support@elitemart.co.in</a>
                </p>
              </div>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text">
                  <strong>Legal & Compliance</strong>
                  <a href="mailto:legal@eliteagrofoods.com">legal@eliteagrofoods.com</a>
                </p>
              </div>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text">
                  <strong>Grievance Officer</strong>
                  <a href="mailto:grievance@eliteagrofoods.com">grievance@eliteagrofoods.com</a>
                </p>
              </div>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text">
                  <strong>Phone / WhatsApp</strong>
                  <a href="tel:+917799771189">+91 77 9977 1189</a>
                </p>
              </div>
            </div>

            {/* Support hours */}
            <div className="ct-detail-card">
              <p className="ct-detail-heading">Support Hours</p>
              <table className="ct-hours-table">
                <tbody>
                  {HOURS.map(h => (
                    <tr key={h.day}>
                      <td>{h.day}</td>
                      <td>
                        {h.open
                          ? <span className="ct-hours-badge ct-hours-badge--open">{h.time}</span>
                          : <span className="ct-hours-badge ct-hours-badge--closed">{h.time}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Response times */}
            <div className="ct-detail-card">
              <p className="ct-detail-heading">Response Times</p>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text"><strong>Email / Contact Form</strong>Within 24 hours</p>
              </div>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text"><strong>Phone / WhatsApp</strong>Immediate during support hours</p>
              </div>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text"><strong>Order Issues</strong>Within 4–24 hours depending on issue type</p>
              </div>
              <div className="ct-detail-row">
                <div className="ct-detail-dot" />
                <p className="ct-detail-text"><strong>Grievance Escalation</strong>Within 48 hours acknowledgement; resolved in 30 days</p>
              </div>
            </div>

          </div>

          {/* ── Right: Contact Form ── */}
          <div className="col-12 col-lg-8">
            <div className="ct-form-card">
              <h2 className="ct-form-heading">Send Us a Message</h2>
              <p className="ct-form-sub">
                Fill in the form below and we'll get back to you at <strong>support@elitemart.co.in</strong>.
              </p>

              <form onSubmit={handleSubmit} noValidate>

                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-12 col-sm-6 ct-form-row">
                    <label className="ct-label" htmlFor="ct-name">
                      Full Name <span>*</span>
                    </label>
                    <input
                      id="ct-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Ravi Kumar"
                      className={inputClass('name')}
                      autoComplete="name"
                    />
                    {errors.name && <p className="ct-error-msg">⚠ {errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="col-12 col-sm-6 ct-form-row">
                    <label className="ct-label" htmlFor="ct-email">
                      Email Address <span>*</span>
                    </label>
                    <input
                      id="ct-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. ravi@example.com"
                      className={inputClass('email')}
                      autoComplete="email"
                    />
                    {errors.email && <p className="ct-error-msg">⚠ {errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="col-12 col-sm-6 ct-form-row">
                    <label className="ct-label" htmlFor="ct-phone">
                      Phone Number <small style={{ fontWeight: 400, color: '#808080' }}>(optional)</small>
                    </label>
                    <input
                      id="ct-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className={inputClass('phone')}
                      autoComplete="tel"
                      maxLength={10}
                    />
                    {errors.phone && <p className="ct-error-msg">⚠ {errors.phone}</p>}
                  </div>

                  {/* Subject */}
                  <div className="col-12 col-sm-6 ct-form-row">
                    <label className="ct-label" htmlFor="ct-subject">
                      Subject <span>*</span>
                    </label>
                    <select
                      id="ct-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`ct-select${errors.subject ? ' ct-input--error' : ''}`}
                    >
                      {SUBJECTS.map(s => (
                        <option key={s} value={s} disabled={s === 'Select a subject'}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subject && <p className="ct-error-msg">⚠ {errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="col-12 ct-form-row">
                    <label className="ct-label" htmlFor="ct-message">
                      Message <span>*</span>
                    </label>
                    <textarea
                      id="ct-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your query or issue in detail..."
                      className={`ct-textarea${errors.message ? ' ct-input--error' : ''}`}
                      maxLength={1000}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {errors.message
                        ? <p className="ct-error-msg">⚠ {errors.message}</p>
                        : <span />}
                      <p className={`ct-char-count${form.message.length > 900 ? ' ct-char-count--warn' : ''}`}>
                        {form.message.length} / 1000
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="ct-submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><div className="ct-spinner" /> Sending…</>
                  ) : (
                    <>Send Message ➜</>
                  )}
                </button>

                {/* Success */}
                {status === 'success' && (
                  <div className="ct-status-success">
                    <span className="ct-status-icon">✅</span>
                    <p>
                      <strong>Message sent successfully!</strong>
                      Thank you for reaching out. Our team will reply to your email within 24 hours.
                      For urgent matters, please call us at +91 77 9977 1189.
                    </p>
                  </div>
                )}

                {/* Error */}
                {status === 'error' && (
                  <div className="ct-status-error">
                    <span className="ct-status-icon">❌</span>
                    <p>
                      <strong>Failed to send message.</strong>
                      Please try again or email us directly at{' '}
                      <a href="mailto:support@elitemart.co.in">support@elitemart.co.in</a>.
                    </p>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
