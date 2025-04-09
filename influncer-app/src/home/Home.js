import React from 'react';
import './Home.css';
// import influencerCard from '../allInfluencerDisplay/InfluencerCard';
import InfluencerCard from '../influencer-Data/InfluencerCard';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Multicultural Database</h1>
          <p>Connecting cultures, people, and data to create a vibrant global network.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="features-section">
        <h2>Our Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Diverse User Profiles</h3>
            <p>Explore and connect with people from various cultures and backgrounds.</p>
          </div>
          <div className="feature-card">
            <h3>Influencer Insights</h3>
            <p>Discover cultural influencers and analyze their impact on different communities.</p>
          </div>
          <div className="feature-card">
            <h3>Data-driven Analytics</h3>
            <p>Gain insights into multicultural trends with our comprehensive database.</p>
          </div>
        </div>
      </section>

      {/* User Data Section */}
     
      
        
          {/* <influencerCard/> */}
        
      
    </div>
  );
}

export default Home;