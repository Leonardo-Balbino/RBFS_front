// src/routes/index.jsx
import { Routes, Route, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import HomePage from '../features/home/HomePage';
// Importe todas as páginas
import ListaAnimais from '../features/animal/ListaAnimais';
import CadastroAnimal from '../features/animal/CadastroAnimal';
import EdicaoAnimal from '../features/animal/EdicaoAnimal';
import CadastroAdotante from '../features/adotante/CadastroAdotante';
import CadastroClinica from '../features/clinica/CadastroClinica';
import FormularioAdocao from '../features/adotante/FormularioAdocao'
import Login from '../features/auth/Login'

// Layout principal que contém NavBar e Footer
const Layout = () => {
  return (
    <>
      <NavBar />
       <Outlet/> {/* Aqui serão renderizadas as páginas */}
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Usa o Layout para todas as rotas */}
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/animais" element={<ListaAnimais />} />
        <Route path="/animais/cadastro" element={<CadastroAnimal />} />
        <Route path="/animais/editar/:id" element={<EdicaoAnimal />} />
        <Route path="/adotantes/cadastro" element={<CadastroAdotante />} />
        <Route path="/adotantes/novo" element={<FormularioAdocao />} />
        <Route path="/clinicas/cadastro" element={<CadastroClinica />} />
      </Route>
    </Routes>
  );
}; <Route path="/animais/cadastro" element={<CadastroAnimal />} />

export default AppRoutes;