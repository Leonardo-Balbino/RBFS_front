import api from './Axios';

// Listar todos os adotantes
export const listarAdotantes = async () => {
  try {
    const response = await api.get('/adotantes');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar adotantes:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao listar adotantes' };
  }
};

// Criar um novo adotante
export const criarAdotante = async (adotanteData) => {
  try {
    const response = await api.post('/adotantes', adotanteData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar adotante:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao criar adotante' };
  }
};

// Atualizar um adotante existente
export const atualizarAdotante = async (id, adotanteData) => {
  try {
    const response = await api.patch(`/adotantes/${id}`, adotanteData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar adotante:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao atualizar adotante' };
  }
};

// Deletar um adotante
export const deletarAdotante = async (id) => {
  try {
    const response = await api.delete(`/adotantes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar adotante:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao deletar adotante' };
  }
};