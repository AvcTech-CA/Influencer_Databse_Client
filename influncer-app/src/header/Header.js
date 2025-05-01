import React, { useState } from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";
import { multiStepContext } from '../StepContext';

function Header() {
    const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.href = "/login";
};



  return (
    <header className="header">
      <div className="logo">
        <img
          src="/images/Logo.png"
          alt="Logo"
        />
      </div>

      <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="/home">Home</a>
        <a href="/allInfluncers">Influencers</a>
        <a href="/profile">My Profile</a>
        <a href="/campaign">My Campaigns</a>
      </nav>

      <div className="nav-icons">
        {/* {!localStorage.getItem('token') && <button className="sign-in-btn" >Sign In</button>} */}
      </div>

      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </button>

      {localStorage.getItem('token') && <button onClick={handleLogout}>logout</button>}
    </header>
  );
}

export default Header;
