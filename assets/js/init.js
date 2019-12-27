var ONLOAD_CALLBACK_LIST = [];

(function(){
  var done = false;
  var v = '3.4.1'; /*IF PAGE HAS NO JQUERY OR JQUERY VERSION LOW*/
  if (window.jQuery == undefined || window.jQuery.fn.jQuery < v) {
      var script = document.createElement('script'); /*script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";*/
      script.src = '/assets/vendor/jquery-' + v + '.min.js';
      script.onload = script.onReadyStateChange = function () {
          if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
              done = true;
              init();
          }
      }; /*END OF DEFINITION OF SCRIPT ONLREADY FUNCTION*/
      document.getElementsByTagName("head")[0].appendChild(script);
  } else { /*END OF JQUERY VERSION CHECK*/
      init();
  }

  function init() {
    ONLOAD_CALLBACK_LIST.push(addButtonScrollToTop);
    for(var i=0; i<ONLOAD_CALLBACK_LIST.length; i++) {
      ONLOAD_CALLBACK_LIST[i]();
    }
  }

  function addButtonScrollToTop() {
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
  }
})();
