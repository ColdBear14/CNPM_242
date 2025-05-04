import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SpaceSettingSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roomHistory, setRoomHistory] = useState([]);

  const getRoomHistory = () => {
    axios
      .get('http://localhost:8000/api/history/getHisory', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Get room  successful:', response.data);
        setRoomHistory(response.data || []); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error('Error fetching room :', error);
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
    navigate('/settingdetail', { state: { id: room.id } });
  };

  return (
    <div className="background">
      <div className="history-space-container">
        <h2 className="history-title">Quản lý không gian</h2>
        <div className="history-container">
          <input
            type="text"
            className="history-input"
            placeholder="Tìm kiếm không gian khả dụng(VD: BK.B1, 103...)"
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
            <p className="no-results">Không tìm thấy không gian.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceSettingSearch;