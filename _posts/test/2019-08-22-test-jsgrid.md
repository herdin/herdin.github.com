---
layout: post
title: jsGrid test
date: 2019-08-23
tags: test
---

<link type="text/css" rel="stylesheet" href="/assets/vendor/jsgrid_v1.5.3/css/jsgrid-theme.min.css"/>
<link type="text/css" rel="stylesheet" href="/assets/vendor/jsgrid_v1.5.3/css/jsgrid.min.css"/>
<script src="/assets/vendor/jsgrid_v1.5.3/js/jsgrid.min.js"></script>

[jsGrid Document](http://js-grid.com/docs/)

<div id="jsGrid"></div>

<script>
$(document).ready(function(){
  var clients = [
      { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue", "Married": false },
      { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av.", "Married": true },
      { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St.", "Married": false },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave", "Married": true },
      { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false }
  ];

  var countries = [
      { Name: "", Id: 0 },
      { Name: "United States", Id: 1 },
      { Name: "Canada", Id: 2 },
      { Name: "United Kingdom", Id: 3 }
  ];

  $("#jsGrid").jsGrid({
      width: "100%",
      height: "400px",

      inserting: true,
      editing: true,
      sorting: true,
      paging: true,

      data: clients,

      fields: [
          { name: "Name", type: "text", width: 150, validate: "required" },
          { name: "Age", type: "number", width: 50 },
          { name: "Address", type: "text", width: 200 },
          { name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
          { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
          { type: "control" }
      ]
  });
});

</script>
