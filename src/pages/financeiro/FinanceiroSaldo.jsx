import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { listarTransacoes } from '../../services/transacao.service.js';

const ListarTransacoes = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const data = await listarTransacoes();
        setTransacoes(data);
      } catch (err) {
        setErro(err.message || 'Erro ao carregar transações');
      }
    };
    fetchTransacoes();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Transações Financeiras
      </Typography>
      {erro && <Typography color="error">{erro}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transacoes.map((transacao) => (
            <TableRow key={transacao.id}>
              <TableCell>{transacao.tipo}</TableCell>
              <TableCell>R$ {Number(transacao.valor).toFixed(2)}</TableCell>
              <TableCell>{transacao.descricao}</TableCell>
              <TableCell>{transacao.data_transacao ? new Date(transacao.data_transacao).toLocaleString() : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ListarTransacoes;