// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AcademiaProvider } from './contexts/AcademiaContext';
import { UserProvider, useUser } from './contexts/UserContext';
import { UserProfileProvider } from './contexts/UserProfileContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import ClientePerfil from './pages/Perfil';
import ClienteAcademias from './pages/Cliente/Academias';
import Notificacoes from './pages/Cliente/Notificacoes';
import ClienteHomePage from './pages/Cliente/HomePage';
import GerenteHomePage from './pages/Gerente/HomePageG';
import Recompensas from './pages/Cliente/Recompensas';
import Homepage from './pages/Cliente/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';

import GerenteLogin from './pages/Gerente/Login';

import CadastrarGerente from './pages/Gerente/Cadastrar';
import ManterAcademia from './pages/Gerente/ManterAcademia';
import EstatisticasAnuncio from './pages/Gerente/EstatisticasAnuncio';
import GerenciarPlanos from './pages/Gerente/GerenciarPlanos';
import Equipamentos from './pages/Gerente/Equipamentos';
import Funcionarios from './pages/Gerente/Funcionarios';
import MarketingLocal from './pages/Gerente/MarketingLocal';
import AnalisesDesempenho from './pages/Gerente/AnalisesDesempenho';
import MeuPerfil from './pages/Perfil';

import './styles/app.css';

// Componente para redirecionar com base na autenticação do usuário
const PrivateRoute = ({ element }) => {
  const { user } = useUser(); // Usar o contexto do usuário

  if (!user) {
    console.log("Usuário não autenticado, redirecionando para login...");
    return <Navigate to="/login" />;
  }

  return element;
};

const Navbar = () => {
  const { user } = useAuth(); // Utiliza o AuthContext para verificar o usuário

  return (
    <nav>
      <ul>
        {user && user.tag === 'gerente' && (
          <>
            <li><Link to="/analises-desempenho">Análises de Desempenho</Link></li>
            <li><Link to="/manter-academia">Manter Academia</Link></li>
            <li><Link to="/estatisticas-anuncio">Estatísticas do Anúncio</Link></li>
            <li><Link to="/equipamentos">Equipamentos</Link></li>
            <li><Link to="/funcionarios">Funcionários</Link></li>
            <li><Link to="/marketing-local">Marketing Local</Link></li>
            <li><Link to="/gerenciar-planos">Gerenciar Planos</Link></li>
          </>
        )}
        {user && user.role === 'cliente' && (
          <>
            <li><Link to="/academias">Academias</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/notificacoes">Notificações</Link></li>
            <li><Link to="/recompensas">Recompensas</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

const App = () => {
  const [user, setUser] = useState(null); // Estado do usuário
  
  const handleLogin = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.user) {
      setUser(data.user); // Armazena o usuário logado
    } else {
      console.error(data.error);
    }
  };
  

  return (
    <AuthProvider>
      <UserProfileProvider>
      <Router>
        <Navbar />
        <UserProvider>
          <AcademiaProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/perfil" element={<PrivateRoute element={<ClientePerfil />} />} />
              <Route path="/academias" element={<PrivateRoute element={<ClienteAcademias />} />} />
              <Route path="/cliente-home" element={<PrivateRoute element={<ClienteHomePage />} />} />
              <Route path="/gerente-home" element={<PrivateRoute element={<GerenteHomePage />} />} />
              <Route path="/notificacoes" element={<PrivateRoute element={<Notificacoes />} />} />
              <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recompensas" element={<PrivateRoute element={<Recompensas />} />} />
              <Route path="/gerente-login" element={<GerenteLogin />} />
              <Route path="/gerente-cadastrar" element={<CadastrarGerente />} />
              <Route path="/manter-academia" element={<PrivateRoute element={<ManterAcademia />} />} />
              <Route path="/estatisticas-anuncio" element={<PrivateRoute element={<EstatisticasAnuncio />} />} />
              <Route path="/gerenciar-planos" element={<PrivateRoute element={<GerenciarPlanos />} />} />
              <Route path="/equipamentos" element={<PrivateRoute element={<Equipamentos />} />} />
              <Route path="/funcionarios" element={<PrivateRoute element={<Funcionarios />} />} />
              <Route path="/marketing-local" element={<PrivateRoute element={<MarketingLocal />} />} />
              <Route path="/analises-desempenho" element={<PrivateRoute element={<AnalisesDesempenho />} />} />
              <Route path="/meu-perfil" element={<PrivateRoute element={<MeuPerfil />} />} />
            </Routes>
          </AcademiaProvider>
        </UserProvider> 
      </Router>
      </UserProfileProvider>
    </AuthProvider>
  );
};

export default App;
