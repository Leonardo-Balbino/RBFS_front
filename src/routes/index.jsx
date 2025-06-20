// src/routes/index.jsx
import { Routes, Route, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import HomePage from '../pages/home/HomePage';
// Importe todas as páginas
import ListaAnimais from '../pages/animal/ListaAnimais';
import CadastroAnimal from '../pages/animal/CadastroAnimal';
import EdicaoAnimal from '../pages/animal/EdicaoAnimal';
import CadastroAdotante from '../pages/adotante/CadastroAdotante';
import CadastroClinica from '../pages/clinica/CadastroClinica';
import FormularioAdocao from '../pages/adotante/FormularioAdocao';
import Login from '../pages/auth/Login';
import Registro from '../pages/auth/Registro';
import EsqueciSenha from '../pages/auth/EsqueciSenha';
import EntradaEstoque from '../pages/estoque/EntradaEstoque';
import SaidaEstoque from '../pages/estoque/SaidaEstoque';
import ListarEstoque from '../pages/estoque/ListarEstoque';
import AdicionarItemEstoque from '../pages/estoque/AdicionarItemEstoque';
import ListarTransacoes from '../pages/financeiro/ListarTransacoes';
import FinanceiroSaldo from '../pages/financeiro/FinanceiroSaldo';
import CriarTransacao from '../pages/financeiro/CriarTransacao';
import AtualizarTransacao from '../pages/financeiro/AtualizarTransacao';
import RelatorioEstadoSaude from '../pages/animal/RelatorioEstadoSaude'; // ✅ Importa RelatorioEstadoSaude
import RelatorioVacinacao from '../pages/animal/RelatorioVacinacao'; 
import CadastroSaudeAnimal from '../pages/animal/CadastroSaudeAnimal';
import CadastroVacinaAnimal from '../pages/animal/CadastroVacinaAnimal';// ✅ Importa RelatorioVacinacao

// Layout principal que contém NavBar e Footer
const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet /> {/* Aqui serão renderizadas as páginas */}
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
        <Route path="/registro" element={<Registro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/animais" element={<ListaAnimais />} />
        <Route path="/animais/cadastro" element={<CadastroAnimal />} />
        <Route path="/animais/cadastro/:id" element={<CadastroAnimal />} />
        <Route path="/animais/editar/:id" element={<EdicaoAnimal />} />
        <Route path="/adotantes/cadastro" element={<CadastroAdotante />} />
        <Route path="/adotantes/novo" element={<FormularioAdocao />} />
        <Route path="/clinicas/cadastro" element={<CadastroClinica />} />
        <Route path="/estoque/entrada" element={<EntradaEstoque />} />
        <Route path="/estoque/saida" element={<SaidaEstoque />} />
        <Route path="/estoque/listar" element={<ListarEstoque />} />
        <Route path="/estoque/adicionar-item" element={<AdicionarItemEstoque />} />
        <Route path="/financeiro" element={<ListarTransacoes />} />
        <Route path="/financeiro/saldo" element={<FinanceiroSaldo />} />
        <Route path="/financeiro/criar" element={<CriarTransacao />} />
        <Route path="/financeiro/editar/:id" element={<AtualizarTransacao />} />
        <Route path="/animais/saude/cadastro" element={<CadastroSaudeAnimal />} />
        <Route path="/animais/vacina/cadastro" element={<CadastroVacinaAnimal />} />
        {/* ✅ Rotas para Relatórios */}
        <Route path="/relatorios/saude" element={<RelatorioEstadoSaude />} />
        <Route path="/relatorios/vacinacao" element={<RelatorioVacinacao />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;