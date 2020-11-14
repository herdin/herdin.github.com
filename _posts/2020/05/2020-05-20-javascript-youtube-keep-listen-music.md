---
layout: post
title: "유튜브 영상으로 음악 계속 듣기, keep listening music without disturbing on youtube"
date: 2020-05-20
tags: javascript
---

일할떄 유튜브로 음악을 틀어놓는데,

프리미엄이 아니라서 자꾸 광고가 뜨거나, 오래 틀어 놓았을 때, 계속 보냐고 물어보면서 멈출 때가 있다.

그게 귀찮아서 스크립트를 짯다. 언제 유튜브에서 바꿀진 모르겠지만, 2020-05-20 기준 잘된다.

2020-11-14 업데이트를 했다.

아래의 두가지 중 아무거나 하면 된다.
1. <a href='javascript:(function(){let conn=(()=>{let e={prev:{target:document.querySelectorAll(".ytp-prev-button.ytp-button")[0]},next:{target:document.querySelectorAll(".ytp-next-button.ytp-button")[0]},skipAd:{target:null,removeCount:0,detect:function(){return null!=this.target},remove:function(){this.detect()&&(this.target.click(),this.removeCount++)}},stillWatch:{target:null,removeCount:0,detect:function(){let e=!1;return this.target&&(e="none"!=this.target.parentElement.parentElement.parentElement.parentElement.style.display),e},remove:function(){this.detect()&&(this.target.click(),this.removeCount++)}},skipAdOveray:{target:null,removeCount:0,detect:function(){return null!=this.target},remove:function(){this.detect()&&(this.target.click(),this.removeCount++)}}};return{elements:e,refresh:function(){e.skipAd.target=document.querySelectorAll(".ytp-ad-skip-button.ytp-button")[0],e.stillWatch.target=document.querySelectorAll("#confirm-button")[0],e.skipAdOveray.target=document.querySelectorAll(".ytp-ad-overlay-close-container")[0]},prev:function(){e.prev.target.click()},next:function(){e.next.target.click()},delay:1e3}})(),interval=setInterval(()=>{conn.refresh();const e="font-weight: normal; color: black",t="font-weight: bold; color: blue",n="font-weight: bold; color: red",o="font-weight: bold; color: green";console.clear();let l=" %c skip ad %c "+conn.elements.skipAd.detect()+" %c still watch %c "+conn.elements.stillWatch.detect()+" %c close overlay ad %c "+conn.elements.skipAdOveray.detect();console.log(" "+new Date),console.log(l,e,t,e,n,e,o);let c=" %c skip ad %c"+conn.elements.skipAd.removeCount+" %c still watch %c"+conn.elements.stillWatch.removeCount+" %c close overlay ad %c"+conn.elements.skipAdOveray.removeCount;console.log(c,e,t,e,n,e,o),conn.elements.skipAd.remove(),conn.elements.stillWatch.remove(),conn.elements.skipAdOveray.remove()},conn.delay);})()'>youtubeAdRemove</a> 를 드래그하여 브라우저 북마크바에 넣고, 음악을 듣고 있는 유튜브 페이지에서 북마크를 클릭한다.
2. 아래의 `복붙 용도 (minify)` 또는 `코드 보는 용도(human readable)` 의 코드를 복사하여 음악을 듣고 있는 유튜브 페이지의 브라우저 console 창에 입력한다.

#### 복붙 용도 (minify)

``` javascript
let conn=(()=>{let e={prev:{target:document.querySelectorAll(".ytp-prev-button.ytp-button")[0]},next:{target:document.querySelectorAll(".ytp-next-button.ytp-button")[0]},skipAd:{target:null,removeCount:0,detect:function(){return null!=this.target},remove:function(){this.detect()&&(this.target.click(),this.removeCount++)}},stillWatch:{target:null,removeCount:0,detect:function(){let e=!1;return this.target&&(e="none"!=this.target.parentElement.parentElement.parentElement.parentElement.style.display),e},remove:function(){this.detect()&&(this.target.click(),this.removeCount++)}},skipAdOveray:{target:null,removeCount:0,detect:function(){return null!=this.target},remove:function(){this.detect()&&(this.target.click(),this.removeCount++)}}};return{elements:e,refresh:function(){e.skipAd.target=document.querySelectorAll(".ytp-ad-skip-button.ytp-button")[0],e.stillWatch.target=document.querySelectorAll("#confirm-button")[0],e.skipAdOveray.target=document.querySelectorAll(".ytp-ad-overlay-close-container")[0]},prev:function(){e.prev.target.click()},next:function(){e.next.target.click()},delay:1e3}})(),interval=setInterval(()=>{conn.refresh();const e="font-weight: normal; color: black",t="font-weight: bold; color: blue",n="font-weight: bold; color: red",o="font-weight: bold; color: green";console.clear();let l=" %c skip ad %c "+conn.elements.skipAd.detect()+" %c still watch %c "+conn.elements.stillWatch.detect()+" %c close overlay ad %c "+conn.elements.skipAdOveray.detect();console.log(" "+new Date),console.log(l,e,t,e,n,e,o);let c=" %c skip ad %c"+conn.elements.skipAd.removeCount+" %c still watch %c"+conn.elements.stillWatch.removeCount+" %c close overlay ad %c"+conn.elements.skipAdOveray.removeCount;console.log(c,e,t,e,n,e,o),conn.elements.skipAd.remove(),conn.elements.stillWatch.remove(),conn.elements.skipAdOveray.remove()},conn.delay);
```

#### 코드 보는 용도(human readable)

``` javascript
let conn = (() => {
  let elements = {
    prev: {
      target: document.querySelectorAll('.ytp-prev-button.ytp-button')[0],
    },
    next: {
      target: document.querySelectorAll('.ytp-next-button.ytp-button')[0],
    },
    skipAd: {
      target: null,
      removeCount: 0,
      detect: function(){
        return this.target != null;
      },
      remove: function() {
        if(this.detect()) {
          this.target.click();
          this.removeCount++;
        }
      },
    },
    stillWatch: {
      target: null,
      removeCount: 0,
      detect: function() {
        let isDetect = false;
        if(this.target) {
          isDetect = this.target
            .parentElement
            .parentElement
            .parentElement
            .parentElement.style.display != 'none';
        }
        return isDetect;
      },
      remove: function() {
        if(this.detect()) {
          this.target.click();
          this.removeCount++;
        }
      },
    },
    skipAdOveray: {
      target: null,
      removeCount: 0,
      detect: function() {
        return this.target != null;
      },
      remove: function() {
        if(this.detect()) {
          this.target.click();
          this.removeCount++;
        }
      },
    },
  };

  function refresh() {
    elements.skipAd.target = document.querySelectorAll('.ytp-ad-skip-button.ytp-button')[0];
    elements.stillWatch.target = document.querySelectorAll('#confirm-button')[0];
    elements.skipAdOveray.target = document.querySelectorAll('.ytp-ad-overlay-close-container')[0];
  }

  function prev() { elements.prev.target.click(); }
  function next() { elements.next.target.click(); }

  return {
    elements: elements,
    refresh: refresh,
    prev: prev,
    next: next,
    delay: 1*1000
  };
})();

let interval = setInterval(() => {
  conn.refresh();

  const style = {
    normalBlack: 'font-weight: normal; color: black',
    boldBlue: 'font-weight: bold; color: blue',
    boldRed: 'font-weight: bold; color: red',
    boldGreen: 'font-weight: bold; color: green',
  };

  console.clear();
  let targetDetectionReport = ''
    + ' %c skip ad %c ' + conn.elements.skipAd.detect()
    + ' %c still watch %c ' + conn.elements.stillWatch.detect()
    + ' %c close overlay ad %c ' + conn.elements.skipAdOveray.detect()
    ;
  console.log(' ' + new Date());
  console.log(targetDetectionReport,
    style.normalBlack,
    style.boldBlue,
    style.normalBlack,
    style.boldRed,
    style.normalBlack,
    style.boldGreen);

  let targetRemoveReport = ''
    + ' %c skip ad %c' + conn.elements.skipAd.removeCount
    + ' %c still watch %c' + conn.elements.stillWatch.removeCount
    + ' %c close overlay ad %c' + conn.elements.skipAdOveray.removeCount
    ;
  console.log(targetRemoveReport,
    style.normalBlack,
    style.boldBlue,
    style.normalBlack,
    style.boldRed,
    style.normalBlack,
    style.boldGreen);

    conn.elements.skipAd.remove();
    conn.elements.stillWatch.remove();
    conn.elements.skipAdOveray.remove();
}, conn.delay);
```
