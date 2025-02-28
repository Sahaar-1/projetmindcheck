import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo avec image */}
        <h1 className="navbar-logo">
          <img src="logoo.png"  alt="MindCheck Logo"  style={{ width: '60px', marginRight: '0px' }} />MindCheck
        </h1>

        {/* Navigation Links */}
        <ul className="navbar-links">
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
            <NavLink to="/suivi-mental" className={({ isActive }) => (isActive ? 'active' : '')}>
              <i className="fas fa-heartbeat"></i>
              <span>Suivi</span>
            </NavLink>
          </li>

          {/* Login and Register Buttons (only icons) */}
          <li className="navbar-item no-text">
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              <i className="fas fa-sign-in-alt"></i>
            </NavLink>
          </li>
          <li className="navbar-item no-text">
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
              <i className="fas fa-user-plus"></i>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
