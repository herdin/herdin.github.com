---
layout: post
title: "javascript, es6, rest, spread"
date: 2020-07-30
tags: javascript es6
---

## arguments vs parameter

함수 실행 시 넘기는 값 -> arguments
함수에서 받을 수 있는 변수 -> parameter

* ES6 부터는 함수 parameter 에 기본 값을 설정할 수 있다.
* ES5 까지는 parameter 에 없는 arguments 를 `arguments` 로 참조했었다.
  * ES6 부터는 `...rest` parameter 를 사용하여 참조할 수 있다.

``` javascript
function testFunc(v1 = -11, v2 = -12, v3 = -13) {
  console.log('testFunc', v1, v2, v3);
  console.log('testFunc', arguments); //es5 까지는 arguemtns 를 이용해서 parameter 이후의 arguments 를 참조했다.
}

testFunc()
//testFunc -11 -12 -13
//testFunc Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]
testFunc(1, 2, 3);
//testFunc 1 2 3
//testFunc Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
testFunc(1, 2, 3, 4);
//testFunc 1 2 3
//testFunc Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]

function testFunc(v1 = -11, v2 = -12, v3 = -13, ...rest) {
  console.log('testFunc', v1, v2, v3);
  console.log('testFunc', rest); //es6 부터는 rest parameter 를 사용한다.
}
testFunc()
//testFunc -11 -12 -13
//testFunc []
testFunc(1, 2, 3);
//testFunc 1 2 3
//testFunc []
testFunc(1, 2, 3, 4);
//testFunc 1 2 3
//testFunc [4]
```

## spread (전개구문)

일반적으로 배열을 argument 로 사용할 때는 `Function.prototype.apply()` 를 사용했다.
``` javascript
function myFunction(x, y, z) { console.log('myFunction', x, y, z); }
var args = [0, 1, 2];

myFunction.apply(null, args);
//myFunction 0 1 2
```

하지만 spread (전개구문) 를 사용한다면 다음과 같이 사용할 수 있다.

``` javascript
myFunction(...args);
//myFunction 0 1 2

myFunction(-1, ...args);
//myFunction -1 0 1
```

여러번 사용할 수 있다.

``` javascript
let arr1 = ['a', 'b', 'c'];
let arr2 = [1, 2, 3];
console.log([arr1[0], ...arr2, arr1[1], ...arr2]);
//["a", 1, 2, 3, "b", 1, 2, 3]
```

`spread(전개구문)`은 1레벨 깊이에서만 사용하자. 아래와 같이 원본이 영향 받을 수 있다.

``` javaScript
let a = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];
b = [...a];
//0: (3) [1, 2, 3]
//1: (3) [2, 3, 4]
//2: (3) [3, 4, 5]

b.shift().shift();

console.log(b);
//0: (3) [2, 3, 4]
//1: (3) [3, 4, 5]

console.log(a);
//0: (2) [2, 3]
//1: (3) [2, 3, 4]
//2: (3) [3, 4, 5]
```

객체리터럴에서도 마찬가지로 `spread(전개구문)`을 사용할 수 있다.
``` javascript
let obj1 = { foo: 'bar1' };
let obj2 = { foo: 'bar2', hello: 'world' };
let obj3 = {...obj1, ...obj2};
//{foo: "bar2", hello: "world"}
```

`spread(전개구문)` 은 iterable 객체에만 사용할 수 있다.
> 라고 MDN 에 써있는데, 객체 끼리는 되는데, 같은 타입에서만 사용하란 뜻일까?

``` javascript
var obj = {'foo': 'bar'};
var array = [...obj]; //Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
```



`Object.assign()` 은 setter 를 트리거하지만 `spread(전개구문)`은 그렇지 않다고 한다.
> 이게 뭔소리지?? -> [여기로]({{ site.url }}/2020/07/31/javascript-object)

참고
- [MDN, 전개 구문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [자바스크립트 rest, spread 문법과 destructuring](https://velog.io/@ashnamuh/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-rest-spread-%EB%AC%B8%EB%B2%95%EA%B3%BC-destructuring)
