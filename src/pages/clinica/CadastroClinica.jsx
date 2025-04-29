// src/pages/clinica/CadastroClinica.jsx
import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const CadastroClinica = () => {
  return (
    <Container maxWidth="md" style={{ height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Clínica Veterinária
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome da Clínica"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CNPJ"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Telefone"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Responsável Técnico"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Serviços Oferecidos"
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CadastroClinica;