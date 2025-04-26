import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceCard from '../components/SpaceCard';

const SpaceSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="space-selection-container">
        <h2 className="space-title">Chọn không gian học tập</h2>
        <div className="space-options">
          <SpaceCard icon="👤" label="Phòng cá nhân" onClick={() => navigate('/search')} />
          <SpaceCard icon="👥" label="Phòng nhóm" onClick={() => navigate('/search')} />
          <SpaceCard icon="📄" label="Phòng họp" onClick={() => navigate('/search')} />
        </div>
      </div>
    </div>
  );
};

export default SpaceSelection;