const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

// Render sits behind a proxy; needed so rate limits see the real visitor IP.
app.set('trust proxy', 1);
app.use(helmet());

// Origins have NO trailing slash — browsers send them without one.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://ritutourist.vercel.app,http://localhost:5173')
  .split(',')
  .map((s) => s.trim().replace(/\/+$/, ''))
  .filter(Boolean);
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-admin-token'],
}));

app.use(express.json({ limit: '10kb' }));

const limiter = (windowMs, max) => rateLimit({
  windowMs, max, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});
// Many mobile users share one IP, so the public form limit is generous but still stops floods.
app.post('/api/bookings', limiter(60 * 60 * 1000, 30));
app.get('/api/bookings', limiter(15 * 60 * 1000, 30));

app.use('/api/bookings', bookingRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
// Bad JSON etc. — never leak stack traces.
app.use((err, req, res, next) => {
  const status = err.status && err.status < 500 ? err.status : 500;
  res.status(status).json({ error: status === 500 ? 'Server error' : 'Bad request' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;
