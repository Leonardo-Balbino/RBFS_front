import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';

const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .required('Campo obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  tipoMoradia: Yup.string().required('Selecione uma opção'),
  animaisDomicilio: Yup.boolean().required(),
  termoResponsabilidade: Yup.boolean()
    .oneOf([true], 'Você deve aceitar o termo')
});

const FormularioAdocao = () => {
  const { idAnimal } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nomeCompleto: '',
      cpf: '',
      email: '',
      tipoMoradia: '',
      animaisDomicilio: false,
      termoResponsabilidade: false
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Chamada API para validar CPF
        const cpfValido = await validarCPF(values.cpf);
        if (!cpfValido) {
          formik.setFieldError('cpf', 'CPF já cadastrado');
          return;
        }

        // Enviar formulário
        await api.post('/adocoes', { ...values, idAnimal });
        navigate('/adocoes/sucesso');
      } catch (error) {
        console.error('Erro no formulário:', error);
      }
    }
  });

  const validarCPF = async (cpf) => {
    // Implementar validação real na API
    return true; // Mock
  };

  // Verifica se o idAnimal está presente
  if (!idAnimal) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          ID do Animal Não Encontrado
        </Typography>
        <Typography paragraph>
          Para acessar o formulário de adoção, você precisa selecionar um animal primeiro.
        </Typography>
        <Button component={Link} to="/animais" variant="outlined" size="large">
          Voltar para a Lista de Animais
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Formulário de Adoção
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nome Completo"
            name="nomeCompleto"
            value={formik.values.nomeCompleto}
            onChange={formik.handleChange}
            error={formik.touched.nomeCompleto && Boolean(formik.errors.nomeCompleto)}
            helperText={formik.touched.nomeCompleto && formik.errors.nomeCompleto}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputMask
            mask="999.999.999-99"
            value={formik.values.cpf}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {() => (
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                helperText={formik.touched.cpf && formik.errors.cpf}
              />
            )}
          </InputMask>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Moradia</InputLabel>
            <Select
              name="tipoMoradia"
              value={formik.values.tipoMoradia}
              onChange={formik.handleChange}
              error={formik.touched.tipoMoradia && Boolean(formik.errors.tipoMoradia)}
            >
              <MenuItem value="Casa">Casa</MenuItem>
              <MenuItem value="Apartamento">Apartamento</MenuItem>
            </Select>
            {formik.touched.tipoMoradia && formik.errors.tipoMoradia && (
              <FormHelperText error>{formik.errors.tipoMoradia}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="animaisDomicilio"
                checked={formik.values.animaisDomicilio}
                onChange={formik.handleChange}
              />
            }
            label="Possui outros animais em casa?"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="termoResponsabilidade"
                checked={formik.values.termoResponsabilidade}
                onChange={formik.handleChange}
                color="primary"
              />
            }
            label="Li e concordo com o Termo de Responsabilidade"
          />
          {formik.touched.termoResponsabilidade && formik.errors.termoResponsabilidade && (
            <FormHelperText error>{formik.errors.termoResponsabilidade}</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mr: 2 }}
          >
            Enviar Formulário
          </Button>
          <Button
            component={Link}
            to="/animais"
            variant="outlined"
            size="large"
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormularioAdocao;