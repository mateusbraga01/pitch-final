import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação do novo método
import App from './App';

// Criação do root
const rootElement = document.getElementById('root'); // ID do elemento no index.html
const root = ReactDOM.createRoot(rootElement); // Usando o método createRoot

// Renderização do App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
