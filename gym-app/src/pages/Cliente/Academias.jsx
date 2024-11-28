import React, { useState } from 'react';
import { useAcademia } from '../../contexts/AcademiaContext';
import '../Cliente/styles/academias.css';




function ClienteAcademias() {
   // Declaração dos estados locais para gerenciar a busca, filtros, visibilidade dos detalhes, e formulários de contato e avaliação
  const { academias } = useAcademia();
  const [searchQuery, setSearchQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [precoFiltro, setPrecoFiltro] = useState('');
  const [detalhesVisiveis, setDetalhesVisiveis] = useState({});
  const [contatoAcademiaId, setContatoAcademiaId] = useState(null);
  const [avaliacaoAcademiaId, setAvaliacaoAcademiaId] = useState(null);
  const [formContato, setFormContato] = useState({ nome: '', email: '', mensagem: '' });
  const [formAvaliacao, setFormAvaliacao] = useState({ avaliacao: 0, comentario: '' });

  // Filtra as academias com base na pesquisa e nos filtros selecionados
  const filteredAcademias = academias
    .filter((academia) => academia.nome.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((academia) => (tipoFiltro ? academia.tipo === tipoFiltro : true))
    .filter((academia) => {
      if (!precoFiltro) return true;
      const preco = parseFloat(academia.preco.replace('R$ ', '').replace('/mês', '').replace(',', '.'));
      const [min, max] = precoFiltro.split('-').map(Number);
      return preco >= min && (!max || preco <= max);
    });

 // Função para alternar a visibilidade dos detalhes de uma academia
  const toggleDetalhes = (id) => {
    setDetalhesVisiveis((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Função para alternar a visibilidade do formulário de contato
  const toggleContato = (id) => {
    setContatoAcademiaId((prevId) => (prevId === id ? null : id));
    setAvaliacaoAcademiaId(null); // Esconde o formulário de avaliação, se estiver visível
  };

  // Função para alternar a visibilidade do formulário de avaliação
  const toggleAvaliacao = (id) => {
    setAvaliacaoAcademiaId((prevId) => (prevId === id ? null : id));
    setContatoAcademiaId(null); // Esconde o formulário de contato, se estiver visível
  };

  // Função para atualizar o estado do formulário de contato conforme o usuário digita
  const handleContatoChange = (e) => {
    const { name, value } = e.target;
    setFormContato({
      ...formContato,
      [name]: value,
    });
  };

  // Função para atualizar o estado do formulário de avaliação conforme o usuário seleciona a nota
  const handleAvaliacaoChange = (value) => {
    setFormAvaliacao({
      ...formAvaliacao,
      avaliacao: value,
    });
  };

  // Função para enviar o formulário de contato
  const handleContatoSubmit = (e) => {
    e.preventDefault();
    alert(`Mensagem enviada para a academia ${contatoAcademiaId}`);
    setContatoAcademiaId(null);
    setFormContato({ nome: '', email: '', mensagem: '' });
  };

  // Função para enviar o formulário de avaliação
  const handleAvaliacaoSubmit = (e) => {
    e.preventDefault();
    alert(`Avaliação enviada para a academia ${avaliacaoAcademiaId}`);
    setAvaliacaoAcademiaId(null);
    setFormAvaliacao({ avaliacao: 0, comentario: '' });
  };

  return (
    <div className="container">
      <header>
        <h1>Academias Disponíveis</h1>
        <input
          type="text"
          placeholder="Buscar academias..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="filters">
          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="">Tipo</option>
            <option value="Crossfit">Crossfit</option>
            <option value="Musculação">Musculação</option>
          </select>
          <select
            value={precoFiltro}
            onChange={(e) => setPrecoFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="">Faixa de Preço</option>
            <option value="0-100">Até R$ 100</option>
            <option value="100-200">R$ 100 - R$ 200</option>
            <option value="200-">Acima de R$ 200</option>
          </select>
        </div>
      </header>

      <div className="academia-grid">
        {filteredAcademias.map((academia) => (
          <div className="academia-card" key={academia.id}>
            <img src={academia.imagem} alt={academia.nome} className="academia-img" />
            <h2>{academia.nome}</h2>

            <button
              onClick={() => toggleDetalhes(academia.id)}
              className="detalhes-btn"
            >
              {detalhesVisiveis[academia.id] ? 'Ocultar Detalhes' : 'Ver Detalhes'}
            </button>

            {detalhesVisiveis[academia.id] && (
              <div className="detalhes">
                <p>Endereço: {academia.endereco}</p>
                <p>Tipo: {academia.tipo}</p>
                <p>Preço: {academia.preco}</p>
                <p>Horário: {academia.horario}</p>
                <button onClick={() => toggleContato(academia.id)} className="action-btn">
                  {contatoAcademiaId === academia.id ? 'Ocultar Contato' : 'Contatar'}
                </button>
                {contatoAcademiaId === academia.id && (
                  <div className="contact-form">
                    <h3>Contatar Academia</h3>
                    <form onSubmit={handleContatoSubmit}>
                      <input
                        type="text"
                        name="nome"
                        placeholder="Seu Nome"
                        value={formContato.nome}
                        onChange={handleContatoChange}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Seu Email"
                        value={formContato.email}
                        onChange={handleContatoChange}
                        required
                      />
                      <textarea
                        name="mensagem"
                        placeholder="Sua Mensagem"
                        value={formContato.mensagem}
                        onChange={handleContatoChange}
                        rows="5"
                        required
                      ></textarea>
                      <button type="submit" className="submit-btn">Enviar Mensagem</button>
                    </form>
                  </div>
                )}
                <button onClick={() => toggleAvaliacao(academia.id)} className="action-btn">
                  {avaliacaoAcademiaId === academia.id ? 'Ocultar Avaliação' : 'Avaliar'}
                </button>
                {avaliacaoAcademiaId === academia.id && (
                  <div className="rating-form">
                    <h3>Avaliar Academia</h3>
                    <form onSubmit={handleAvaliacaoSubmit}>
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span
                            key={value}
                            onClick={() => handleAvaliacaoChange(value)}
                            className={value <= formAvaliacao.avaliacao ? 'rating-star active' : 'rating-star'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <textarea
                        name="comentario"
                        placeholder="Seu Comentário"
                        value={formAvaliacao.comentario}
                        onChange={(e) => setFormAvaliacao({ ...formAvaliacao, comentario: e.target.value })}
                        rows="5"
                        required
                      ></textarea>
                      <button type="submit" className="submit-btn">Enviar Avaliação</button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default ClienteAcademias;
