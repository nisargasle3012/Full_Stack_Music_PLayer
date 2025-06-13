import React from 'react';
import '../../styles/Auth.css';
import { Link } from 'react-router-dom';
import Home from '../../pages/Home';

const Signup = () => {
  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form>
        <input type="text" placeholder="Name" required /><br />
        <input type="email" placeholder="Email" required /><br />
        <input type="password" placeholder="Password" required /><br />
        <button type="submit">Signup</button>
      </form>
      <div style={{ margin: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/home">Home</Link> 
      </div>
    </div>
  );
};

export default Signup;
