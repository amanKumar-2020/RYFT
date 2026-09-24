import "./App.css";

import React from "react";


const App: React.FC = () => {
  return (
    <div className="hero-section">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">
          <h2>
            VOGUE<span>APPAREL</span>
          </h2>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#new">New Arrivals</a>
          </li>
          <li>
            <a href="#women">Women</a>
          </li>
          <li>
            <a href="#men">Men</a>
          </li>
          <li>
            <a href="#accessories">Accessories</a>
          </li>
        </ul>

        <div className="nav-icons">
          <button className="icon-btn" aria-label="Search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Account">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Cart">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-badge">2</span>
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <span className="hero-subtitle">Autumn / Winter 2026</span>
        <h1 className="hero-title">
          Redefine Your
          <br />
          Everyday Style
        </h1>
        <p className="hero-description">
          Discover our new collection of premium essentials. Crafted for
          comfort, designed for the bold. Step into the new season with
          confidence.
        </p>

        <div className="hero-actions">
          <button className="btn-primary">Shop Collection</button>
          <button className="btn-secondary">Explore Lookbook</button>
        </div>
      </div>
    </div>
  );
};

export default App;