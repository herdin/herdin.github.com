---
layout: post
title: Lofi Radio Streaming List
date: 2019-12-19
tags: lo-fi
---

![lo-fi image](/assets/images/posts/2019-12-19-test-html5-audio.gif)

<script>
let audios = {
  [
    "hyades.shoutca.st",
    "https://cdn-profiles.tunein.com/s288329/images/logoq.jpg?t=636294",
    "http://hyades.shoutca.st:8043/autodj",
    "audio/mpeg",
    "autoplay",
  ]
  tunein_com_Lofi_HipHop_Radio__Chillsky_s288329 : {
    thumbnail : "https://cdn-profiles.tunein.com/s288329/images/logoq.jpg?t=636294",
    sourceSrc : ,
    sourceType : ,
	autoplay : ,
  },
  tunein_com_Now_Playing_s290316 : {
    thumbnail : "https://cdn-profiles.tunein.com/s290316/images/logoq.jpg?t=151378",
    sourceSrc : "http://listen.shoutcast.com/freshsndgold",
    sourceType : "audio/mpeg",
	autoplay : "",
  },
  tunein_com_Fresh_Sound_s278846 : {
    thumbnail : "https://cdn-profiles.tunein.com/s278846/images/logoq.jpg?t=151378",
    sourceSrc : "http://listen.shoutcast.com/freshsnd",
    sourceType : "audio/aac",
	autoplay : "",
  },
  radio_net_lautfm_lofi : {
    thumbnail : "https://static.radio.net/inc/v2/images/avatars/station_avatar.gif",
    sourceSrc : "https://stream.laut.fm/lofi?ref=radiode",
    sourceType : "audio/mpeg",
	autoplay : "",
  },
};


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
  		.replace('#THUMBNAIL#', audios[audioKey].thumbnail)
  		.replace('#SOURCESRC#', audios[audioKey].sourceSrc)
  		.replace('#SOURCETYPE#', audios[audioKey].sourceType)
  		.replace('#AUTOPLAY#', audios[audioKey].autoplay)
  	);
  }
});
</script>

<div id="audiobox"></div>
