import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert, Link } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Validação para o e-mail
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório')
});

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
      // Substitua a URL abaixo pela sua rota real de recuperação
      const response = await fetch('http://localhost:3000/api/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      if (response.ok) {
        setMessage('Se o e-mail existir, enviaremos instruções de recuperação.');
        setError('');
      } else {
        setError('Não foi possível enviar o e-mail de recuperação.');
        setMessage('');
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
        <Typography component="h1" variant="h5">Recuperar Senha</Typography>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, errors, touched }) => (
            <Form style={{ width: '100%', marginTop: '16px' }}>
              {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <Field
                as={TextField}
                fullWidth
                margin="normal"
                name="email"
                label="E-mail"
                type="email"
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar instruções
              </Button>

              <Link href="/login" variant="body2">
                Voltar ao login
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
