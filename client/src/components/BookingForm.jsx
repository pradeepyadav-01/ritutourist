import { useRef, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { COMPANY, EMAILJS, API_URL } from '../config';

const SERVICES = [
  'Airport Pickup & Drop',
  'Local City Tour',
  'Wedding & Events',
  'Outstation Trip',
];

const CARS = [
  { value: 'sedan', label: '🚗 Sedan (Swift Dzire / Amaze) — 4 Seats' },
  { value: 'suv',   label: '🚙 SUV (Innova Crysta / Ertiga) — 6-7 Seats' },
];

const today = () => new Date().toISOString().split('T')[0];
const carLabel = (v) => CARS.find(c => c.value === v)?.label || v;
const clean = (s, max) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, max);
const withTimeout = (p, ms) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);

const EMPTY = {
  name: '', mobile: '', email: '', service: '',
  car: '', date: '', time: '', pickup: '', drop: '',
  website: '', // honeypot: real visitors never see or fill this
};

export default function BookingForm({ onSuccess }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const lastSubmit = useRef(0);

  function validate() {
    const e = {};
    if (!form.name.trim())                          e.name    = 'Name is required';
    if (!/^[6-9][0-9]{9}$/.test(form.mobile))       e.mobile  = 'Enter a valid 10-digit mobile number';
    if (!/^\S+@\S+\.\S+$/.test(form.email))         e.email   = 'Enter a valid email';
    if (!form.service)                              e.service = 'Please select a service';
    if (!form.car)                                  e.car     = 'Please select a car type';
    if (!form.date)                                 e.date    = 'Date is required';
    else if (form.date < today())                   e.date    = 'Date cannot be in the past';
    if (!form.time)                                 e.time    = 'Time is required';
    if (!form.pickup.trim())                        e.pickup  = 'Pickup location is required';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Bots fill the hidden field: pretend it worked, send nothing.
    if (form.website) { onSuccess(clean(form.name, 60)); setForm(EMPTY); return; }

    if (Date.now() - lastSubmit.current < 30000) {
      setApiError('Your request was just sent. Please wait a moment before sending another.');
      return;
    }

    setLoading(true);
    setApiError('');

    // Open the WhatsApp tab right now (inside the tap), so browsers don't block it.
    // We point it at the prefilled chat once the email has been sent.
    const waWindow = window.open('', '_blank');

    const data = {
      name:    clean(form.name, 60),
      mobile:  form.mobile,
      email:   clean(form.email, 100),
      service: form.service,
      car:     form.car,
      date:    form.date,
      time:    form.time,
      pickup:  clean(form.pickup, 150),
      drop:    clean(form.drop, 150),
    };

    const waText =
      `🚗 *New Cab Booking*\n\n` +
      `👤 Name: ${data.name}\n` +
      `📞 Mobile: ${data.mobile}\n` +
      `📧 Email: ${data.email}\n` +
      `🚌 Car: ${carLabel(data.car)}\n` +
      `🛎️ Service: ${data.service}\n` +
      `📅 Date: ${data.date} at ${data.time}\n` +
      `📍 Pickup: ${data.pickup}\n` +
      `📍 Drop: ${data.drop || 'Not specified'}\n\n` +
      `Please confirm this booking.`;
    const waUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(waText)}`;

    try {
      const jobs = [];

      // 1. Email to the owner (EmailJS)
      if (EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey) {
        jobs.push(withTimeout(emailjs.send(
          EMAILJS.serviceId,
          EMAILJS.templateId,
          {
            to_email:  COMPANY.email,
            reply_to:  data.email,
            from_name: data.name,
            mobile:    data.mobile,
            email:     data.email,
            service:   data.service,
            car:       carLabel(data.car),
            date:      data.date,
            time:      data.time,
            pickup:    data.pickup,
            drop:      data.drop || 'Not specified',
          },
          { publicKey: EMAILJS.publicKey }
        ), 10000));
      }

      // 2. Optional backup copy on the server (never blocks the booking)
      if (API_URL) {
        jobs.push(axios.post(`${API_URL}/api/bookings`, { ...data, website: '' }, { timeout: 10000 }));
      }

      const results = await Promise.allSettled(jobs);
      results.forEach(r => { if (r.status === 'rejected') console.error('Booking channel failed:', r.reason); });

      // 3. WhatsApp with the details prefilled
      let waOpened = false;
      if (waWindow && !waWindow.closed) {
        waWindow.location.href = waUrl;
        waOpened = true;
      }

      lastSubmit.current = Date.now();
      onSuccess(data.name, waUrl, waOpened);
      setForm(EMPTY);
      setErrors({});
    } catch (err) {
      if (waWindow && !waWindow.closed) waWindow.close();
      setApiError(`Something went wrong. Please call us on ${COMPANY.phone}.`);
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
      <p className="subtitle">Quick booking — we confirm by call or WhatsApp</p>

      {apiError && <div className="error-banner">{apiError}</div>}

      <form onSubmit={handleSubmit} noValidate autoComplete="on">
        {/* Honeypot — hidden from people, visible to bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
          <label>Website</label>
          <input name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
        </div>

        <div className="form-group">
          <label>Full Name *</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" maxLength={60} autoComplete="name" />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile *</label>
            <input name="mobile" type="tel" inputMode="numeric" value={form.mobile}
                   onChange={e => onChange({ target: { name: 'mobile', value: e.target.value.replace(/\D/g, '') } })}
                   placeholder="10-digit number" maxLength={10} autoComplete="tel-national" />
            {errors.mobile && <p className="form-error">{errors.mobile}</p>}
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" maxLength={100} autoComplete="email" />
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
          <input name="pickup" value={form.pickup} onChange={onChange} placeholder="e.g. Connaught Place, Delhi" maxLength={150} />
          {errors.pickup && <p className="form-error">{errors.pickup}</p>}
        </div>

        <div className="form-group">
          <label>Drop Location</label>
          <input name="drop" value={form.drop} onChange={onChange} placeholder="e.g. IGI Airport Terminal 3" maxLength={150} />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading
            ? <><i className="fas fa-spinner fa-spin"></i> Sending...</>
            : <><i className="fab fa-whatsapp"></i> Book & Send on WhatsApp</>
          }
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray)', marginTop: '10px' }}>
          <i className="fas fa-lock" style={{ marginRight: '4px' }}></i>
          Your details go only to Ritu Tourist Taxi Service and are never shared.
        </p>
      </form>
    </div>
  );
}
