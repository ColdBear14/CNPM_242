import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/hcmut.png';

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Xóa trạng thái khỏi localStorage
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span>SStudyS</span>
      </div>
      <div className="navbar-content">
        <ul className="navbar-links left">
          <li>
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/space"
              className={`nav-link ${location.pathname === '/space' ? 'active' : ''}`}
            >
              Không gian học
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Tìm phòng
            </Link>
          </li>
        </ul>
        <ul className="navbar-links right">
          {isAuthenticated ? (
            <li>
              <button className="nav-link" onClick={handleLogout}>
                Đăng xuất
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                >
                  Đăng ký
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;