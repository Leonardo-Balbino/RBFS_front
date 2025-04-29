import React, { useState } from 'react';

function FinanceiroCadastro() {
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Valor cadastrado: R$ ${valor} - ${descricao}`);
    
    // Léo Aqui você pode integrar com backend ou localStorage futuramente
    setValor('');
    setDescricao('');
  };

  return (
    <div>
      <h2>Cadastro de Dinheiro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FinanceiroCadastro;
