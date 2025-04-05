let bookings = [];

exports.bookSpace = (req, res) => {
    const { name, time } = req.body;
    if (!name || !time) {
        return res.status(400).json({ error: 'Name and time are required' });
    }
    bookings.push({ name, time });
    res.status(200).json({ message: `Booking confirmed for ${name} at ${time}` });
};

exports.getBookings = (req, res) => {
  res.status(200).json(bookings);
};