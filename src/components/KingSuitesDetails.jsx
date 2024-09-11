import React from 'react';
import { Link } from 'react-router-dom';
import './KingSuiteDetails.css'; 

const KingSuiteDetails = () => {
  return (
    <div className="king-suite-details">
      <h1>King Suite Details</h1>
      <img
        src="src\assets\images\a138761a-4376-4250-9001-fef79a7d493b.jfif"
        alt="King Suite"
        className="king-suite-image"
      />
      <p className="king-suite-description">
      -The luxury king suite include two sofas with a table next to the sofas with brown colors that matches with the bedding.<br />
      -Two persons is the maximum occuparancy for our Luxury suites.<br />
      -We offer 24hr service delivery to the room.<br />
      -We also have amneties (eg free wifi ,premium channels on Tv.
      </p>
      <p className="king-suite-price">R5000</p>
      <Link to="/">Back to Home</Link>
    </div>
    
    
    
  );
};

export default KingSuiteDetails;
