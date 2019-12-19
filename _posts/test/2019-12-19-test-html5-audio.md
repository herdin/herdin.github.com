---
layout: post
title: html5 audio tag
date: 2019-12-19
tags: opensource
---

![lo-fi image](/assets/images/posts/2019-12-19-test-html5-audio.gif)
<audio controls="true" autoplay="true">
  <source src="http://hyades.shoutca.st:8043/stream" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

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
