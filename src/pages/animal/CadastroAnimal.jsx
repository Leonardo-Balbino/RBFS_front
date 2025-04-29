// src/pages/animal/CadastroAnimal.jsx
import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const CadastroAnimal = () => {
  return (
    <Container maxWidth="md" style={{ height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Animal
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome do Animal"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Espécie"
              fullWidth
              required
              select
              SelectProps={{ native: true }}
            >
              <option value="">Selecione</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Idade"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Histórico de Saúde"
              multiline
              rows={4}
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

export default CadastroAnimal;