import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Auth.css';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setUser } = useAuth(); // Add inside component
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  setLoading(true);
  try {
    const res = await axios.post('http://localhost:5000/api/login', formData);
    setMessage(res.data.message);

    setUser(res.data.user); // Save user data
    navigate('/Home');
  } catch (error) {
    setMessage(error.response?.data?.error || 'Login failed');
  }
    finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required autoFocus />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>

      {message && <p style={{ marginTop: '10px' }}>{message}</p>}

      <div style={{ margin: '20px' }}>
        <Link to="/Signup" style={{ marginRight: '10px' }}>Signup</Link>
        <Link to="/Home">Home</Link>
      </div>
    </div>
  );
};

export default Login;
