import React, { createContext, useContext, useState } from 'react';

// Criação do contexto para autenticação
const AuthContext = createContext();

// Componente AuthProvider que gerencia o estado da autenticação e fornece//
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.user) {
      setUser(data.user); // Salva os dados do usuário logado no estado
    } else {
      console.error(data.error); // Exibe erros no console, se existirem
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);