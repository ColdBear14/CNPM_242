const express = require('express');

const app = express();
const port = 8000;

const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/Auth');
const spaceRoutes = require('./routes/space_detail_router');
const manageRoutes = require('./routes/SpaceManage');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/public', express.static('public'));
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/spaces', spaceRoutes);
app.use('/api/manage', manageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});