import React, { useState } from 'react';
import './signUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Email Validation
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage(data.message);
        setFormData({ firstName: "", lastName: "", email: "", companyName: "", password: "" });
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/login');
        }, 2000); // Delay navigation for better UX
      } else {
        setError(data.error || "Something went wrong");
        setShowPopup(true);
      }
    } catch (err) {
      setError("Failed to connect to server");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-container-image">
          <img src="/images/mainPic.jpeg" alt="Sign Up" />
        </div>
        <div className="signup-container-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
             <p>{message || error}</p>
            <span className="close-icon" onClick={closePopup}>&times;</span>
            
            <button onClick={closePopup} className="close-popup-btn">OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
