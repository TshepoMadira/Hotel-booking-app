import React from 'react';
import { Link } from 'react-router-dom';
import './KingSuiteDetails.css';

const KingSuiteDetails = () => {
  return (
    <div className="king-suite-details">
      {/* <h1 className='kingsuite'>King Suite Details</h1> */}

      <div className="suite-section">
        <img
          src="src/assets/images/a138761a-4376-4250-9001-fef79a7d493b.jfif"
          alt="King Suite Bedroom"
          className="suite-image"
        />
        <p className="suite-description">
          - The luxury king suite includes two sofas with a table next to the sofas with brown colors that match the bedding.<br />
          - Maximum occupancy is two persons.<br />
          - We offer 24-hour room service.<br />
          - Amenities include free Wi-Fi and premium TV channels.
        </p>
        {/* <p className="suite-price">R5000</p> */}
      </div>

      <div className="suite-section">
        <img
          src="src/assets/images/White Shower Wall Tile Ideas with a Black Contrast for a Contemporary Bathroom.jpeg"
          alt="King Suite Bathroom"
          className="suite-image"
        />
        <p className="suite-description">
          - The bathroom features a modern design with a walk-in shower and a separate bathtub.<br />
          - Complimentary toiletries and towels are provided.<br />
          - The bathroom also includes a hairdryer and a spacious vanity area.
        </p>
      </div>

      <div className="suite-section">
        <img
          src="src/assets/images/Лоджия.jpeg"
          alt="King Suite Balcony"
          className="suite-image"
        />
        <p className="suite-description">
          - The balcony offers a beautiful view of the city skyline and the surrounding landscape.<br />
          - Equipped with a small table and chairs for relaxation.<br />
          - Enjoy your morning coffee or evening drinks while taking in the view.
        </p>
      </div>

      <div className="buttons">
        
        <Link to="/" className="back-to-home-btn">
          Back to Home
        </Link>
        
        
        <Link to="/signup" className="book-button">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default KingSuiteDetails;
