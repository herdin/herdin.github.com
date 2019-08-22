---
layout: post
title: Chart.js test
date: 2019-08-22
tags: opensource
---

<script src="/assets/js/Chart.bundle.min.js" />

[Chart.js Document](https://www.chartjs.org/docs/latest/getting-started/)

<canvas id="myChart"></canvas>

<script>
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
  });
</script>
