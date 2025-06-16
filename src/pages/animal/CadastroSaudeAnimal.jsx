import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert, MenuItem } from '@mui/material';
import { listarAnimais } from '../../services/animal.service.js';
import { criarRelatorioSaude } from '../../services/saudeAnimal.service.js';

const CadastroSaudeAnimal = () => {
  const [animais, setAnimais] = useState([]);
  const [form, setForm] = useState({
    animal_id: '',
    condicoes: '',
    observacoes: ''
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
      await criarRelatorioSaude(form);
      setSucesso('Relatório de saúde cadastrado!');
      setForm({ animal_id: '', condicoes: '', observacoes: '' });
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar relatório');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Saúde do Animal
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
              label="Condições Clínicas"
              name="condicoes"
              value={form.condicoes}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observações"
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
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

export default CadastroSaudeAnimal;