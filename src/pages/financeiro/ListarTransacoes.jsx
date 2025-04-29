import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const ListarTransacoes = () => {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchTransacoes = async () => {
      const dados = [
        { id: 1, tipo: 'doacao', valor: 500, descricao: 'Doação de João' },
        { id: 2, tipo: 'compra', valor: 200, descricao: 'Compra de ração' },
      ];
      setTransacoes(dados);
    };
    fetchTransacoes();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Transações Financeiras
      </Typography>
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
              <TableCell>R$ {transacao.valor.toFixed(2)}</TableCell>
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