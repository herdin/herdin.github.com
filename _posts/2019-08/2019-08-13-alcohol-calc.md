---
layout: post
title: "알코올 함량 계산기"
date: 2019-08-13
tags: calc
---
<script src="/assets/js/jquery-3.4.1.min.js"></script>
<input id="abv" type="text" placeholder="ABV" size="5"> % <input id="cc" type="text" placeholder="CC" size="5"> cc
<input id="gram" type="text" placeholder="" size="5" readonly> g

<script>
  $(document).ready(function(){
    var calc = function() {
      var abv = $("#abv").val();
      var cc =  $("#cc").val();
      $("#gram").val((abv*cc/100*0.8).toFixed(2));
    }
    $("#abv").on("keyup", calc);
    $("#cc").on("keyup", calc);
  });
</script>
