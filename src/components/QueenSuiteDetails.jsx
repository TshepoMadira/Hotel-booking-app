import React from 'react';
import { Link } from 'react-router-dom';
import './QueenSuiteDetails.css'; 

const QueenSuiteDetails = () => {
  return (
    <div className="queen-suite-details">
      <h1>Queen Suite Details</h1>
      <img
        src="src\assets\images\Ralph Wide Base King Sized Bed Frame - Black Velvet with Storage.jfif"
        alt="Queen Suite"
        className="queen-suite-image"
      />
      <p className="queen-suite-description">
      -The luxury king suite include two sofas with a table next to the sofas with brown colors that matches with the bedding.<br />
      -Two persons is the maximum occuparancy for our Luxury suites.<br />
      -We offer 24hr service delivery to the room.<br />
      -We also have amneties (eg free wifi ,premium channels on Tv.
      </p>
      <p className="queen-suite-price">R5100</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default QueenSuiteDetails;
