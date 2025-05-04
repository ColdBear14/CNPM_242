import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import UserSelection from './pages/UserSelection';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import SpaceSelection from './pages/SpaceSelection';
import AdminSelection from './pages/manager/AdminSelection';
import SearchSpace from './pages/SearchSpace';
import BookingConfirmation from './pages/BookingConfirmation';
import './assets/App.css';
import AdminLogin from './pages/manager/AdminLogin';
import History from './pages/History';
import HistoryDetail from './pages/HistoryDetail';
import SpaceSettingSearch from './pages/SpaceSettingSearch';
import SpaceSettingDetail from './pages/SpaceSettingDetail';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Khởi tạo trạng thái từ localStorage
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  // Đồng bộ isAuthenticated với localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="container">
        <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <MainPage /> : <Home />} />
            <Route path="/user-selection" element={<UserSelection />} />
            <Route path="/adminlogin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />

            <Route path="/main" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <MainPage /> </ProtectedRoute>}/>
            <Route path="/space" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <SpaceSelection /> </ProtectedRoute>}/>
            <Route path="/adminselection" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <AdminSelection /> </ProtectedRoute>}/>
            <Route path="/search" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <SearchSpace /> </ProtectedRoute>}/>
            <Route path="/history" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <History /></ProtectedRoute>}/>
            <Route path="/booking" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <BookingConfirmation /></ProtectedRoute>}/>
            <Route path="/historydetail" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <HistoryDetail /></ProtectedRoute>}/>
            <Route path="/settingsearch" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <SpaceSettingSearch /></ProtectedRoute>}/>
            <Route path="/settingdetail" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <SpaceSettingDetail /></ProtectedRoute>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;