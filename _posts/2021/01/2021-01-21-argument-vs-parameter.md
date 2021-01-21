---
layout: post
title: "Argument vs Parameter"
date: 2021-01-21
tags: language
---

`argument` 와 `parameter` 를 계속 헷갈리는데

> 마치 function 과 method 처럼..

안 헷갈릴 때까지는 적어놓은걸 빠르게 보기위해 적어놓는다.

#### 함수 정의 에 들어가는 것이 `parameter`

아래와 같이 함수 정의에서 사용하는 매개변수를 파라미터라고 한다.
``` javascript
function someFunction(parameter1, parameter2) {
  return parameter1 + parameter2;
}
```
#### 함수 사용 에 들어가는 것이 `argument`

아래와 같이 함수를 사용할때 넣어주는 매개변수를 아규먼트라고 한다.
``` javascript
let argument1 = 1;
let argument2 = 2;
someFunction(argument1, argument2);
```

끝.
