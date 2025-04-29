import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const AtualizarTransacao = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tipo: '',
    valor: '',
    descricao: '',
  });

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchTransacao = async () => {
      const dados = { tipo: 'doacao', valor: 500, descricao: 'Doação de João' }; // Substituir por chamada ao backend
      setFormData(dados);
    };
    fetchTransacao();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados atualizados:', formData);
    // Simulação de envio
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Editar Transação
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              Atualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AtualizarTransacao;