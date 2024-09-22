import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const { menuItems } = useSelector((state) => state.navigation);

  const handleLogout = () => {
   
    localStorage.removeItem('user');
    window.location.href = '/'; 
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
      
      <Link to='/accommodations'>
        <button className="admin-btn">Admin</button>
      </Link>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
