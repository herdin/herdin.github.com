---
layout: post
title: "javascript, generator 함수"
date: 2020-10-28
tags: javascript
---

``` javascript
function * gen() {
  yield 1;
  yield 2;
  yield 3;
}
```

이게 뭐야.. ㅠㅠ

`function` 예약어 뒤에 `*` 이 붙은 놈들을 generator function 이라고 한다.

generator function 이란, generator 객체를 반환하는 함수이다.

generator function 은 다른 함수들과 다르게 빠져나갔다가 다시 돌아올 수 있는(마치 상태를 기억하고 있는것처럼) 함수이다.

generator function 은 호출 되면 바로 실행되는것이 아니라 함수를 위한 Iterator 객체를 반환하게 되고,

Iterator 객체의 next() 를 호출하면, generator function 가 호출되어 진행하다가 yield 를 만날 때 반환되게 된다. (해당 위치를 기억)

반환되는 객체에는 값을 담은 value 값과 순회를 마쳤는지를 표현하는 boolean 값이 들어 있다. `gen().next() = { value: 1, done: false }`

마치 java 의 Iterator 처럼 next().done 을 순회조건으로 보면되고, 순회가 끝나지 않았으면, value 를 사용하면 된다.

generator function 에서 `yield*` 것도 볼 수 있는데 해당 구문은 다른 generator function 에게 위임한다는 뜻이다.

예제를 보자

``` javascript
ƒunction* gen1(n) {
    yield n+1;
    yield n+2;
    yield n+3;
}
ƒunction* gen2(n) {
    yield n+2;
    yield* gen1(n+3);
    yield n+4;
}

let g = gen1(10);
g.next(); //{value: 11, done: false}
g.next(); //{value: 12, done: false}
g.next(); //{value: 13, done: false}
g.next(); //{value: undefined, done: true}

g = gen2(10);
g.next(); //{value: 12, done: false}
g.next(); //{value: 14, done: false}
g.next(); //{value: 15, done: false}
g.next(); //{value: 16, done: false}
g.next(); //{value: 14, done: false}
g.next(); //{value: undefined, done: true}
```

참고
- [MDN function*](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)
