import React from 'react';
import { Container, Typography } from '@mui/material';

const AdicionarItemEstoque = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Adicionar Novo Item ao Estoque
      </Typography>
      {/* Formulário para adicionar um novo item */}
    </Container>
  );
};

export default AdicionarItemEstoque;