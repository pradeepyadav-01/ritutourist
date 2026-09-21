const express = require('express');
const crypto = require('crypto');
const { read, write } = require('../data/store');
const router = express.Router();

const SERVICES = ['Airport Pickup & Drop', 'Local City Tour', 'Wedding & Events', 'Outstation Trip'];
const CARS = ['sedan', 'suv'];

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest();

// Only someone who knows ADMIN_TOKEN can read bookings.
// If ADMIN_TOKEN is not set on the server, the list stays locked for everyone.
function requireAdmin(req, res, next) {
  const real = process.env.ADMIN_TOKEN;
  const given = req.get('x-admin-token');
  if (!real || !given || !crypto.timingSafeEqual(sha(given), sha(real))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// POST /api/bookings — public: new cab booking
router.post('/', (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: bots fill this hidden field. Pretend success, store nothing.
  if (body.website) return res.status(201).json({ message: 'Received' });

  const b = {
    name:    clean(body.name, 60),
    mobile:  clean(body.mobile, 10),
    email:   clean(body.email, 100),
    service: clean(body.service, 40),
    car:     clean(body.car, 10),
    date:    clean(body.date, 10),
    time:    clean(body.time, 5),
    pickup:  clean(body.pickup, 150),
    drop:    clean(body.drop, 150),
  };

  const errors = [];
  if (!b.name) errors.push('Name is required');
  if (!/^[6-9][0-9]{9}$/.test(b.mobile)) errors.push('Valid 10-digit mobile is required');
  if (!/^\S+@\S+\.\S+$/.test(b.email)) errors.push('Valid email is required');
  if (!SERVICES.includes(b.service)) errors.push('Valid service type is required');
  if (!CARS.includes(b.car)) errors.push('Valid car type is required');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date) || Number.isNaN(Date.parse(b.date))) errors.push('Valid date is required');
  else if (new Date(b.date) < new Date(new Date().toDateString())) errors.push('Date cannot be in the past');
  if (!/^\d{2}:\d{2}$/.test(b.time)) errors.push('Valid time is required');
  if (!b.pickup) errors.push('Pickup location is required');

  if (errors.length) return res.status(400).json({ errors });

  const bookings = read();
  bookings.push({ id: crypto.randomUUID(), ...b, status: 'pending', createdAt: new Date().toISOString() });
  write(bookings);

  // Don't echo customer data back.
  res.status(201).json({ message: 'Received' });
});

// GET /api/bookings — private: owner only (send the x-admin-token header)
router.get('/', requireAdmin, (req, res) => {
  const bookings = read();
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.set('Cache-Control', 'no-store');
  res.json(bookings);
});

module.exports = router;
