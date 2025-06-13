import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: token, // ✅ Send token in headers
          },
        });

        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>👤 Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
