import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoList = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto list:', error);
    throw error;
  }
};

export const getCryptoDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    throw error;
  }
};

export const getCryptoHistory = async (id, days = 7) => {
  try {
    const response = await axios.get(`${API_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto history:', error);
    throw error;
  }
};

export const getGlobalCryptoData = async () => {
  try {
    const response = await axios.get(`${API_URL}/global`);
    return response.data;
  } catch (error) {
    console.error('Error fetching global crypto data:', error);
    throw error;
  }
};

export const getTrendingCryptos = async () => {
  try {
    const response = await axios.get(`${API_URL}/search/trending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending cryptos:', error);
    throw error;
  }
}; 