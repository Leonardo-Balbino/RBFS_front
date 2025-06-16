import React, { useState } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, ListItemButton, ListItemText, Alert, Box } from '@mui/material';
import { listarAnimais } from '../../services/animal.service.js';
import { listarRelatoriosSaude } from '../../services/saudeAnimal.service.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const RelatorioEstadoSaude = () => {
  const [nomeBusca, setNomeBusca] = useState('');
  const [animais, setAnimais] = useState([]);
  const [saudes, setSaudes] = useState([]); // agora é array
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarAnimais = async () => {
    setErro('');
    setSaudes([]);
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
    setSaudes([]);
    setLoading(true);
    try {
      const relatorios = await listarRelatoriosSaude();
      const relatoriosAnimal = relatorios.filter(r => r.animal_id === animalId);
      if (relatoriosAnimal.length > 0) {
        setSaudes(relatoriosAnimal);
      } else {
        setErro('Nenhum relatório de saúde encontrado para este animal.');
      }
    } catch (err) {
      setErro('Erro ao buscar relatório de saúde');
    }
    setLoading(false);
  };

  const exportarPDF = () => {
    if (!saudes.length) return;
    const doc = new jsPDF();
    doc.text('Relatório de Saúde do Animal', 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [['Animal', 'Condições Clínicas', 'Observações', 'Atualizado em']],
      body: saudes.map(s => [
        s.animal_nome,
        s.condicoes,
        s.observacoes || '-',
        s.updated_at ? new Date(s.updated_at).toLocaleString() : '-'
      ]),
    });
    doc.save(`relatorio-saude-${saudes[0]?.animal_nome || 'animal'}.pdf`);
  };

  const exportarCSV = () => {
    if (!saudes.length) return;
    const csvRows = [
      ['Animal', 'Condições Clínicas', 'Observações', 'Atualizado em'],
      ...saudes.map(s => [
        s.animal_nome,
        `"${s.condicoes.replace(/"/g, '""')}"`,
        `"${(s.observacoes || '-').replace(/"/g, '""')}"`,
        s.updated_at ? new Date(s.updated_at).toLocaleString() : '-'
      ])
    ];
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio-saude-${saudes[0]?.animal_nome || 'animal'}.csv`);
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
      {saudes.length > 0 && (
        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="h6" color="text.primary">Registros de Saúde</Typography>
          {saudes.map((s, idx) => (
            <Box key={idx} mb={2}>
              <Typography color="text.primary"><b>Animal:</b> {s.animal_nome}</Typography>
              <Typography color="text.primary"><b>Condições Clínicas:</b> {s.condicoes}</Typography>
              <Typography color="text.primary"><b>Observações:</b> {s.observacoes || '-'}</Typography>
              <Typography variant="body2" color="text.secondary">
                Atualizado em: {s.updated_at ? new Date(s.updated_at).toLocaleString() : '-'}
              </Typography>
              <hr />
            </Box>
          ))}
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