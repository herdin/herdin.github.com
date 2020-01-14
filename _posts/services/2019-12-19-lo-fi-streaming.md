---
layout: post
title: Lofi Radio Streaming List
date: 2019-12-19
tags: services lo-fi
---

<link rel="stylesheet" type="text/css" href="{{ site.url }}/assets/css/slideshow.css" />

> [여길보고](https://www.w3schools.com/howto/howto_js_slideshow.asp) 슬라드로 바꿔보자

![lo-fi image](/assets/images/posts/2019-12-19-test-html5-audio.gif)

<script>
require(['init'], (init) => {
  require(['jquery', 'util', 'slideshow'], ($, util, slideshow) => {
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
      $clone.find('[name=sequence]').html('' + (audioKey+1) + '/' + audios.length);
      $clone.find('[name=thumbnail]').attr('src', audios[audioKey][thumbnail]);
      $clone.find('[name=caption]').html(audios[audioKey][id]);
      let audioId = util.genID();
      $clone.find('audio').attr('id', audioId);
      $clone.find('[name=audiosrc]').attr('src', audios[audioKey][sourceSrc]);
      $clone.find('[name=audiosrc]').attr('type', audios[audioKey][sourceType]);
      $('#slideshow-container').prepend($clone);

      $clone.find('[name=thumbnail]').click(() => {
          let audio = document.getElementById(audioId);
          if(audio.pause) { audio.paly(); }
          else { audio.pause(); }
      });
    }

    $('#prev').click(slideshow.nextSlide);
    $('#next').click(slideshow.prevSlide);
    for(let i=0; i<$('.dot').length; i++) {
    	$($('.dot').get(i)).click(() => {
        slideshow.currSlide(i);
      });
    }

    slideshow.currSlide(0);
  }); //end of require(['jquery', 'slideshow']
}); //end of require(['init']

</script>

<div id="audiobox"></div>

<div id="slideshow-container" class="slideshow-container">
  <!-- contents -->
  <!-- Next and previous buttons -->
  <a class="prev" id="prev">&#10094;</a>
  <a class="next" id="next">&#10095;</a>
</div>
<br>

<!-- The dots/circles -->
<div style="text-align:center">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>


<!-- Full-width images with number and caption text -->
<div id="template" class="mySlides fade" style="display:none;">
  <div name="sequence" class="numbertext"></div>
  <img name="thumbnail" src="#" style="width:150px; height:150px; border-radius:50%; vertical-align:middle;"/>
  <div name="caption" class="text"></div>
  <audio controls loop style="display:none;">
    <source name="audiosrc" src="#" type="#">
    Your browser does not support the audio element.
  </audio>
</div>
