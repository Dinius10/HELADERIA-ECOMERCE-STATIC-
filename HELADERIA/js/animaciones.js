/*ANIMACION AL AÑADIR PRODUCTO AL CARRITO*/
const boton1 = document.getElementById('boton1');
const boton2 = document.getElementById('boton2');
const container = document.querySelector('.contenedor');

function crearBala() {
    const bala = document.createElement('div');
    bala.className = 'bala';
    container.appendChild(bala);
    return bala;
}

function dispararBala() {
    const bala = crearBala();
    const rect1 = boton1.getBoundingClientRect();
    const rect2 = boton2.getBoundingClientRect();

    // Posicionar la bala en el centro del botón1
    bala.style.left = (rect1.left + rect1.width / 2 - 5) + 'px';
    bala.style.top = (rect1.top + rect1.height / 2 - 5) + 'px';

    // Hacer visible la bala y moverla
    requestAnimationFrame(() => {
        bala.style.opacity = '1';

        // Calcular la distancia entre los botones
        const dx = rect2.left - rect1.left + (rect2.width - rect1.width) / 2;
        const dy = rect2.top - rect1.top + (rect2.height - rect1.height) / 2;

        requestAnimationFrame(() => {
            bala.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        // Hacer desaparecer la bala al llegar y eliminarla
        setTimeout(() => {
            bala.style.opacity = '0';
            setTimeout(() => {
                bala.remove();
            }, 1000);
        }, 1000);
    });
}

boton1.addEventListener('click', dispararBala);