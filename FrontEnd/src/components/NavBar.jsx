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
        {isAuthenticated ? (
            <li>
            <Link
              to="/main"
              className={`nav-link ${location.pathname === '/main' ? 'active' : ''}`}
            >
              Trang chủ
            </Link>
            <Link
                  to="/space"
                  className={`nav-link ${location.pathname === '/space' ? 'active' : ''}`}
                >
                  Không gian học
                </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Đăng nhập
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
            </>
          )}
        </ul>
        <ul className="navbar-links right">
          {isAuthenticated ? (
            <li>
            <Link
              to="/history"
              className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
            >
              Lịch sử
            </Link>
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