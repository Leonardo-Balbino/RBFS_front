import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { criarAnimal } from '../../services/animal.service.js';

const CadastroAnimal = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    try {
      await criarAnimal({
        nome: form.nome,
        especie: form.especie,
        raca: form.raca,
        idade: Number(form.idade),
        status: form.status,
        descricao: form.descricao
      });
      setSucesso('Animal cadastrado com sucesso!');
      setForm({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        status: 'disponível',
        descricao: ''
      });
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar animal');
    }
  };

  return (
    <Container maxWidth="md" style={{ height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Animal
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