---
layout: about
title: About
permalink: /about/
---

``` javascript
class Page {
  constructor() {
    this.compiledTime = "{{ site.time }}";
    this.getCompiledTime = () => return this.compiledTime;
    }
  }
}

console.log(new Page().getCompiledTime());

```

### History

``` shell
* ...
* 2016.07.25. --ENTER TMONEY 2nd. SM.
|
* 2016.07.10. --LEAVE Korea Customs Service. SI.
* 2015.07.13. --ENTER Korea Customs Service. SI.
|
* 2015.06.30. --LEAVE AFC Solution development.
* 2014.01.01. --ENTER AFC Solution development.
|
* 2014.12.31. --LEAVE TMONEY 2nd. SI.
* 2013.11.07. --ENTER TMONEY 2nd. SI.
|
* 2013.10.31. --LEAVE MILES firmware development. SI.
* 2012.02.22. --GRADUATE Hongik University, Bachelor of Computer Engineering.
|\
| * 2012.01.01. --ENTER MILES firmware development. SI.
| * 2012.01.01. --JOIN LG CNS.
|/
* 2005.03.01. --ENTER Hongik University
```

<script>
  function makeDday() {
    var curDate = new Date();
    var chmunk = Math.ceil((curDate-new Date(2010, 01-1, 12))/1000/*millisec to sec*//60/*sec to min*//60/*min to hour*//24/*hour to day*/);
    var merryGoAround = Math.ceil((curDate-new Date(2017, 09-1, 16))/1000/*millisec to sec*//60/*sec to min*//60/*min to hour*//24/*hour to day*/);
    var myBean = Math.ceil((curDate-new Date(2018, 12-1, 20))/1000/*millisec to sec*//60/*sec to min*//60/*min to hour*//24/*hour to day*/);
    var myBeanSprout = Math.ceil((curDate-new Date(2019, 09-1, 20))/1000/*millisec to sec*//60/*sec to min*//60/*min to hour*//24/*hour to day*/);

    function appendDday(id, day) {
      var element = '';
      element += '<div>';
      element += '<span class="kd">var</span> ';
      element += '<span class="nx">' + id + '</span> ';
      element += '<span class="o">=</span> ';
      element += '<span class="mo">' + day + '</span>';
      element += '<span class="err">;</span>';
      element += '</div>';
      $('.highlight code').eq(0).append(element);      
    }
    appendDday('chmunk'       , chmunk);
    appendDday('merryGoAround', merryGoAround);
    appendDday('myBean'       , myBean);
    appendDday('myBeanSprout' , myBeanSprout);
  }
  ONLOAD_CALLBACK_LIST.push(makeDday);
</script>
