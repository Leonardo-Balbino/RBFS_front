import React, { useEffect, useState } from 'react';
import { listarAnimais } from '../../services/animal.service.js';
import { listarAdotantes } from '../../services/adotante.service.js';

const FormularioAdocao = () => {
  const [animais, setAnimais] = useState([]);
  const [adotantes, setAdotantes] = useState([]);
  const [animalId, setAnimalId] = useState('');
  const [adotanteId, setAdotanteId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animaisData = await listarAnimais();
        setAnimais(animaisData.filter(a => a.status !== 'adotado'));
        const adotantesData = await listarAdotantes();
        setAdotantes(adotantesData);
      } catch (err) {
        // Trate o erro
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode chamar a função para confirmar a adoção
    alert(`Adoção confirmada!\nAnimal: ${animalId}\nAdotante: ${adotanteId}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 24,
        border: '1px solid #ccc',
        borderRadius: 8,
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}
    >
      <label style={{ fontWeight: 'bold' }}>Selecione o Animal:</label>
      <select
        value={animalId}
        onChange={e => setAnimalId(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #bbb' }}
      >
        <option value="">Selecione</option>
        {animais.map(animal => (
          <option key={animal.id} value={animal.id}>
            {animal.nome} ({animal.especie})
          </option>
        ))}
      </select>

      <label style={{ fontWeight: 'bold' }}>Selecione o Adotante:</label>
      <select
        value={adotanteId}
        onChange={e => setAdotanteId(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #bbb' }}
      >
        <option value="">Selecione</option>
        {adotantes.map(adotante => (
          <option key={adotante.id} value={adotante.id}>
            {adotante.nome}
          </option>
        ))}
      </select>

      <button
        type="submit"
        style={{
          padding: '10px 0',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Confirmar Adoção
      </button>
    </form>
  );
};

export default FormularioAdocao;