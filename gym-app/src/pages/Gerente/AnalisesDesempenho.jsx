import React from 'react';

function AnalisesDesempenho() {
  const desempenho = {
    visitas: 200,
    reservas: 80,
    novosPlanos: 30,
  };

  return (
    <div className="container">
      <header>
        <h1>Análises de Desempenho da Academia</h1>
      </header>
      <div className="desempenho">
        <p>Visitas: {desempenho.visitas}</p>
        <p>Reservas: {desempenho.reservas}</p>
        <p>Novos Planos: {desempenho.novosPlanos}</p>
      </div>
      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default AnalisesDesempenho;
