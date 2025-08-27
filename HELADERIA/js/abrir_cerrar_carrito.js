const modales = document.querySelectorAll(".modal");
const btnAbrirModal = document.querySelectorAll(".abrir-modal");
const btnCerrarModal = document.querySelectorAll(".cerrar-modal");

// Función para abrir el modal correspondiente
btnAbrirModal.forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.classList.remove("modal--fadeout");
    modal.showModal();
    
  });
});

// Función para cerrar los modales
btnCerrarModal.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.add("modal--fadeout");
    modal.close();
  });
});


