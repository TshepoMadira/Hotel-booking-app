import React, { useState, useEffect } from 'react';
// import { getUserProfile, updateUserProfile, getUserBookings, getUserFavorites } from './api'; 

function UserProfile() {
    const [profile, setProfile] = useState({});
    const [bookings, setBookings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
      
        async function fetchData() {
            const userProfile = await getUserProfile();
            const userBookings = await getUserBookings();
            const userFavorites = await getUserFavorites();

            setProfile(userProfile);
            setBookings(userBookings);
            setFavorites(userFavorites);
            setFormData(userProfile);
        }

        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        await updateUserProfile(formData);
        setProfile(formData);
        setIsEditing(false);
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
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
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
