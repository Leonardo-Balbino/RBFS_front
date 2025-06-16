import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { criarAnimal, atualizarAnimal, listarAnimais } from '../../services/animal.service.js';

const CadastroAnimal = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: '',
    especie: '',
    raca: '',
    idade: '',
    status: 'disponível',
    descricao: ''
  });
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      // Busca o animal pelo id
      listarAnimais().then(animais => {
        const animal = animais.find(a => String(a.id) === String(id));
        if (animal) setForm(animal);
        else setErro('Animal não encontrado');
      }).catch(() => setErro('Erro ao buscar animal'));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    try {
      if (id) {
        await atualizarAnimal(id, form);
        setSucesso('Animal atualizado com sucesso!');
      } else {
        await criarAnimal(form);
        setSucesso('Animal cadastrado com sucesso!');
        setForm({
          nome: '',
          especie: '',
          raca: '',
          idade: '',
          status: 'disponível',
          descricao: ''
        });
      }
    } catch (err) {
      setErro(err.message || 'Erro ao salvar animal');
    }
  };

  return (
    <Container maxWidth="md" style={{ height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Editar Animal' : 'Cadastro de Animal'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {erro && (
            <Grid item xs={12}>
              <Alert severity="error">{erro}</Alert>
            </Grid>
          )}
          {sucesso && (
            <Grid item xs={12}>
              <Alert severity="success">{sucesso}</Alert>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome do Animal"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Espécie"
              name="especie"
              value={form.especie}
              onChange={handleChange}
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
              label="Raça"
              name="raca"
              value={form.raca}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Idade"
              name="idade"
              type="number"
              value={form.idade}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Histórico de Saúde"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
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

export default CadastroAnimal;