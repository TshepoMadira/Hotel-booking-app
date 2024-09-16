import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

function ConfirmationBooking () {
    const location = useLocation();
    const navigate = useNavigate();
    
    
    const { checkinDate, checkoutDate, roomType, numRooms, numAdults, numChildren, bookingAmount } = location.state || {};

    const handleConfirm = () => {
        console.log("Booking confirmed!");
       
        navigate('/');
    };

    return (
        <div className="confirmation">
            <h2>Booking Confirmation</h2>
            <p><strong>Check-in Date:</strong> {checkinDate}</p>
            <p><strong>Check-out Date:</strong> {checkoutDate}</p>
            <p><strong>Room Type:</strong> {roomType}</p>
            <p><strong>Number of Rooms:</strong> {numRooms}</p>
            <p><strong>Number of Adults:</strong> {numAdults}</p>
            <p><strong>Number of Children:</strong> {numChildren}</p>
            <p><strong>Total Amount:</strong> R{bookingAmount}</p>

            <button onClick={handleConfirm}>Confirm Booking</button>
        </div>
    );
}

export default ConfirmationBooking;
