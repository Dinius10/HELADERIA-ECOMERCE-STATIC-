var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: "auto",
    direction: "horizontal",
    loop: false,
    speed: 1000,
    mousewheel: false,
    allowTouchMove: false,
    keyboard: true,
    initialSlide: 0,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,

    },
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next"
    },

    on: {
        slideChange: function () {
            updateInfo(this.activeIndex);
        },
    },

});

// Función para actualizar el contenido del div .info
function updateInfo(index) {
    // Define la información que quieres mostrar en cada slide
    const infoContent = [
        {
            id: 1,
            title: 'HELADO<br>DULCE DE LECHE',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iusto porro debitis sunt voluptas ducimus dicta corrupti quos ipsa laboriosam commodi quae a similique sequi sapiente culpa molestiae, nulla ea?',
            price: '49.9'
        },
        {
            id: 2,
            title: 'HELADO<br>CHOCOLATE',
            description: 'Delicioso helado de chocolate con trozos de cacao amargo que te sorprenderán.',
            price: '45.9'
        },
        {
            id: 3,
            title: 'HELADO<br>VAINILLA',
            description: 'Clásico helado de vainilla, suave y cremoso, ideal para combinar con postres.',
            price: '42.9'
        },
        {
            id: 4,
            title: 'HELADO<br>FRUTILLA',
            description: 'Helado de frutilla con trozos de fruta fresca, una explosión de sabor en cada bocado.',
            price: '47.9'
        },
        // Añadir más objetos según la cantidad de slides
    ];

    // Actualiza los elementos dentro del div .info
    document.querySelector('.info .title p').innerHTML = infoContent[index].title;
    document.querySelector('.info .description p').innerHTML = infoContent[index].description;
    document.querySelector('.info .price span').textContent = `${infoContent[index].price} Bs`;

    // Actualiza los atributos del botón "Añadir al carrito"
    const addToCartButton = document.querySelector('.info .price button');
    addToCartButton.setAttribute('data-id', infoContent[index].id);
    addToCartButton.setAttribute('data-name', infoContent[index].title.replace('<br>', ' '));
    addToCartButton.setAttribute('data-price', infoContent[index].price);
}
