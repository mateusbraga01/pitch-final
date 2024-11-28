// src/contexts/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   const logout = () => {
    setUser(null); // Limpa o estado do usuário
    // Aqui você também pode limpar qualquer dado de autenticação armazenado, como tokens no localStorage, se estiver usando.
    localStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};