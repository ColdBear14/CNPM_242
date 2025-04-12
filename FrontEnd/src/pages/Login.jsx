import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      // localStorage.setItem('isAuthenticated', JSON.stringify(true)); // Không cần vì useEffect trong App.jsx đã xử lý
      navigate('/space');
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="background">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>
        <div className="input-group">
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
        </div>
        <div className="input-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label>Ghi nhớ đăng nhập</label>
        </div>
        <button className="login-button" onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Login;