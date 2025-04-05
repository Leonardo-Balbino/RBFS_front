// src/features/animal/ListaAnimais.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

const columns = [
  { field: 'nome', headerName: 'Nome', width: 200 },
  { field: 'especie', headerName: 'Espécie', width: 150 },
];

const rows = [
  { id: 1, nome: 'Rex', especie: 'Cachorro' },
  { id: 2, nome: 'Mia', especie: 'Gato' },
];

const ListaAnimais = () => {
  return (
    <Container>
      <Typography variant="h4">Animais para Adoção</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </div>
    </Container>
  );
};

export default ListaAnimais;