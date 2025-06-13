import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './pages/Home';
import './styles/App.css';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
     </Router>
  );
}

export default App;
