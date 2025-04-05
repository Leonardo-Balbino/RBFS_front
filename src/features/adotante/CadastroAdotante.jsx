// src/features/adotante/CadastroAdotante.jsx
import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const CadastroAdotante = () => {
  return (
    <Container maxWidth="md" style={{ height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Adotante
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome Completo"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CPF"
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
              label="E-mail"
              type="email"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Preferências de Adoção"
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

export default CadastroAdotante;