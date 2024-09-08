import React from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const { menuItems } = useSelector((state) => state.navigation);

  // Navigate to the booking page when "Book" button is clicked
  const handleBookClick = () => {
    window.location.href = '/book'; // Change '/book' to your desired booking page route
  };

  return (
    <nav className="navbar">
      <div className="logo">Aragon Hotel</div>
      <ul className="nav-links">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
          </li>
        ))}
      </ul>
      <button className="book-btn" onClick={handleBookClick}>
        Book
      </button>
    </nav>
  );
};

export default Navbar;
