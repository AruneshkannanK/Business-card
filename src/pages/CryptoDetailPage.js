import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCryptoDetails, getCryptoHistory } from '../api/cryptoService';
import PriceChart from '../components/PriceChart';
import './CryptoDetailPage.css';

const CryptoDetailPage = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [timeframe, setTimeframe] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        // Get crypto details
        const cryptoDetailsData = await getCryptoDetails(id);
        setCrypto(cryptoDetailsData);
        
        // Get price history
        const historyData = await getCryptoHistory(id, timeframe);
        setPriceData(historyData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCryptoData();
  }, [id, timeframe]);

  // Helper function to format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num?.toString();
  };

  const handleTimeframeChange = (days) => {
    setTimeframe(days);
  };

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
    <div className="crypto-detail-page">
      {crypto && (
        <>
          <div className="crypto-header">
            <div className="crypto-title">
              <img src={crypto.image.large} alt={crypto.name} />
              <div>
                <h1>{crypto.name} ({crypto.symbol.toUpperCase()})</h1>
                <div className="crypto-rank">Rank #{crypto.market_cap_rank}</div>
              </div>
            </div>
            <div className="crypto-price-info">
              <div className="current-price">
                ${crypto.market_data.current_price.usd.toLocaleString()}
              </div>
              <div className={`price-change ${crypto.market_data.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                {crypto.market_data.price_change_percentage_24h > 0 ? '+' : ''}
                {crypto.market_data.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="chart-section">
            <div className="timeframe-selector">
              <button 
                className={timeframe === 1 ? 'active' : ''} 
                onClick={() => handleTimeframeChange(1)}
              >
                24h
              </button>
              <button 
                className={timeframe === 7 ? 'active' : ''} 
                onClick={() => handleTimeframeChange(7)}
              >
                7d
              </button>
              <button 
                className={timeframe === 30 ? 'active' : ''} 
                onClick={() => handleTimeframeChange(30)}
              >
                30d
              </button>
              <button 
                className={timeframe === 90 ? 'active' : ''} 
                onClick={() => handleTimeframeChange(90)}
              >
                90d
              </button>
              <button 
                className={timeframe === 365 ? 'active' : ''} 
                onClick={() => handleTimeframeChange(365)}
              >
                1y
              </button>
            </div>
            
            {priceData && (
              <PriceChart priceData={priceData} name={crypto.name} />
            )}
          </div>

          <div className="market-stats">
            <h2>Market Statistics</h2>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Market Cap</span>
                <span className="stat-value">${crypto.market_data.market_cap.usd.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">24h Trading Volume</span>
                <span className="stat-value">${crypto.market_data.total_volume.usd.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Fully Diluted Valuation</span>
                <span className="stat-value">
                  {crypto.market_data.fully_diluted_valuation?.usd 
                    ? '$' + crypto.market_data.fully_diluted_valuation.usd.toLocaleString() 
                    : 'N/A'}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Circulating Supply</span>
                <span className="stat-value">
                  {formatNumber(crypto.market_data.circulating_supply)} {crypto.symbol.toUpperCase()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Supply</span>
                <span className="stat-value">
                  {crypto.market_data.total_supply 
                    ? formatNumber(crypto.market_data.total_supply) + ' ' + crypto.symbol.toUpperCase() 
                    : 'N/A'}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Max Supply</span>
                <span className="stat-value">
                  {crypto.market_data.max_supply 
                    ? formatNumber(crypto.market_data.max_supply) + ' ' + crypto.symbol.toUpperCase() 
                    : 'N/A'}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">All-Time High</span>
                <span className="stat-value">
                  ${crypto.market_data.ath.usd.toLocaleString()}
                  <span className={`percent-change ${crypto.market_data.ath_change_percentage.usd > 0 ? 'positive' : 'negative'}`}>
                    ({crypto.market_data.ath_change_percentage.usd.toFixed(2)}%)
                  </span>
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">All-Time Low</span>
                <span className="stat-value">
                  ${crypto.market_data.atl.usd.toLocaleString()}
                  <span className={`percent-change ${crypto.market_data.atl_change_percentage.usd > 0 ? 'positive' : 'negative'}`}>
                    ({crypto.market_data.atl_change_percentage.usd.toFixed(2)}%)
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="crypto-description">
            <h2>About {crypto.name}</h2>
            <div 
              className="description-content"
              dangerouslySetInnerHTML={{ __html: crypto.description.en }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoDetailPage; 