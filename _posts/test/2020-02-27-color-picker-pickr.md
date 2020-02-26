---
layout: post
title: color picker pickr
date: 2020-01-31
tags: test
---

<!-- One of the following themes -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/classic.min.css"/> <!-- 'classic' theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/monolith.min.css"/> <!-- 'monolith' theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/nano.min.css"/> <!-- 'nano' theme -->

<!-- Modern or es5 bundle -->
<script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.es5.min.js"></script>

[pickr](https://github.com/Simonwep/pickr)

<div class=".color-picker"></div>

<script type="text/javascript">
require(['init'], (init) => {
  require(['jquery'], ($) => {
    $(document).ready(() => {
      // Simple example, see optional options for more configuration.
      const pickr = Pickr.create({
          el: '.color-picker',
          theme: 'classic', // or 'monolith', or 'nano'

          swatches: [
              'rgba(244, 67, 54, 1)',
              'rgba(233, 30, 99, 0.95)',
              'rgba(156, 39, 176, 0.9)',
              'rgba(103, 58, 183, 0.85)',
              'rgba(63, 81, 181, 0.8)',
              'rgba(33, 150, 243, 0.75)',
              'rgba(3, 169, 244, 0.7)',
              'rgba(0, 188, 212, 0.7)',
              'rgba(0, 150, 136, 0.75)',
              'rgba(76, 175, 80, 0.8)',
              'rgba(139, 195, 74, 0.85)',
              'rgba(205, 220, 57, 0.9)',
              'rgba(255, 235, 59, 0.95)',
              'rgba(255, 193, 7, 1)'
          ],

          components: {

              // Main components
              preview: true,
              opacity: true,
              hue: true,

              // Input / output Options
              interaction: {
                  hex: true,
                  rgba: true,
                  hsla: true,
                  hsva: true,
                  cmyk: true,
                  input: true,
                  clear: true,
                  save: true
              }
          }
      });    
    });
  });
});
</script>
