// src/features/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link
} from '@mui/material';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

// SENHA TEMPORÁRIA (Altere para a que desejar)
const SENHA_FIXA = "admin123";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Campo obrigatório')
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (values) => {
    if(values.password === SENHA_FIXA) {
      // Simula login bem sucedido
      localStorage.setItem('loggedIn', 'true');
      navigate('/');
    } else {
      setError('Senha incorreta! Use a senha temporária: admin123');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography component="h1" variant="h4">
          Acesso RBFS
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, errors, touched }) => (
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ width: '100%', mt: 1 }}
            >
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="E-mail"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>

              <Link 
                href="#" 
                variant="body2"
                onClick={() => alert('Funcionalidade não implementada')}
              >
                Esqueceu a senha?
              </Link>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;