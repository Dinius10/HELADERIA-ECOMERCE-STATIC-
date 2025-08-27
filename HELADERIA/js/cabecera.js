const botonNavbar = document.getElementById("navbar");
const botonCerrar = document.getElementById("cerrar_nav");

const menuResponsiveItems = document.querySelectorAll(".boton_cabecera");


botonNavbar.addEventListener("click", e => abrirMenuResponsive())
botonCerrar.addEventListener("click", e => cerrarMenuResponsive())



function abrirMenuResponsive() {
    menuResponsiveItems.forEach(item => {
        item.style.animationName = 'abrirMenuResponsive';
    });
    botonCerrar.style.display = "block";
    botonNavbar.style.display = "none";
}  

function cerrarMenuResponsive() {
    menuResponsiveItems.forEach(item => {
        item.style.animationName = 'cerrarMenuResponsive';
    });
    botonCerrar.style.display = "none";
    botonNavbar.style.display = "block";
} 
