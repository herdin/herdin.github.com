---
layout: post
title: html5 audio tag
date: 2019-12-19
tags: web html lo-fi
---

![lo-fi image](/assets/images/posts/2019-12-19-test-html5-audio.gif)

<script>
let audios = {
  tunein_com_Lofi_HipHop_Radio__Chillsky_s288329 : {
    thumbnail : "https://cdn-profiles.tunein.com/s288329/images/logoq.jpg?t=636294",
    sourceSrc : "http://hyades.shoutca.st:8043/stream",
    sourceType : "audio/mpeg",
	autoplay : "autoplay",
  },
  tunein_com_Now_Playing_s290316 : {
    thumbnail : "https://cdn-profiles.tunein.com/s290316/images/logoq.jpg?t=151378",
    sourceSrc : "http://listen.shoutcast.com/freshsndgold",
    sourceType : "audio/mpeg",
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
+ '<div style="margin-bottom:50px;"><img src="#THUMBNAIL#" style="border-radius:50%; vertical-align:middle; margin-right:50px;"/>'
  + '<audio controls loop #AUTOPLAY#>'
  + '<source src="#SOURCESRC#" type="#SOURCETYPE#">'
  + 'Your browser does not support the audio element.'
+'</audio></div>';

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





# about html5 audio tag

file format : media type
- MP3 : audio/mpeg
- OGG : audio/ogg
- WAV : audio/wav

``` html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
```

대추 저렇게 쓰면 되는 것 같은데...


출처
- [HTML5 Audio](https://www.w3schools.com/html/html5_audio.asp)
