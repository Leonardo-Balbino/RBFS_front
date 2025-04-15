// src/App.jsx
import React from 'react';
import AppRoutes from './routes';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

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