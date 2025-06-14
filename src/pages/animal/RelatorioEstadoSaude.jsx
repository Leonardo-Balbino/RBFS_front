import React, { useState } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, ListItemButton, ListItemText, Alert, Box } from '@mui/material';
import { listarAnimais } from '../../services/animal.service.js';
import { listarRelatoriosSaude } from '../../services/saudeAnimal.service.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const RelatorioEstadoSaude = () => {
  const [nomeBusca, setNomeBusca] = useState('');
  const [animais, setAnimais] = useState([]);
  const [saude, setSaude] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarAnimais = async () => {
    setErro('');
    setSaude(null);
    setAnimais([]);
    setLoading(true);
    try {
      const todosAnimais = await listarAnimais();
      const filtrados = todosAnimais.filter(a =>
        a.nome.toLowerCase().includes(nomeBusca.toLowerCase())
      );
      setAnimais(filtrados);
      if (filtrados.length === 0) setErro('Nenhum animal encontrado.');
    } catch (err) {
      setErro('Erro ao buscar animais');
    }
    setLoading(false);
  };

  const buscarSaude = async (animalId) => {
    setErro('');
    setSaude(null);
    setLoading(true);
    try {
      const relatorios = await listarRelatoriosSaude();
      const relatorioAnimal = relatorios.find(r => r.animal_id === animalId);
      if (relatorioAnimal) {
        setSaude(relatorioAnimal);
      } else {
        setErro('Nenhum relatório de saúde encontrado para este animal.');
      }
    } catch (err) {
      setErro('Erro ao buscar relatório de saúde');
    }
    setLoading(false);
  };

  const exportarPDF = () => {
  if (!saude) return;
  const doc = new jsPDF();
  doc.text('Relatório de Saúde do Animal', 14, 16);
  autoTable(doc, {
    startY: 24,
    head: [['Campo', 'Valor']],
    body: [
      ['Animal', saude.animal_nome],
      ['Condições Clínicas', saude.condicoes],
      ['Observações', saude.observacoes || '-'],
      ['Atualizado em', new Date(saude.updated_at).toLocaleString()],
    ],
  });
  doc.save(`relatorio-saude-${saude.animal_nome}.pdf`);
};

  const exportarCSV = () => {
    if (!saude) return;
    const csvRows = [
      ['Campo', 'Valor'],
      ['Animal', saude.animal_nome],
      ['Condições Clínicas', `"${saude.condicoes.replace(/"/g, '""')}"`],
      ['Observações', `"${(saude.observacoes || '-').replace(/"/g, '""')}"`],
      ['Atualizado em', new Date(saude.updated_at).toLocaleString()],
    ];
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio-saude-${saude.animal_nome}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Relatório de Estado de Saúde do Animal
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Nome do Animal"
          value={nomeBusca}
          onChange={e => setNomeBusca(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={buscarAnimais} disabled={loading}>
          Buscar
        </Button>
      </Box>
      {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
      <List>
        {animais.map(animal => (
          <ListItem key={animal.id} disablePadding>
            <ListItemButton onClick={() => buscarSaude(animal.id)}>
              <ListItemText
                primary={animal.nome}
                secondary={`Espécie: ${animal.especie} | Raça: ${animal.raca || '-'}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {saude && (
        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="h6" color="text.primary">Informações de Saúde</Typography>
          <Typography color="text.primary"><b>Animal:</b> {saude.animal_nome}</Typography>
          <Typography color="text.primary"><b>Condições Clínicas:</b> {saude.condicoes}</Typography>
          <Typography color="text.primary"><b>Observações:</b> {saude.observacoes || '-'}</Typography>
          <Typography variant="body2" color="text.secondary">
            Atualizado em: {new Date(saude.updated_at).toLocaleString()}
          </Typography>
          <Box mt={2} display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={exportarPDF}>
              Exportar PDF
            </Button>
            <Button variant="outlined" color="secondary" onClick={exportarCSV}>
              Exportar CSV
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default RelatorioEstadoSaude;