import React, { useState } from 'react';
import Navbar from './Navbar';
import './HomePage.css';

const HomePage = () => {
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(1);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  return (
    <div className="home-page">
      <Navbar />
      <div className="image-container">
        <img
          src="src/assets/images/unnamed.jpg"
          alt="Hotel"
          className="hotel-image"
        />
        <p className="image-message">
          "First time guests typically choose Paragon because it is well situated in Brits, but they return because of the award-winning service they received. Owner Paragon."
        </p>
      </div>
      <div className="room-offers">
        <h2>Our Room Offers</h2>
        <div className="room-card">
          <img
            src="src/assets/images/unnamed (1).jpg"
            alt="King Suite"
            className="room-image"
          />
          <h3>King Suite</h3>
          <p className="room-price">R5000</p>
          <p className="room-description">
            Luxurious King Suite with stunning views and premium amenities.
          </p>
        </div>
        <div className="room-card">
          <img
            src="src/assets/images/unnamed (2).jpg"
            alt="Queen Suite"
            className="room-image"
          />
          <h3>Queen Suite</h3>
          <p className="room-price">R5100</p>
          <p className="room-description">
            Comfortable Queen Suite with elegant furnishings and great comfort.
          </p>
        </div>
        <div className="room-card">
          <img
            src="src/assets/images/unnamed (3).jpg"
            alt="Guest Room"
            className="room-image"
          />
          <h3>Guest Room</h3>
          <p className="room-price">R2500</p>
          <p className="room-description">
            Cozy Guest Room perfect for a relaxing stay.
          </p>
        </div>
      </div>
      <div className="booking-form">
        <h2>Book Your Stay</h2>
        <div className="date-picker">
          <label>
            Check-In:
            <input type="date" />
          </label>
          <label>
            Check-Out:
            <input type="date" />
          </label>
        </div>
        <div className="guests">
          <div className="guest-group">
            <label>Adults</label>
            <button onClick={() => decrement(setNumAdults, numAdults)}>-</button>
            <span>{numAdults}</span>
            <button onClick={() => increment(setNumAdults, numAdults)}>+</button>
          </div>
          <div className="guest-group">
            <label>Children</label>
            <button onClick={() => decrement(setNumChildren, numChildren)}>-</button>
            <span>{numChildren}</span>
            <button onClick={() => increment(setNumChildren, numChildren)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
