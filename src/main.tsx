import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// 🔁 Importa as rotas da aplicação
import AppRoutes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
