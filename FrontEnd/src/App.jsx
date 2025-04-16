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
import AdminSelection from './pages/AdminSelection';
import SearchSpace from './pages/SearchSpace';
import BookingConfirmation from './pages/BookingConfirmation';
import './assets/App.css';
import AdminLogin from './pages/AdminLogin';

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
            <Route path="/" element={<Home />} />
            <Route path="/user-selection" element={<UserSelection />} />
            <Route path="/adminlogin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/main"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/space"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SpaceSelection />
                </ProtectedRoute>
              }
            />
                        <Route
              path="/adminselection"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SearchSpace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;