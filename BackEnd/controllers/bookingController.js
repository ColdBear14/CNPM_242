const fs = require('fs');
const path = require('path');

let bookings = [];
const filePathUserSpace = path.join(__dirname, '../storeage/userSpace.json');
const filePathSpace = path.join(__dirname, '../storeage/space.json');


exports.bookSpace = (req, res) => {
  const { spaceId, name, mssv, startTime, endTime, features } = req.body;


  if (!spaceId || !name || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required fields: spaceId, name, or time' });
  }

  updateSpaceAvailability(spaceId, false, (err, updatedSpace) => {
    if (err) {
      return res.status(500).json(err);
    }
  
    const bookedSpace = {
      Name: name,
      MSSV: mssv,
      id: updatedSpace.id,
      Court: updatedSpace.Court,
      Floor: updatedSpace.Floor,
      Room: updatedSpace.Room,
      StartTime: startTime,
      EndTime: endTime,
      Available: "True",
      State: "Close",
      Features: features
    };
    
    addSpaceToUserSpace(bookedSpace, (userSpaceErr) => {
      if (userSpaceErr) {
        return res.status(500).json(userSpaceErr);
      }
  
      bookings.push({
        name,
        duration: bookedSpace.EndTime - bookedSpace.StartTime,
        spaceId: bookedSpace.id,
        spaceName: `${bookedSpace.Court} - Tầng ${bookedSpace.Floor} - Phòng ${bookedSpace.Room}`
      });
  
      res.status(200).json({
        message: `Booking confirmed for ${name} at ${startTime} to ${endTime}`,
        space: bookedSpace
      });
    });
  });
};

exports.getBookings = (req, res) => {
  res.status(200).json(bookings);
};

exports.getSpaces = (req, res) => {
  fs.readFile(filePathSpace, 'utf8', (err, data) => {
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

const updateSpaceAvailability = (spaceId, isAvailable, callback) => {

  fs.readFile(filePathSpace, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading space.json:', err.message);
      return callback({ error: 'Failed to load space data' });
    }

    try {
      const { spaces } = JSON.parse(data);
      const spaceIndex = spaces.findIndex(s => s.id === parseInt(spaceId));

      if (spaceIndex === -1) {
        return callback({ error: 'Space not found' });
      }

      spaces[spaceIndex].Available = isAvailable;

      fs.writeFile(filePathSpace, JSON.stringify({ spaces }, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error updating space.json:', writeErr.message);
          return callback({ error: 'Failed to update space data' });
        }

        callback(null, spaces[spaceIndex]);
      });
    } catch (parseError) {
      console.error('Error parsing space.json:', parseError.message);
      return callback({ error: 'Invalid space data format' });
    }
  });
};


const addSpaceToUserSpace = (space, callback) => {

  fs.readFile(filePathUserSpace, 'utf8', (err, data) => {
    let userSpaces = { spaces: [] };

    if (err) {
      // Nếu file không tồn tại, tạo mới dữ liệu
      if (err.code === 'ENOENT') {
        console.warn('userSpace.json not found. Creating a new one.');
      } else {
        console.error('Error reading userSpace.json:', err.message);
        return callback({ error: 'Failed to load user space data' });
      }
    } else {
      try {
        userSpaces = JSON.parse(data);
        userSpaces.spaces = userSpaces.spaces || [];
      } catch (parseError) {
        console.error('Error parsing userSpace.json:', parseError.message);
        return callback({ error: 'Invalid user space data format' });
      }
    }

    // Thêm thông tin không gian mới
    console.log('Adding space to userSpace.json:', space);
    userSpaces.spaces.push(space);

    // Ghi dữ liệu mới vào file
    fs.writeFile(filePathUserSpace, JSON.stringify(userSpaces, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error updating userSpace.json:', writeErr.message);
        return callback({ error: 'Failed to update user space data' });
      }

      console.log('Space added successfully to userSpace.json:', space);
      callback(null, space);
    });
  });
};