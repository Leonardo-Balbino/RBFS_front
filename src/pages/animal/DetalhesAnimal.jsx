// src/pages/animal/DetalhesAnimal.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent } from '@mui/material';

const DetalhesAnimal = () => {
  const { id } = useParams();
  const animal = {
    id: 1,
    nome: 'Rex',
    especie: 'Cachorro',
    idade: 3,
    historico: 'Vacinação em dia.',
    foto: '/img/rex.jpg'
  };

  return (
    <Container maxWidth="md" style={{ height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Animal: {animal.nome}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={animal.foto}
          alt={animal.nome}
        />
        <CardContent>
          <Typography variant="h6">Espécie: {animal.especie}</Typography>
          <Typography variant="body1">Idade: {animal.idade} anos</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {animal.historico}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetalhesAnimal;