import React from 'react';
import Home from '../../pages/Home';
import Signup from './Signup';
import { Link } from 'react-router-dom'; 
import '../../styles/Auth.css';

const Login = () => {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" required /><br />
        <input type="password" placeholder="Password" required /><br />
        <button type="submit">Login</button>
      </form>
      <div style={{ margin: '20px' }}>
        <Link to="/Signup" style={{ marginRight: '10px' }}>Signup</Link>
        <Link to="/Home">Home</Link> 
      </div>
    </div>
  );
};

export default Login;
