import api from './Axios';
export const listarRelatoriosSaude = async () => {
  const response = await api.get('/saude-animais');
  return response.data;
};