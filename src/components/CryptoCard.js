import React from 'react';
import { Link } from 'react-router-dom';
import './CryptoCard.css';

const CryptoCard = ({ crypto }) => {
  const priceChangeClass = crypto.price_change_percentage_24h > 0 
    ? 'price-change positive' 
    : 'price-change negative';

  return (
    <div className="crypto-card">
      <div className="crypto-card-content">
        <div className="crypto-info">
          <img src={crypto.image} alt={crypto.name} className="crypto-image" />
          <div className="crypto-name">
            <h3>{crypto.name}</h3>
            <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
          </div>
        </div>
        <div className="crypto-data">
          <p className="crypto-price">${crypto.current_price.toLocaleString()}</p>
          <p className={priceChangeClass}>
            {crypto.price_change_percentage_24h > 0 ? '+' : ''}
            {crypto.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
      </div>
      <Link to={`/crypto/${crypto.id}`} className="view-details">
        View Details
      </Link>
    </div>
  );
};

export default CryptoCard; 