import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { criarTransacao } from '../../services/transacao.service.js';

const CriarTransacao = () => {
  const [formData, setFormData] = useState({
    tipo: '',
    valor: '',
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
      await criarTransacao({
        tipo: formData.tipo,
        valor: Number(formData.valor),
        descricao: formData.descricao,
      });
      setSucesso('Transação cadastrada com sucesso!');
      setFormData({ tipo: '', valor: '', descricao: '' });
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar transação');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Nova Transação
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
          <Grid item xs={12}>
            <TextField
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              fullWidth
              select
              SelectProps={{ native: true }}
              required
            >
              <option value="">Selecione</option>
              <option value="doacao">Doação</option>
              <option value="compra">Compra</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Valor"
              name="valor"
              type="number"
              value={formData.valor}
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
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CriarTransacao;