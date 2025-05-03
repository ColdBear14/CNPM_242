import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HistoryDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room; // Lấy dữ liệu phòng từ state

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