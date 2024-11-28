import React, { useEffect, useState } from 'react';
import './styles/perfil.css'; // Adicione um arquivo CSS para estilização

const MeuPerfil = ({ user }) => {
  const [perfil, setPerfil] = useState({ email: '', tag: '' });
  const [seguranca, setSeguranca] = useState(null);
  const [recompensas, setRecompensas] = useState([]);

  useEffect(() => {
    if (!user) return; // Se não houver usuário, não faz nada

    const fetchPerfil = async () => {
      const response = await fetch(`http://localhost:5000/api/auth/meu-perfil/${user.id}`);
      const data = await response.json();
      setPerfil(data);
    };

    const fetchSeguranca = async () => {
      const response = await fetch(`http://localhost:5000/api/auth/seguranca/${user.id}`);
      const data = await response.json();
      setSeguranca(data);
    };

    const fetchRecompensas = async () => {
      const response = await fetch(`http://localhost:5000/api/auth/recompensas/${user.id}`);
      const data = await response.json();
      setRecompensas(data);
    };

    fetchPerfil();
    fetchSeguranca();
    fetchRecompensas();
  }, [user]);

  return (
    <div>
      <h1>Meu Perfil</h1>
      {user ? (
        <>
          <p>Email: {perfil.email}</p>
          <p>Tag: {perfil.tag}</p>
          <h2>Segurança</h2>
          {seguranca ? (
            <p>Dados criptografados: {seguranca.dados_criptografados}</p>
          ) : (
            <p>Sem informações de segurança disponíveis.</p>
          )}
          <h2>Recompensas</h2>
          {recompensas.length > 0 ? (
            <ul>
              {recompensas.map(recompensa => (
                <li key={recompensa.id}>{recompensa.descricao} - {recompensa.valor} pontos</li>
              ))}
            </ul>
          ) : (
            <p>Você não tem recompensas.</p>
          )}
        </>
      ) : (
        <p>Você precisa estar logado para ver seu perfil.</p>
      )}
    </div>
  );
};

export default MeuPerfil;
