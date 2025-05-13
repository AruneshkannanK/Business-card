import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MarketPage from './pages/MarketPage';
import CryptoDetailPage from './pages/CryptoDetailPage';
import TrendingPage from './pages/TrendingPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/crypto/:id" element={<CryptoDetailPage />} />
            {/* Fallback to home page */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} CryptoTracker. All rights reserved.</p>
            <p className="disclaimer">
              Disclaimer: CryptoTracker is a demo project. Cryptocurrency investments involve risk.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
