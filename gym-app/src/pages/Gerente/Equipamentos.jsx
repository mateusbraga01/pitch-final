import React, { useState } from 'react';

const Equipamentos = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [novoEquipamento, setNovoEquipamento] = useState({
    nome: '',
    quantidade: 0,
  });

  const handleChange = (e) => {
    setNovoEquipamento({
      ...novoEquipamento,
      [e.target.name]: e.target.value,
    });
  };

  const adicionarEquipamento = () => {
    setEquipamentos([...equipamentos, novoEquipamento]);
    setNovoEquipamento({ nome: '', quantidade: 0 });
  };

  return (
    <div className="container">
      <header>
        <h1>Registro de Equipamentos</h1>
      </header>
      <div className="form-container">
        <h2>Adicionar Novo Equipamento</h2>
        <input
          type="text"
          name="nome"
          value={novoEquipamento.nome}
          onChange={handleChange}
          placeholder="Nome do Equipamento"
        />
        <input
          type="number"
          name="quantidade"
          value={novoEquipamento.quantidade}
          onChange={handleChange}
          placeholder="Quantidade"
        />
        <button onClick={adicionarEquipamento}>Adicionar</button>
      </div>
      <div className="equipamentos-list">
        <h2>Lista de Equipamentos</h2>
        <ul>
          {equipamentos.map((equipamento, index) => (
            <li key={index}>
              <h3>{equipamento.nome}</h3>
              <p>Quantidade: {equipamento.quantidade}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Equipamentos;
