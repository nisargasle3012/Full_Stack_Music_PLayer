import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

function Profile({ showProfile, setShowProfile }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        // ✅ Stop execution so catch doesn't accidentally run
        return;
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.response?.data?.error || 'Failed to load profile');
      }
    };

    if (showProfile) fetchProfile();
  }, [showProfile]);

  if (!showProfile) return null;

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={() => setShowProfile(false)} />

      {/* Sliding Panel */}
      <div className="profile-panel">
        <button className="close-btn" onClick={() => setShowProfile(false)}>✖</button>
        <h2>👤 Profile</h2>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Profile Data */}
        {user ? (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Profile;
