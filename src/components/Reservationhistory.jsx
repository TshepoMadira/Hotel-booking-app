import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Reservationhistory.css';

function Reservationhistory () {
    const location = useLocation();
    const navigate = useNavigate();
    
    
    const { FullName ,checkinDate, checkoutDate, roomType, numRooms, numAdults, numChildren, bookingAmount, Review } = location.state || {};

    const handleConfirm = () => {
        console.log("Booking confirmed!");
        // alert("Booking is confirmed!");
        
       
        navigate('/booking');
    };

    return (
        <div className="confirmation">
            <h2>Reservvation History</h2>
            <p><strong>Full Name: </strong> {FullName}</p>
            <p><strong>Check-in Date:</strong> {checkinDate}</p>
            <p><strong>Check-out Date:</strong> {checkoutDate}</p>
            <p><strong>Room Type:</strong> {roomType}</p>
            <p><strong>Number of Rooms:</strong> {numRooms}</p>
            <p><strong>Number of Adults:</strong> {numAdults}</p>
            <p><strong>Number of Children:</strong> {numChildren}</p>
            <p><strong>Total Amount:</strong> R{bookingAmount}</p>
            {/* <p><strong>Reviews: </strong> {Review}</p> */}

            

            <button onClick={handleConfirm}>Enter</button>
        </div>
    );
}

export default Reservationhistory;
