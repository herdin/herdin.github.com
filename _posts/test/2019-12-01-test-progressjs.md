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

<div class="container" id="container_basic"></div>
<div class="container" id="container_bounce"></div>

<script>
  $(document).ready(function(){
    var bar = new ProgressBar.Circle(document.getElementById('container_basic'), {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: null
    });

    bar.animate(1.0);  // Number from 0.0 to 1.0

    bar = new ProgressBar.Circle(document.getElementById('container_bounce'), {
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      duration: 1400,
      easing: 'bounce',
      strokeWidth: 6,
      from: {color: '#FFEA82', a:0},
      to: {color: '#ED6A5A', a:1},
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
      }
    });

    bar.animate(1.0);  // Number from 0.0 to 1.0
  });
</script>
