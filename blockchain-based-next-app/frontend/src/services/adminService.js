import api from './api';

export const loginAdmin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get('/admin/me');
  return response.data;
};

export const approveVoter = async (voterId) => {
  const response = await api.put(`/admin/approve/${voterId}`);
  return response.data;
};

export const rejectVoter = async (voterId) => {
  const response = await api.put(`/admin/reject/${voterId}`);
  return response.data;
};