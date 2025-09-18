    // 1. Obtenemos referencias a nuestros elementos del HTML
    const fileInput = document.getElementById('file-upload');
    const uploadTextContainer = document.getElementById('upload-text-container');
    const originalText = uploadTextContainer.innerHTML; // Guardamos el texto original

    // 2. Añadimos un "escuchador" para el evento 'change'
    fileInput.addEventListener('change', function() {
        // 3. Verificamos si el usuario seleccionó al menos un archivo
        if (fileInput.files.length > 0) {
            // Si sí, mostramos el nombre del primer archivo seleccionado
            const fileName = fileInput.files[0].name;
            uploadTextContainer.innerHTML = `<span class="file-name">${fileName}</span>`;
        } else {
            // Si no (por ejemplo, si el usuario cancela), volvemos al texto original
            uploadTextContainer.innerHTML = originalText;
        }
    });