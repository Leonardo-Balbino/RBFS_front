import api from './Axios';

// Listar todas as clínicas
export const listarClinicas = async () => {
  try {
    const response = await api.get('/clinicas');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar clínicas:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao listar clínicas' };
  }
};

// Criar uma nova clínica
export const criarClinica = async (clinicaData) => {
  try {
    const response = await api.post('/clinicas', clinicaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar clínica:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao criar clínica' };
  }
};

// Atualizar uma clínica existente
export const atualizarClinica = async (id, clinicaData) => {
  try {
    const response = await api.patch(`/clinicas/${id}`, clinicaData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar clínica:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao atualizar clínica' };
  }
};

// Deletar uma clínica
export const deletarClinica = async (id) => {
  try {
    const response = await api.delete(`/clinicas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar clínica:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao deletar clínica' };
  }
};