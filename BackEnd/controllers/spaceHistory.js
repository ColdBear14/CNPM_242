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
            Name: space.Name,
            MSSV: space.MSSV,
            Court: space.Court,
            Floor: space.Floor,
            Room: space.Room,
            StartTime: space.StartTime,
            EndTime: space.EndTime,
            Features: space.Features
        }));

        res.status(200).json(filteredHistory);
        } catch (parseErr) {
        res.status(500).json({ error: 'Error parsing space history data' });
        }
    });
}