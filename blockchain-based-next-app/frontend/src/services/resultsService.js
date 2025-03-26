import api from './api';

export const getResults = async () => {
  try {
    // Your baseURL is already 'http://localhost:5000/api'
    // So we should NOT prefix with /api again
    const response = await api.get(`/results?t=${Date.now()}`);
    console.log('Results response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error.response?.data || error.message || error);
    throw error;
  }
};

export const syncResults = async () => {
  const response = await api.post('/results/sync');
  return response.data;
};