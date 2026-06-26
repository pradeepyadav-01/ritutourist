const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://ritutourist.vercel.app/',
    'http://localhost:5173'
  ]
}));
app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = app;
