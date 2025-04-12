import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="user-selection-container">
        <h2 className="selection-title">Smart Study Space</h2>
        <p className="selection-subtitle">Hệ thống không gian học tập thông minh</p>
        <button className="selection-button" onClick={() => navigate('/login')}>
          Nhân viên
        </button>
        <button className="selection-button" onClick={() => navigate('/login')}>
          Cán bộ / Sinh viên
        </button>
        <button className="selection-button guest" onClick={() => navigate('/main')}>
          Người dùng khách
        </button>
      </div>
    </div>
  );
};

export default UserSelection;