import React, { useState, useEffect } from 'react';
import './userDetails.css'; // You can swap with Tailwind or CSS Modules

function UserDetails() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ email: '', firstName: '', lastName: '', companyName: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/users/specUser', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data);
        setFormData({
          email: data.email || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          companyName: data.companyName || '',
        });
      } catch {
        setError('Failed to load user data.');
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!formData.email) return;
    const fetchPhoto = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/profilePhoto?email=${formData.email}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProfilePhotoUrl(data);
      } catch {
        console.error('Error loading profile photo.');
      }
    };
    fetchPhoto();
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/users/updateUser', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      const updatedUser = await res.json();
      setUser(updatedUser);
      setEditMode(false);
      setSuccess('User details updated successfully!');
      setError(null);
      setTimeout(() => setSuccess(''), 4000);
    } catch {
      setError('Update failed.');
      setTimeout(() => setError(null), 4000);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        companyName: user.companyName || '',
      });
    }
    setEditMode(false);
    setError(null);
    setSuccess('');
  };

  return (
    <div className="user-details">
      <h2 className="header">User Profile</h2>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {user ? (
        <div className="card">
         <div className="photo-section">
  <label>Profile Photo</label>
  {profilePhotoUrl ? (
    <>
      <img
        src={`data:image/jpeg;base64,${profilePhotoUrl}`}
        alt="Profile"
        className="profile-photo"
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}
      />
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`data:image/jpeg;base64,${profilePhotoUrl}`}
              alt="Full Profile"
              className="full-photo"
            />
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="no-photo">No photo</div>
  )}
</div>

          <FormField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            editMode={editMode}
          />

          <div className="form-group">
            <label>Name</label>
            {editMode ? (
              <div className="name-inputs">
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
              </div>
            ) : (
              <p>{user.firstName} {user.lastName}</p>
            )}
          </div>

          <FormField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            editMode={editMode}
          />

          <div className="button-group">
            {editMode ? (
              <>
                <button className="btn save" onClick={handleSave}>Save</button>
                <button className="btn cancel" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button className="btn edit" onClick={() => setEditMode(true)}>Edit</button>
            )}
          </div>
        </div>
      ) : (
        <p className="loading">Loading user details...</p>
      )}
    </div>
  );
}

const FormField = ({ label, name, value, onChange, editMode }) => (
  <div className="form-group">
    <label>{label}</label>
    {editMode ? (
      <input type="text" name={name} value={value} onChange={onChange} />
    ) : (
      <p>{value}</p>
    )}
  </div>
);

export default UserDetails;
