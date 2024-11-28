import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto para gerenciar o estado das academias
const AcademiaContext = createContext();

// Hook personalizado para acessar o contexto facilmente
export const useAcademia = () => useContext(AcademiaContext);

// Provider do contexto que encapsula os componentes filhos
export const AcademiaProvider = ({ children }) => {
  const [academias, setAcademias] = useState([]);

  // Ao montar o componente, carrega as academias do localStorage
  useEffect(() => {
    const academiasSalvas = JSON.parse(localStorage.getItem('academias')) || [];
    setAcademias(academiasSalvas);
  }, []);

  // Sempre que a lista de academias mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('academias', JSON.stringify(academias));
  }, [academias]);

  // Função para adicionar uma nova academia
  const addAcademia = async (novaAcademia) => {
    const id = new Date().getTime(); // Gera um ID único baseado no timestamp
    setAcademias([...academias, { id, ...novaAcademia }]);
  };

  // Função para remover uma academia pelo ID
  const removeAcademia = (id) => {
    setAcademias(academias.filter((academia) => academia.id !== id));
  };

  // Função para atualizar os dados de uma academia existente
  const updateAcademia = async (id, updatedAcademia) => {
    setAcademias(
      academias.map((academia) =>
        academia.id === id ? { ...academia, ...updatedAcademia } : academia
      )
    );
  };

  // Provedor que fornece o estado e funções para os componentes filhos
  return (
    <AcademiaContext.Provider value={{ academias, addAcademia, removeAcademia, updateAcademia }}>
      {children}
    </AcademiaContext.Provider>
  );
};
