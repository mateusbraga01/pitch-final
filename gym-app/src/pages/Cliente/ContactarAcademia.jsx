// src/pages/Cliente/ContactarAcademia.jsx
import React, { useState } from 'react';

function ContactarAcademia() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simulação de envio de dados
    try {
      setIsSubmitted(true);
      setFormData({
        nome: '',
        email: '',
        mensagem: '',
      });
    } catch (err) {
      setError('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Contatar Academia</h1>
      </header>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Seu Nome"
            value={formData.nome}
            onChange={handleChange}
            required
            aria-label="Seu Nome"
          />
          <input
            type="email"
            name="email"
            placeholder="Seu Email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Seu Email"
          />
          <textarea
            name="mensagem"
            placeholder="Sua Mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            rows="5"
            required
            aria-label="Sua Mensagem"
          ></textarea>
          <button type="submit">Enviar Mensagem</button>
        </form>
        {isSubmitted && <p className="success-message">Mensagem enviada com sucesso!</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default ContactarAcademia;
