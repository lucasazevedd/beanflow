self.addEventListener('install', () => {
  console.log('Service Worker instalado');
});

self.addEventListener('activate', () => {
  console.log('Service Worker ativado');
});

self.addEventListener('fetch', event => {
  // Por enquanto, só intercepta — não faz cache
  event.respondWith(fetch(event.request));
});