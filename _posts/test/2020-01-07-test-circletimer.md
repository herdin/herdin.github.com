---
layout: post
title: circletimer
date: 2020-01-07
tags: opensource
---

<link rel="stylesheet" type="text/css" href="/assets/vendor/circletimer/circletimer.css">
<style>
#example-timer {
  height: 150px;
  margin: 20px auto;
  width: 150px;
}

h1 {
  color: #17a768;
  font-family: 'Pacifico', cursive;
  font-size: 40pt;
  margin: 40px 0 5px;
  text-align: center;
}

h1 a {
  color: #17a768;
  text-decoration: none;
}

h1 a:hover {
  color: #32dd92;
}

h5 {
  color: #f1601d;
  font-family: 'Raleway', sans-serif;
  font-size: 13pt;
  margin: 0;
  text-align: center;
}

h5 a {
  color: #f1ad1d;
  text-decoration: none;
}

h5 a:hover {
  color: #f1ad1d;
  text-decoration: underline;
}

p {
  color: #bbae93;
}

button {
  background-color: #f1601d;
  border: none;
  border-radius: 3px;
  color: #e7e0d2;
  margin: 0 8px;
  padding: 6px 9px;
}

button:hover {
  background-color: #f1ad1d;
}

pre {
  display: table;
  margin: 20px auto;
  text-align: left;
}

code {
  border-radius: 10px;
}
</style>

[circletimer](https://github.com/abejfehr/circletimer)

<div id="example-timer"></div>
<p>Time Elapsed: <span id="time-elapsed">0</span>ms</p>
<button id="start">Start</button>
<button id="pause">Pause</button>
<button id="stop">Stop</button>
<button id="add">Add 1s</button>

<script>
require(['init'], (init) => {
  require(['jquery'], ($) => {
    require(['circletimer'], (ct) => {
      /* Example code */
      $("#example-timer").circletimer({
        onComplete: function() {
          alert("Time is up!");
        },
        onUpdate: function(elapsed) {
          $("#time-elapsed").html(Math.round(elapsed));
        },
        timeout: 5000
      });

      $("#start").on("click", function() {
        $("#example-timer").circletimer("start");
      });

      $("#pause").on("click", function() {
        $("#example-timer").circletimer("pause");
      });

      $("#stop").on("click", function() {
        $("#example-timer").circletimer("stop");
      });

      $("#add").on("click", function() {
        $("#example-timer").circletimer("add", 1000);
      });
    }); //end of require(['circletimer']
  });
});
</script>
