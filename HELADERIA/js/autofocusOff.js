document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el primer input en el formulario y quitar el foco
    const firstInput = document.querySelector('input');
    if (firstInput) {
        firstInput.blur(); // Elimina el foco del primer input
    }
});