import api from './Axios';
export const listarRelatoriosSaude = async () => {
  const response = await api.get('/saude-animais');
  return response.data;
};

export const criarRelatorioSaude = async (dados) => {
  const response = await api.post('/saude-animais', dados);
  return response.data;
};