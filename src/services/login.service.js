// src/services/login.service.js
import api from './Axios';

// login.service.js
export async function loginUser(username, password) {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Erro detalhado:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro no login');
  }
}

export async function registerUser(userData) {
  const response = await api.post('/auth/register', userData);
  return response.data;
}
