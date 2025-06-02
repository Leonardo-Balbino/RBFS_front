import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { registrarEntrada } from '../../services/estoque.service.js';

const EntradaEstoque = () => {
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: '',
    validade: '',
    unidade_medida: '',
    descricao: '',
  });
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    try {
      await registrarEntrada({
        nome: formData.nome,
        quantidade: Number(formData.quantidade),
        validade: formData.validade,
        unidade_medida: formData.unidade_medida,
        descricao: formData.descricao,
      });
      setSucesso('Entrada registrada com sucesso!');
      setFormData({
        nome: '',
        quantidade: '',
        validade: '',
        unidade_medida: '',
        descricao: '',
      });
    } catch (err) {
      setErro(err.message || 'Erro ao registrar entrada');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Registrar Entrada no Estoque
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
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Quantidade"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Validade"
              name="validade"
              type="date"
              value={formData.validade}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Unidade de Medida"
              name="unidade_medida"
              value={formData.unidade_medida}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Registrar Entrada
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EntradaEstoque;