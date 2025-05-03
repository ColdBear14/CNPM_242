import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState({
    light: false,
    fan: false,
    wifi: false,
    board: false,
    power: false,
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room;

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('vi-VN'));
  }, []);

  const handleConfirm = async () => {
    if (!name || !mssv) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const bookingData = {
        name,
        mssv,
        spaceId: room.id,
        time: new Date().toISOString(),
        features: selectedFeatures
      };

      const response = await fetch('http://192.168.0.106:8000/api/booking/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Đặt phòng không thành công');
      }

      const result = await response.json();
      alert(`Đặt phòng thành công!\nTên: ${name}\nMSSV: ${mssv}\nPhòng: ${room.room}`);
      navigate('/space');
    } catch (err) {
      setError(err.message);
      alert(`Lỗi khi đặt phòng: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  if (!room) return <div>Không có phòng nào được chọn! Quay lại <button onClick={() => navigate('/search')}>Tìm phòng</button></div>;

  return (
    <div className="background">
      <div className="booking-confirmation-container">
        <h2 className="booking-title">Xác nhận đặt phòng</h2>
        <div className="booking-box">
          <div className="input-group">
            <label>Tên:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
            />
          </div>
          <div className="input-group">
            <label>MSSV:</label>
            <input
              type="text"
              value={mssv}
              onChange={(e) => setMssv(e.target.value)}
              placeholder="Nhập MSSV"
            />
          </div>
          <p><strong>Court:</strong> {room.court} | <strong>Floor:</strong> {room.floor} | <strong>Room:</strong> {room.room}</p>
          <p><strong>Ngày:</strong> {currentDate}</p>
          <p><strong>Thời gian sử dụng:</strong> 180 phút</p>
          
          <div className="room-features">
            {Object.entries(selectedFeatures).map(([feature, isSelected]) => {
              const icons = {
                light: '💡',
                fan: '🌀',
                wifi: '📶',
                board: '📱',
                power: '⚡'
              };
              
              const labels = {
                light: 'Light',
                fan: 'Fan',
                wifi: 'WIFI',
                board: 'Board',
                power: 'Power'
              };
              
              return (
                <button
                  key={feature}
                  className={`feature-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleFeature(feature)}
                >
                  <span>{icons[feature]}</span> {labels[feature]}
                </button>
              );
            })}
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button 
            className="confirm-button" 
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;