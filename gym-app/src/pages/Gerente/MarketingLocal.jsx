import React, { useState } from 'react';

function MarketingLocal() {
  const [campanha, setCampanha] = useState({
    titulo: '',
    descricao: '',
    dataInicio: '',
    dataFim: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampanha({ ...campanha, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar a campanha de marketing
    alert('Campanha de marketing criada com sucesso!');
  };

  return (
    <div className="container">
      <header>
        <h1>Ferramenta de Marketing Local</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título da Campanha"
          value={campanha.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={campanha.descricao}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
        <input
          type="date"
          name="dataInicio"
          value={campanha.dataInicio}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dataFim"
          value={campanha.dataFim}
          onChange={handleChange}
          required
        />
        <button type="submit">Criar Campanha</button>
      </form>
      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default MarketingLocal;
