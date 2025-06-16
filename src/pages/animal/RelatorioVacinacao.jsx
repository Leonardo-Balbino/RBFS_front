import React, { useState } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, ListItemButton, ListItemText, Alert, Box } from '@mui/material';
import { listarAnimais } from '../../services/animal.service.js';
import { listarVacinas } from '../../services/vacina.service.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const RelatorioVacinacao = () => {
  const [nomeBusca, setNomeBusca] = useState('');
  const [animais, setAnimais] = useState([]);
  const [vacinas, setVacinas] = useState([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarAnimais = async () => {
    setErro('');
    setVacinas([]);
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

  const buscarVacinacao = async (animalId) => {
    setErro('');
    setVacinas([]);
    setLoading(true);
    try {
      const todasVacinas = await listarVacinas();
      const vacinasAnimal = todasVacinas.filter(v => v.animal_id === animalId);
      if (vacinasAnimal.length > 0) {
        setVacinas(vacinasAnimal);
      } else {
        setErro('Nenhum registro de vacinação encontrado para este animal.');
      }
    } catch (err) {
      setErro('Erro ao buscar vacinação');
    }
    setLoading(false);
  };

  const exportarPDF = () => {
    if (!vacinas.length) return;
    const doc = new jsPDF();
    doc.text('Relatório de Vacinação do Animal', 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [['Vacina', 'Tipo', 'Fabricante', 'Lote', 'Data Fabricação', 'Validade']],
      body: vacinas.map(v => [
        v.nome,
        v.tipo,
        v.fabricante,
        v.lote,
        v.dados_fabricacao ? new Date(v.dados_fabricacao).toLocaleDateString() : '',
        v.validade ? new Date(v.validade).toLocaleDateString() : ''
      ]),
    });
    doc.save(`relatorio-vacinacao-${vacinas[0]?.animal_nome || 'animal'}.pdf`);
  };

  const exportarCSV = () => {
    if (!vacinas.length) return;
    const csvRows = [
      ['Vacina', 'Tipo', 'Fabricante', 'Lote', 'Data Fabricação', 'Validade'],
      ...vacinas.map(v => [
        v.nome,
        v.tipo,
        v.fabricante,
        v.lote,
        v.dados_fabricacao ? new Date(v.dados_fabricacao).toLocaleDateString() : '',
        v.validade ? new Date(v.validade).toLocaleDateString() : ''
      ])
    ];
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio-vacinacao-${vacinas[0]?.animal_nome || 'animal'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Relatório de Vacinação do Animal
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
            <ListItemButton onClick={() => buscarVacinacao(animal.id)}>
              <ListItemText
                primary={animal.nome}
                secondary={`Espécie: ${animal.especie} | Raça: ${animal.raca || '-'}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {vacinas.length > 0 && (
        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="h6" color="text.primary">Vacinas Aplicadas</Typography>
          {vacinas.map((v, idx) => (
            <Box key={idx} mb={1}>
              <Typography color="text.primary"><b>Vacina:</b> {v.nome}</Typography>
              <Typography color="text.primary"><b>Tipo:</b> {v.tipo}</Typography>
              <Typography color="text.primary"><b>Fabricante:</b> {v.fabricante}</Typography>
              <Typography color="text.primary"><b>Lote:</b> {v.lote}</Typography>
              <Typography color="text.primary"><b>Data Fabricação:</b> {v.dados_fabricacao ? new Date(v.dados_fabricacao).toLocaleDateString() : '-'}</Typography>
              <Typography color="text.primary"><b>Validade:</b> {v.validade ? new Date(v.validade).toLocaleDateString() : '-'}</Typography>
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

export default RelatorioVacinacao;