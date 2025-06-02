import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { listarTransacoes } from '../../services/transacao.service.js';

const ListarTransacoes = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const dados = await listarTransacoes();
        setTransacoes(dados);
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
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transacoes.map((transacao) => (
            <TableRow key={transacao.id}>
              <TableCell>{transacao.tipo}</TableCell>
              <TableCell>R$ {Number(transacao.valor).toFixed(2)}</TableCell>
              <TableCell>{transacao.descricao}</TableCell>
              <TableCell>
                <Button color="primary" size="small">Editar</Button>
                <Button color="secondary" size="small">Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ListarTransacoes;