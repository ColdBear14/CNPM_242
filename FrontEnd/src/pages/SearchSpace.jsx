import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

const SearchSpace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRooms = location.state?.rooms || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = initialRooms.filter(room => {
    const courtMatch = room.Court?.toLowerCase().includes(searchTerm.toLowerCase());
    const roomMatch = String(room.Room).includes(searchTerm);
    return courtMatch || roomMatch;
  });

  // Chỉ lấy 3 phòng đầu tiên
  const displayedRooms = filteredRooms.slice(0, 3);

  const handleRoomSelect = (room) => {
    navigate('/booking', { state: { room } });
  };

  return (
    <div className="background">
      <div className="search-space-container">
        <h2 className="search-title">Tìm phòng học</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm phòng (VD: BK.B1, 103...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="room-list">
          {displayedRooms.length > 0 ? (
            displayedRooms.map((room, index) => (
              <div key={index} className="room-card" onClick={() => handleRoomSelect(room)}>
                <div className="room-info">
                  <p><strong>Court:</strong> {room.Court}</p>
                  <p><strong>Floor:</strong> {room.Floor}</p>
                  <p><strong>Room:</strong> {room.Room}</p>
                  {/* <p><strong>Status:</strong> {room.Available ? "Có sẵn" : "Đã đặt"}</p> */}
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">Không tìm thấy phòng phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSpace;