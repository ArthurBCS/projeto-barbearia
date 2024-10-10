import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Cria uma raiz React no elemento com id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro do StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medição de performance (opcional)
// Para usar, passe uma função para log de resultados (ex: reportWebVitals(console.log))
// ou envie para um endpoint de análise. Mais info: https://bit.ly/CRA-vitals
reportWebVitals();

// NOTE: Configuração do backend
// 1. Importar e configurar um cliente HTTP (ex: axios) para chamadas à API
// 2. Configurar variáveis de ambiente para URLs da API (use .env para diferentes ambientes)
// 3. Configurar interceptores para adicionar tokens de autenticação às requisições

// NOTE: Configuração de estado global (se necessário)
// 1. Importar e configurar Context API ou Redux
// 2. Envolver <App /> com o provedor de estado global

// NOTE: Configuração de roteamento (se ainda não implementado no App.js)
// 1. Importar BrowserRouter do react-router-dom
// 2. Envolver <App /> com BrowserRouter