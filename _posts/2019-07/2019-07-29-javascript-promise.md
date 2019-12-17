---
layout: post
title: "Promise 가 뭐지"
date: 2019-07-29
tags: javascript async
---
`ECMA Script 6` 부터 `native Promise` 를 지원한다.

`callback hell` 을 타파하기 위한 패턴, 클래스로 우아하고 가독성 좋은 코드를 만들도록 한다.

Promise 의 4가지 상태
- pending 대기중
- fulfilled 이행성공
- rejected 이행실패
- settled 종료

> 아래의 예제는 `PromiseLogger` class 를 디버깅용도로 사용하고
> `init()`, `process()` 함수가  10번의 `call chain` 을 갖는다.
> 별로 의미있는 예제라기보다 이렇게 사용하면 된다를 기록하고 싶었다.

{% highlight javascript %}
class PromiseLogger {
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

var logger = new PromiseLogger();

function init(data) {
  logger.debuglog('init() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
  return new Promise(function(resolve, reject) {
    if(data.init == true) {
      logger.debuglog('init() resolve');
      data.data = data.data + 1;
      data.log = data.log + ' : init added';
      data.process = (i%3==0);
      //언제 끝날지 모르는 일..
      resolve(data);
    } else {
      logger.debuglog('init() reject');
      reject(data);
    }
  });
}

function process(data) {
  return new Promise(function(resolve, reject) {
    logger.debuglog('process() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
    if(data.process == true) {
      logger.debuglog('process() resolve');
      data.data = data.data + 1;
      data.log = data.log + ' : process added';
      //언제 끝날지 모르는 일..
      resolve(data);
    } else {
      logger.debuglog('process() reject');
      reject(data);
    }
  });
}

var tPromise, i;
for(i=0; i<10; i++) {
  tPromise = init({data:i, log:'start'+i, init:(i%2==0)})
  .then(process)
  .then(function(data){
    logger.debuglog('all ok : ' + 'init() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
  })
  .catch(function(data){
    logger.debuglog('catch : ' + 'init() start : ' + data.init + ' : ' + data.data + ' : ' + data.log);
  })
}
{% endhighlight %}

> `Promise` 는 `native javascript` 같은데..
> `jQuery` 에는 비슷한 역할을 하는 `Deffered` 객체가 있다.

- [참고자료1](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
