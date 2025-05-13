import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>CryptoTracker</h1>
          </Link>
        </div>
        
        <nav className="nav">
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active' : ''}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/market" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Market
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/trending" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Trending
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 