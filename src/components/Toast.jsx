import { useState, useEffect } from 'react';
import '../styles/toast.scss';

// ── Check icon ────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Close icon ────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Duration constant (must match CSS --toast-duration) ───────────────────────
const TOAST_DURATION = 3500; // ms

// ── Component ─────────────────────────────────────────────────────────────────
const Toast = () => {
  const [toasts, setToasts] = useState([]);

  const dismiss = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  useEffect(() => {
    const handler = (e) => {
      const id    = Date.now() + Math.random();
      const msg   = e.detail?.message ?? 'Done!';

      // keep at most 4 toasts on screen
      setToasts((prev) => [...prev.slice(-3), { id, msg }]);

      // auto-remove after animation completes
      setTimeout(() => dismiss(id), TOAST_DURATION);
    };

    window.addEventListener('show-toast', handler);
    return () => window.removeEventListener('show-toast', handler);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="toast-portal" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map(({ id, msg }) => (
        <div
          key={id}
          className="toast-item"
          style={{ '--toast-duration': `${TOAST_DURATION}ms` }}
          role="status"
        >
          <span className="toast-icon">
            <CheckIcon />
          </span>

          <p className="toast-msg">{msg}</p>

          <button
            className="toast-close"
            onClick={() => dismiss(id)}
            aria-label="Dismiss notification"
          >
            <CloseIcon />
          </button>

          {/* drain bar */}
          <span
            className="toast-progress"
            style={{ '--toast-duration': `${TOAST_DURATION}ms` }}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
};

// ── Helper: call this from anywhere to show a toast ───────────────────────────
export const showToast = (message) =>
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { message } }));

export default Toast;
