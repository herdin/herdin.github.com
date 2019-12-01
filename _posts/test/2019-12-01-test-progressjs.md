---
layout: post
title: Progress.js test
date: 2019-12-01
tags: opensource
---

<script src="/assets/js/progressbar.min.js"></script>

[Progress.js Document](https://progressbarjs.readthedocs.io/en/latest/)

<style>
    .progress {
        height: 300px;
    }
    .progress > svg {
        height: 100%;
        display: block;
    }
</style>

<div class="progress" id="progress"></div>

<script>
  $(document).ready(function(){
    window.onload = function onLoad() {
        var circle = new ProgressBar.Circle('#progress', {
            color: '#FCB03C',
            duration: 3000,
            easing: 'easeInOut'
        });

        circle.animate(1);
    };
  });
</script>
