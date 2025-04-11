const express = require('express');

const app = express();
const port = 8000;

const authRoutes = require('./routes/authRoutes')
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/Auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/public', express.static('public'));
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});