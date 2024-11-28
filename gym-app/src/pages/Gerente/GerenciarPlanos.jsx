import React, { useState } from 'react';

function GerenciarPlanos() {
  const [planos, setPlanos] = useState([
    { id: 1, nome: 'Plano Básico', preco: 'R$ 99,00' },
  ]);
  const [novoPlano, setNovoPlano] = useState({ nome: '', preco: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoPlano({
      ...novoPlano,
      [name]: value,
    });
  };

  const handleAddPlano = () => {
    setPlanos([...planos, { ...novoPlano, id: planos.length + 1 }]);
    setNovoPlano({ nome: '', preco: '' });
  };

  return (
    <div className="container">
      <header>
        <h1>Gerenciar Planos</h1>
      </header>
      <div className="planos-form">
        <input
          type="text"
          name="nome"
          placeholder="Nome do Plano"
          value={novoPlano.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="preco"
          placeholder="Preço"
          value={novoPlano.preco}
          onChange={handleChange}
          required
        />
        <button onClick={handleAddPlano}>Adicionar Plano</button>
      </div>
      <ul className="planos-list">
        {planos.map((plano) => (
          <li key={plano.id}>
            <h2>{plano.nome}</h2>
            <p>{plano.preco}</p>
          </li>
        ))}
      </ul>
      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default GerenciarPlanos;
