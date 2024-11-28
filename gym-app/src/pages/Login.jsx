// src/pages/Login.jsx

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user); // Atualiza o estado do usuário
        console.log("Usuário autenticado:", data.user); 
        
         // Redireciona com base no tipo de usuário
      if (data.user.tag === 'Cliente') {
        navigate('/cliente-home'); // Redireciona para HomePage de Cliente
      } else if (data.user.tag === 'Gerente') {
        navigate('/gerente-home'); // Redireciona para HomePage de Gerente
      }

    } else {
      setError(data.error || 'Erro ao fazer login. Tente novamente.');
    }
  } catch (error) {
    setError('Erro de conexão com o servidor. Tente novamente.');
  }
};

  return (
    <div className="login-container">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>Ainda não tem uma conta? <a href="/signup">Cadastre-se</a></p>
    </div>
  );
};

export default Login;
