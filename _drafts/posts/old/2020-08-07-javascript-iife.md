---
layout: post
title: "javascript, IIFE"
date: 2020-08-07
tags: javascript
---

## IIFE(Immediately-Invoked Function Expression)

즉시 실행 함수 표현식.
> iffy 로 발음한단다...... 이피~~

javascript 에서 함수를 선언하고 사용하는 방법은 보통 아래와 같다.

##### 기명 함수를 사용
``` javascript
function hello() {
  console.log('hello?');
}
hello();
//hello?
```

##### 익명 함수를 변수에 할당
``` javascript
let helloFunc = function() {
  console.log('hello??');
}
helloFunc();
//hello??
```

##### 기명함수지만 변수에 할당하여 사용
이런 경우는 선언 부 밖에서는 사용할 수 없다.
``` javascript
let callLimit = 3;
let callStack = 0;
let notHello = function secretHello() {
  callStack++;
  if(callLimit < callStack) return;
  console.log('not hello?');
  secretHello();
}
notHello()
//not hello?
//not hello?
//not hello?
secretHello()
//Uncaught ReferenceError: secretHello is not defined at <anonymous>:1:1
```

## 그래서 IIFE 는 어떻게 쓰는건데?

아마 어디선가 한번쯤은 봤을 법한 표현이다.
``` javascript
(function(){
  console.log('IIFE!!')
})();
```

그런데 이런건?

``` javascript
+function() { console.log('IIFE!!'); }()
IIFE!!
NaN

-function() { console.log('IIFE!!'); }()
IIFE!!
NaN

!function() { console.log('IIFE!!'); }()
IIFE!!
true

~function() { console.log('IIFE!!'); }()
IIFE!!
-1

void function() { console.log('IIFE!!'); }()
IIFE!!
```

`+`, `-`, `!`, `~` 의 단항연상자는 뒤의 표현을 식으로 해석하게 만든다. `void` 도 마찬가지다.
기명함수를 쓰든, 익명함수를 쓰든 상관이 없다. 어차피 실행되고 사라진다.


함수선언식과 호출을 위한 `()` 를 `()` 로 묶어서 표현식(expression)으로 만들거나
``` javascript
(function() { console.log('IIFE!!'); })()
```

함수선언식을 `()` 로 묶어서 표현식(expression)으로 만든다음 `()`을 사용하여 호출하거나
``` javascript
(function() { console.log('IIFE!!'); })()
```

## 그래서 이걸 쓰면 뭐가 좋지?

* private 처럼 내부 변수가 밖에 노출되지 않는다.
* global scope 를 더럽히지 않는다.

``` javascript
(function(){
  let name;
  let age;
  init();
  function init() {
      name = 'herdin';
      age = 20;
      console.log(name, age);
  }
}());
age
Uncaught ReferenceError: age is not defined at <anonymous>:1:1 (anonymous)
```

* 소스를 축소 시키는데 유용하다. (script minifier)

``` javascript
(function($, global, document) {
  // jQuery를 위해 $를 사용하고, window를 위해 global을 사용합니다.
}(jQuery, window, document));
```

* document 를 argument 로 넘겼기 때문에, `IIFE` 내부의 document parameter 를 더욱 축소 시킬 수 있다. `IIFE` 내부에서 document 라는 paramter 를
