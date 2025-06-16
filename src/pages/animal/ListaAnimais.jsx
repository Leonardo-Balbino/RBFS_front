import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarAnimais, deletarAnimal } from '../../services/animal.service.js';
import { Container, Typography, List, ListItem, ListItemText, Alert, IconButton, ListItemSecondaryAction, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListaAnimais = () => {
  const [animais, setAnimais] = useState([]);
  const [erro, setErro] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [animalExcluir, setAnimalExcluir] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAnimais();
  }, []);

  const carregarAnimais = async () => {
    try {
      const data = await listarAnimais();
      setAnimais(data);
    } catch (err) {
      setErro('Erro ao carregar animais');
    }
  };

  const handleEditar = (id) => {
    navigate(`/animais/cadastro/${id}`);
  };

  const handleExcluir = (animal) => {
    setAnimalExcluir(animal);
    setOpenDialog(true);
  };

  const confirmarExcluir = async () => {
    try {
      await deletarAnimal(animalExcluir.id);
      setOpenDialog(false);
      setAnimalExcluir(null);
      carregarAnimais();
    } catch (err) {
      setErro('Erro ao excluir animal');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Animais Cadastrados</Typography>
      {erro && <Alert severity="error">{erro}</Alert>}
      <List>
        {animais.map(animal => (
          <ListItem key={animal.id} disablePadding
            secondaryAction={
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="editar" onClick={() => handleEditar(animal.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="excluir" color="error" onClick={() => handleExcluir(animal)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            }
          >
            <ListItemText
              primary={animal.nome}
              secondary={`Espécie: ${animal.especie} | Raça: ${animal.raca || '-'} | Nome: ${animal.nome || '-'}`}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          Deseja realmente excluir o animal "{animalExcluir?.nome}"?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={confirmarExcluir} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListaAnimais;