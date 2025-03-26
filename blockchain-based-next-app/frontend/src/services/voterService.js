import api from './api';

/**
 * Registers a new voter with the provided information
 * Sends data to the backend API and handles validation
 * @param {object} voterData - Contains voter information (name, email, address, voterID, walletAddress)
 * @returns {Promise} Response data from the registration endpoint
 * @throws {Error} If voter ID is missing or API request fails
 */
export const registerVoter = async (voterData) => {
  // Ensure voterID is present
  if (!voterData.voterID) {
    throw new Error('Voter ID is required');
  }
  
  console.log('Sending voter data to API:', voterData); // Debug logging
  
  try {
    const response = await api.post('/voters/register', voterData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Retrieves a list of all voters from the system
 * @returns {Promise} Array of voter records
 */
export const getAllVoters = async () => {
  const response = await api.get('/voters');
  return response.data;
};

/**
 * Fetches a specific voter by their ID
 * Used for voter verification during the voting process
 * @param {string} id - Voter ID to look up
 * @returns {Promise} Voter data if found
 */
export const getVoterById = async (id) => {
  console.log('Getting voter with ID:', id); // Debug logging
  const response = await api.get(`/voters/${id}`);
  return response.data;
};

/**
 * Submits a vote for a specific candidate
 * Records the voter's choice on the blockchain through the API
 * @param {object} voteData - Contains voterID and candidateId
 * @returns {Promise} Response from the voting endpoint
 * @throws {Error} If voter ID is missing or API request fails
 */
export const submitVote = async (voteData) => {
  // Ensure voterID is present
  if (!voteData.voterID) {
    throw new Error('Voter ID is required');
  }
  
  console.log('Sending vote data to API:', voteData); // Debug logging
  
  try {
    const response = await api.post('/voters/vote', voteData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};