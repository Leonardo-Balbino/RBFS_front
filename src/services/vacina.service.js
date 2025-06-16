import api from './Axios';
export const criarVacina = async (dados) => {
  const response = await api.post('/vacinas', dados);
  return response.data;
};
export const listarVacinas = async () => {
  const response = await api.get('/vacinas');
  return response.data;
};