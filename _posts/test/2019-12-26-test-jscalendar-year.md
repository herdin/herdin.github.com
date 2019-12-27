---
layout: post
title: jsCalendar YearCalendar
date: 2019-12-01
tags: opensource
---

<!-- jsCalendar -->
<link rel="stylesheet" type="text/css" href="/assets/vendor/jsCalendar_v1.4.4/jsCalendar.min.css">
<!-- <link rel="stylesheet" type="text/css" href="../themes/jsCalendar.micro.css"> -->
<script type="text/javascript" src="/assets/vendor/jsCalendar_v1.4.4/jsCalendar.min.js"></script>
<script type="text/javascript" src="/assets/vendor/jsCalendar_v1.4.4/jsCalendar.datepicker.min.js"></script>

<style>
  html, body {
    font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
  }
  .description {
    padding-bottom: 40px;
    text-align: left;
    width: 970px;
    margin: 0 auto;
  }
  #year-calendar {
    width: 1030px;
    text-align: center;
    margin: 0 auto;
  }
  #year-calendar .year-title {
    padding: 10px 32px;
    font-size: 36px;
    text-align: left;
  }
  #year-calendar .jsCalendar {
    display : inline-block;
  }
  #year-calendar .jsCalendar-previous,
  #year-calendar .jsCalendar-next {
    opacity: 0.2;
    color: #888888;
  }
  .version {
    font-size: 10px;
    opacity: 0.6;
    text-align: right;
    width: 970px;
    margin: 0 auto;
    padding-top: 20px;
  }
  @media print {
    html, body {
      width: 100%;
      height: 100%;
    }
    body {
      zoom: 62%;
    }
    .description {
      display: none;
    }
    @page {
      size: A4 Portrait;
      max-height: 100%;
      max-width: 100%;
    }
  }
</style>

[jsCalendar](https://gramthanos.github.io/jsCalendar/index.html)

<div class="description">
  <div style="font-size: 1.4em;">Year calendar</div>
  <div>Demo full year calendar using jsCalendar</div>
  <div style="font-size: 0.75em;">Try to print it [Ctrl+P]</div>
</div>

<!-- Full Calendar wrapper -->
<div id="year-calendar"></div>

<!-- Create the calendar -->
<script type="text/javascript">
  // Get element
  var wrapper = document.getElementById("year-calendar");
  // Variables
  var date = new Date();
  var year = date.getYear() + 1900;
  var div;
  // Create title
  div = document.createElement("div");
  div.className = "year-title";
  div.textContent = year;
  wrapper.appendChild(div);
  // Create calendars
  var calendars = [];
  for (var i = 0; i < 12; i++) {
    // Create element
    div = document.createElement("div");
    div.className = "clean-theme";
    wrapper.appendChild(div);
    // Create month calender (we set the date to 0)
    calendars.push(
      jsCalendar.new(div, 0, {
        zeroFill : true,
        navigator : false
      })
    );
    calendars[i].goto("01-" + ((i + 1 < 10) ? "0" : "") + (i + 1) + "-" + year);
  }
</script>

<div class="version">
  jsCalendar <script type="text/javascript">document.writeln(jsCalendar.version);</script>
</div>
