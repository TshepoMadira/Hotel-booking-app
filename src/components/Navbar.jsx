import React from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';
import { Link } from 'react-router-dom'; 


const Navbar = () => {
  const { menuItems } = useSelector((state) => state.navigation);

  
  const handleBookClick = () => {
    // window.location.href = '/book';
  };

  return (
    <nav className="navbar">
      <div className="logo">Paragon Hotel</div>
      
      <ul className="nav-links">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={`/${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
          </li>
        ))}
      </ul>
      <Link to='/signup'>
      <button className="book-btn" onClick={handleBookClick}>Book</button>
      </Link>
    </nav>
  );
};

export default Navbar;
