import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    const request = {
      username: username,
      password: password
    }
    axios.post(`http://127.0.0.1:8000/api/auth/register`, request, 
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      console.log(`Register successful with response: ${response}`);
      setIsAuthenticated(true);
      navigate('/space');
    })
    .catch(error => {
      // Hy bếu
      if (error.response) {
        const { data } = error.response;
        alert(data.message || 'Đăng nhập thất bại'); 
      } else {
        alert('Lỗi kết nối đến server');
      }
    });
  };

  return (
    <div className="background">
      <div className="register-box">
        <h2 className="register-title">Đăng ký</h2>
        <div className="input-group">
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
        </div>
        <div className="input-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="input-group">
          <label>Xác nhận mật khẩu:</label>
          <input
            type="password"
            className="register-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu"
          />
        </div>
        <button className="register-button" onClick={handleRegister}>
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Register;