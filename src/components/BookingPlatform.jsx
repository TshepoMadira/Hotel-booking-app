
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton'; 
import { db } from './Firebase'; 
import { collection, getDocs, addDoc } from 'firebase/firestore';
import ReviewRating from './ReviewRating'; 
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
    const [accommodations, setAccommodations] = useState([]); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [bookingId, setBookingId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'accommodations'));
            const fetchedAccommodations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAccommodations(fetchedAccommodations);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching accommodations:', err);
            setError('Failed to load available rooms. Please try again later.');
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        if (!roomType) {
            setError('Please select a room type.');
            return;
        }
        if (new Date(checkinDate) >= new Date(checkoutDate)) {
            setError('Check-out date must be after check-in date.');
            return;
        }
        if (!fullName || !email || !phoneNumber) {
            setError('Please provide your name, email, and phone number.');
            return;
        }

        const selectedRoom = accommodations.find(room => room.id === roomType);
        if (!selectedRoom) {
            setError('Selected room type is invalid.');
            return;
        }

        const totalAmount = selectedRoom.price * Number(numRooms);
        setBookingAmount(totalAmount);

        setIsPaymentStep(true); 
    };

    const handlePaymentSuccess = async (details) => {
        console.log("Payment successful:", details);
        console.log("Booking details:", { checkinDate, checkoutDate, roomType, numRooms, numAdults, numChildren, fullName, email, phoneNumber, bookingAmount });
        alert("Payment is confirmed!");

        try {
            const bookingRef = await addDoc(collection(db, 'bookings'), {
                checkinDate,
                checkoutDate,
                roomType,
                numRooms,
                numAdults,
                numChildren,
                fullName,
                email,
                phoneNumber,
                bookingAmount,
                paymentDetails: details,
                bookedAt: new Date()
            });
            console.log('Booking saved to Firestore.');
            setBookingId(bookingRef.id); 

            navigate('/confirmation', {
                state: {
                    checkinDate,
                    checkoutDate,
                    roomType: accommodations.find(room => room.id === roomType)?.name || roomType,
                    numRooms,
                    numAdults,
                    numChildren,
                    fullName,
                    email,
                    phoneNumber,
                    bookingAmount,
                    id: bookingRef.id 
                }
            });
        } catch (err) {
            console.error('Error saving booking:', err);
            setError('Failed to save booking details. Please contact support.');
        }
    };

    const handleReviewSubmitted = () => {
        
    };

    if (loading) {
        return <div>Loading available rooms...</div>;
    }

    return (
        <div className="booking-platform">
            <h1 className='Booking-platform-heading'>Booking Platform</h1>
            {!isPaymentStep ? (
                <form onSubmit={handleSubmit} className="booking-form">
                    <label>
                        Full Name:
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email Address:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </label>
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
                            {accommodations.map(room => (
                                <option key={room.id} value={room.id}>
                                    {room.name} - ${room.price} per room
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Number of Rooms:
                        <input
                            type="number"
                            min="1"
                            value={numRooms}
                            onChange={(e) => setNumRooms(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label>
                        Number of Adults:
                        <input
                            type="number"
                            min="1"
                            value={numAdults}
                            onChange={(e) => setNumAdults(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label>
                        Number of Children:
                        <input
                            type="number"
                            min="0"
                            value={numChildren}
                            onChange={(e) => setNumChildren(Number(e.target.value))}
                        />
                    </label>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className='submit-btn' type="submit">Submit</button>
                </form>
            ) : (
                <div className="payment-section">
                    <h3>Total Amount: ${bookingAmount}</h3>
                    <PayPalButton amount={bookingAmount} onSuccess={handlePaymentSuccess} />
                    <ReviewRating bookingDetails={{ id: bookingId, roomType: accommodations.find(room => room.id === roomType)?.name || roomType }} onReviewSubmitted={handleReviewSubmitted} />
                </div>
            )}
        </div>
    );
}

export default BookingPlatform;
