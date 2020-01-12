require.config({
    baseUrl : 'assets',
    paths : {
        util : 'js/util',
        jquery : 'vendor/jquery-3.4.1.min',
        bootstrap : 'lib/bootstrap-4.4.1-dist/bootstrap.min',
    },
});

require(['jquery'], ($) => {

  // add scroll to top button - start
  (() => {
    let SCROLL_TO_TOP = 'scrollToTop';

    window.onscroll = function() {
      //Get the button:
      let mybutton = document.getElementById(SCROLL_TO_TOP);
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

  })();
  // add scroll to top button - end

  // img path replace - start
  (() => {
    let postImagePath = '/assets/images/posts/';
    let realImageName = 'post-image-name';
    $('img').each(function(index, obj) {
      if($(obj).attr(realImageName) != null) {
        $(obj).attr('src', postImagePath + $(obj).attr(realImageName));
      }
    });
  })();
  // img path replace - end

});//end of require
