// src/services/login.service.js
import api from './axios';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data; // Retorna o token ou informações do usuário
  } catch (error) {
    console.error('Erro ao fazer login:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao fazer login' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data; // Retorna os dados do usuário registrado
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao registrar usuário' };
  }
};