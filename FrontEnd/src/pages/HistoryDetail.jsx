import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const HistoryDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.id; // Lấy ID từ state
  const [room, setRoom] = useState(null); // State để lưu thông tin phòng
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading

  // Gọi API để lấy thông tin chi tiết
  useEffect(() => {
    if (!roomId) {
      alert('Không tìm thấy ID của phòng!');
      navigate('/history');
      return;
    }

    axios
      .get(`http://localhost:8000/api/manage/getHistoryDetail`, {
        params: {id : roomId},
      })
      .then((response) => {
        console.log('Room detail:', response.data);
        setRoom(response.data); // Lưu thông tin phòng vào state
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching room detail:', error);
        alert('Không thể tải thông tin chi tiết phòng.');
        navigate('/history');
      });
  }, [roomId, navigate]);

  // Hiển thị trạng thái loading
  if (loading) {
    return <div>Đang tải thông tin chi tiết...</div>;
  }

  // Kiểm tra nếu không có dữ liệu phòng
  if (!room) {
    return (
      <div>
        Không có phòng nào được chọn! Quay lại{' '}
        <button onClick={() => navigate('/history')}>Lịch sử</button>
      </div>
    );
  }

  const featureIcons = {
    light: '💡',
    fan: '🌀',
    wifi: '📶',
    board: '📱',
    power: '⚡',
  };

  const featureLabels = {
    light: 'Light',
    fan: 'Fan',
    wifi: 'WIFI',
    board: 'Board',
    power: 'Power',
  };

  return (
    <div className="background">
      <div className="history-detail-container">
        <h2 className="history-detail-title">Chi tiết lịch sử đặt phòng</h2>
        <div className="history-detail-box">
          <p>
            <strong>Name:</strong> {room.Name}
          </p>
          <p>
            <strong>MSSV:</strong> {room.MSSV}
          </p>
          <p>
            <strong>Court:</strong> {room.Court}
          </p>
          <p>
            <strong>Floor:</strong> {room.Floor}
          </p>
          <p>
            <strong>Room:</strong> {room.Room}
          </p>
          <p>
            <strong>Start Time:</strong> {new Date(room.StartTime).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong> {new Date(room.EndTime).toLocaleString()}
          </p>
          <p>
            <strong>Available:</strong> {room.Available}
          </p>
          <p>
            <strong>State:</strong> {room.State}
          </p>
          <p>
            <strong>Features:</strong>{' '}
            {room.Features
              ? Object.entries(room.Features).map(([feature, isSelected]) =>
                  isSelected ? (
                    <button key={feature} className="feature-btn selected">
                      <span>{featureIcons[feature]}</span> {featureLabels[feature]}
                    </button>
                  ) : null
                )
              : 'Không có'}
          </p>
        </div>
        <button className="back-button" onClick={() => navigate('/history')}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default HistoryDetail;