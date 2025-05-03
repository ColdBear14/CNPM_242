const path = require('path');
const fs = require('fs');

const usersDBPath = path.join(__dirname, '../storeage/user.json');

exports.register = (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    fs.readFile(usersDBPath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading users data:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        const userExists = users.find(user => user.username === username);
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }


        users.push({ username, password });

        fs.writeFile(usersDBPath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing users data:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Successful registration
            return res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    
    // Read the users data from the JSON file
    fs.readFile(usersDBPath, 'utf8', (err, data) => {
        if (err) {
        console.error('Error reading users data:', err);
        return res.status(500).json({ message: 'Internal server error' });
        }
    
        const users = JSON.parse(data);
        const user = users.find(user => user.username === username);
    
        if (!user) {
        return res.status(401).json({ message: 'Invalid username or password 1' });
        }
        
        const isMatch = password === user.password; // Replace with your password hashing logic
    
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password 2' });
        }
    
        // Successful login
        return res.status(200).json({ message: 'Login successful' });
    });
};
