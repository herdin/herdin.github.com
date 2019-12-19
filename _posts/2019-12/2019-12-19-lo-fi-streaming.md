---
layout: post
title: Lofi Radio Streaming List
date: 2019-12-19
tags: lo-fi
---

![lo-fi image](/assets/images/posts/2019-12-19-test-html5-audio.gif)

<script>
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


let audioTag = ''
+ '<div style="margin-bottom:50px;">'
+ '<img src="#THUMBNAIL#" style="width:150px; height:150px; border-radius:50%; vertical-align:middle; margin-right:50px;"/>'
  + '<audio controls loop #AUTOPLAY# style="vertical-align:middle;">'
  + '<source src="#SOURCESRC#" type="#SOURCETYPE#">'
  + 'Your browser does not support the audio element.'
+ '</audio>'
+ '</div>';

$(document).ready(function(){
  for(let audioKey in audios) {
  	$('#audiobox').append(
  		audioTag
  		.replace('#THUMBNAIL#', audios[audioKey][thumbnail])
  		.replace('#SOURCESRC#', audios[audioKey][sourceSrc])
  		.replace('#SOURCETYPE#', audios[audioKey][sourceType])
  	);
  }
});
</script>

<div id="audiobox"></div>
