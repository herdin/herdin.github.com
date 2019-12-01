---
layout: post
title: Progress.js test
date: 2019-12-01
tags: opensource
---

<script src="/assets/js/progressbar.min.js"></script>

[Progress.js Document](https://progressbarjs.readthedocs.io/en/latest/)

```
<style>
  .container .container{
    margin: 20px;
    width: 200px;
    height: 200px;
    position: relative;
  }
</style>
```

<style>
  .container .container{
    margin: 20px;
    width: 200px;
    height: 200px;
    position: relative;
  }
</style>

# basic

<div class="container" id="container_basic"></div>

``` html
<div class="container" id="container_basic"></div>
```

``` javascript
<script>
var bar = new ProgressBar.Circle(document.getElementById('container_basic'), {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});
bar.animate(1.0);
</script>
```


<div class="container" id="container_bounce"></div>
<div class="container" id="container_multiple"></div>

<script>
  $(document).ready(function(){
    (function(){
      var bar = new ProgressBar.Circle(document.getElementById('container_basic'), {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null
      });
      bar.animate(1.0);
    })();

    (function(){
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
      bar.animate(1.0);
    })();

    (function(){
      var bar = new ProgressBar.Circle(document.getElementById('container_multiple'), {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#aaa', width: 1 },
        to: { color: '#333', width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
        }
      });
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '2rem';
      bar.animate(1.0);
    })();


  });
</script>
