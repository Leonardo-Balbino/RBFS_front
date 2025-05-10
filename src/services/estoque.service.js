import api from './Axios';

// Função para obter o token do localStorage
const getToken = () => localStorage.getItem('token');

// Configurar cabeçalhos com o token
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Listar estoque
export async function listarEstoque() {
  try {
    const response = await api.get('/estoque', getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao listar estoque:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao listar estoque');
  }
}

// Registrar entrada no estoque
export async function registrarEntrada(data) {
  try {
    const response = await api.post('/estoque/entrada', data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar entrada:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao registrar entrada');
  }
}

// Registrar saída do estoque
export async function registrarSaida(data) {
  try {
    const response = await api.post('/estoque/saida', data, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar saída:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao registrar saída');
  }
}

// Consultar estoque por grupo
export async function consultarPorGrupo(grupo) {
  try {
    const response = await api.get(`/estoque/grupo/${grupo}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar por grupo:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao consultar por grupo');
  }
}

// Consultar estoque por validade
export async function consultarPorValidade(validade) {
  try {
    const response = await api.get(`/estoque/validade/${validade}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar por validade:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao consultar por validade');
  }
}

// Alertar itens próximos da validade
export async function alertarProximosDaValidade() {
  try {
    const response = await api.get('/estoque/alertas', getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Erro ao alertar itens próximos da validade:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao alertar itens próximos da validade');
  }
}