import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert, MenuItem } from '@mui/material';
import { listarAnimais } from '../../services/animal.service.js';
import { criarVacina } from '../../services/vacina.service.js';

const CadastroVacinaAnimal = () => {
  const [animais, setAnimais] = useState([]);
  const [form, setForm] = useState({
    animal_id: '',
    nome: '',
    tipo: '',
    fabricante: '',
    lote: '',
    dados_fabricacao: '',
    validade: ''
  });
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    listarAnimais().then(setAnimais).catch(() => setErro('Erro ao carregar animais'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    try {
      await criarVacina(form);
      setSucesso('Vacina cadastrada!');
      setForm({
        animal_id: '',
        nome: '',
        tipo: '',
        fabricante: '',
        lote: '',
        dados_fabricacao: '',
        validade: ''
      });
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar vacina');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Vacina do Animal
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {erro && <Grid item xs={12}><Alert severity="error">{erro}</Alert></Grid>}
          {sucesso && <Grid item xs={12}><Alert severity="success">{sucesso}</Alert></Grid>}
          <Grid item xs={12}>
            <TextField
              select
              label="Animal"
              name="animal_id"
              value={form.animal_id}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="">Selecione</MenuItem>
              {animais.map(animal => (
                <MenuItem key={animal.id} value={animal.id}>
                  {animal.nome} ({animal.especie})
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome da Vacina"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tipo"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fabricante"
              name="fabricante"
              value={form.fabricante}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Lote"
              name="lote"
              value={form.lote}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Data de Fabricação"
              name="dados_fabricacao"
              type="date"
              value={form.dados_fabricacao}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Validade"
              name="validade"
              type="date"
              value={form.validade}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
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

export default CadastroVacinaAnimal;