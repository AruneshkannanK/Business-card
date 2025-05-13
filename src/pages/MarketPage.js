import React, { useState, useEffect } from 'react';
import { getCryptoList } from '../api/cryptoService';
import CryptoCard from '../components/CryptoCard';
import './MarketPage.css';

const MarketPage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Arbitrary - API doesn't provide total count
  const perPage = 20;

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const data = await getCryptoList(page, perPage);
        setCryptos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCryptos();
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [page, perPage]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (loading && page === 1) {
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
    <div className="market-page">
      <div className="market-header">
        <h1>Cryptocurrency Market</h1>
        <p>Current prices and market data for top cryptocurrencies</p>
      </div>

      {loading && (
        <div className="page-loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      <div className="crypto-grid">
        {cryptos.map(crypto => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={handlePreviousPage} 
          disabled={page === 1 || loading}
          className={page === 1 || loading ? 'disabled' : ''}
        >
          Previous
        </button>
        <span className="page-indicator">Page {page} of {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages || loading}
          className={page === totalPages || loading ? 'disabled' : ''}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MarketPage; 