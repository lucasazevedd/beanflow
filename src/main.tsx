import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// 🔁 Importa as rotas da aplicação
import AppRoutes from './routes';

import { registerSW } from 'virtual:pwa-register';
registerSW();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
