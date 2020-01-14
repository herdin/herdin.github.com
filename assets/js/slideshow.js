define(['jquery'], ($) => {
    let slideIndex = 0;
    let slideClassName = 'mySlides';
    let dotClassName = 'dot';
    let init = (customSlideClassName, customDotClassName) => {
      if(customSlideClassName) { slideClassName = customSlideClassName; }
      if(customDotClassName) { dotClassName = customDotClassName; }
    };
    let showSlide = (n) => {
      let slides = document.getElementsByClassName(slideClassName);
      let dots = document.getElementsByClassName(dotClassName);
      if (n >= slides.length) { slideIndex = 0; }
      if (n < 0) { slideIndex = slides.length-1; }
      for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (let i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex].style.display = "block";
      dots[slideIndex].className += " active";
    };
    let nextSlide = () => {
       showSlide(slideIndex += 1);
    };
    let prevSlide = () => {
      showSlide(slideIndex += -1);
    };
    let currSlide = (n) => {
      showSlide(slideIndex = n);
    };

    return {
      init : init,
      nextSlide : nextSlide,
      prevSlide : prevSlide,
      currSlide : currSlide,
    }
});
