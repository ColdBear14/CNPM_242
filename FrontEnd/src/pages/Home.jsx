import React from 'react';
import { useNavigate } from 'react-router-dom';
const singleRoom = 'https://via.placeholder.com/500x300?text=Phòng+Cá+Nhân';
const groupRoom = 'https://via.placeholder.com/500x300?text=Phòng+Nhóm';
const meetingRoom = 'https://via.placeholder.com/500x300?text=Phòng+Họp';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Khám phá SStudyS</h1>
          <p className="hero-subtitle">
            Không gian học tập thông minh cho mọi nhu cầu - từ cá nhân đến nhóm
          </p>
          <div className="hero-buttons">
          <button className="hero-button primary" onClick={() => navigate('/register')}>
              Đăng ký
            </button>
            <button className="hero-button primary" onClick={() => navigate('/user-selection')}>
              Đăng nhập
            </button>
            <button className="hero-button secondary" onClick={() => navigate('/space')}>
              Tìm không gian ngay
            </button>
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="about-content">
          <h2>Giới thiệu về SStudyS</h2>
          <p>
            SStudyS là hệ thống quản lý không gian học tập thông minh, giúp sinh viên, cán bộ và khách dễ dàng tìm kiếm và đặt chỗ các phòng học phù hợp.
          </p>
          <div className="about-image">
            <img src={singleRoom} alt="Không gian học tập" />
          </div>
        </div>
      </section>
      <section className="features-section">
        <h2>Tại sao chọn SStudyS?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📅</span>
            <h3>Đặt phòng dễ dàng</h3>
            <p>Chỉ vài cú nhấp chuột để chọn không gian phù hợp.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🏢</span>
            <h3>Không gian đa dạng</h3>
            <p>Phòng cá nhân, nhóm, họp - tất cả đều có sẵn.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚙️</span>
            <h3>Quản lý thông minh</h3>
            <p>Theo dõi lịch sử và tùy chỉnh tiện ích.</p>
          </div>
        </div>
      </section>
      <section className="spaces-section">
        <h2>Khám phá không gian học tập</h2>
        <div className="spaces-grid">
          <div className="space-card">
            <img src={singleRoom} alt="Phòng cá nhân" />
            <h3>Phòng cá nhân</h3>
            <p>Không gian yên tĩnh cho học tập cá nhân.</p>
          </div>
          <div className="space-card">
            <img src={groupRoom} alt="Phòng nhóm" />
            <h3>Phòng nhóm</h3>
            <p>Thoải mái thảo luận và làm việc nhóm.</p>
          </div>
          <div className="space-card">
            <img src={meetingRoom} alt="Phòng họp" />
            <h3>Phòng họp</h3>
            <p>Trang bị đầy đủ cho họp và thuyết trình.</p>
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <h2>Người dùng nói gì?</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Tìm phòng nhanh chóng, rất tiện lợi!"</p>
            <h4>- Minh Anh, Sinh viên</h4>
          </div>
          <div className="testimonial-card">
            <p>"Giao diện dễ dùng, đặt phòng nhóm cực nhanh."</p>
            <h4>- Hoàng Nam, Cán bộ</h4>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Sẵn sàng bắt đầu?</h2>
        <p>Tham gia ngay để trải nghiệm không gian học tập thông minh!</p>
        <button className="cta-button" onClick={() => navigate('/user-selection')}>
          Bắt đầu ngay
        </button>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SStudyS</h3>
            <p>Hệ thống không gian học tập thông minh.</p>
          </div>
          <div className="footer-section">
            <h3>Liên kết nhanh</h3>
            <ul>
              <li><button onClick={() => navigate('/')}>Trang chủ</button></li>
              <li><button onClick={() => navigate('/user-selection')}>Đăng nhập</button></li>
              <li><button onClick={() => navigate('/space')}>Không gian học</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Liên hệ</h3>
            <p>Email: support@sstudys.com</p>
            <p>Hotline: 0123 456 789</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SStudyS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;