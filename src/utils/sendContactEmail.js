import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// 2. Create a Service (Gmail / SMTP) → copy the Service ID below
// 3. Create an Email Template → set "To Email" to support@elitemart.co.in
//    Use these template variables: {{from_name}}, {{from_email}}, {{phone}},
//    {{subject}}, {{message}}, {{sent_at}}
// 4. Copy your Public Key from Account → API Keys
// ─────────────────────────────────────────────────────────────────────────────
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

/**
 * Sends the contact form data via EmailJS to support@elitemart.co.in.
 * @param {{ name: string, email: string, phone: string, subject: string, message: string }} formData
 * @returns {Promise<import('@emailjs/browser').EmailJSResponseStatus>}
 */
export const sendContactEmail = async (formData) => {
  const templateParams = {
    from_name:  formData.name.trim(),
    from_email: formData.email.trim(),
    phone:      formData.phone.trim() || 'Not provided',
    subject:    formData.subject,
    message:    formData.message.trim(),
    to_email:   'support@elitemart.co.in',
    sent_at:    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};
