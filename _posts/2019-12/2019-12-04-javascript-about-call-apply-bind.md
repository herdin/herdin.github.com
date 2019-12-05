---
layout: post
title: "javascript call apply bind 에 대해서"
date: 2019-12-04
tags: javascript writing
---

셋다 함수의 기본 함수이다.  
함수를 호출하는 방법중에 하나이다.

``` javascript
METHOD();
```

보통 위와같이 호출하지만, 아래와 같은 방법도 있다.

``` javascript
METHOD.call(
  this 변경 대상 없으면 null,
  인자1,
  인자2,
  인자3,
  ...,
);

METHOD.apply(
  this 변경 대상 없으면 null,
  [인자1, 인자2, 인자3, ..., ]
);
```

`call` 과 `apply` 의 차이는 함수에 넘길 인자들을 넘기는 방식의 차이이다.

`call/apply` 와 `bind` 의 차이는 호출하지 않는 것 뿐이다.

``` javascript
var newMETHOD = METHOD.bind(
  this 변경 대상 없으면 null,
);
newMETHOD(인자1, 인자2, 인자3, ...);
```
