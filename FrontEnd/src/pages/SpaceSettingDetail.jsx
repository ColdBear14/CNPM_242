import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';



const SettingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.id; // Lấy ID từ state
  const [room, setRoom] = useState(null); // State để lưu thông tin phòng
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading

  useEffect(() => {
    if (!roomId) {
      alert('Không tìm thấy ID của phòng!');
      navigate('/settingsearch');
      return;
    }

    axios
      .get(`http://localhost:8000/api/manage/getDetail`, {
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
        navigate('/settingsearch');
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
        <button onClick={() => navigate('/settingsearch')}></button>
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

  const toggleState = async () => {
    try {
        if (!room.id) {
            alert('Không tìm thấy ID của phòng!');
            return;
          }
      const updatedRoom = { ...room, State: room.State === "Open" ? "Close" : "Open" };
      await axios.put('http://localhost:8000/api/manage/updateState', {
        id: room.id,
        State: updatedRoom.State,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

  
      // Cập nhật trạng thái trong giao diện
      setRoom(updatedRoom);
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      console.error('Error updating state:', error);
      alert('Không thể cập nhật trạng thái.');
    }
  };

  const toggleAvailable = async () => {
    try {
        if (!room.id) {
            alert('Không tìm thấy ID của phòng!');
            return;
          }

      // const now = new Date();
      // const vietnamTime = new Date(now.getTime());
      // const newEndTime = vietnamTime.toISOString();

      const newEndTime = new Date().toISOString();

      const updatedRoom = { ...room,
            Available: room.Available === "True" ? "True" : "False",
            EndTime: newEndTime 
          };
      await axios.put('http://localhost:8000/api/manage/updateAvailable', {
        id: room.id,
        Available: updatedRoom.Available,
        StartTime: room.StartTime,
        EndTime: newEndTime
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRoom(updatedRoom);
      alert('Cập nhật trạng thái thành công!');
      navigate('/settingsearch');
    } catch (error) {
      console.error('Error updating state:', error);
      alert('Không thể cập nhật trạng thái.');
    }
  };

  const qrData = JSON.stringify({
    id: room.id,
    Court: room.Court,
    Floor: room.Floor,
    Room: room.Room,
  });

  return (
    <div className="background">
      <div className="history-detail-container">
        <h2 className="history-detail-title">Chi tiết không gian</h2>
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
          <button className="update-available-btn" onClick={toggleAvailable}>
          {room.Available === "True" ? 'Trả phòng' : 'Error'}
          </button>
          <p>
            <strong>State:</strong> {room.State}
          </p>
          <button className="update-available-btn" onClick={toggleState}>
          {room.State === "Open" ? 'Đóng' : 'Mở'}
          </button>
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
            <div className="qr-code">
              <h3>Mã QR cho không gian</h3>
              <QRCode value={qrData} size={200} />
            </div>
        </div>
        <button className="back-button" onClick={() => navigate('/settingsearch')}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default SettingDetail;