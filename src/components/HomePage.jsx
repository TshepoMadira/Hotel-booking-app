import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from './Navbar';
import './HomePage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: '', rating: '', comment: '' }); // Reset form
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="image-container">
        <img
          src="src/assets/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg"
          alt="Hotel"
          className="hotel-image"
        />
        <p className="image-message border-box">
          "First time guests typically choose Paragon because it is well situated in Brits, but they return because of the award-winning service they received. Owner Paragon."
        </p>
      </div>

      <div className="container">
        <div className="room-offers">
          <h2>Room Offers</h2>
          <Link to="/king-suite-details">
            <div className="room-card">
              <h3>King Suite</h3>
              <img
                src="src/assets/images/unnamed (1).jpg"
                alt="King Suite"
                className="room-image"
              />
              <p className="room-price">R5000</p>
              <div className='room-description-container'>
                <p className="room-description">
                  -Two bathrooms with double sink vanity<br />
                  -Flat screen TV<br />
                  -Full size sofa with lounge chairs<br />
                  -Free Uncapped wifi<br />
                  -Private Balcony
                </p>
              </div>
            </div>
          </Link>
          <Link to="/queen-suite-details">
          <div className="room-card">
            <h3>Queen Suite</h3>
            <img
              src="src/assets/images/unnamed (2).jpg"
              alt="Queen Suite"
              className="room-image"
            />
            <p className="room-price">R5100</p>
            <div className='room-description-container'>
              <p className="room-description">
                -Queen size bed with plus pillows and high-quality linens<br />
                -Spacious bathroom with separate shower and bathtub<br />
                -Flatscreen TV with premium channels
              </p>
            </div>
          </div>
          </Link>
          <Link to="/guest-room-details">
          <div className="room-card">
            <h3>Guest Room</h3>
            <img
              src="src/assets/images/unnamed (3).jpg"
              alt="Guest Room"
              className="room-image"
            />
            <p className="room-price">R2500</p>
            <div className="room-description-container">
              <p className="room-description">
                - Comfortable bed<br />
                - Single vanity with high-end fixtures<br />
                - Complimentary breakfast<br />
                - Flat screen TV with premium channels<br />
                - Sofa bed for extra sleep
              </p>
            </div>
          </div>
          </Link>
        </div>

        <div className="booking-form">
          <div className="date-picker">
            <label className='label-Check-In'>
              Check-In:
              <input type="date" />
            </label>
            <label className='label-Check-Out'>
              Check-Out:
              <input type="date" />
            </label>
          </div>
          <div className="guests-container">
            <div className="guests">
              <div className="guest-group">
                <label className="Label">Adults</label>
                <button onClick={() => decrement(setNumAdults, numAdults)}>-</button>
                <span className="number">{numAdults}</span>
                <button onClick={() => increment(setNumAdults, numAdults)}>+</button>
              </div>
              <div className="guest-group">
                <label className="Label">Children</label>
                <button onClick={() => decrement(setNumChildren, numChildren)}>-</button>
                <span className="number">{numChildren}</span>
                <button onClick={() => increment(setNumChildren, numChildren)}>+</button>
              </div>
            </div>
          </div>
          <Link to="/signup">
            <button className="check-availability-button">Check Availability</button>
          </Link>
        </div>

        {/* Review Form */}
        <div className="review-section">
          <h2>Leave a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <label>
              Name:
              <input 
                type="text" 
                value={newReview.name} 
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} 
              />
            </label>
            <label>
              Rating (1-5):
              <input 
                type="number" 
                min="1" 
                max="5" 
                value={newReview.rating} 
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} 
              />
            </label>
            <label>
              Comment:
              <textarea 
                value={newReview.comment} 
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>

        {/* Display Reviews */}
        <div className="reviews-display">
          <h2>Guest Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <h4>{review.name}</h4>
                <p>Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave a review!</p>
          )}
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-branding">
                <h1>Paragon Hotel</h1>
                <p className="slogan">Model of Excellence and Perfection</p>
              </div>
            </div>
            <div className="footer-links">
              <div className="center-links">
                <Link to="/aboutus">About Us</Link>
                <br />
                <Link to="/contactus">Contact Us</Link>
                <br />
                <Link to="/faqs">FAQs</Link>
                <br />
                <Link to="/termsandconditions">Terms and Conditions</Link>
              </div>
            </div>
            <div className="social-media-links">
              <a href="https://twitter.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com/YourHotelPage" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/YourHotelChannel" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <p className="pp">© 2024 Paragon International Limited. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
