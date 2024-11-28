import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useAcademia } from '../../contexts/AcademiaContext';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import '../Gerente/styles/homepage.css';

const GerenteHomePage = () => {
  const navigate = useNavigate();
  const { academias } = useAcademia();
  const { user, logout } = useUser(); // Obtendo usuário e função de logout

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirecione para a página de login após o logout
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
          <h1>FitTracker - Gerente</h1>
          <ul>
            <li><a onClick={() => navigate('/manter-academia')}>Manter Academias</a></li>
            <li><a onClick={() => navigate('/estatisticas-anuncio')}>Estatísticas</a></li>
            <li><a onClick={() => navigate('/gerenciar-planos')}>Gerenciar Planos</a></li>
            <li><a onClick={() => navigate('/funcionarios')}>Funcionários</a></li>
            <li><a onClick={() => navigate('/marketing-local')}>Marketing Local</a></li>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a onClick={() => navigate('/perfil')}>Meu Perfil</a></li>
            <li><a onClick={handleLogout}>Sair</a></li>
          </ul>
        </nav>
      </motion.header>

      {/* Seção Hero com imagem de fundo */}
      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h2>Gerencie Suas Academias com Eficácia</h2>
        <p>Acesse todas as informações relevantes e melhore a experiência dos seus clientes!</p>
        <button onClick={() => navigate('/manter-academia')} className="cta-button">Adicione sua Academia</button>
      </motion.section>

      {/* Seção de Anúncios */}
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

      {/* Seção Sobre Nós */}
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
          Somos uma empresa dedicada a conectar pessoas às melhores academias.
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

      {/* Rodapé */}
      <footer className="homepage-footer">
        <p>&copy; 2024 Academia FitTracker. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default GerenteHomePage;
