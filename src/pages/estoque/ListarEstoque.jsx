import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const ListarEstoque = () => {
  const estoque = [
    { nome: 'Arroz', quantidade: 50, validade: '2024-01-01', unidade_medida: 'kg' },
    { nome: 'Feijão', quantidade: 30, validade: '2023-12-15', unidade_medida: 'kg' },
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Estoque Atual
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Validade</TableCell>
            <TableCell>Unidade de Medida</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estoque.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.quantidade}</TableCell>
              <TableCell>{item.validade}</TableCell>
              <TableCell>{item.unidade_medida}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ListarEstoque;