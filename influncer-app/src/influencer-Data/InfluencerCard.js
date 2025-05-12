import React, { useState, useEffect } from "react";
import "./InfluencerCard.css";
import { useNavigate } from 'react-router-dom';
import InfluencerDetails from "../influencerDetails/InfluencerDetails";
import API_BASE_URL from "../apiconfig";

const InfluencerCard = () => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nameSearch, setNameSearch] = useState('');
  const [geoLocationSearch, setGeoLocationSearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');
  const [ContentNicheSearch,setContentNicheSearch]=useState('');
  const[ReligionSearch,setReligionSearch]=useState('');
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/allInfluencer`);
        if (!response.ok) throw new Error("Failed to fetch influencers");
        const data = await response.json();
        setInfluencers(data);
        setFilteredInfluencers(data); // initially show all
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  useEffect(() => {
    const filtered = influencers.filter((influencer) =>
      influencer.Name.toLowerCase().includes(nameSearch.toLowerCase()) &&
      influencer.GeoLocation.toLowerCase().includes(geoLocationSearch.toLowerCase()) &&
      influencer.Language.toLowerCase().includes(languageSearch.toLowerCase()) &&
      influencer.ContentNiche.toLowerCase().includes(ContentNicheSearch.toLowerCase()) &&
      influencer.Religion.toLowerCase().includes(ReligionSearch.toLowerCase())
    );
    setFilteredInfluencers(filtered);
  }, [nameSearch, geoLocationSearch, languageSearch, influencers,ContentNicheSearch,ReligionSearch]);

  if (loading) return <p className="loading-message">Loading influencers...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="container">
      {/* Search Fields */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by Geolocation"
          value={geoLocationSearch}
          onChange={(e) => setGeoLocationSearch(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by Language"
          value={languageSearch}
          onChange={(e) => setLanguageSearch(e.target.value)}
          className="search-input"
        />

        <input
          type="text"
          placeholder="Search by Content Niche"
          value={ContentNicheSearch}
          onChange={(e) => setContentNicheSearch(e.target.value)}
          className="search-input"
        />

      <input
          type="text"
          placeholder="Search by Religion"
          value={ReligionSearch}
          onChange={(e) => setReligionSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Influencer Cards */}
      <div className="influencer-grid">
        {filteredInfluencers.map((influencer, index) => (
          <div
            key={index}
            className="influencer-card"
            onClick={() => navigate('/influencerDetails', { state: { influencer } })}
          >
            <img
              src={`data:image/png;base64,${influencer.Photo}`}
              alt="Influencer"
              className="influencer-img"
            />
            <div className="influencer-info">
              <h2>{influencer.Name}</h2>
              <p>@{influencer.Username}</p>
              <p className="location">{influencer.GeoLocation}</p>
              <p className="language">{influencer.Language}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerCard;
