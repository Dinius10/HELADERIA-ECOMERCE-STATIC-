document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    // Función para verificar si al menos un checkbox está marcado en una clase específica
    function verificarSeleccionPorClase(clase) {
        const checkboxes = document.querySelectorAll(`.${clase}`);
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
    }
    
    // Clases de las secciones a verificar
    const clasesDeSecciones = [
        'entrega',
        'recibirOrden',
        'sucursal',
        'pago'
        // Agregar más clases si es necesario
    ];
    
    let esValido = true;

    clasesDeSecciones.forEach(function(clase) {
        if (!verificarSeleccionPorClase(clase)) {
            esValido = false;
            document.querySelectorAll(`.${clase}`).forEach(element => {
                element.closest('.parte').style.border = "2px solid red"; // Opcional: marcar la sección en rojo
            });
        } else {
            document.querySelectorAll(`.${clase}`).forEach(element => {
                element.closest('.parte').style.border = ""; // Opcional: eliminar el borde rojo si la sección es válida
            });
        }
    });
    
    // Si alguna sección no tiene al menos un checkbox marcado, cancelar el envío del formulario
    if (!esValido) {
        event.preventDefault(); // Evita el envío del formulario
        alert("Por favor, selecciona al menos una opción en cada sección.");
    }else {
        // Si todo es válido, limpiar el localStorage
        localStorage.clear(); // Limpia todo el localStorage
    }
});

