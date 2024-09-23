import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Reservationhistory.css';

function Reservationhistory() {
  const location = useLocation();
  const navigate = useNavigate();

  const { fullName, checkinDate, checkoutDate, roomType, numRooms, numAdults, numChildren, bookingAmount, review  } = location.state || {};

  const handleConfirm = () => {
    console.log("Booking confirmed!");
    navigate('/booking');
  };

  
  const handleGoToProfile = () => {
    navigate('/userprofile'); 
  };

  return (
    <div className="confirmation">
      <h2>Reservation History</h2>
      <p><strong>Full Name: </strong> {fullName}</p>
      <p><strong>Check-in Date:</strong> {checkinDate}</p>
      <p><strong>Check-out Date:</strong> {checkoutDate}</p>
      <p><strong>Room Type:</strong> {roomType}</p>
      <p><strong>Number of Rooms:</strong> {numRooms}</p>
      <p><strong>Number of Adults:</strong> {numAdults}</p>
      <p><strong>Number of Children:</strong> {numChildren}</p>
      <p><strong>Total Amount:</strong> R{bookingAmount}</p>
      
      

      <button className='enter-btn' onClick={handleConfirm}>Enter</button>
     
      <button className='gotoprofile-css'onClick={handleGoToProfile}>Go to Profile</button>
    </div>
  );
}

export default Reservationhistory;
