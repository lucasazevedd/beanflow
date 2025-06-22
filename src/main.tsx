import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AppRoutes from './routes';

// Corrigido: import correto do PWA
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {
    console.log('⚠️ Atualização disponível — mostrar botão para atualizar, se quiser.');
  },
  onOfflineReady() {
    console.log('✅ Aplicativo pronto para uso offline!');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);