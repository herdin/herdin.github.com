---
layout: post
title: "파파존스 할인쿠폰 조회"
date: 2020-12-09
tags: service
---

<link type="text/css" rel="stylesheet" href="/assets/vendor/jsgrid_v1.5.3/css/jsgrid-theme.min.css"/>
<link type="text/css" rel="stylesheet" href="/assets/vendor/jsgrid_v1.5.3/css/jsgrid.min.css"/>

<div id="storeGrid"></div>
<div id="couponGrid"></div>


<script>
require(['init'], (init) => { require(['jquery'], ($) => { require(['jsgrid'], (jg) => { $(document).ready(function(){
  let sharedData = {
    selectedSszstoreid: 0,
  };
  function isFilterEmpty(filterObj) {
    let filterEmpty = true;
    for(filterKey in filterObj) {
      if(filterObj[filterKey]) {
        filterEmpty = false;
        break;
      }
    }
    return filterEmpty;
  }
  function filteringData(filterObj, filterTargetDataArr) {
    return filterTargetDataArr.filter((filterTarget) => {
      console.log(`filter target ->`, filterTarget);
      if(isFilterEmpty(filterObj)) {
        return true;
      }
      let isFiltered = false;
      for(filterKey in filterObj) {
        let filterValue = filterObj[filterKey];
        if(filterValue) {
          console.log(`filter value -> ${filterValue}, filter target -> ${filterTarget[filterKey]}, indexOf -> ${filterTarget[filterKey].indexOf(filterValue)}`);
          if(filterTarget[filterKey].indexOf(filterValue) >= 0) {
            isFiltered = true;
            break;
          }
        }
      }
      return isFiltered;
    });
  }

  let storeController = {
    loadData: function(filterObj) {
      console.log('load data', filterObj);
      let prom = new Promise((resolve, reject) => {
        $.ajax({
          url: 'https://pji.co.kr/get.do?ex=Store&ac=getstores&szdocd=&szsicd=&szname=&szstoreid=',
          type: 'get',
          dataType: 'jsonp',
          crossDomain: true,
          success: (dataArr) => {
            console.log('success data -> ', dataArr)
            resolve(filteringData(filterObj, dataArr));
          },
          error: (data) => {
            console.error('error data -> ', data);
            reject(data);
          },
        });
      });
      return prom;
    },
  };

	console.log('store controller init ok.');

  $("#storeGrid").jsGrid({
    width: "100%",
    height: "400px",

    autoload: true,
    filtering: true,
    //inserting: true,
    //editing: true,
    sorting: true,
    paging: true,

    controller: storeController,
    rowClick: (clickInfo) => {
      console.log('row click ->', clickInfo);
      sharedData.selectedSszstoreid = clickInfo.item.szstoreid;
      console.log('shared data ->', sharedData);
      $('#couponGrid').jsGrid('loadData');
    },

    fields: [
      { name: "szaaddr", type: "text", title: '지점주소', width: 150, validate: "required" },
      { name: "szname", type: "text", title: '지점명', width: 200 },
    ]
  });

	console.log('store grid init ok.');

  let couponController = {
    loadData: function(filterObj) {
      console.log('load data', filterObj);
      let prom = new Promise((resolve, reject) => {
        $.ajax({
          url: 'https://pji.co.kr/get.do?ex=Coupon&ac=selectCoupon&szDiscountCode=&nStoreId=' + sharedData.selectedSszstoreid,
          type: 'get',
          dataType: 'jsonp',
          crossDomain: true,
          success: (dataArr) => {
            console.log('success data -> ', dataArr)
            resolve(filteringData(filterObj, dataArr));
          },
          error: (data) => {
            console.error('error data -> ', data);
            reject(data);
          },
        });
      });
      return prom;
    },
  };

    console.log('store controller init ok.');

    $("#couponGrid").jsGrid({
      width: "100%",
      height: "400px",

      //autoload: true,
      filtering: true,
      //inserting: true,
      //editing: true,
      sorting: true,
      paging: true,

      controller: couponController,

      fields: [
        { name: "szdiscountnamelocal", type: "text", title: '쿠폰명', width: 150, validate: "required" },
        { name: "szdiscountcode", type: "text", title: '쿠폰코드', width: 200 },
      ]
    });

  	console.log('store grid init ok.');
}); }); }); });

</script>
