import React, { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridActionsCellItem 
} from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Chip, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const ListaAnimais = () => {
  const [animais, setAnimais] = useState([]);
  const [filtros, setFiltros] = useState({
    especie: '',
    porte: '',
    localizacao: ''
  });
  const navigate = useNavigate();

  // Mock de dados - Substituir por chamada API
  useEffect(() => {
    const mockData = [
      { 
        id: 1, 
        nome: 'Rex', 
        especie: 'Cachorro', 
        idade: 3, 
        porte: 'Médio', 
        localizacao: 'São Paulo',
        foto: '/imagens/rex.jpg',
        adotado: false
      },
      // ... outros animais
    ];
    setAnimais(mockData.filter(animal => !animal.adotado));
  }, []);

  const columns = [
    { 
      field: 'foto', 
      headerName: 'Foto', 
      width: 100,
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt={params.row.nome}
          style={{ width: 50, height: 50, borderRadius: '50%' }}
        />
      )
    },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'especie', headerName: 'Espécie', width: 130 },
    { field: 'idade', headerName: 'Idade', width: 100 },
    { field: 'porte', headerName: 'Porte', width: 130 },
    { field: 'localizacao', headerName: 'Localização', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PetsIcon />}
          label="Adotar"
          onClick={() => navigate(`/adocoes/novo/${params.id}`)}
        />,
        <GridActionsCellItem
          component={Link}
          to={`/animais/${params.id}`}
          icon={<VisibilityIcon />}
          label="Detalhes"
        />
      ]
    }
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Espécie</InputLabel>
        <Select
          value={filtros.especie}
          onChange={(e) => setFiltros({...filtros, especie: e.target.value})}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Cachorro">Cachorro</MenuItem>
          <MenuItem value="Gato">Gato</MenuItem>
        </Select>
      </FormControl>
      {/* Adicionar outros filtros similares para porte e localização */}
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={animais}
        columns={columns}
        components={{ Toolbar: CustomToolbar }}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
};

export default ListaAnimais;