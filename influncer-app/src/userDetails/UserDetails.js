import React,{useState,useEffect} from 'react'
import './userDetails.css'
function UserDetails() {

    const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        const token= localStorage.getItem('token');
        console.log(token)
      try {
        const response = await fetch("http://localhost:5000/users/specUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with a valid token
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log(data)
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error(err);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
         <div className="user-details-container">
      <h2>User Details</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : user ? (
        <div className="user-card">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Company Name:</strong>{user.companyName}</p>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
    </>
  )
}

export default UserDetails
