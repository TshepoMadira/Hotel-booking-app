import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, getUserBookings, getUserFavorites } from './api';
import { getAuth } from 'firebase/auth';

function UserProfile() {
    const [profile, setProfile] = useState({});
    const [bookings, setBookings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    console.log('Fetching user profile...');
                    const userProfile = await getUserProfile(userId);
                    if (!userProfile) {
                        console.error('User profile not found');
                    } else {
                        console.log('User profile:', userProfile);
                        setProfile(userProfile); 
                    }
    
                    console.log('Fetching user bookings...');
                    const userBookings = await getUserBookings(userId);
                    if (userBookings.length === 0) {
                        console.error('No user bookings found');
                    } else {
                        console.log('User bookings:', userBookings);
                        setBookings(userBookings); 
                    }
    
                    console.log('Fetching user favorites...');
                    const userFavorites = await getUserFavorites(userId);
                    if (userFavorites.length === 0) {
                        console.error('No user favorites found');
                    } else {
                        console.log('User favorites:', userFavorites);
                        setFavorites(userFavorites); 
                    }
    
                    setFormData(userProfile || {}); 
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            fetchData();
        }
    }, [userId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (userId) {
            try {
                await updateUserProfile(userId, formData);
                setProfile(formData);
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="user-profile">
            <h1 className='userprofile'>User Profile</h1>
            <div className="profile-info">
                {isEditing ? (
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                readOnly
                            />
                        </label>
                        <button onClick={handleSaveClick}>Save</button>
                    </div>
                ) : (
                    <div>
                        <p>Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        <button onClick={handleEditClick}>Edit</button>
                    </div>
                )}
            </div>
            <div className="booking-history">
                <h2>Booking History</h2>
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            {booking.date} - {booking.roomType} - {booking.status}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="favorite-accommodations">
                <h2>Favorite Accommodations</h2>
                <ul>
                    {favorites.map((accommodation, index) => (
                        <li key={index}>
                            {accommodation.name} - {accommodation.location}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserProfile;
