---
layout: post
title: "Promise 가 뭐지"
date: 2019-07-29
tags: javascript promise
---
[일단 보고 배운 링크](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

`ECMA Script 6` 부터 `native Promise` 를 지원한다.

`callback hell` 을 타파하기 위한 패턴, 클래스로 우아하고 가독성 좋은 코드를 만들도록 한다.

Promise 의 4가지 상태
- pending 대기중
- fulfilled 이행성공
- rejected 이행실패
- settled 종료

> 아래의 예제는 `PromiseData` class 를 디버깅용도로 사용하고
> `init()`, `process()` 함수가  10번의 `call chain` 을 갖는다.
> 별로 의미있는 예제라기보다 이렇게 사용하면 된다를 기록하고 싶었다.

{% highlight javascript %}
class PromiseData {
  constructor() {
    this.debug = true;
    this.debuglog = function(data) {
      if(this.debug) {
        console.log(data);
      }
    }
    this.debugdir = function(data) {
      if(this.debug) {
        console.dir(data);
      }
    }
  }
}

var pdata = new PromiseData();

function init(data) {
  pdata.debuglog('init() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
  return new Promise(function(resolve, reject) {
    if(data.init == true) {
      pdata.debuglog('init() resolve');
      data.data = data.data + 1;
      data.log = data.log + ' : init added';
      data.process = (i%3==0);
      //언제 끝날지 모르는 일..
      resolve(data);
    } else {
      pdata.debuglog('init() reject');
      reject(data);
    }
  });
}

function process(data) {
  return new Promise(function(resolve, reject) {
    pdata.debuglog('process() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
    if(data.process == true) {
      pdata.debuglog('process() resolve');
      data.data = data.data + 1;
      data.log = data.log + ' : process added';
      //언제 끝날지 모르는 일..
      resolve(data);
    } else {
      pdata.debuglog('process() reject');
      reject(data);
    }
  });
}

var tPromise, i;
for(i=0; i<10; i++) {
  tPromise = init({data:i, log:'start'+i, init:(i%2==0)})
  .then(process)
  .then(function(data){
    pdata.debuglog('all ok : ' + 'init() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
  })
  .catch(function(data){
    pdata.debuglog('catch : ' + 'init() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
  })
}
{% endhighlight %}
