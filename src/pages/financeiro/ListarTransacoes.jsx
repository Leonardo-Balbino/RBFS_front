import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import Box from '@mui/material/Box';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { listarTransacoes } from '../../services/transacao.service.js';

const ListarFinanceiro = () => {
  const [lancamentos, setLancamentos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await listarTransacoes();
        setLancamentos(Array.isArray(data) ? data : []);
      } catch (err) {
        setErro('Erro ao carregar lançamentos financeiros');
      }
    };
    carregar();
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório Financeiro', 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [['Descrição', 'Tipo', 'Valor', 'Data']],
      body: lancamentos.map(item => [
        item.descricao,
        item.tipo,
        item.valor,
        item.data ? new Date(item.data).toLocaleDateString() : '-'
      ]),
    });
    doc.save('financeiro.pdf');
  };

  const exportarXLS = () => {
    let xls = 'Descrição\tTipo\tValor\tData\n';
    lancamentos.forEach(item => {
      xls += `${item.descricao}\t${item.tipo}\t${item.valor}\t${item.data ? new Date(item.data).toLocaleDateString() : '-'}\n`;
    });
    const blob = new Blob([xls], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'financeiro.xls');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Financeiro</Typography>
      <Box mb={2} display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={exportarPDF}>
          Exportar PDF
        </Button>
        <Button variant="outlined" color="secondary" onClick={exportarXLS}>
          Exportar XLS
        </Button>
      </Box>
      {erro && <Alert severity="error">{erro}</Alert>}
      <List>
        {lancamentos.map(item => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.descricao}
              secondary={`Tipo: ${item.tipo} | Valor: R$ ${item.valor} | Data: ${item.data ? new Date(item.data).toLocaleDateString() : '-'}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListarFinanceiro;