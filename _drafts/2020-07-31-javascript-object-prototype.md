---
layout: post
title: "javascript, Object 와 Prototype"
date: 2020-07-31
tags: javascript
---

## `javascript` 의 `Object`
javascript 를 공부할 수록 java 와 javascript 가 서로 가까워지는 것 같다는 느낌이 든다.
> 그냥 내 망상이겠지만 아무튼.

javascript 에서도 java 처럼 모든 객체의 부모는 Object 이다. 함수도 객체고 부모는 Object 이다.  
서로 일급객체가 다르기 때문에(javascript 는 함수, java 는 class) 모양새는 다르지만.

## `javascript` 의 `Prototype`

평소에 많이 듣기만 했던 녀석인데, 이번에 한번 알아보게 되었다.  
`javascript` 도 `class` 가 있던데? 그건 뭔가 궁금하던차에 여기까지 거슬러 오게 되었다.
> ES2015부터 class 키워드를 지원하기 시작했지만, 문법적 허용일 뿐이고 여전히 javascript 는 프로토타입 기반 언어이다.

함수를 통해 객체를 만들게 되면(new 키워드로), 객체의 원형을 갖고 있는 Prototype Object 를 함께 생성한다.  
이 Prototype Object 는 다른 객체의 원형이 될 수 있고, 같은 함수로 객체를 생성할때 공유하게 되는 객체이다.
- 만들어진 객체의 `__proto__` property 는 Prototype Object 를 가리킨다.
- 객체를 만든 함수의 `prototype` property 역시 Prototype Object 를 가리킨다.
- Prototype Object 의 constructor 는 객체를 만든 함수를 가리킨다.

객체들은 자신의 Prototype Object 를 참조할 수 있는 `prototype` property 와, 부모 객체를 참조할 수있는 `__proto__` property 두 가지를 기본적으로 갖고 있다. 그리고 java 처럼 `javascript` 도 모든 객체의 부모는 `Object` 다.

``` javascript
function Person() { return "hello, person"; };
let p = new Person();
console.dir(Person)
/*
ƒ Person()
  arguments: null
  caller: null
  length: 0
  name: "Person"
  prototype:
    constructor: ƒ Person()
    __proto__: Object
  __proto__: ƒ ()
  [[FunctionLocation]]: VM855:1
  [[Scopes]]: Scopes[2]
*/
```

위의 Person 이라는 함수는
* `prototype` property (`Person Prototype Object` 참조) 와
* `__proto__` property (`Function Prototype Object` 참조) 를 갖고 있다.(`_` underscore 가 두개)  

그리고,
* `Person Prototype Object` 와
* `Function Prototype Object` 의

`__proto__` property 는 둘다 `Object Prototype Object` 를 참조하고 있다.  
`Person Prototype Object` 의 `constructor` 는 다시 Person 함수를 참조한다.  

또,
`p` 의 `__proto__` 는 `Person` 의 `prototype` 과 같고,  
`p` 의 `constructor` 는 `Person` 과 같다.

스크립트로 증명해보면...

``` javascript
Person.prototype.constructor === Person
true
//Person function 의 Person prototype object 의 constructor 는 Person function 자신.

Person.prototype.__proto__ === Person.__proto__.__proto__
true
//Person function 의 Person prototype object 의 prototype link (부모객체 참조) 은 Object prototype object 이다.
//Person function 의 prototype link 는 Function prototype object 이고 그것의 prototype link 는 Object prototype object 이다.

Person.__proto__ === Function.prototype
true
//Person function 의 prototype link 는 Function Prototype object 이다.

p.__proto__ === Person.prototype
//p 의 Function prototype object 는 Person prototype object 이다.

p.constructor === Person
//p 의 constructor 는 Person 자체다.
```

어떤 객체에 접근하려는 property 나 method 가 없다면, `__proto__` 를 따라 연결되는 부모 객체에서 찾게되고, 이것을 반복한다. 이렇게 `__proto__` 를 따라 검색하는 것을 prototype chain 이라고 한다.

## `Object` 를 만들어보자

객체를 생성하는 방법
* 객체 리터럴 -> 흔히 사용하는 `let obj = { name: 'herdin', age: 22 };` 리터럴 방식.
* `Object.create()` -> Object 의 함수를 사용하는 방법.
* 생성자 함수 -> 함수와 new 키워드를 사용한 방법.
> 생성자 함수로 만든다던지, 생성자 함수의 지위를 주면 된다는 말을 블로그에서 봤는데, 생성자 함수란게 뭔가 따로 있는게 아니라 함수로 객체를 생성하게되면 그 함수가 생성자 함수가 되나보다. 마치 `promise` 의 `thenable` 객체가 그냥 `then` 이란 함수를 가진 객체인 것 처럼..

## `Object` 간의 상속관계를 만들어보자.

생성자 함수를 사용하여 관계를 설정하는 방법은 이해가 안가서(classical 한 방식이라고 한다), Object 의 함수를 사용하는 (prototypal 한 방식) 방식을 사용해보겠다.

``` javascript
//동물이란 객체를 정의해놓고,
var animal = {
  grr : '',
  howling : function() {
    return this.grr;
  }
}
//동물 객체를 상속받는 dog 객체 생성
var dog = Object.create(animal);
dog.grr = 'bark';
dog.howling()
"bark"

//동물 객체를 상속받는 cat 객체 생성
var cat = Object.create(animal);
cat.grr = 'meow';
cat.howling();
"meow"
```



Object 의 함수 몇개
* `assign`
* ``
* ``
* ``
* ``
* ``
* ``

`Object.assign(target, ...sources)` 은 target 객체로 sorces 객체들의 속성을 복사할 떄 사용한다. deep clone 이 아니라 shallow clone 을 한다.

> Object.assign() 메소드는 열거할 수 있는 출처 객체의 속성만 대상 객체로 복사합니다. 이 메소드는 출처 객체의 [[Get]], 대상 객체의 [[Set]] 을 사용하여 getter 와 setter 를 호출합니다. 따라서 이는 속성을 단순히 복사하거나 새롭게 정의하는 것이 아니라 할당하는 것입니다 - MDN

바로 예제부터!

``` javascript
var target = { foo: 'bar', a: 10 };
var sorce1 = { foo: 'bar1', b: 11 };
var sorce2 = { foo: 'bar2', c: 12 };
target = Object.assign(target, sorce1, sorce2);
//{foo: "bar2", a: 10, b: 11, c: 12}
//target 을 반환하기 때문에 받아도되고 안받아도된다.
```

출처
- [Javascript 프로토타입 이해하기](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
- [Javascript 기초 - Object prototype 이해하기](http://insanehong.kr/post/javascript-prototype/)
- [JavaScript : 프로토타입(prototype) 이해](http://www.nextree.co.kr/p7323/)
