import React from 'react';

function Notificacoes() {
  const notificacoes = [
    { id: 1, mensagem: 'Nova academia perto de você com 20% de desconto!' },
    { id: 2, mensagem: 'Promoção especial na Academia XYZ!' },
  ];

  return (
    <div className="container">
      <header>
        <h1>Notificações</h1>
      </header>
      <div className="notifications-list">
        <ul>
          {notificacoes.map((notificacao) => (
            <li key={notificacao.id}>{notificacao.mensagem}</li>
          ))}
        </ul>
      </div>
      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default Notificacoes;
