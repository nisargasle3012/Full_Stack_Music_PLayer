import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // ✅ Import this

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ margin: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/signup" style={{ marginRight: '10px' }}>Signup</Link>
          <Link to="/home">Home</Link> 
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
