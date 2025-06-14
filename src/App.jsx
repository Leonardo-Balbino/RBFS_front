// src/App.jsx
import React from 'react';
import AppRoutes from './routes';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import RelatorioAnimais from './components/RelatorioAnimais';
import RelatorioDoacoes from './pages/doacao/RelatorioDoacoes';


{/* <Route path="/relatorio-animais" element={<RelatorioAnimais />} />
<Route path="/relatorio-doacoes" element={<RelatorioDoacoes />} /> */}

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}





export default App;