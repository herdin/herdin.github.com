---
layout: post
title: "렉시컬 스코프(lexical scope) 와 다이나믹 스코프(dynamic scope)"
date: 2020-12-22
tags: language javascript
---

변수의 유효범위를 구분하는 용어이다.

함수가 어디서 선언되었는지에 따라서 스코프가 결정되는 것이 렉시컬 스코프(lexical scope)이고,  
함수가 어디서 호출되는지에 따라서 스코프가 결정되는 것이 다이나믹 스코프(dynamic scope)이다.

`javascript` 는 렉시컬 스코프를 따른다.

## 렉시컬 스코프의 예제

``` javascript
let name = 'herdin';

function printInnerName() {
  let name = 'epu baal';
  console.log('print inner name -> ' + name);
  printOuterName();
}

function printOuterName() {
    console.log('print outer name -> ' + name);
}

printInnerName();
//print inner name -> epu baal
//print outer name -> herdin
```

`printInnerName()` 함수의 내부에서 글로벌 변수와 같은 명칭의 `name` 을 다시 정의한뒤, `printOuterName()` 을 호출하고 있지만, `printOuterName()` 함수가 선언했을 당시에 해당하는 스코프에서 `name` 은 글로벌 변수이기 때문에 `herdin` 이 출력된다.

## 다이나믹 스코프의 예제

렉시컬 스코프를 따르는 `javascript` 로 다이나믹 스코프의 예제를 만드는 것은 부적절하지만, 그냥 느낌만 가져가자고 생각하고 만들어본다.

``` javascript
var name = 'herdin';

function printThisName() {
    console.log('print outer name -> ' + this.name);
}

printThisName.apply(this)
//print outer name -> herdin

let obj = { name: 'obj-herdin' };
printThisName.apply(obj);
//print outer name -> obj-herdin
```

실행 컨텍스트를 변경해가며, 실행 컨텍스트에 따른 변수 스코프가 변화되는 것이 다이나믹 스코프와 비슷해서 예제로 만들어 보았다.  


참고
- [(JavaScript) Lexical Scope(Static Scope) and Dynamic Scope](https://medium.com/@yeon22/javascript-lexical-scope-static-scope-and-dynamic-scope-c4a9e941fab3)
