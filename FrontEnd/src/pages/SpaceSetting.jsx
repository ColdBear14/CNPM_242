import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpaceSetting = () => {
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState({
    light: false,
    fan: false,
    wifi: false,
    board: false,
    power: false,
  });
  const navigate = useNavigate();


  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('vi-VN'));
  }, []);

  const handleConfirm = () => {
    if (!name || !mssv) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    alert(`Đặt phòng thành công!\nTên: ${name}\nMSSV: ${mssv}\n`);
    navigate('/space');
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  return (
    <div className="background">
      <div className="booking-confirmation-container">
        <h2 className="booking-title">Quản lý không gian</h2>
        <div className="booking-box">
          <p><strong>Ngày:</strong> {currentDate}</p>
          <p><strong>Thời gian sử dụng:</strong> 180 phút</p>
          <div className="room-features">
            <button
              className={`feature-btn ${selectedFeatures.light ? 'selected' : ''}`}
              onClick={() => toggleFeature('light')}
            >
              <span>💡</span> Light
            </button>
            <button
              className={`feature-btn ${selectedFeatures.fan ? 'selected' : ''}`}
              onClick={() => toggleFeature('fan')}
            >
              <span>🌀</span> Fan
            </button>
            <button
              className={`feature-btn ${selectedFeatures.wifi ? 'selected' : ''}`}
              onClick={() => toggleFeature('wifi')}
            >
              <span>📶</span> WIFI
            </button>
            <button
              className={`feature-btn ${selectedFeatures.board ? 'selected' : ''}`}
              onClick={() => toggleFeature('board')}
            >
              <span>📱</span> Board
            </button>
            <button
              className={`feature-btn ${selectedFeatures.power ? 'selected' : ''}`}
              onClick={() => toggleFeature('power')}
            >
              <span>⚡</span> Power
            </button>
          </div>
          <button className="confirm-button" onClick={handleConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceSetting;