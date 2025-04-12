import React from 'react';

const RoomCard = ({ room, onClick }) => (
  <div className="room-card" onClick={onClick}>
    Court: {room.court} | Floor: {room.floor} | Room: {room.room}
  </div>
);

export default RoomCard;