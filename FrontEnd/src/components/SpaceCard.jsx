import React from 'react';

const SpaceCard = ({ icon, label, onClick }) => (
  <div className="space-card" onClick={onClick}>
    <span className="icon">{icon}</span>
    <p>{label}</p>
  </div>
);

export default SpaceCard;