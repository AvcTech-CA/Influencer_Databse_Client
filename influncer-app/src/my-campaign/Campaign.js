import React from 'react';
import './Campaign.css'; // Import external CSS

function Campaign() {
  return (
    <div className="campaign-container">
      <div className="campaign-card">
        <div className="campaign-header">
          <h1>All Campaigns</h1>
          <button className="create-button">+ Create Campaign</button>
        </div>

        <div className="campaign-list">
          <p className="empty-text">No campaigns available yet.</p>
        </div>
      </div>
    </div>
  );
}

export default Campaign;
