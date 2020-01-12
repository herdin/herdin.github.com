---
layout: post
title: "어쩔 수 없이 사용하는 RequireJS"
date: 2020-01-07
tags: javascript writing
---

<script>
  require(['init'], () => {
    let $ = require('jquery');
    let util = require('util');
    console.log('gen id from util module -> ' + util.genID());
  });
</script>

웹서칭을 하다가 어-썸한 js 나 css 를 보면 블로그로 퍼다가 담곤 한다.

토이 프로젝트의 중요한 css 가 될 어-썸한 js 라이브러리를 찾아서([circletimer](https://github.com/abejfehr/circletimer)) 블로그로 담고 있었는데, 나름 페이지 내의 스크립트와 jQuery 의존관계를 풀어냈다고 생각했는데,
``` html
<script type="text/javascript" src="/assets/vendor/circletimer/circletimer.min.js"></script>
```

페이지 내에서 태그로 가져오는 js 파일에 대한 jQuery 의존성까지는 생각하지 못했다.

아래 내용은 `requirejs` 적용 전의 삽질기 이므로 관심이 없으면 `requirejs` 에 대해서는 <a href="#start">여기로</a>

``` html
<html>
  <head>
    <!-- 경로 신경쓰지말고 여기서 jquery 를 불러온다고 생각하자. -->
    <script src="jqeury.js"></script>
  </head>
  <body>
    hello, fuck'in js dependency
    <!-- 1번 케이스, 페이지 내에 직접 스크립트를 심는 경우 -->
    <script>
      $.ajax('https://d2.naver.com').done(console.log); //직접해도 안됨. CORS 정책부터 해결. 본인은 d2.naver.com 페이지에서 수행함.
    </script>
    <!-- 1번 케이스, 페이지 내에 스크립트를 불러오는 경우 -->
    <script type="text/javascript" src="/assets/vendor/circletimer/circletimer.min.js"></script>
  </body>
</html>
```

무식한 방법이지만, 1번케이스에서 jquery 로드보다 먼저될 페이지 스크립트의 오류를 방지하기위해 아래와 같은 방법을 사용했다.

``` javascript
var ONLOAD_CALLBACK_LIST = [];

(function(){
  var done = false;
  var v = '3.4.1'; /*IF PAGE HAS NO JQUERY OR JQUERY VERSION LOW*/
  if (window.jQuery == undefined || window.jQuery.fn.jQuery < v) {
      var script = document.createElement('script'); /*script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";*/
      script.src = '/assets/vendor/jquery-' + v + '.min.js';
      script.onload = script.onReadyStateChange = function () {
          if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
              done = true;
              init();
          }
      }; /*END OF DEFINITION OF SCRIPT ONLREADY FUNCTION*/
      document.getElementsByTagName("head")[0].appendChild(script);
  } else { /*END OF JQUERY VERSION CHECK*/
      init();
  }

  function init() {
    for(var i=0; i<ONLOAD_CALLBACK_LIST.length; i++) {
      ONLOAD_CALLBACK_LIST[i]();
    }
  }

})();
```

`ONLOAD_CALLBACK_LIST` jquery 로드 뒤 호출할 함수들을 담을 전역변수를 선언하고, 페이지에서

``` html
<script>
function afterCall() {
  $.ajax('https://d2.naver.com').done(console.log); //직접해도 안됨. CORS 정책부터 해결. 본인은 d2.naver.com 페이지에서 수행함.
}
ONLOAD_CALLBACK_LIST.push(afterCall);
</script>
```

이렇게 처넣는 방법이다. 대충 잘된다. 문제는 2번같은 케이스이다.
jquery 로드보다 빠른 js 파일인 경우 내부에서 jquery 가 없어서 오류가 난다.....

`RequireJS` 는 뭔가 러닝커브가 있는 것 같아서 나중에 하려고했는데, 내가 저걸 구현하면 더 구려질 것 같아서 공부를 하기로 했다.

> 흑

<a id="#start"> 여기부터 시작 </a>

[공식 홈페이지](https://requirejs.org/) 로고는 대충 이렇다

<img src='#' post-image-name='2020-01-07-javascript-requirejs.png'>

``` html
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```
`data-main` 속성은 require.js 파일이 로드 된 뒤에 로드될 파일을 지정해 준다. 해당 파일의 path(scripts) 가 baseurl 로 취급된다. `data-main` 속성이 없으면, require.js 을 포함한 html 의 path 가 baseurl 이 된다.

모든 모듈은 .js 파일로 간주하므로 .js 를 붙이지 않는다.

아래의 세가지 조건 중 하나만 충족하더라도 requirejs 는 해당 자원을 모듈로 인식하지 않는다.

- `.js` 로 끝나거나
- `/` 로 시작하거나
- `http`, `https` 같은 프로토콜을 포함하는 경우.


출처
- [RequireJS - AMD의 이해와 개발](https://d2.naver.com/helloworld/591319)
