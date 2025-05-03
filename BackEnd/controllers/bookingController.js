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

    try {
      const { spaces } = JSON.parse(data);
      const spaceIndex = spaces.findIndex(s => s.id === parseInt(spaceId));

      if (spaceIndex === -1) {
        return res.status(404).json({ error: 'Space not found' });
      }

      if (!spaces[spaceIndex].Available) {
        return res.status(400).json({ error: 'Space is not available' });
      }

      // Update space availability
      spaces[spaceIndex].Available = false;

      // Save updated spaces to file
      fs.writeFile(filePath, JSON.stringify({ spaces }, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error updating space.json:', writeErr.message);
          return res.status(500).json({ error: 'Failed to update space data' });
        }

        // Add booking to the list
        const bookedSpace = spaces[spaceIndex];
        bookings.push({ 
          name, 
          time, 
          spaceId: bookedSpace.id,
          spaceName: `${bookedSpace.Court} - Tầng ${bookedSpace.Floor} - Phòng ${bookedSpace.Room}`
        });
        
        res.status(200).json({ 
          message: `Booking confirmed for ${name} at ${time}`,
          space: bookedSpace
        });
      });
    } catch (parseError) {
      console.error('Error parsing space.json:', parseError.message);
      return res.status(500).json({ error: 'Invalid space data format' });
    }
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
    
    try {
      const { spaces } = JSON.parse(data);
      res.status(200).json(spaces);
    } catch (parseError) {
      console.error('Error parsing space.json:', parseError.message);
      return res.status(500).json({ error: 'Invalid space data format' });
    }
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

    try {
      const { spaces } = JSON.parse(data);
      const spaceIndex = spaces.findIndex(s => s.id === parseInt(spaceId));

      if (spaceIndex === -1) {
        return res.status(404).json({ error: 'Space not found' });
      }

      if (spaces[spaceIndex].Available) {
        return res.status(400).json({ error: 'Space is already available' });
      }

      // Mark the space as available
      spaces[spaceIndex].Available = true;

      // Save updated spaces to file
      fs.writeFile(filePath, JSON.stringify({ spaces }, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error updating space.json:', writeErr.message);
          return res.status(500).json({ error: 'Failed to update space data' });
        }

        // Remove the booking from the bookings array
        const bookingIndex = bookings.findIndex(b => b.spaceId === parseInt(spaceId));
        if (bookingIndex !== -1) {
          const cancelledBooking = bookings.splice(bookingIndex, 1)[0];
          res.status(200).json({ 
            message: `Booking for ${cancelledBooking.spaceName} has been canceled`,
            booking: cancelledBooking
          });
        } else {
          res.status(200).json({ 
            message: `Space ${spaceId} has been made available`,
            warning: 'No matching booking found'
          });
        }
      });
    } catch (parseError) {
      console.error('Error parsing space.json:', parseError.message);
      return res.status(500).json({ error: 'Invalid space data format' });
    }
  });
};