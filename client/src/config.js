// ─────────────────────────────────────────────────────────────
//  All business details live here — edit this one file.
// ─────────────────────────────────────────────────────────────
export const COMPANY = {
  name: 'Ritu Tourist Taxi Service',
  tagline: "Your Journey, Our Responsibility",
  phone: '+91 9818788658, +91 7568489188',        // shown on the site
  phoneTel: '+91 9818788658',       // used for tap-to-call links
  whatsapp: '917568489188',        // digits only, with country code (no + or spaces)
  email: 'ritu.tourist.taxi@gmail.com',
  instagram: 'https://www.instagram.com/ritutaxi_gurgaon',
};

// Email is sent from the browser with EmailJS. These come from Vercel
// environment variables (see README.md) — never hard-code secrets here.
export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Optional: also save bookings on the Render server. Leave unset to store nothing.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
