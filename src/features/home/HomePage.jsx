import React from 'react';
import NavBar from '../../components/NavBar';
import AnimalSlideshow from '../../components/AnimalSlideshow';

const HomePage = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          zIndex: 1,
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Bem-vindo ao RBFS</h1>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          Sistema para gestão da ONG de resgate e adoção de animais.
        </p>
      </div>

      <AnimalSlideshow />
    </div>
  );
};

export default HomePage;