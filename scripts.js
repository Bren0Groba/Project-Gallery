document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const addImageBtn = document.getElementById('add-image-btn');
  const imageUpload = document.getElementById('image-upload');

  // Menu de contexto
  const contextMenu = document.createElement('div');
  contextMenu.classList.add('context-menu');
  document.body.appendChild(contextMenu);

  // Opção de "Remover" no menu de contexto
  const removeOption = document.createElement('a');
  removeOption.textContent = 'Remover';
  contextMenu.appendChild(removeOption);

  // Fechar o menu de contexto
  const closeContextMenu = () => {
    contextMenu.style.display = 'none';
  };

  // Function to open lightbox with clicked image
  const openLightbox = (imageUrl) => {
    lightboxImage.setAttribute('src', imageUrl);
    lightbox.style.display = 'flex';
  };

  // Event listener for opening the lightbox when an image is clicked
  gallery.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-image')) {
      const imageUrl = e.target.getAttribute('data-src');
      openLightbox(imageUrl);
    }
  });

  // Close lightbox when close button is clicked
  lightboxClose.addEventListener('click', (e) => {
    e.preventDefault();
    lightbox.style.display = 'none';
  });

  // Close lightbox when clicked outside of the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Open the file input when the "add-image-btn" is clicked
  addImageBtn.addEventListener('click', () => {
    imageUpload.click(); // This will trigger the file input
  });

  // Listen for file input change (when a file is selected)
  imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // Create a new gallery item
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');

      const img = document.createElement('img');
      img.src = reader.result;
      img.alt = file.name;
      img.classList.add('gallery-image');
      img.setAttribute('data-src', reader.result);

      // Append the new image to the gallery
      galleryItem.appendChild(img);
      gallery.appendChild(galleryItem);
    };

    reader.readAsDataURL(file);
  });

  // Mostrar o menu de contexto (remover imagem) ao clicar com o botão direito
  gallery.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('gallery-image')) {
      // Exibe o menu na posição do clique
      contextMenu.style.display = 'block';
      contextMenu.style.left = `${e.pageX}px`;
      contextMenu.style.top = `${e.pageY}px`;

      // Ao clicar na opção de remover
      removeOption.onclick = () => {
        target.closest('.gallery-item').remove(); // Remove a imagem
        closeContextMenu(); // Fecha o menu
      };
    }
  });

  // Fechar o menu de contexto se clicar fora
  document.addEventListener('click', () => {
    closeContextMenu();
  });
});
