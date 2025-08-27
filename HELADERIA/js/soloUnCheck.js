function permitirSoloUno(selector) {
  const checkboxes = document.querySelectorAll(selector);
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach(box => {
        if (box !== this) {
          box.checked = false;
        }
      });
    });
  });
}

// Usar la función para diferentes grupos de checkboxes
permitirSoloUno('.entrega');
permitirSoloUno('.recibirOrden');
permitirSoloUno('.sucursal');
permitirSoloUno('.pago');
