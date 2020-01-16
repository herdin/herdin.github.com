---
layout: post
title: Lofi Radio Streaming List
date: 2019-12-19
tags: services lo-fi
---

<link rel="stylesheet" type="text/css" href="{{ site.url }}/assets/css/slideshow.css" />

![lo-fi image](/assets/images/posts/2019-12-19-test-html5-audio.gif)

<script>
require(['init'], (init) => {
  require(['jquery', 'util', 'slideshow', 'progressbarwrapper'], ($, util, slideshow, progressbarwrapper) => {
    let bar = progressbarwrapper.draw('progressbar-container', 'linep');
    progressbarwrapper.animate(bar, 0.0, 0);

    const id = 0;
    const thumbnail = 1;
    const sourceSrc = 2;
    const sourceType = 3;
    let audios = [
      [
        "hyades.shoutca.st",
        "https://cdn-profiles.tunein.com/s288329/images/logoq.jpg?t=636294",
        "http://hyades.shoutca.st:8043/autodj",
        "audio/mpeg",
      ],
      /*
      [
        "tunein_com_Now_Playing_s290316",
        "https://cdn-profiles.tunein.com/s290316/images/logoq.jpg?t=151378",
        "http://listen.shoutcast.com/freshsndgold",
        "audio/mpeg",
      ],*/
      [
        "radio_net_lautfm_lofi",
        "https://static.radio.net/inc/v2/images/avatars/station_avatar.gif",
        "https://stream.laut.fm/lofi?ref=radiode",
        "audio/mpeg",
      ],
    ];

    let slideClassName = 'musicSlide';
    slideshow.init(slideClassName, 'dot');

    for(let audioKey in audios) {
      let templateId = util.genID();
      let $clone = $('#template').clone();
      $clone.attr('id', templateId);
      $clone.removeClass('mySlides');
      $clone.addClass(slideClassName);
      $clone.find('[name=sequence]').html('' + (Number(audioKey)+1) + '/' + audios.length);
      $clone.find('[name=thumbnail]').attr('src', audios[audioKey][thumbnail]);
      $clone.find('[name=caption]').html(audios[audioKey][id]);
      let audioId = util.genID();
      $clone.find('audio').attr('id', audioId);
      $clone.find('[name=audiosrc]').attr('src', audios[audioKey][sourceSrc]);
      $clone.find('[name=audiosrc]').attr('type', audios[audioKey][sourceType]);
      $('#slideshow-container').prepend($clone);

      $clone.find('[name=thumbnail]').click(() => {
          let audio = document.getElementById(audioId);
          if(audio.paused) { audio.play(); }
          else { audio.pause(); }
      });

      $('#dot-container').append('<span class="dot"></span>');

      progressbarwrapper.animate(bar, (Number(audioKey)+1)/audios.length, 10);
    }

    $('#prev').click(slideshow.prevSlide);
    $('#next').click(slideshow.nextSlide);
    for(let i=0; i<$('.dot').length; i++) {
    	$($('.dot').get(i)).click(() => {
        slideshow.currSlide(i);
      });
    }

    slideshow.currSlide(0);
    progressbarwrapper.animate(bar, 1.0, 100);
  }); //end of require(['jquery', 'slideshow']
}); //end of require(['init']
</script>

``` shell
click below circle to play/pause
```

<div id="progressbar-container"></div>

<div id="slideshow-container" class="slideshow-container" style="max-width:150px;">
  <!-- contents -->
  <!-- Next and previous buttons -->
  <a class="prev" id="prev">&#10094;</a>
  <a class="next" id="next">&#10095;</a>
</div>

<!-- The dots/circles -->
<div id="dot-container" style="text-align:center">
</div>


<!-- Full-width images with number and caption text -->
<div id="template" class="mySlides fade" style="display:none; text-align:center;">
  <div name="sequence" class="numbertext"></div>
  <img name="thumbnail" src="#" style="width:150px; height:150px; border-radius:50%; vertical-align:middle;"/>
  <div name="caption" class="text"></div>
  <audio controls loop style="display:none;">
    <source name="audiosrc" src="#" type="#">
    Your browser does not support the audio element.
  </audio>
</div>
