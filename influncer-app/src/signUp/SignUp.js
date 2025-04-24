import React, { useState } from 'react';
import './signUp.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiconfig';
import { multiStepContext } from '../StepContext';
function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    password: "",
    photo:""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [emailError, setemailError]=useState('');
  const [passwordError,setpasswordError]=useState("")

  // Email Validation
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isValidPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!minLength) return "Password must be at least 8 characters long.";
    if (!hasUpperCase) return "Password must have at least one uppercase letter.";
    if (!hasLowerCase) return "Password must have at least one lowercase letter.";
    if (!hasNumber) return "Password must have at least one number.";
    if (!hasSpecialChar) return "Password must have at least one special character (!@#$%^&*).";

    return ""; // Valid password
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, Photo: e.target.files[0] });
    console.log("FormData is :",formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isValidEmail(formData.email)) {
      setemailError("Please enter a valid email address.");
      setShowPopup(true);
      return;
    }

    const passwordValidationMessage = isValidPassword(formData.password);
    if (passwordValidationMessage) {
      setpasswordError(passwordValidationMessage);
      return;
    }

    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          formDataToSend.append(`${key}[${index}]`, item);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage(data.message);
        setFormData({ firstName: "", lastName: "", email: "", companyName: "", password: "",photo: "" });
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
            <p style={{ color: "red" }}>{passwordError}</p>

            <label>Photo:</label>
            <input type="file" name="photo" onChange={handleFileChange} />
            <button type="submit" className="submit-btn">Sign Up</button>
            <div class="signup-message">
                            <p>
                               Already a User?
                                <a href="/login" class="signup-link">Login here</a>
                            </p>
                        </div>
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
