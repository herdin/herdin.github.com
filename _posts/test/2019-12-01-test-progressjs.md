---
layout: post
title: Progress.js test
date: 2019-12-01
tags: opensource
---

<script src="/assets/js/progressbar.min.js"></script>

[Progress.js Document](https://progressbarjs.readthedocs.io/en/latest/)

<style>
  .container {
    margin: 20px;
    width: 200px;
    height: 200px;
    position: relative;
  }
</style>

<div class="container" id="container_simple"></div>
<div class="container" id="container_"></div>

<script>
  $(document).ready(function(){
    var container_simple = $('#container_simple');
    var bar = new ProgressBar.Circle(container_simple, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: null
    });

    bar.animate(1.0);  // Number from 0.0 to 1.0
  });
</script>
