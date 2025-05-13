import React, { useState, useEffect } from 'react';
import { getTrendingCryptos, getCryptoList } from '../api/cryptoService';
import { Link } from 'react-router-dom';
import './TrendingPage.css';

const TrendingPage = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [coinData, setCoinData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setLoading(true);
        
        // Get trending coins
        const trendingData = await getTrendingCryptos();
        setTrendingCoins(trendingData.coins);
        
        // Extract coin IDs
        const coinIds = trendingData.coins.map(coin => coin.item.id);
        
        // Get additional market data for these coins
        const marketData = await getCryptoList(1, 250);
        
        // Create a map of coin data
        const coinDataMap = {};
        marketData.forEach(coin => {
          if (coinIds.includes(coin.id)) {
            coinDataMap[coin.id] = coin;
          }
        });
        
        setCoinData(coinDataMap);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trending cryptocurrency data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTrendingData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading trending cryptocurrencies...</p>
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
    <div className="trending-page">
      <div className="trending-header">
        <h1>Trending Cryptocurrencies</h1>
        <p>The most searched cryptocurrencies in the last 24 hours</p>
      </div>

      <div className="trending-grid">
        {trendingCoins.map(({ item }) => (
          <div className="trending-card" key={item.id}>
            <div className="trending-info">
              <div className="trending-rank">#{item.market_cap_rank || '–'}</div>
              <div className="trending-image">
                <img src={item.large} alt={item.name} />
              </div>
              <div className="trending-name">
                <h3>{item.name}</h3>
                <span className="trending-symbol">{item.symbol}</span>
              </div>
            </div>
            
            <div className="trending-price">
              {coinData[item.id] ? (
                <>
                  <div className="price-value">
                    ${coinData[item.id].current_price.toLocaleString()}
                  </div>
                  <div className={`price-change ${coinData[item.id].price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                    {coinData[item.id].price_change_percentage_24h > 0 ? '+' : ''}
                    {coinData[item.id].price_change_percentage_24h?.toFixed(2)}%
                  </div>
                </>
              ) : (
                <div className="price-unavailable">Price data unavailable</div>
              )}
            </div>
            
            <div className="trending-score">
              <div className="score-label">Trending Score</div>
              <div className="score-value">{item.score + 1}</div>
            </div>
            
            <Link to={`/crypto/${item.id}`} className="trending-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage; 