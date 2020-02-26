---
layout: post
title: Chart.js test
date: 2019-08-22
tags: opensource
---

[Chart.js Document](https://www.chartjs.org/docs/latest/getting-started/)

<canvas id="myChart"></canvas>

<script>
require(['init'], (initTest) => {
  require(['jquery'], ($) => {
    require(['/assets/vendor/Chart.bundle.min.js'], function(Chart){
      $(document).ready(function(){
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45]
                }]
            },

            // Configuration options go here
            options: {}
        });
      });//end of document ready
    });//end of chartjs
  });//end of jquery
});//end of init
</script>
