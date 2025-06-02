import api from './Axios';

// Listar todos os animais
export const listarAnimais = async () => {
  try {
    const response = await api.get('/animais');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar animais:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao listar animais' };
  }
};

// Criar um novo animal
export const criarAnimal = async (animalData) => {
  try {
    const response = await api.post('/animais', animalData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar animal:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao criar animal' };
  }
};

// Atualizar um animal existente
export const atualizarAnimal = async (id, animalData) => {
  try {
    const response = await api.patch(`/animais/${id}`, animalData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar animal:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao atualizar animal' };
  }
};

// Deletar um animal
export const deletarAnimal = async (id) => {
  try {
    const response = await api.delete(`/animais/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar animal:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao deletar animal' };
  }
};