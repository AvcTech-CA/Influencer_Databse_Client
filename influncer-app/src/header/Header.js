import React, { useState } from 'react';
import './header.css';

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
          alt="Logo"
        />
      </div>

      <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="#">Home</a>
        <a href="#">About Us</a>
      </nav>

      <div className="nav-icons">
        <button className="sign-in-btn">Sign In</button>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
}

export default Header;
