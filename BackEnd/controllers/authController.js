const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const usersDBPath = path.join(__dirname, '../storeage/user.json');
const adminDBPath = path.join(__dirname, '../storeage/admin.json');
const salt = 10;

// Hàm kiểm tra độ mạnh của mật khẩu
const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

const readUsers = async () => {
  try {
    const data = await fs.readFile(usersDBPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

const readAdmin = async () => {
  try {
    const data = await fs.readFile(adminDBPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(usersDBPath, JSON.stringify(users, null, 2), 'utf-8');
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra độ mạnh của mật khẩu
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.'
      });
    }

    const users = await readUsers();
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({ 
      message: 'Đăng ký thành công',
      user: { username: newUser.username, createdAt: newUser.createdAt }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await readUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Tên đăng nhập không tồn tại' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mật khẩu không chính xác' });
    }

    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: { username: user.username, createdAt: user.createdAt }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admins = await readAdmin();
    const admin = admins.find(admin => admin.username === username);

    if (!admin) {
      return res.status(401).json({ message: 'Vui lòng nhập đúng tài khoản admin' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mật khẩu không chính xác' });
    }

    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: { username: admin.username, createdAt: admin.createdAt }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser, loginAdmin };
