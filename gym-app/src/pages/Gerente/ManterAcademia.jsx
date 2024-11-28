import React, { useState } from 'react';
import { useAcademia } from '../../contexts/AcademiaContext';

function ManterAcademia() {
  const { academias, addAcademia, removeAcademia, updateAcademia } = useAcademia();
  const [novaAcademia, setNovaAcademia] = useState({
    nome: '',
    endereco: '',
    tipo: '',
    preco: '',
    horario: '',
    imagem: '',
  });
  const [editando, setEditando] = useState(null); // Para rastrear a academia em edição

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaAcademia({ ...novaAcademia, [name]: value });
  };

  const handleAddAcademia = async () => {
    try {
      if (editando) {
        // Se estiver editando, atualiza a academia
        await updateAcademia(editando, novaAcademia);
        setEditando(null); // Reseta o estado de edição
      } else {
        // Caso contrário, adiciona uma nova academia
        await addAcademia(novaAcademia);
      }

      setNovaAcademia({
        nome: '',
        endereco: '',
        tipo: '',
        preco: '',
        horario: '',
        imagem: '',
      });

      alert(editando ? 'Academia atualizada com sucesso!' : 'Academia adicionada com sucesso!');
    } catch (error) {
      alert(`Erro ao ${editando ? 'atualizar' : 'adicionar'} academia: ${error.message}`);
    }
  };

  const handleEdit = (academia) => {
    setNovaAcademia(academia);
    setEditando(academia.id); // Define a academia em edição
  };

  return (
    <div className="container">
      <header>
        <h1>Manter Academia</h1>
      </header>
      <div className="academia-form">
        <input
          type="text"
          name="nome"
          placeholder="Nome da Academia"
          value={novaAcademia.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={novaAcademia.endereco}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo (ex: Crossfit, Musculação)"
          value={novaAcademia.tipo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="preco"
          placeholder="Preço (ex: R$ 150/mês)"
          value={novaAcademia.preco}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="horario"
          placeholder="Horário (ex: 6h - 22h)"
          value={novaAcademia.horario}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagem"
          placeholder="URL da Imagem"
          value={novaAcademia.imagem}
          onChange={handleChange}
          required
        />
        <button onClick={handleAddAcademia}>
          {editando ? 'Salvar Alterações' : 'Adicionar Academia'}
        </button>
      </div>

      <div className="academias-list">
        <h2>Academias Cadastradas</h2>
        {academias.length > 0 ? (
          <ul>
            {academias.map((academia) => (
              <li key={academia.id}>
                <img src={academia.imagem} alt={academia.nome} className="academia-img" />
                <div>
                  <h3>{academia.nome}</h3>
                  <p>Endereço: {academia.endereco}</p>
                  <p>Tipo: {academia.tipo}</p>
                  <p>Preço: {academia.preco}</p>
                  <p>Horário: {academia.horario}</p>
                  <button onClick={() => handleEdit(academia)}>Editar</button>
                  <button onClick={() => removeAcademia(academia.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma academia cadastrada.</p>
        )}
      </div>
    </div>
  );
}

export default ManterAcademia;
