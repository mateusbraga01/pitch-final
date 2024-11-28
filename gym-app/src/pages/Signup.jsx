import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tag, setTag] = useState('Cliente');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, tag }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate('/login'); // Redireciona para login após cadastro
      } else {
        setError(data.error || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      setError('Erro de conexão com o servidor. Tente novamente.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Cadastrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="Cliente">Cliente</option>
          <option value="Gerente">Gerente</option>
        </select>
        <button type="submit">Cadastrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Já tem uma conta? <a href="/login">Entre</a></p>
    </div>
  );
};

export default Signup;
