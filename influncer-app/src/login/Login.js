import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setShowPopup(false);

        try {
            const response = await fetch("http://localhost:5000/users/login", {
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
                localStorage.setItem("token", data.token);
                setFormData({ email: "", password: "" });
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/home');
                  }, 2000);
                // navigate('/home');
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
                <div className='signup-container-form'>
                <h2>Log In</h2>

                    <form onSubmit={handleSubmit} className="signup-form">
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
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        <button type="submit" className="submit-btn">Login</button>
                    </form>
                </div>
            </div>

            {showPopup && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{error || message}</p>
                        <span className="close-icon" onClick={closePopup}>&times;</span>
                        <button onClick={closePopup} className="close-popup-btn">OK</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;