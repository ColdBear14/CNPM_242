const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const usersDBPath = path.join(__dirname, '../storeage/users.json');

const readUsers = () => {
    try {
        const data = fs.readFileSync(usersDBPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveUsers = (users) => {
    fs.writeFileSync(usersDBPath, JSON.stringify(users, null, 2));
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const users = readUsers();

        const userExists = users.some(user => user.email === email);
        if (userExists) {
            return res.status(400).send('Email đã tồn tại');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Lỗi server');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const users = readUsers();
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(401).send('Email không tồn tại');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Mật khẩu không đúng');
        }
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Lỗi server');
    }
};

module.exports = { registerUser, loginUser };