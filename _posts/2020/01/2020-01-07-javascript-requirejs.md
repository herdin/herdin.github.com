---
layout: post
title: "어쩔 수 없이 사용하는 RequireJS"
date: 2020-01-07
tags: javascript
---

<script>
require(['init'], (init) => {
  require(['jquery', 'util'], ($, util) => {
    console.log('jquery version -> ' + $.fn.jquery);
    console.log('gen id from util module -> ' + util.genID());
  });
});
</script>

웹서칭을 하다가 어-썸한 js 나 css 를 보면 블로그로 퍼다가 담곤 한다.

공통 헤더 파일에 특정 라이브러리(jquery)가 들어간게 마음에 들지 않아서, 공통 헤더파일에는 init.js 만 두고, init.js 에서 jquery 를 동적으로 불러오도록 했다.

### head.html
``` html
<head>
	<title>
	<link rel="stylesheet" type="text/css" href="{{ site.url }}/style.css" />
	<link rel="alternate" type="application/rss+xml" title="{{ site.name }} - {{ site.description }}" href="{{ site.url }}/feed.xml" />
	<!-- Created with Jekyll Now - http://github.com/barryclark/jekyll-now -->
	<script src="/assets/js/init.js"></script>
  <!-- ... 이하 생략 -->
```
### init.js
``` javascript
var ONLOAD_CALLBACK_LIST = []; //각 페이지에서 jquery 로드 된 뒤 실행할 함수 배열

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

### SomeHTML.html/SomeJS.js
``` html
<script>
function afterCall() {
  console.log('this is page, jquery version is -> ' + $.fn.jquery);
}
ONLOAD_CALLBACK_LIST.push(afterCall);
</script>
```

동적 로딩을 했으니, jquery 로드 시점이 미뤄져서 각 페이지에서 사용하는 jquery 변수나 함수들이 일반 script 태그로는 먹지 않았다.

그래서 전역변수 `ONLOAD_CALLBACK_LIST` 배열을 하나 정의하고, 각 페이지에서는 해당 배열에 함수를 넣어주면 jquery 로드 콜백에서 해당 배열에 들어있는 함수를 실행하는 방식으로 각 페이지와 jquery 의 의존도를 풀어냈다.

그런데 페이지에서 사용할 라이브러리가 jquery 에 의존도가 있는 경우는 생각하지 못했는데, 이번에 [circletimer](https://github.com/abejfehr/circletimer) 를 사용하려다보니 그런 경우가 생겼다.

그래서 어차피 jquery 도 동적로딩한 마당에 라이브러리 의존도에 따른 동적로딩 모듈을 하나 만들까 생각하다보니, 공부도 할 겸 `RequireJS` 를 써보기로 했다.

## RequireJS

[RequireJS 공식 홈페이지](https://requirejs.org/) 로고는 대충 이렇다.

<img src='#' post-src='2020-01-07-javascript-requirejs.png'>

javascript 모듈화의 두진영 AMD(Asynchronous module definition) 와 CommonJS 가 있는데, 이건 AMD 진영이다.

### 그래서 왜 써야되는데?
- 의존성 관리. 언어 차원에서 package/import 정책을 지원하지 않는다.
- 모듈화. 전역변수의 남발과 충돌로 유지보수를 힘들게 만듬. Closure 를 사용하여 격리

### 어떻게 쓰지?
- require.js 파일 추가
- 설정.js(configuration option) 추가
- 모듈.js 파일 추가
- 사용 페이지 또는 js 에서 require 함수를 사용하여 스크립트 사용.

먼저 require.js 파일을 추가하자.

``` html
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
<script src="/assets/vendor/require.js" data-main="/assets/js/init.js"></script>
```

`data-main` 속성은 require.js 파일이 로드 된 뒤에 로드될 파일을 지정해 준다. 해당 파일의 path(scripts) 가 baseurl 로 취급된다. `data-main` 속성이 없으면, require.js 을 포함한 html 의 path 가 baseurl 이 된다.
> 위의 예시에선 data-main 이 있으므로 /assets/js 가 baseurl 이 된다.

보통은 `data-main` 에 설정옵션이 들어간 js 를 두고 그 아래에 불러올 모듈 js 를 기술한다고 한다.
``` html
<script src="/assets/vendor/require.js" data-main="/assets/js/init.js"></script>
<script src="/assets/module1.js"></script>
```

`data-main` 을 사용하기 싫으면 이렇게 사용할 수도 있다.

### 참고, 파일구조
``` yaml
/:
  assets:
    js:
      init.js
      module1.js
      ...
    vendor:
      require.js
```

### init.js
``` javascript
require.config({
    baseUrl : '/assets',
    paths : {
        util : 'js/util',
        module1 : 'js/module1',
        jquery : 'vendor/jquery-3.4.1.min',
        circletimer : 'vendor/circletimer/circletimer.min',
    },
});

```

### SomeHTML.html
``` html
<script src="/assets/vendor/require.js"></script>
<script>
require(['../js/init'], function() {
    require(['module1'], function(module1) {
      module1.someFunction();
    });
});
</script>
```
모든 모듈은 .js 파일로 간주하므로 .js 를 붙이지 않는다.

아래의 세가지 조건 중 하나만 충족하더라도 requirejs 는 해당 자원을 모듈로 인식하지 않는다.

- `.js` 로 끝나거나
- `/` 로 시작하거나
- `http`, `https` 같은 프로토콜을 포함하는 경우.

``` javascript
//main.js
require.config({
    baseUrl : '/assets', //requirejs 에서 사용할 모듈들의 default path
    //추가 위치 및 js 모듈들이 default path 아래 어디있는지 정의한다.
    paths : {
        util : 'js/util', //적용될 경로는 /assets/js/util.js 가 된다.
        jquery : 'vendor/jquery-3.4.1.min',
        circletimer : 'vendor/circletimer/circletimer.min',
    },
});
```

``` javascript
//util.js
define((require) => {
  let $ = require('jquery');

  return {
    genID : () => 'generatedID-' + Math.floor(Math.random()*100000),
  };
});
```

아주 기본적인 사용법을 숙지하고 아래와 같이 사용하고 있는데.. 잘 모르겠다..

``` html
<script>
  require(['init'], (init) => {
    require(['jquery'], ($) => {
      $('#someElementId').hide(2000);
    });
  });
</script>
```

위에서 init 모듈과 jquery 모듈 사이에 의존 관계가 없다면,

``` html
<script>
  require(['init', 'jquery'], (init) => {
    $('#someElementId').hide(2000);
  });
</script>
```

이렇게 한줄로 줄일 수 있지만, 아닌 경우는 콜백지옥처럼 깊어지게 된다. 이렇게 쓰는게 맞는건지 잘 모르겠다..


## 전역변수를 오염시키지 않고($, jQuery) 여러버전의 jQuery 를 사용하는 방법

위와 같이 하면 전역변수인 `$`, `jQuery` 가 마지막 로드된 jquery 에 의해 오염되게 된다. `$`, `jQuery` 변수를 jQuery 에서만 사용한다고 하면 상관 없지만, `$` 를 다른 라이브러리에서 사용하거나 다른 버전의 jQuery 를 사용한다고하면 문제가 될 수 있다. 이럴땐 `jQuery.noConflict` 함수를 사용하여 전역변수 오염을 피할 수 있다. RequireJS 홈페이지에 noConflict 함수를 사용한 방법이 가이드 되어있는데 뭘 잘못했는지 모르겠는데 그대로하면 오류가난다.

### init.js
``` javascript
require.config({
    baseUrl : '/static',
    paths : {
        'jquery-private' : 'js/jquery-private',
        'jquery-private2' : 'js/jquery-private2',
        'jquery341' : 'lib/jquery-3.4.1.min',
        'jquery331' : 'lib/jquery-3.3.1.min',
    },
    map: {
        '*': {
            'jquery': 'jquery-private', //jquery 모듈 요청 시 jquery-private 모듈로 매핑
            'jquery2' : 'jquery-private2', //jquery2 모듈 요청 시 jquery-private2 모듈로 매핑
        },
        // 'jquery-private' : { 'jquery': 'jquery' }, //jquery-private 모듈 내부에서 jquery 를 호출 시 순환오류를 회피하기 위함
        // 'jquery-private2' : { 'jquery': 'jquery' },
    }
});
```

### jquery-private.js
``` javascript
define(['jquery341'], function () {
    return $.noConflict( true );
});
/*
RequireJS 공식 문서에서는 아래와 같이 가이드하고 있다.
하지만 실제로 이렇게 하면 함수의 $ 변수가 undefined 상태로 넘어온다.
define(['jquery341'], function ($) {
    return $.noConflict( true );
});
*/
```

### jquery-private2.js
``` javascript
define(['jquery331'], function () {
    return $.noConflict( true );
});
```

### SomeHTML.html
``` html
<script src="/static/lib/require.js" data-main="/static/js/init.js"></script>
<script>
require(['init'], function(init) {
    require(['jquery'], function(jq) {
        console.log('jquery version -> ' + jq.fn.jquery);
    });
    require(['jquery2'], function(jq) {
        console.log('jquery2 version -> ' + jq.fn.jquery);
    });
});
console.log('global variable $ -> ' + $); //Uncaught ReferenceError: $ is not defined
</script>
```

출처
- [RequireJS - AMD의 이해와 개발](https://d2.naver.com/helloworld/591319)
- [RequireJS](https://requirejs.org)
