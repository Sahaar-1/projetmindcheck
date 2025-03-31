import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo avec image */}
        <h1 className="navbar-logo">
          <img src="logoo.png"  alt="MindCheck Logo"  style={{ width: '60px', marginRight: '0px' }} />MindCheck
        </h1>

        {/* Navigation Links */}
        <ul className="navbar-links">
            <>
              <li className="navbar-item">
                <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <i className="fas fa-home"></i>
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/evaluation" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <i className="fas fa-clipboard-check"></i>
                  <span>Evaluation</span>
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/results" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <i className="fas fa-chart-line"></i>
                  <span>Results</span>
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/journal" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <i className="fas fa-book"></i>
                  <span>Journal</span>
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/resources" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <i className="fas fa-cogs"></i>
                  <span>Resources</span>
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/mental-follow-up" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <i className="fas fa-heartbeat"></i>
                  <span>Suivi</span>
                </NavLink>
              </li>
              <li className="navbar-item no-text">
                <button onClick={handleLogout} className="logout-button">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </li>
            </>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;