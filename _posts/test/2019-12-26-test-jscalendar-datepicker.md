---
layout: post
title: jsCalendar Datepciker
date: 2019-12-26
tags: opensource
---

<script src="/"></script>
<!-- jsCalendar -->
<link rel="stylesheet" type="text/css" href="/assets/vendor/jsCalendar_v1.4.4/jsCalendar.min.css">
<!-- <link rel="stylesheet" type="text/css" href="../themes/jsCalendar.micro.css"> -->
<script type="text/javascript" src="/assets/vendor/jsCalendar_v1.4.4/jsCalendar.min.js"></script>
<script type="text/javascript" src="/assets/vendor/jsCalendar_v1.4.4/jsCalendar.datepicker.min.js"></script>

<style type="text/css">
  #wrapper {
    //position: absolute;
    //top: 50px;
    //left: 50%;
    //width: 400px;
    //line-height: 40px;
    //margin-left: -200px;
    font-size: 20px;
    //text-align: center;
  }
  #wrapper input {
    height: 30px;
    width: 150px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
  }
</style>

[jsCalendar](https://gramthanos.github.io/jsCalendar/index.html)

<div id="wrapper">
  Date Pickers Examples<br>

  Example 1 :
  <input type="text"
       name="test-1"
       data-datepicker/>
  <br>

  Example 2 :
  <input type="text"
       name="test-2"
       value="05/01/2019"
       data-datepicker
       data-class="classic-theme meterial-theme"/>
  <br>

  Example 3 :
  <input type="text"
       name="test-3"
       data-datepicker
       data-min="01/01/2019"
       data-max="31/01/2019"
       data-date="05/01/2019"
       data-navigation="no"
       data-class="classic-theme micro-theme"/>
  <br>

</div>
