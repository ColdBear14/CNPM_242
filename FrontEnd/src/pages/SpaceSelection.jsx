import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceCard from '../components/SpaceCard';

const SpaceSelection = () => {
  const navigate = useNavigate();

  const handleClick = async (type) => {
    try {
      const res = await fetch(`http://localhost:8000/spaces/type/${type}`);
      const json = await res.json();

      navigate('/search', { state: { rooms: json.data, type } });
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  return (
    <div className="background">
      <div className="space-selection-container">
        <h2 className="space-title">Chọn không gian học tập</h2>
        <div className="space-options">
          <SpaceCard icon="👤" label="Phòng cá nhân" onClick={() => handleClick('single')} />
          <SpaceCard icon="👥" label="Phòng nhóm" onClick={() => handleClick('group')} />
          <SpaceCard icon="📄" label="Phòng họp" onClick={() => handleClick('meeting')} />
        </div>
        <button className="back-button" onClick={() => navigate('/main')}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default SpaceSelection;
