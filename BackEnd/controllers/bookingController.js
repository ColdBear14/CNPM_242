const fs = require('fs');
const path = require('path');

let bookings = [];

exports.bookSpace = (req, res) => {
  const { name, time, spaceId } = req.body;

  if (!name || !time || !spaceId) {
    return res.status(400).json({ error: 'Name, time, and space are required' });
  }

  const filePath = path.join(__dirname, '../storeage/space.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading space.json:', err.message);
      return res.status(500).json({ error: 'Failed to load space data' });
    }

    const spaces = JSON.parse(data);
    const space = spaces.find(s => s.id === parseInt(spaceId));

    if (!space) {
      return res.status(404).json({ error: 'Space not found' });
    }

    if (!space.available) {
      return res.status(400).json({ error: 'Space is not available' });
    }

    // Update space availability
    space.available = false;

    // Save updated spaces to file
    fs.writeFile(filePath, JSON.stringify(spaces, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error updating space.json:', writeErr.message);
        return res.status(500).json({ error: 'Failed to update space data' });
      }

      // Add booking to the list, including spaceId
      bookings.push({ name, time, space: space.name, spaceId: space.id });
      res.status(200).json({ message: `Booking confirmed for ${name} at ${time} in ${space.name}` });
    });
  });
};

exports.getBookings = (req, res) => {
  res.status(200).json(bookings);
};

exports.getSpaces = (req, res) => {
  const filePath = path.join(__dirname, '../storeage/space.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading space.json:', err.message);
      return res.status(500).json({ error: 'Failed to load space data' });
    }
    res.status(200).json(JSON.parse(data));
  });
};

exports.cancelBooking = (req, res) => {
  const { spaceId } = req.body;

  if (!spaceId) {
    return res.status(400).json({ error: 'Space ID is required to cancel a booking' });
  }

  const filePath = path.join(__dirname, '../storeage/space.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading space.json:', err.message);
      return res.status(500).json({ error: 'Failed to load space data' });
    }

    const spaces = JSON.parse(data);
    const space = spaces.find(s => s.id === parseInt(spaceId));

    if (!space) {
      return res.status(404).json({ error: 'Space not found' });
    }

    if (space.available) {
      return res.status(400).json({ error: 'Space is already available' });
    }

    // Mark the space as available
    space.available = true;

    // Save updated spaces to file
    fs.writeFile(filePath, JSON.stringify(spaces, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error updating space.json:', writeErr.message);
        return res.status(500).json({ error: 'Failed to update space data' });
      }

      // Remove the booking from the bookings array
      const bookingIndex = bookings.findIndex(b => b.space === space.name);
      if (bookingIndex !== -1) {
        bookings.splice(bookingIndex, 1);
      }

      res.status(200).json({ message: `Booking for ${space.name} has been canceled` });
    });
  });
};