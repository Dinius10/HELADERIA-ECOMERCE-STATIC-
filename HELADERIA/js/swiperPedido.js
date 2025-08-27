const swiper2 = new Swiper(".swiper2", {
    direction: "horizontal",
    loop: true,
  
    // Disable touch interactions
    allowTouchMove: true,
  
    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  