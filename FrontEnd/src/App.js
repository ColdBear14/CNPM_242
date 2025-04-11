import React, { useState, useEffect } from "react"; // Thêm useEffect
import './App.css';
import logo from './assets/hcmut.png';
import axios from 'axios';

function App() {
  const [page, setPage] = useState("home");
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="container">
      {page === "home" ? <Home setPage={setPage} /> :
       page === "login" ? <Login setPage={setPage} /> :
       page === "main" ? <MainPage setPage={setPage} /> :
       page === "space" ? <SpaceSelection setPage={setPage} /> :
       page === "search" ? <SearchSpace setPage={setPage} setSelectedRoom={setSelectedRoom} /> :
       <BookingConfirmation setPage={setPage} setPageToSpaceSetting={() => setPage("spaceSetting")} room={selectedRoom} />}
    </div>
  );
}
function Home({ setPage }) {
  return (
    <div className="background">
      <div className="header">
        <span className="title">SStudyS</span>
        <img src={logo} alt="BK TP.HCM" className="logo" />
      </div>
      <div className="login-box">
        <h2>Smart Study Space</h2>
        <p>Hệ thống không gian học tập thông minh</p>
        <button className="button1" onClick={() => setPage("login")}>Nhân viên</button>
        <button className="button1" onClick={() => setPage("login")}>Cán bộ / Sinh viên</button>
        <button className="button1" onClick={() => setPage("main")}>Người dùng khách</button>
        </div>
    </div>
  );
}
function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

useEffect(() => {
  setEmail(localStorage.getItem("rememberedEmail") || "");
  setPassword(localStorage.getItem("rememberedPassword") || "");
}, []);


  const handleLogin = (e) => {
    e.preventDefault();

    const request = {
      email: email,
      password: password
    }
    
    axios.post(`http://127.0.0.1:8000/api/auth/login`, request, 
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        console.log(`Login successful with response: ${response}`);
        setPage("main");
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login');
      });

    
    // e.preventDefault();

    // if (email === "khanh@gmail.com" && password === "123456") {
    //   alert("Đăng nhập thành công!");

    //   if (document.getElementById("remember").checked) {
    //     localStorage.setItem("rememberedEmail", email);
    //     localStorage.setItem("rememberedPassword", password);
    //   } else {
    //     localStorage.removeItem("rememberedEmail");
    //     localStorage.removeItem("rememberedPassword");
    //   }

    //   setPage("main"); 
    // } else {
    //   alert("Email hoặc mật khẩu không đúng!");
    // }
  };

  return (
    <div className="background">
      <div className="header">
      <span className="title">SStudyS</span>
      <img src={logo} alt="BK TP.HCM" className="logo" />
      </div>
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Nhớ đăng nhập</label>
          </div>
          <button type="submit">Xác nhận</button>
        </form>
      </div>
    </div>
  );
}
function SpaceSelection({ setPage }) {
  return (
    <div className="background">
      <div className="header">
        <span className="title">SStudyS</span>
        <img src={logo} alt="BK TP.HCM" className="logo" />
        <button className="back-box" onClick={() => setPage("main")}>Quay lại</button>
      </div>
      <span className="help-box">Lịch sử</span>
      <h2>Chọn không gian</h2>
      <div className="space-options">
      <div className="space-card" onClick={() => setPage("search")}>
          <span className="icon">👤</span>
          <p>Single</p>
        </div>
        <div className="space-card" onClick={() => setPage("search")}>
          <span className="icon">👥</span>
          <p>Multiple</p>
        </div>
        <div className="space-card" onClick={() => setPage("search")}>
          <span className="icon">📄</span>
          <p>MeetingRoom</p>
        </div>
      </div>
    </div>
  );
}

function SearchSpace({ setPage, setSelectedRoom }) {
  const [searchTerm, setSearchTerm] = useState(""); 
  const rooms = [
    { court: "BK.B1", floor: 1, room: "103" },
    { court: "BK.B1", floor: 1, room: "104" },
    { court: "BK.B1", floor: 2, room: "205" },
    { court: "BK.B1", floor: 2, room: "206" },
    { court: "BK.B1", floor: 3, room: "304" },
    { court: "BK.B1", floor: 3, room: "305" }
  ];

  const filteredRooms = rooms.filter(
    (room) =>
      room.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.room.includes(searchTerm)
  );

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setPage("booking");
  };

  return (
    <div className="background">
      <div className="header">
        <span className="title">SStudyS</span>
        <img src={logo} alt="BK TP.HCM" className="logo" />
        <button className="back-box" onClick={() => setPage("space")}>Quay lại</button>
      </div>
      <h2>Chọn phòng học</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm phòng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="room-list">
        {filteredRooms.map((room, index) => (
          <div key={index} className="room-card" onClick={() => handleSelectRoom(room)}>
            Court: {room.court} | Floor: {room.floor} | Room: {room.room}
          </div>
        ))}
      </div>
    </div>
  );
}
function BookingConfirmation({ setPage, room }) {
  const [name, setName] = useState("");
  const [mssv, setMssv] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState({
    light: false,
    fan: false,
    wifi: false,
    board: false,
    power: false,
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("vi-VN");
    setCurrentDate(formattedDate);
  }, []);

  const handleConfirm = () => {
    if (!name || !mssv) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    
    alert(`Đặt phòng thành công!\nTên: ${name}\nMSSV: ${mssv}\nPhòng: ${room.room}\nNgày: ${currentDate}`);
    setPage("spaceSetting");
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  if (!room) return <div>Không có phòng nào được chọn!</div>;

  return (
    <div className="background">
      <div className="header">
        <span className="title">SStudyS</span>
        <img src={logo} alt="BK TP.HCM" className="logo" />
        <button className="back-box" onClick={() => setPage("search")}>Quay lại</button>
        </div>
      <h2>Booking confirmation</h2>
      <div className="confirmation-box">
        <div className="input-group">
          <label>Tên:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên của bạn" required />
        </div>
        <div className="input-group">
          <label>MSSV:</label>
          <input type="text" value={mssv} onChange={(e) => setMssv(e.target.value)} placeholder="Nhập MSSV" required />
        </div>
        <p><strong>Court:</strong> {room.court} | <strong>Floor:</strong> {room.floor} | <strong>Room:</strong> {room.room}</p>
        <p><strong>Date:</strong> {currentDate}</p>
        <p><strong>Usage time:</strong> 180 phút</p>

        {/* Hiển thị thiết bị phòng */}
        <div className="room-features">
          <button className={`feature-btn ${selectedFeatures.light ? "selected" : ""}`} onClick={() => toggleFeature("light")}>
            <span>💡</span> Light
          </button>
          <button className={`feature-btn ${selectedFeatures.fan ? "selected" : ""}`} onClick={() => toggleFeature("fan")}>
            <span>🌀</span> Fan
          </button>
          <button className={`feature-btn ${selectedFeatures.wifi ? "selected" : ""}`} onClick={() => toggleFeature("wifi")}>
            <span>📶</span> WIFI
          </button>
          <button className={`feature-btn ${selectedFeatures.board ? "selected" : ""}`} onClick={() => toggleFeature("board")}>
            <span>📱</span> Board
          </button>
          <button className={`feature-btn power-btn ${selectedFeatures.power ? "selected" : ""}`} onClick={() => toggleFeature("power")}>
            <span>⚡</span> Power outlet
          </button>
        </div>

        <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}
function MainPage({ setPage }) {
  return (
    <div className="background">
      <div className="header">
        <span className="title">SStudyS</span>
        <img src={logo} alt="BK TP.HCM" className="logo" />
      </div>
      <span className="help-box">Lịch sử</span>
      <div className="main-container">
        <div className="space-options">
          <div className="space-card" onClick={() => setPage("space")}>
            <span className="icon">📜</span> 
            <p>Study Space</p>
          </div>
          <div className="space-card" onClick={() => setPage("space")}>
            <span className="icon">💼</span> 
            <p>Setting</p>
          </div>
      </div>
    </div>
    </div>
  );
}

export default App;