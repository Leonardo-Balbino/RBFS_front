import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const SaidaEstoque = () => {
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    validade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Simulação de envio
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Registrar Saída do Estoque
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Quantidade"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Validade"
              name="validade"
              type="date"
              value={formData.validade}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Registrar Saída
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SaidaEstoque;