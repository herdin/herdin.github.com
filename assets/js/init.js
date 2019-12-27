$(document).ready(function(){

  var SCROLL_TO_TOP = 'scrollToTop';
  
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {
    //Get the button:
    var mybutton = document.getElementById(SCROLL_TO_TOP);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  };

  $('#' + SCROLL_TO_TOP).click(function(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

});
