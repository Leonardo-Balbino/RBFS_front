import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';

const FinanceiroSaldo = () => {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    // Simulação de carregamento de saldo
    const fetchSaldo = async () => {
      const saldoFake = 1500.50; // Substituir por chamada ao backend
      setSaldo(saldoFake);
    };
    fetchSaldo();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Saldo Financeiro
      </Typography>
      <Typography variant="h6">
        Saldo atual: <strong>R$ {saldo.toFixed(2)}</strong>
      </Typography>
    </Container>
  );
};

export default FinanceiroSaldo;