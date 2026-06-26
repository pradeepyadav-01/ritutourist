import { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

// ── Replace these with your real EmailJS credentials ──────────────────────
// Sign up free at https://emailjs.com → Create a service → Create a template
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────────────────

// Replace with your WhatsApp number (digits only, with country code)
const OWNER_WHATSAPP = '918529175660';

const SERVICES = [
  'Airport Pickup & Drop',
  'Local City Tour',
  'Wedding & Events',
  'Outstation Trip',
];

const CARS = [
  { value: 'sedan',  label: '🚗 Sedan (Swift Dzire / Amaze) — 4 Seats' },
  { value: 'suv',    label: '🚙 SUV (Innova Crysta / Ertiga) — 6-7 Seats' },
  { value: 'tempo',  label: '🚐 Tempo Traveller — 12-17 Seats' },
];

const today = () => new Date().toISOString().split('T')[0];

const EMPTY = {
  name: '', mobile: '', email: '', service: '',
  car: '', date: '', time: '', pickup: '', drop: '',
};

export default function BookingForm({ onSuccess }) {
  const [form, setForm]       = useState(EMPTY);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  function validate() {
    const e = {};
    if (!form.name.trim())                     e.name    = 'Name is required';
    if (!/^[0-9]{10}$/.test(form.mobile))      e.mobile  = 'Enter valid 10-digit mobile';
    if (!form.email || !form.email.includes('@')) e.email = 'Enter valid email';
    if (!form.service)                         e.service = 'Please select a service';
    if (!form.car)                             e.car     = 'Please select a car type';
    if (!form.date)                            e.date    = 'Date is required';
    else if (form.date < today())              e.date    = 'Date cannot be in the past';
    if (!form.time)                            e.time    = 'Time is required';
    if (!form.pickup.trim())                   e.pickup  = 'Pickup location is required';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setApiError('');

    try {
      // 1. Save booking to backend
      const API_URL = import.meta.env.VITE_API_URL || '/api';
// ...
await axios.post(`${API_URL}/bookings`, form);

      // 2. Send email to owner via EmailJS
      //    Set up your EmailJS template with these variables:
      //    {{from_name}}, {{mobile}}, {{email}}, {{service}},
      //    {{car}}, {{date}}, {{time}}, {{pickup}}, {{drop}}
      if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            mobile:    form.mobile,
            email:     form.email,
            service:   form.service,
            car:       CARS.find(c => c.value === form.car)?.label || form.car,
            date:      form.date,
            time:      form.time,
            pickup:    form.pickup,
            drop:      form.drop || 'Not specified',
          },
          EMAILJS_PUBLIC_KEY
        );
      }

      // 3. Open WhatsApp to owner with pre-filled message
      const msg = encodeURIComponent(
        `🚗 *New Cab Booking*\n\n` +
        `👤 Name: ${form.name}\n` +
        `📞 Mobile: ${form.mobile}\n` +
        `📧 Email: ${form.email}\n` +
        `🚌 Car: ${CARS.find(c => c.value === form.car)?.label || form.car}\n` +
        `🛎️ Service: ${form.service}\n` +
        `📅 Date: ${form.date} at ${form.time}\n` +
        `📍 Pickup: ${form.pickup}\n` +
        `📍 Drop: ${form.drop || 'Not specified'}\n\n` +
        `Please confirm this booking.`
      );
      window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${msg}`, '_blank');

      // 4. Show success
      onSuccess(form.name);
      setForm(EMPTY);
      setErrors({});
    } catch (err) {
      setApiError(
        err.response?.data?.errors?.join(', ') ||
        'Something went wrong. Please call us directly.'
      );
    } finally {
      setLoading(false);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: '' }));
  }

  return (
    <div className="booking-card">
      <h3>🚗 Book Your Cab</h3>
      <p className="subtitle">Quick booking — confirmed within 30 minutes</p>

      {apiError && <div className="error-banner">{apiError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Full Name *</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile *</label>
            <input name="mobile" value={form.mobile} onChange={onChange} placeholder="10-digit number" maxLength={10} />
            {errors.mobile && <p className="form-error">{errors.mobile}</p>}
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Service Type *</label>
          <select name="service" value={form.service} onChange={onChange}>
            <option value="">Select a service</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.service && <p className="form-error">{errors.service}</p>}
        </div>

        <div className="form-group">
          <label>Select Car *</label>
          <select name="car" value={form.car} onChange={onChange}>
            <option value="">Choose your vehicle</option>
            {CARS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          {errors.car && <p className="form-error">{errors.car}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input name="date" type="date" value={form.date} onChange={onChange} min={today()} />
            {errors.date && <p className="form-error">{errors.date}</p>}
          </div>
          <div className="form-group">
            <label>Time *</label>
            <input name="time" type="time" value={form.time} onChange={onChange} />
            {errors.time && <p className="form-error">{errors.time}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Pickup Location *</label>
          <input name="pickup" value={form.pickup} onChange={onChange} placeholder="e.g. Connaught Place, Delhi" />
          {errors.pickup && <p className="form-error">{errors.pickup}</p>}
        </div>

        <div className="form-group">
          <label>Drop Location</label>
          <input name="drop" value={form.drop} onChange={onChange} placeholder="e.g. IGI Airport Terminal 3" />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading
            ? <><i className="fas fa-spinner fa-spin"></i> Processing...</>
            : <><i className="fab fa-whatsapp"></i> Book & Send WhatsApp</>
          }
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray)', marginTop: '10px' }}>
          <i className="fas fa-lock" style={{ marginRight: '4px' }}></i>
          Your details are safe. We will never share your information.
        </p>
      </form>
    </div>
  );
}
