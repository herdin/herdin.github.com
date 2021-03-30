---
layout: post
title: "javascript, 의존성 극뽁"
date: 2021-03-30
tags: javascript dependency
---

back-end 개발자인데, 서버가 필요없는 stand-alone html + javascript + css 로 간단한 기능을 만들어 자주 사용한다.

html 에 javascript 를 include 할 때마다, 항상 script 간 의존성 때문에 짜증이 나서, require.js 를 사용했었는데,

require js 을 지원하는 모듈들이 많지 않아서, 포기해버렸다.

> 게다가 의존성이 깊어질 수록 require js 로 풀어낸 코드가 장황해진다..  
> 내가 잘 못 사용하는거라고하면 할말이 없지만.

아무튼, require js 를 썻다가 뺏다가 나름의 해결책을 찾아낸 것이.. 아래와 같은 모습이다.

logger 는 따로 console 을 wrapping 해서 만든 모듈인데, 그냥 지워도 무방하다.

html head 에 아래 script 파일을 쓰면된다.

html 파싱 및 script 로드는 위에서 아래로 한다고 생각하면 이해가 쉽다.

head 의 마지막에 script 나 css 를 계속 추가해주면서 onload 함수에 promise resolve 를 걸어둠으로써, 의존성을 promise 로 풀어냈다.

css 간 의존성은 없으므로, css 는 동시에 로드하도록 하고

``` javascript
//has dependency with logger
function includeResource(filePath, resourceMaker) {
  if(Array.from(document.querySelectorAll('script')).filter(script => script.src.indexOf(filePath) >= 0).length > 0) {
    logger.log('alreay load script', filePath);
    return;
  }
  let done = false;
  let promise = new Promise((resolve, reject) => {
    let resource = resourceMaker(filePath);
    resource.onload = function() {
      if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        logger.log('resource load done', filePath);
        resolve();
      }
    };
    document.head.appendChild(resource);
  });
  return promise;
}

function script(filePath) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = filePath;
  return script;
}

function css(filePath) {
  let link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = filePath;
  return link;
}

const dependencyPromise = Promise.resolve()
.then(() => {
  //css here
  includeResource('/default-style.css', css);
  includeResource('/a-style.css', css);
  includeResource('/b-style.css', css);
  return Promise.resolve();
})
.then(() =>
  //script here
  Promise.all([
    includeResource('/assets/vendor/jquery-3.4.1.min.js', script)
      .then(() => includeResource('/assets/vendor/dependent-with-jquery', script)),
    includeResource('/assets/js/not-dependent-with-jquery.js', script)
  ])
)
.then(() => includeResource('/assets/js/init.js', script))
.then(() => logger.log('all script load done'))
.catch(err => logger.log('script load error -> ', err))
```

일단 맘에 든다.

`dependencyPromise` 변수를 굳이 놔둔 이유는 아래와 같다.

위의 코드는 블로그에서 공통으로 사용하는 코드인데, 각 블로그 포스트마다 공통 의존성이 모두 로드된 다음, 코드를 실행하고 싶은 경우가 있을 것이다.

그때, `dependencyPromise.then(() => doSomething())` 과 같이 이후 코드를 실행할 수 있게 된다.

더 좋은 방법을 찾을 때까지는 이렇게 사용할 듯 싶다.


[블로그에서 사용 중인 코드](https://github.com/herdin/herdin.github.com/blob/master/assets/js/dependency-manager.js)
