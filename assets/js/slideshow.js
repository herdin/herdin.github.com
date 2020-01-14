define(['jquery', 'util'], ($, util) => {
    let slideIndex = 0;
    let slideClassName = 'mySlides';
    let dotClassName = 'dot';
    let init = (customSlideClassName, customDotClassName) => {
      if(customSlideClassName) { slideClassName = customDotClassName; }
      if(customDotClassName) { dotClassName = customDotClassName; }
      showSlides(slideIndex);
    };
    let showSlides = (n) => {
      var i;
      var slides = document.getElementsByClassName(slideClassName);
      var dots = document.getElementsByClassName(dotClassName);
      if (n > slides.length) {slideIndex = 0;}
      if (n < 0) {slideIndex = slides.length-1;}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex].style.display = "block";
      dots[slideIndex].className += " active";
    };
    let nextSlide = () => {
       showSlides(slideIndex += 1);
    };
    let prevSlide = () => {
      showSlides(slideIndex += -1);
    };
    let currentSlide = (n) => {
      showSlides(slideIndex = n);
    };
    return {
      init : init,
      showSlide : showSlides,
      nextSlide : nextSlide,
      prevSlide : prevSlide,
      currSlide : currSlide,
    }
});
