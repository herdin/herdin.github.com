---
layout: post
title: "javascript, &&(and), ||(or) 연산자 활용"
date: 2021-05-22
tags: javascript
---

> 시험때 나왔던건데, 유용하게 쓸 수 있을 것 같아 정리한다.  
> 헷갈렸었는데, 왠지 이해하고나니까 아무것도 아니잖아?

## `&&`
* 왼쪽의 표현식을 평가하여
  * `true` 일 경우, 오른쪽의 표현식을 실행하고 반환
  * `false` 일 경우, 왼쪽의 표현식을 실행하고 반환

``` javascript
let result = null;
result = true && console.log('hello');
console.log(`result -> ${result}`); //result -> undefined

result = false && console.log('hello');
console.log(`result -> ${result}`); //result -> false

result = true && 0 && console.log('hello');
console.log(`result -> ${result}`); //result -> 0
```

> or 는 and 의 반대.. 지만 정리한다.

## `||`
* 왼쪽의 표현식을 평가하여
  * `true` 일 경우, 왼쪽의 표현식을 실행하고 반환
  * `false` 일 경우, 오른쪽의 표현식을 실행하고 반환

``` javascript
let result = null;
result = false || console.log('hello');
console.log(`result -> ${result}`); //result -> undefined

result = true || console.log('hello');
console.log(`result -> ${result}`); //result -> true

result = false || 10 || console.log('hello');
console.log(`result -> ${result}`); //result -> 10
```
