const fs = require('fs');
const path = require('path');

const filePathSpaceHistory = path.join(__dirname, '../storeage/userSpace.json');

exports.getSpaceHistory = (req, res) => {
    fs.readFile(filePathSpaceHistory, 'utf8', (err, data) => {
        if (err) {
        return res.status(500).json({ error: 'Error reading space history file' });
        }
    
        try {
        const spaceHistory = JSON.parse(data);

        const filteredHistory = spaceHistory.spaces.map(space => ({
            id: space.id,
            Court: space.Court,
            Floor: space.Floor,
            Room: space.Room,
            StartTime: space.StartTime
        }));

        res.status(200).json(filteredHistory);
        } catch (parseErr) {
        res.status(500).json({ error: 'Error parsing space history data' });
        }
    });
}

exports.getSpaceDetail = (req, res) => {
  const { id } = req.query; // Lấy ID từ query string

  fs.readFile(filePathSpaceHistory, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading space history file' });
    }

    try {
      const spaceHistory = JSON.parse(data);

      // Tìm không gian theo ID
      const space = spaceHistory.spaces.find(space => String(space.id) === String(id));
      if (!space) {
        return res.status(404).json({ error: 'Space not found' });
      }

      res.status(200).json(space);
    } catch (parseErr) {
      res.status(500).json({ error: 'Error parsing space history data' });
    }
  });
};

exports.updateState = (req, res) => {
    const {id, State } = req.body;
  
    fs.readFile(filePathSpaceHistory, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading space history file' });
      }
  
      try {
        const spaceHistory = JSON.parse(data);
  
        // Tìm không gian cần cập nhật
        const spaceIndex = spaceHistory.spaces.findIndex(space => space.id === id);
        if (spaceIndex === -1) {
          return res.status(404).json({ error: 'Space not found' });
        }
  
        // Cập nhật trạng thái State
        spaceHistory.spaces[spaceIndex].State = State;
  
        // Ghi lại file JSON
        fs.writeFile(filePathSpaceHistory, JSON.stringify(spaceHistory, null, 2), (writeErr) => {
          if (writeErr) {
            return res.status(500).json({ error: 'Error writing to space history file' });
          }
  
          res.status(200).json({ message: 'State updated successfully', space: spaceHistory.spaces[spaceIndex] });
        });
      } catch (parseErr) {
        res.status(500).json({ error: 'Error parsing space history data' });
      }
    });
  };
