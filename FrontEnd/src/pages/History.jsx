import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const History = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roomHistory, setRoomHistory] = useState([]);

  // Lấy dữ liệu từ API spaceHistory
  const getRoomHistory = () => {
    axios
      .get('http://localhost:8000/api/history/getHisory', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Get room history successful:', response.data);
        setRoomHistory(response.data || []); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error('Error fetching room history:', error);
        alert('Không thể tải lịch sử đặt chỗ.');
      });
  };

  useEffect(() => {
    getRoomHistory();
  }, []);

  // Lọc danh sách dựa trên từ khóa tìm kiếm
  const filteredRooms = roomHistory.filter((room) =>
    `${room.Court} ${room.Room} ${room.Floor}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Xử lý khi người dùng chọn một phòng
  const handleRoomSelect = (room) => {
    navigate('/historydetail', { state: { room } });
  };

  return (
    <div className="background">
      <div className="history-space-container">
        <h2 className="history-title">Lịch sử</h2>
        <div className="history-container">
          <input
            type="text"
            className="history-input"
            placeholder="Tìm kiếm lịch sử đặt chỗ (VD: BK.B1, 103...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="room-list">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <div
                key={index}
                className="room-card"
                onClick={() => handleRoomSelect(room)}
              >
                <div className="room-info">
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
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">Không tìm thấy lịch sử.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;