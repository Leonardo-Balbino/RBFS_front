import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const CriarTransacao = () => {
  const [formData, setFormData] = useState({
    tipo: '',
    valor: '',
    descricao: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Simulação de envio
    setFormData({ tipo: '', valor: '', descricao: '' });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Nova Transação
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              fullWidth
              select
              SelectProps={{ native: true }}
              required
            >
              <option value="">Selecione</option>
              <option value="doacao">Doação</option>
              <option value="compra">Compra</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Valor"
              name="valor"
              type="number"
              value={formData.valor}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CriarTransacao;