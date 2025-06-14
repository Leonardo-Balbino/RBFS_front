import React, { useState } from 'react';
import axios from 'axios';

export default function RelatorioDoacoes() {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [doacoes, setDoacoes] = useState([]);
  const [total, setTotal] = useState(null);
  const [erro, setErro] = useState('');

  const buscarRelatorio = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/doacoes/relatorio?inicio=${inicio}&fim=${fim}`);
      setDoacoes(res.data.doacoes);
      setTotal(res.data.total);
      setErro('');
    } catch (err) {
      setErro('Erro ao buscar relatório.');
      setDoacoes([]);
      setTotal(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Relatório de Doações por Período</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Data Início</label>
          <input type="date" className="form-control" value={inicio} onChange={(e) => setInicio(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label>Data Fim</label>
          <input type="date" className="form-control" value={fim} onChange={(e) => setFim(e.target.value)} />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-primary" onClick={buscarRelatorio}>Gerar Relatório</button>
        </div>
      </div>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {total !== null && (
        <div className="mb-3">
          <h4>Total de Doações: R$ {total.toFixed(2)}</h4>
        </div>
      )}

      {doacoes.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Doador</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Método</th>
            </tr>
          </thead>
          <tbody>
            {doacoes.map((d, index) => (
              <tr key={index}>
                <td>{d.nomeDoador}</td>
                <td>R$ {d.valor.toFixed(2)}</td>
                <td>{new Date(d.data).toLocaleDateString()}</td>
                <td>{d.metodoPagamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
