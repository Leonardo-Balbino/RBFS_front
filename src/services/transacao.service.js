import api from './Axios';

// Listar todas as transações financeiras
export const listarTransacoes = async () => {
  try {
    const response = await api.get('/financeiro');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar transações:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao listar transações' };
  }
};

// Obter saldo financeiro
export const obterSaldo = async () => {
  try {
    const response = await api.get('/financeiro/saldo');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter saldo:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao obter saldo' };
  }
};

// Criar uma nova transação financeira
export const criarTransacao = async (transacaoData) => {
  try {
    const response = await api.post('/financeiro', transacaoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar transação:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao criar transação' };
  }
};

// Atualizar uma transação financeira existente
export const atualizarTransacao = async (id, transacaoData) => {
  try {
    const response = await api.patch(`/financeiro/${id}`, transacaoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar transação:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao atualizar transação' };
  }
};

// Deletar uma transação financeira
export const deletarTransacao = async (id) => {
  try {
    const response = await api.delete(`/financeiro/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar transação:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Erro ao deletar transação' };
  }
};