---
layout: post
title: Lofi Radio Streaming List
date: 2019-12-19
tags: services lo-fi
---

> [여길보고](https://www.w3schools.com/howto/howto_js_slideshow.asp) 슬라드로 바꿔보자

![lo-fi image](/assets/images/posts/2019-12-19-test-html5-audio.gif)

<script>

require(['jquery', 'slideshow'], ($, slideshow) => {
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
    [
      "tunein_com_Now_Playing_s290316",
      "https://cdn-profiles.tunein.com/s290316/images/logoq.jpg?t=151378",
      "http://listen.shoutcast.com/freshsndgold",
      "audio/mpeg",
    ],
    [
      "radio_net_lautfm_lofi",
      "https://static.radio.net/inc/v2/images/avatars/station_avatar.gif",
      "https://stream.laut.fm/lofi?ref=radiode",
      "audio/mpeg",
    ],
  ];

  for(let audioKey in audios) {
    var id = util.genID();
    var $clone = $('#template').clone();
    $clone.css('display', 'block');
    $clone.attr('id', id);
    $clone.find('[name=sequence]').html('' + (audioKey+1) + '/' + audios.length);
    $clone.find('[name=thumbnail]').attr('src', audios[audioKey][thumbnail]);
    $clone.find('[name=caption]').html(audios[audioKey][id]);
    $clone.find('[name=audiosrc]').attr('src', audios[audioKey][sourceSrc]);
    $clone.find('[name=audiosrc]').attr('type', audios[audioKey][sourceType]);
    $('#slideshow-container').prepend($clone);
  }
}); //end of require(['jquery', 'slideshow']
</script>

<div id="audiobox"></div>

<div class="slideshow-container">
  <!-- contents -->
  <!-- Next and previous buttons -->
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<!-- The dots/circles -->
<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
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
