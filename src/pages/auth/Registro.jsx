import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Validação
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Campo obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir')
    .required('Confirme sua senha'),
});

// Função de registro separada
const register = async (username, password) => {
  const response = await fetch('https://sua-api.com/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro da API:', errorData);
    throw new Error('Erro ao registrar');
  }

  return await response.json();
};

const Registro = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (values) => {
    try {
      console.log('Valores para registro:', values);
      await register(values.username, values.password);
      setSucesso(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="xs">

      <p>teste</p>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Criar Conta
        </Typography>

        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, errors, touched }) => (
            <Form style={{ width: '100%', marginTop: '16px' }}>
              {error && <Alert severity="error">{error}</Alert>}
              {sucesso && <Alert severity="success">Conta criada com sucesso!</Alert>}

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Usuário"
                name="username"
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label="Senha"
                type="password"
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirmar Senha"
                type="password"
                onChange={handleChange}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Registrar
              </Button>

              <Link href="/login" variant="body2">
                Já tem uma conta? Entrar
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Registro;