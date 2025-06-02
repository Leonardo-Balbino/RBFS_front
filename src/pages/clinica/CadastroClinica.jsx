import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { criarClinica } from '../../services/clinicas.service.js';

const CadastroClinica = () => {
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    responsavel: ''
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
      await criarClinica({
        nome: form.nome,
        endereco: form.endereco,
        telefone: form.telefone,
        responsavel: form.responsavel
      });
      setSucesso('Clínica cadastrada com sucesso!');
      setForm({
        nome: '',
        endereco: '',
        telefone: '',
        responsavel: ''
      });
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar clínica');
    }
  };

  return (
    <Container maxWidth="md" style={{ height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Clínica Veterinária
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
              label="Nome da Clínica"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {/* CNPJ não está no backend, então não incluímos */}
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
              label="Responsável Técnico"
              name="responsavel"
              value={form.responsavel}
              onChange={handleChange}
              fullWidth
              required
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

export default CadastroClinica;