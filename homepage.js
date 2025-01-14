$(document).ready(function () {
    const carousel = $(".carousel");
    
   
    let albumData = [
    { "src": "images/1.svg", "title": "Sunset", "date":
   "2024-01-01" },
   { "src": "images/2.svg", "title": "Sunset", "date":
    "2024-01-01" },
    { "src": "images/3.svg", "title": "Sunset", "date":
        "2024-01-01" },
    ];

    // Populate Slick Carousel
 albumData.forEach(photo => {
    carousel.append(`<img src="${photo.src}"
   alt="${photo.title}">`);
    });
    // Initialize Slick Carousel
    carousel.slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000
    });

});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
