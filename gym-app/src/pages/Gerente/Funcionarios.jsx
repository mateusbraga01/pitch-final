import React, { useState } from 'react';

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: '',
    cargo: '',
  });

  const handleChange = (e) => {
    setNovoFuncionario({
      ...novoFuncionario,
      [e.target.name]: e.target.value,
    });
  };

  const adicionarFuncionario = () => {
    setFuncionarios([...funcionarios, novoFuncionario]);
    setNovoFuncionario({ nome: '', cargo: '' });
  };

  return (
    <div className="container">
      <header>
        <h1>Registro de Funcionários</h1>
      </header>
      <div className="form-container">
        <h2>Adicionar Novo Funcionário</h2>
        <input
          type="text"
          name="nome"
          value={novoFuncionario.nome}
          onChange={handleChange}
          placeholder="Nome do Funcionário"
        />
        <input
          type="text"
          name="cargo"
          value={novoFuncionario.cargo}
          onChange={handleChange}
          placeholder="Cargo"
        />
        <button onClick={adicionarFuncionario}>Adicionar</button>
      </div>
      <div className="funcionarios-list">
        <h2>Lista de Funcionários</h2>
        <ul>
          {funcionarios.map((funcionario, index) => (
            <li key={index}>
              <h3>{funcionario.nome}</h3>
              <p>Cargo: {funcionario.cargo}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Funcionarios;
