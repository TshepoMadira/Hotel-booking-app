import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPlatform.css'

function BookingPlatform({ onSearch }) {
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [roomType, setRoomType] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch({ checkinDate, checkoutDate, roomType });
        navigate('/'); 
    };

    const handleLogout = () => {
       
        console.log("Logging out..."); 
        navigate('/'); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                        <option value="suite">Suite</option>
                    </select>
                </label>
                <button type="submit">Check Availability</button>
            </form>
            <button onClick={handleLogout} style={{ marginTop: '20px' }}>
                Logout
            </button>
        </div>
    );
}

export default BookingPlatform;
