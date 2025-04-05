// src/features/animal/EdicaoAnimal.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';

const EdicaoAnimal = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState({});

  // Simulação de carregamento de dados
  useEffect(() => {
    // Buscar dados do animal pelo ID (exemplo fictício)
    setAnimal({
      nome: "Rex",
      especie: "cachorro",
      idade: 3,
      historico: "Vacinação em dia."
    });
  }, [id]);

  return (
    <Container maxWidth="md" style={{ height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Editar Animal: {animal.nome}
      </Typography>
      <form>
        <TextField
          label="Nome"
          defaultValue={animal.nome}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Espécie"
          defaultValue={animal.especie}
          fullWidth
          margin="normal"
          select
          SelectProps={{ native: true }}
        >
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
        </TextField>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Atualizar
        </Button>
      </form>
    </Container>
  );
};

export default EdicaoAnimal;