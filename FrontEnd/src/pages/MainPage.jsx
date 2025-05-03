import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceCard from '../components/SpaceCard';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="main-container">
        <h2 className="main-title">Chào mừng đến với SStudyS</h2>
        <div className="space-options">
          <SpaceCard
            icon="📜"
            label="Study Space"
            onClick={() => navigate('/space')}
          />
          <SpaceCard
            icon="💼"
            label="Setting"
            onClick={() => navigate('/space')}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;