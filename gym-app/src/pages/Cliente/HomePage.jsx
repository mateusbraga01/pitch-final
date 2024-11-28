import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useAcademia } from '../../contexts/AcademiaContext';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { useMediaQuery } from 'react-responsive';

const ClienteHomePage = () => {
  const navigate = useNavigate();
  const { academias } = useAcademia();
  const { user, logout } = useUser();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Função para deslogar o usuário e redirecionar para a página de login
  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a página de login
  };

  // Função para redirecionar para a página de academias
  const goToAcademias = () => navigate('/academias');

  // Configurações do slider (exibe 1 slide para mobile e 3 para desktop)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3, 
    slidesToScroll: 1,
  };

  // Definição das animações de fade (aparecimento suave)
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="homepage-container">
      <motion.header
        className="homepage-header"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <nav className="homepage-nav">
          <h1>FitTracker</h1>
          <ul>
            <li><button onClick={goToAcademias}>Academias</button></li>
            {user ? (
              <>
                <li><button onClick={() => navigate('/perfil')}>Meu Perfil</button></li>
                <li><button onClick={() => navigate('/recompensas')}>Recompensas</button></li>
                <li><button onClick={handleLogout}>Sair</button></li>
              </>
            ) : (
              <>
                <li><button onClick={() => navigate('/login')}>Login</button></li>
                <li><button onClick={() => navigate('/signup')}>Cadastrar</button></li>
              </>
            )}
          </ul>
        </nav>
      </motion.header>

      {/* Seção Hero (principal chamada à ação) */}
      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h2>Transforme Seu Corpo com as Melhores Academias</h2>
        <p>Encontre a academia perfeita para você e comece sua jornada fitness hoje mesmo!</p>
        <button onClick={goToAcademias} className="cta-button">Encontre Academias</button>
      </motion.section>

      <motion.section
        id="anuncios"
        className="anuncios-section"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h2>Anúncios de Academias</h2>
        <Slider {...settings}>
          {academias.length > 0 ? (
            academias.map((academia) => (
              <div className="anuncio-card" key={academia.id}>
                <img src={academia.imagem} alt={academia.nome} />
                <h3>{academia.nome}</h3>
                <p>{academia.descricao}</p>
                <a onClick={() => navigate('/academias')} className="cta-button">Saiba Mais</a>
              </div>
            ))
          ) : (
            <div className="anuncio-card">
              <h3>Sem Anúncios Disponíveis</h3>
            </div>
          )}
        </Slider>
      </motion.section>

      <motion.section
        id="sobre"
        className="sobre-section"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h2>Sobre Nós</h2>
        <p>
          Somos uma empresa dedicada a conectar pessoas ao mundo fitness.
          Nosso objetivo é facilitar o acesso a uma variedade de opções de treinamento, ajudando você a encontrar a
          academia perfeita que atenda às suas necessidades e preferências.
        </p>
        <p>
          Acreditamos que o fitness é uma jornada pessoal e estamos aqui para apoiá-lo em cada passo do caminho.
          Nossa plataforma foi projetada para oferecer informações abrangentes sobre as academias disponíveis,
          incluindo descrições, avaliações e detalhes sobre as instalações. Queremos que você tenha todas as ferramentas
          necessárias para transformar sua vida através do fitness.
        </p>
        <p>
          Junte-se a nós e comece sua jornada em direção a uma vida mais saudável e ativa. Com a FitTracker, você está
          um passo mais perto de alcançar seus objetivos de saúde e bem-estar.
        </p>
      </motion.section>

      <footer className="homepage-footer">
        <p>&copy; 2024 Academia FitTracker. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ClienteHomePage;
