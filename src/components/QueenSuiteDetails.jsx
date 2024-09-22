import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/QueenSuiteDetails.css';

const QueenSuiteDetails = () => {
  return (
    <div className="queen-suite-details">
      {/* <h1 className='Queensuite'>Queen Suite Details</h1> */}
      <img
        src="src/assets/images/Ralph Wide Base King Sized Bed Frame - Black Velvet with Storage.jfif"
        alt="Queen Suite"
        className="queen-suite-image"
      />
      <p className="queen-suite-description">
        - The luxury queen suite includes two sofas with a table next to the sofas with brown colors that match the bedding.<br />
        - Maximum occupancy for our luxury suites is two persons.<br />
        - We offer 24hr service delivery to the room.<br />
        - Amenities include free Wi-Fi, premium channels on TV, and more.
      </p>
      {/* <p className="queen-suite-price">R5100</p> */}

      <div className="lounge-details">
        <h2 className='heading'>Lounge Details</h2>
        <img
          src="src/assets/images/Bespoke fitted furniture hand made in the UK by Empatika.jpeg"
          alt="Lounge"
          className="lounge-image"
        />
        <p className="lounge-description">
          - Our lounge is elegantly designed with comfortable seating areas and soft lighting to create a relaxing ambiance.<br />
          - Enjoy complimentary refreshments and snacks while you relax.<br />
          - The lounge area is open 24/7 with access to high-speed internet and a variety of magazines and newspapers.<br />
          - We also have a dedicated staff to cater to your needs while you relax in our lounge.
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

export default QueenSuiteDetails;
