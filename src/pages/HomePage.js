import React, { useState, useEffect } from 'react';
import { getCryptoList, getGlobalCryptoData } from '../api/cryptoService';
import CryptoCard from '../components/CryptoCard';
import './HomePage.css';

const HomePage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get top 10 cryptocurrencies
        const cryptoData = await getCryptoList(1, 10);
        setCryptos(cryptoData);
        
        // Get global market data
        const globalMarketData = await getGlobalCryptoData();
        setGlobalData(globalMarketData.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading cryptocurrency data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Track Cryptocurrencies in Real-Time</h1>
        <p>Stay updated with the latest prices, trends, and insights in the crypto market</p>
      </div>

      {globalData && (
        <div className="global-stats">
          <div className="stat-card">
            <h3>Active Cryptocurrencies</h3>
            <p>{globalData.active_cryptocurrencies}</p>
          </div>
          <div className="stat-card">
            <h3>Markets</h3>
            <p>{globalData.markets}</p>
          </div>
          <div className="stat-card">
            <h3>Market Cap</h3>
            <p>${globalData.total_market_cap.usd.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>24h Volume</h3>
            <p>${globalData.total_volume.usd.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>BTC Dominance</h3>
            <p>{globalData.market_cap_percentage.btc.toFixed(2)}%</p>
          </div>
        </div>
      )}

      <div className="top-cryptos-section">
        <h2>Top 10 Cryptocurrencies</h2>
        <div className="crypto-grid">
          {cryptos.map(crypto => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 