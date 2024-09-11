import React from 'react';
import { Link } from 'react-router-dom';
import './GuestRoom.css'; 

const GuestRoomDetails = () => {
  return (
    <div className="guest-room-details">
      <h1>Guest Room Details</h1>
      <img
        src="src\assets\images\1edfe4de-697e-4803-8d33-76f9795c2e14.jfif"
        alt="Guest Room"
        className="guest-room-image"
      />
      <p className="guest-room-description">
      -The luxury king suite include two sofas with a table next to the sofas with brown colors that matches with the bedding.<br />
      -Two persons is the maximum occuparancy for our Luxury suites.<br />
      -We offer 24hr service delivery to the room.<br />
      -We also have amneties (eg free wifi ,premium channels on Tv.
      </p>
      <p className="quest-room-price">R2500</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default GuestRoomDetails;
