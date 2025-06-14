import React, { useState } from 'react';

export default function RelatorioAnimais() {
  const [animais, setAnimais] = useState([]);
  const [filtros, setFiltros] = useState({ especie: '', sexo: '', status: '' });

  const buscarRelatorio = async () => {
    const query = new URLSearchParams(filtros).toString();
    const res = await fetch(`http://localhost:3000/relatorio-animais?${query}`);
    const data = await res.json();
    setAnimais(data);
  };

  return (
    <div className="container mt-4">
      <h2>Relatório de Animais</h2>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            placeholder="Espécie"
            className="form-control"
            value={filtros.especie}
            onChange={(e) => setFiltros({ ...filtros, especie: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Sexo"
            className="form-control"
            value={filtros.sexo}
            onChange={(e) => setFiltros({ ...filtros, sexo: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Status"
            className="form-control"
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
          />
        </div>
        <div className="col">
          <button onClick={buscarRelatorio} className="btn btn-primary w-100">
            Gerar Relatório
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Sexo</th>
            <th>Status</th>
            <th>Data de Entrada</th>
          </tr>
        </thead>
        <tbody>
          {animais.map((animal, i) => (
            <tr key={i}>
              <td>{animal.nome}</td>
              <td>{animal.especie}</td>
              <td>{animal.raca}</td>
              <td>{animal.sexo}</td>
              <td>{animal.status}</td>
              <td>{new Date(animal.dataEntrada).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
