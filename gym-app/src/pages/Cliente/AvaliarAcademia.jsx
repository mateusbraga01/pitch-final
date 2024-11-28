// src/pages/Cliente/AvaliarAcademia.jsx
import React, { useState } from 'react';

function AvaliarAcademia() {
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleRatingChange = (value) => {
    setAvaliacao(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simulação de envio de dados
    try {
      setIsSubmitted(true);
      setComentario('');
      setAvaliacao(0);
    } catch (err) {
      setError('Ocorreu um erro ao enviar a avaliação. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Avaliar Academia</h1>
      </header>
      <div className="rating-form">
        <form onSubmit={handleSubmit}>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => handleRatingChange(value)}
                style={{
                  cursor: 'pointer',
                  color: value <= avaliacao ? '#FFD700' : '#ddd',
                  fontSize: '2rem',
                }}
                aria-label={`Classificação ${value} estrelas`}
                role="button"
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            name="comentario"
            placeholder="Seu Comentário"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows="5"
            required
            aria-label="Seu Comentário"
          ></textarea>
          <button type="submit">Enviar Avaliação</button>
        </form>
        {isSubmitted && <p className="success-message">Avaliação enviada com sucesso!</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <footer>
        <p>&copy; 2024 Academia FitTracker</p>
      </footer>
    </div>
  );
}

export default AvaliarAcademia;
