const fs = require('fs');
const path = require('path');

exports.register = (req, res) => {
    
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    const filePath = path.join(__dirname, '../storeage/user.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user.json:', err.message);
            return res.status(500).json({ error: 'Failed to load user data' });
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    });
};