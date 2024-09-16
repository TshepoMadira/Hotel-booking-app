import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton'; 
import './Booking.css';

function BookingPlatform() {
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [roomType, setRoomType] = useState('');
    const [numRooms, setNumRooms] = useState(1);
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [isPaymentStep, setIsPaymentStep] = useState(false); 
    const [bookingAmount, setBookingAmount] = useState(0); 

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        
        const roomPrices = {
            king: 5000,
            queen: 5100,
            guest: 2500,
        };
        const totalAmount = roomPrices[roomType] * numRooms;
        setBookingAmount(totalAmount);

       
        setIsPaymentStep(true); 
    };

    const handlePaymentSuccess = (details) => {
        console.log("Payment successful:", details);
        console.log("Booking details:", { checkinDate, checkoutDate, roomType, numRooms, numAdults, numChildren, bookingAmount });
        alert("Payment is confirmed!");
       
        navigate('/confirmation'); 
        state: {
            checkinDate,
            checkoutDate,
            roomType,
            numRooms,
            numAdults,
            numChildren,
            bookingAmount
        }
    
    };

    // const handleLogout = () => {
    //     console.log("Logging out...");
    //     navigate('/');
    // };

    return (
        <div className="booking-platform">
            <h1 className='Booking-platform-heading'>Booking Platform</h1>
            {!isPaymentStep ? (
                <form onSubmit={handleSubmit} className="booking-form">
                    <label>
                        Check-in Date:
                        <input
                            type="date"
                            value={checkinDate}
                            onChange={(e) => setCheckinDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Check-out Date:
                        <input
                            type="date"
                            value={checkoutDate}
                            onChange={(e) => setCheckoutDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Room Type:
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            required
                        >
                            <option value="">Select a room type</option>
                            <option value="king">King Suites</option>
                            <option value="queen">Queen Suites</option>
                            <option value="guest">Guest Rooms</option>
                            
                        </select>
                    </label>
                    <label>
                        Number of Rooms:
                        <input
                            type="number"
                            min="0"
                            value={numRooms}
                            onChange={(e) => setNumRooms(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Number of Adults:
                        <input
                            type="number"
                            min="0"
                            value={numAdults}
                            onChange={(e) => setNumAdults(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Number of Children:
                        <input
                            type="number"
                            min="0"
                            value={numChildren}
                            onChange={(e) => setNumChildren(e.target.value)}
                        />
                    </label>
                    <button  className='submit-btn' type="submit">Submit</button>
                </form>
            ) : (
                <div className="payment-section">
                    <h3>Total Amount: R{bookingAmount}</h3>
                    <PayPalButton amount={bookingAmount} onSuccess={handlePaymentSuccess} />
                </div>
            )}
            {/* <button onClick={handleLogout} style={{ marginTop: '20px' }}>
                Logout
            </button> */}
        </div>
    );
}

export default BookingPlatform;
