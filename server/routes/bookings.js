const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { read, write } = require('../data/store');
const router = express.Router();

// POST /api/bookings - new cab booking
router.post('/', (req, res) => {
  const { name, mobile, email, service, date, time, pickup, drop } = req.body;
  const errors = [];
  if (!name) errors.push('Name is required');
  if (!mobile || !/^[0-9]{10}$/.test(mobile)) errors.push('Valid 10-digit mobile is required');
  if (!email || !email.includes('@')) errors.push('Valid email is required');
  if (!service) errors.push('Service type is required');
  if (!date) errors.push('Date is required');
  if (!time) errors.push('Time is required');
  if (new Date(date) < new Date(new Date().toDateString())) errors.push('Date cannot be in the past');

  if (errors.length > 0) return res.status(400).json({ errors });

  const booking = {
    id: uuidv4(),
    name, mobile, email, service, date, time,
    pickup: pickup || '',
    drop: drop || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const bookings = read();
  bookings.push(booking);
  write(bookings);
  res.status(201).json({ message: 'Booking confirmed!', booking });
});

// GET /api/bookings - list all (admin use)
router.get('/', (req, res) => {
  const bookings = read();
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(bookings);
});

module.exports = router;
