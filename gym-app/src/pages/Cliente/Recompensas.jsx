import React, { useState } from 'react';

function Recompensas() {
  const [pontos, setPontos] = useState(15000);
  const [historico, setHistorico] = useState([
    { atividade: 'Check-in', pontos: 50 },
    { atividade: 'Avaliação', pontos: 100 },
  ]);

  const recompensasDisponiveis = [
    { nome: 'Desconto Mensalidade', custo: 3000 },
    { nome: 'Aula Grátis', custo: 950 },
    { nome: 'Brinde', custo: 1000 },
  ];

  const resgatarRecompensa = (recompensa) => {
    if (pontos >= recompensa.custo) {
      setPontos(pontos - recompensa.custo);
      setHistorico([...historico, { atividade: `Resgatou: ${recompensa.nome}`, pontos: -recompensa.custo }]);
    } else {
      alert('Pontos insuficientes para resgatar essa recompensa.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Recompensas e Gamificação</h1>
      </header>

      <section className="pontos-section">
        <p><strong>Total de pontos:</strong> {pontos}</p>
      </section>

      <section className="historico-section">
        <h2>Histórico de Pontos</h2>
        <ul>
          {historico.map((item, index) => (
            <li key={index}>
              {item.atividade}: {item.pontos} pontos
            </li>
          ))}
        </ul>
      </section>

      <section className="recompensas-section">
        <h2>Recompensas Disponíveis</h2>
        <ul>
          {recompensasDisponiveis.map((recompensa, index) => (
            <li key={index}>
              {recompensa.nome} - {recompensa.custo} pontos
              <button onClick={() => resgatarRecompensa(recompensa)}>
                Resgatar
              </button>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default Recompensas;
