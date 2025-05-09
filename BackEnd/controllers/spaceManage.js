const fs = require('fs');
const path = require('path');

const filePathSpace = path.join(__dirname, '../storeage/space.json');
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

exports.getSpaceHistoryDetail = (req, res) => {
  const { id } = req.query;

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

exports.getSpaceAvailable = (req, res) => {
  fs.readFile(filePathSpaceHistory, 'utf8', (err, data) => {
      if (err) {
      return res.status(500).json({ error: 'Error reading space history file' });
      }
  
      try {
      const spaceHistory = JSON.parse(data);

      const filteredHistory = spaceHistory.spaces
      .filter(space => space.Available === "True")
      .map(space => ({
          id: space.id,
          Court: space.Court,
          Floor: space.Floor,
          Room: space.Room,
          StartTime: space.StartTime,
          Available: space.Available
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
      const space = spaceHistory.spaces.find(
        space => String(space.id) === String(id) && space.Available === "True"
      );
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


  function updateAvailableInFile(filePath, id, Available, type = 'string', EndTime) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return reject({ error: `Error reading file: ${filePath}` });
  
        try {
          const obj = JSON.parse(data);
          let spaces = Array.isArray(obj) ? obj : obj.spaces;
          if (!spaces) return reject({ error: 'Invalid file structure' });
  
          const idx = spaces.findIndex(space => String(space.id) === String(id));
          if (idx === -1) return reject({ error: `Space not found in ${filePath}` });
  
          // Cập nhật cho userSpace.json: Available (string), EndTime (nếu có)
          if (filePath === filePathSpaceHistory) {
            spaces[idx].Available = Available;
            if (EndTime) {
              spaces[idx].EndTime = EndTime;
            }
          }
          // Cập nhật cho space.json: Available (boolean)
          else if (type === 'boolean') {
            spaces[idx].Available = (Available === "True" || Available === "true" || Available === true);
          }
  
          const newData = Array.isArray(obj)
            ? JSON.stringify(spaces, null, 2)
            : JSON.stringify({ ...obj, spaces }, null, 2);
  
          fs.writeFile(filePath, newData, writeErr => {
            if (writeErr) return reject({ error: `Error writing to file: ${filePath}` });
            resolve(spaces[idx]);
          });
        } catch (parseErr) {
          reject({ error: `Error parsing data from file: ${filePath}` });
        }
      });
    });
  }
  
  exports.updateAvailable = async (req, res) => {
    const { id, Available, EndTime } = req.body;
  
    // Xác định giá trị boolean cho space.json
    let availableBool;
    if (typeof Available === 'boolean') {
      availableBool = Available;
    } else if (typeof Available === 'string') {
      availableBool = (Available === "True" || Available === "true");
    } else {
      return res.status(400).json({ error: 'Invalid Available value' });
    }
  
    // Đảo ngược giá trị cho userSpace.json (string)
    const inverseAvailableStr = availableBool ? "False" : "True";
  
    try {
      // Update in space.json với giá trị gốc (boolean)
      await updateAvailableInFile(filePathSpace, id, availableBool, 'boolean');
  
      // Update in userSpace.json với giá trị đảo ngược (string) và EndTime nếu có
      const updatedUserSpace = await updateAvailableInFile(filePathSpaceHistory, id, inverseAvailableStr, 'string', EndTime);
  
      res.status(200).json({
        message: 'Available updated: space.json (boolean), userSpace.json (string, inverse), EndTime updated if provided',
        userSpace: updatedUserSpace,
        spaceAvailable: availableBool
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

