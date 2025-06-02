import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menus, setMenus] = useState({
    animais: null,
    adocoes: null,
    cadastros: null,
    financeiro: null,
    estoque: null,
    relatorios: null // ✅ Adicionando o menu de relatórios
  });

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    navigate('/login');
  };

  const handleMenuOpen = (menu) => (event) => {
    setMenus({ ...menus, [menu]: event.currentTarget });
  };

  const handleMenuClose = (menu) => () => {
    setMenus({ ...menus, [menu]: null });
  };

  const renderMenu = (menuKey, options) => (
    <Menu
      anchorEl={menus[menuKey]}
      open={Boolean(menus[menuKey])}
      onClose={handleMenuClose(menuKey)}
    >
      {options.map(({ label, to }) => (
        <MenuItem
          key={label}
          component={Link}
          to={to}
          onClick={handleMenuClose(menuKey)}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          RBFS 🐱 🐶 🐴
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>

          {/* Menu Animais */}
          <Button
            color="inherit"
            onClick={handleMenuOpen('animais')}
            endIcon={<ArrowDropDownIcon />}
          >
            Animais
          </Button>
          {renderMenu('animais', [
            { label: 'Lista de Animais', to: '/animais' },
            { label: 'Cadastrar Animal', to: '/animais/cadastro' }
          ])}

          {/* Menu Adoções */}
          <Button
            color="inherit"
            onClick={handleMenuOpen('adocoes')}
            endIcon={<ArrowDropDownIcon />}
          >
            Adoções
          </Button>
          {renderMenu('adocoes', [
            { label: 'Cadastrar Adotante', to: '/adotantes/cadastro' },
            { label: 'Nova Adoção', to: '/adotantes/novo/1' }
          ])}

          {/* Clínicas */}
          <Button color="inherit" component={Link} to="/clinicas/cadastro">
            Clínicas
          </Button>

          {/* Cadastros */}
          <Button
            color="inherit"
            onClick={handleMenuOpen('cadastros')}
            endIcon={<ArrowDropDownIcon />}
          >
            Cadastros
          </Button>
          {renderMenu('cadastros', [
            { label: 'Novo Animal', to: '/animais/cadastro' },
            { label: 'Novo Adotante', to: '/adotantes/cadastro' },
            { label: 'Nova Clínica', to: '/clinicas/cadastro' }
          ])}

          {/* Financeiro */}
          <Button
            color="inherit"
            onClick={handleMenuOpen('financeiro')}
            endIcon={<ArrowDropDownIcon />}
          >
            Financeiro
          </Button>
          {renderMenu('financeiro', [
            { label: 'Listar Transações', to: '/financeiro' },
            { label: 'Ver Saldo', to: '/financeiro/saldo' },
            { label: 'Nova Transação', to: '/financeiro/criar' }
          ])}

          {/* Estoque */}
          <Button
            color="inherit"
            onClick={handleMenuOpen('estoque')}
            endIcon={<ArrowDropDownIcon />}
          >
            Estoque
          </Button>
          {renderMenu('estoque', [
            { label: 'Entrada de Materiais', to: '/estoque/entrada' },
            { label: 'Saída de Materiais', to: '/estoque/saida' },
            { label: 'Listar Estoque', to: '/estoque/listar' },
            { label: 'Adicionar Novo Item', to: '/estoque/adicionar-item' }
          ])}

          {/* ✅ Relatórios */}
          <Button
            color="inherit"
            onClick={handleMenuOpen('relatorios')}
            endIcon={<ArrowDropDownIcon />}
          >
            Relatórios
          </Button>
          {renderMenu('relatorios', [
            { label: 'Relatório de Saúde', to: '/relatorios/saude' },
            { label: 'Relatório de Vacinação', to: '/relatorios/vacinacao' }
          ])}

          {/* Login/Logout */}
          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;