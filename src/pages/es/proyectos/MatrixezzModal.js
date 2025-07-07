// MatrixezzModal.js
// Modal para mostrar imágenes y video en la galería de Matrixezz sin Alpine.js
// Usa solo JS vanilla y Tailwind para estilos. Incluye soporte para cerrar con ESC y click fuera.

/**
 * Inicializa la lógica de modales para la galería de Matrixezz
 * @param {string} gallerySelector - Selector del contenedor de la galería
 */
export function setupMatrixezzModal(gallerySelector = '.matrixezz-gallery') {
  const gallery = document.querySelector(gallerySelector);
  if (!gallery) return;

  // Crear modal solo una vez
  let modal = document.getElementById('matrixezz-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'matrixezz-modal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm hidden';
    modal.innerHTML = `
      <div id="matrixezz-modal-content" class="relative max-w-3xl w-full p-4 flex flex-col items-center">
        <button id="matrixezz-modal-close" class="absolute top-2 right-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-full p-2 shadow hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Cerrar modal">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div id="matrixezz-modal-media" class="w-full flex justify-center items-center"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalMedia = modal.querySelector('#matrixezz-modal-media');
  const closeModal = () => {
    modal.classList.add('hidden');
    modalMedia.innerHTML = '';
  };

  // Cerrar modal con botón, click fuera o ESC
  modal.querySelector('#matrixezz-modal-close').onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Delegación de eventos para imágenes y videos
  gallery.onclick = (e) => {
    const target = e.target;
    if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
      e.preventDefault();
      modal.classList.remove('hidden');
      // Clonar el nodo (para evitar reproducir video en galería y modal a la vez)
      const node = target.cloneNode(true);
      node.className = 'w-full h-auto max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900';
      if (node.tagName === 'VIDEO') {
        node.controls = true;
        node.autoplay = true;
        node.currentTime = 0;
        // Para forzar recarga del video y evitar problemas de reproducción
        node.load();
      }
      modalMedia.innerHTML = '';
      modalMedia.appendChild(node);
    }
  };
}

// Auto-inicialización si se carga en la página Matrixezz
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setupMatrixezzModal('.matrixezz-gallery');
  });
}
