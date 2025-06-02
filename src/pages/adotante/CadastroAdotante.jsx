import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { criarAdotante } from '../../services/adotante.service.js';

const CadastroAdotante = () => {
  const [form, setForm] = useState({
    nome: '',
    documento: '',
    endereco: '',
    telefone: '',
    email: '',
    preferencias: ''
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
      await criarAdotante({
        nome: form.nome,
        documento: form.documento,
        endereco: form.endereco,
        telefone: form.telefone,
        email: form.email,
        preferencias: form.preferencias
      });
      setSucesso('Adotante cadastrado com sucesso!');
      setForm({
        nome: '',
        documento: '',
        endereco: '',
        telefone: '',
        email: '',
        preferencias: ''
      });
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar adotante');
    }
  };

  return (
    <Container maxWidth="md" style={{ height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Adotante
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
              label="Nome Completo"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CPF"
              name="documento"
              value={form.documento}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço"
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Telefone"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Preferências de Adoção"
              name="preferencias"
              value={form.preferencias}
              onChange={handleChange}
              multiline
              rows={3}
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

export default CadastroAdotante;