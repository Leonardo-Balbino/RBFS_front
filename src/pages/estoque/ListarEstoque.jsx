import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarEstoque } from '../../services/estoque.service.js';
import { Container, Typography, List, ListItem, ListItemText, Alert, IconButton, ListItemSecondaryAction, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListarEstoque = () => {
  const [estoque, setEstoque] = useState([]);
  const [erro, setErro] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [itemExcluir, setItemExcluir] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarEstoque();
  }, []);

  const carregarEstoque = async () => {
    try {
      const data = await listarEstoque();
      // Corrige: transforma objeto agrupado em array simples
      if (Array.isArray(data)) {
        setEstoque(data);
      } else if (data && typeof data === 'object') {
        let arr = [];
        Object.values(data).forEach(validades => {
          Object.values(validades).forEach(lista => {
            arr = arr.concat(lista);
          });
        });
        setEstoque(arr);
      } else {
        setEstoque([]);
      }
    } catch (err) {
      setErro('Erro ao carregar estoque');
    }
  };

  const handleEditar = (id) => {
    navigate(`/estoque/editar/${id}`);
  };

  const handleExcluir = (item) => {
    setItemExcluir(item);
    setOpenDialog(true);
  };

  // Simula exclusão local (remover do array) já que não existe deletarEstoque
  const confirmarExcluir = async () => {
    try {
      setEstoque(prev => prev.filter(i => i.id !== itemExcluir.id));
      setOpenDialog(false);
      setItemExcluir(null);
    } catch (err) {
      setErro('Erro ao excluir item do estoque');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Estoque Atual</Typography>
      {erro && <Alert severity="error">{erro}</Alert>}
      <List>
        {estoque.map(item => (
          <ListItem key={item.id} disablePadding
            secondaryAction={
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="editar" onClick={() => handleEditar(item.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="excluir" color="error" onClick={() => handleExcluir(item)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            }
          >
            <ListItemText
              primary={item.nome}
              secondary={
                `Quantidade: ${item.quantidade} | Validade: ${new Date(item.validade).toLocaleDateString()} | Unidade: ${item.unidade_medida}`
              }
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Deseja realmente excluir o item "{itemExcluir?.nome}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={confirmarExcluir} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListarEstoque;