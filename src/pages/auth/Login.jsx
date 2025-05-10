
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/login.service.js'
import { 
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Validação para username e password
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Campo obrigatório')
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    console.log("Submetendo:", values);
    try {
      const responseData = await login(values.username, values.password);
      console.log("Resposta do login:", responseData);
      if (responseData?.token) {
        localStorage.setItem('token', responseData.token);
        navigate('/');
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError('Não foi possível realizar o login. Verifique suas credenciais.');
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
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, errors, touched }) => (
            <Form style={{ width: '100%', marginTop: '16px' }}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Usuário"
                name="username"
                autoComplete="username"
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
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
