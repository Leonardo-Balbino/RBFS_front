import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorElAnimais, setAnchorElAnimais] = useState(null);
  const [anchorElAdocoes, setAnchorElAdocoes] = useState(null);
  const [anchorElCadastros, setAnchorElCadastros] = useState(null);

  // Sincroniza com localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false); // Agora está sendo usado corretamente
    navigate('/login');
  };

  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);


  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          RBFS 🐱 🐶 🐴
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Menu Principal */}
          <Button color="inherit" component={Link} to="/">Home</Button>

          {/* Menu Animais */}
          <Button 
            color="inherit"
            onClick={handleMenuOpen(setAnchorElAnimais)}
            endIcon={<ArrowDropDownIcon />}
          >
            Animais
          </Button>
          <Menu
            anchorEl={anchorElAnimais}
            open={Boolean(anchorElAnimais)}
            onClose={handleMenuClose(setAnchorElAnimais)}
          >
            <MenuItem component={Link} to="/animais" onClick={handleMenuClose(setAnchorElAnimais)}>
              Lista de Animais
            </MenuItem>
            <MenuItem component={Link} to="/animais/cadastro" onClick={handleMenuClose(setAnchorElAnimais)}>
              Cadastrar Animal
            </MenuItem>
          </Menu>

          {/* Menu Adoções */}
          <Button 
            color="inherit"
            onClick={handleMenuOpen(setAnchorElAdocoes)}
            endIcon={<ArrowDropDownIcon />}
          >
            Adoções
          </Button>
          <Menu
            anchorEl={anchorElAdocoes}
            open={Boolean(anchorElAdocoes)}
            onClose={handleMenuClose(setAnchorElAdocoes)}
          >
            <MenuItem component={Link} to="/adotantes/cadastro" onClick={handleMenuClose(setAnchorElAdocoes)}>
              Cadastrar Adotante
            </MenuItem>
            <MenuItem component={Link} to="/adotantes/novo/:idAnimal" onClick={handleMenuClose(setAnchorElAdocoes)}>
              Nova Adoção
            </MenuItem>
          </Menu>

          {/* Menu Clínicas */}
          <Button 
            color="inherit"
            component={Link} 
            to="/clinicas/cadastro"
          >
            Clínicas
          </Button>

          {/* Menu Cadastros */}
          <Button 
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuOpen(setAnchorElCadastros)}
          >
            Cadastros
          </Button>
          <Menu
            anchorEl={anchorElCadastros}
            open={Boolean(anchorElCadastros)}
            onClose={handleMenuClose(setAnchorElCadastros)}
          >
            <MenuItem component={Link} to="/animais/cadastro">
              Novo Animal
            </MenuItem>
            <MenuItem component={Link} to="/adotantes/cadastro">
              Novo Adotante
            </MenuItem>
            <MenuItem component={Link} to="/clinicas/cadastro">
              Nova Clínica
            </MenuItem>
          </Menu>

          {loggedIn ? (
            <Button 
              color="inherit"
              onClick={handleLogout}
            >
              Sair
            </Button>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
            >
              Login
            </Button>
          )}

          
        
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;