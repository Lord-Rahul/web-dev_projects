import api from './api';

export const getAllCandidates = async () => {
  const response = await api.get('/candidates');
  return response.data;
};

export const getCandidateById = async (id) => {
  const response = await api.get(`/candidates/${id}`);
  return response.data;
};

export const addCandidate = async (formData) => {
  const response = await api.post('/candidates', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};