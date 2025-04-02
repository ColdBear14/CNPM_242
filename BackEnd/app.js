const express = require('express');

const app = express();
const port = 8000;

const bookingRoutes = require('./routes/booking');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

app.use('/public', express.static('public'));
app.use('/api', bookingRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});