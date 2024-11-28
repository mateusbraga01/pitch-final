import React from 'react';

function EstatisticasAnuncio() {
  const estatisticas = {
    visualizacoes: 1500,
    cliques: 300,
    conversoes: 45,
  };

  return (
    <div className="container">
      <header>
        <h1>Estatísticas do Anúncio</h1>
      </header>
      <div className="stats">
        <p>Visualizações: {estatisticas.visualizacoes}</p>
        <p>Cliques: {estatisticas.cliques}</p>
        <p>Conversões: {estatisticas.conversoes}</p>
      </div>
      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default EstatisticasAnuncio;
