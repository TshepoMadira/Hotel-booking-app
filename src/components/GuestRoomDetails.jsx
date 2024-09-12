import React from 'react';
import { Link } from 'react-router-dom';
import './GuestRoom.css';

const GuestRoomDetails = () => {
  return (
    <div className="guest-room-details">
      <h1>Guest Room Details</h1>
      <img
        src="src/assets/images/1edfe4de-697e-4803-8d33-76f9795c2e14.jfif"
        alt="Guest Room"
        className="guest-room-image"
      />
      <p className="guest-room-description">
        - The luxury guest room includes two sofas with a table next to the sofas, featuring brown colors that match the bedding.<br />
        - Maximum occupancy for our luxury suites is two persons.<br />
        - We offer 24hr service delivery to the room.<br />
        - Amenities include free Wi-Fi, premium TV channels, and more.
      </p>
      <p className="guest-room-price">R2500</p>

      
      <div className="kitchen-details">
        <h2>Kitchen Details</h2>
        <img
          src="src/assets/images/Kitchenette Ideas for Compact and Efficient Cooking Spaces.jpeg" // Replace with your kitchen image path
          alt="Kitchen Area"
          className="kitchen-image"
        />
        <p className="kitchen-description">
          - The guest room includes a modern, fully equipped kitchen with all essential appliances.<br />
          - Appliances include a microwave, refrigerator, electric kettle, and stove.<br />
          - A dining area is also available, complete with a dining table and chairs.<br />
          - The kitchen is stocked with complimentary tea, coffee, bottled water, and basic utensils to cater to your cooking needs.
        </p>
      </div>

      <div className="buttons">
        
        <Link to="/" className="button">
          Back to Home
        </Link>

        
        <Link to="/signup" className="button">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default GuestRoomDetails;
