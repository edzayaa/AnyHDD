document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.querySelector('.video');
  const thumbnail = videoContainer.querySelector('.thumbnail');
  const playButton = videoContainer.querySelector('.play-btn');
  const video = videoContainer.querySelector('video');

  if (!videoContainer || !thumbnail || !playButton || !video) {
    console.error('No se encontraron los elementos necesarios para la animación de video.');
    return;
  };

  // Función para manejar el clic en el botón de reproducción
  const handlePlay = () => {
    // Agregar la clase de animación de fade out
    thumbnail.classList.add('video-fade-out');
    playButton.classList.add('video-fade-out');
    
    // Esperar a que termine la animación antes de iniciar el video
    thumbnail.addEventListener('animationend', () => {
   
      thumbnail.style.display = 'none'; // Ocultar el thumbnail
      playButton.style.display = 'none'; // Ocultar el botón de play

      // Forzar la reproducción del video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error al reproducir el video:', error);
        });
      }
    }, { once: true });
  };

  // Agregar el evento de clic al botón de reproducción
  playButton.addEventListener('click', handlePlay);
});