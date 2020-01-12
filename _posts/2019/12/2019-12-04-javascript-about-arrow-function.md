---
layout: post
title: "javascript 화살표 함수(애로우 펑션, arrow function)"
date: 2019-12-04
tags: javascript
---

화살표 함수(애로우 펑션, Arrow functions, Fat arrow functions) 는 ECMAScript 2015 의 표현식이다.
function 표현에 비해 **구문이 짧고**, **항상 익명이며**, **자신의 this/arguments/super/new.target 을 바인딩 하지 않는다**.

일단 예제

``` javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//function 표현식
console.log(arr.filter(function(element){ return element > 3; }));

//arrow function 표현식1
console.log(arr.filter((element) => { return element > 3; }));

//arrow function 표현식2 : parameter 가 하나일 때는 () 생략 가능
console.log(arr.filter(element => { return element > 3; }));

//arrow function 표현식3 : 함수가 한줄일때는 {} 생략 가능, return 생략가능.
console.log(arr.filter(element => element > 3));

//arrow function 표현식4 : 객체 리터럴을 반환하기 위해선  () 로 감싼다.
console.log((()=>({foo:'bar'}))());

```

위에서 자신의 this 를 바인딩하지 않는다는 말은

첫번째 예제.

``` javascript
var obj = {
	name : "obj for test",
	funcExp : function() {
		console.dir(this);
		return this.name;
	},
	funcArrowExp : () => {
		console.dir(this);
		return this.name;
	},
}

//자신의 this 를 바인딩 하기 때문에 함수의 this 는 obj 변수에 바인딩 된다.
obj.funcExp();
VM127:4 Object
"obj for test"

//자신의 this 를 바인딩 하지 않기 때문에 window 객체가 바인딩 된다.
obj.funcArrowExp();
VM127:8 Window
""
```

두번째 예제.

``` javascript
var obj = {
	name : "obj for test",
	funcExp : function() {
		setTimeout(function() {
			console.dir(this);
			console.log(this.name);
		}, 1000);
	},
	funcArrowExp : function() {
		setTimeout(() => {
			console.dir(this);
			console.log(this.name);
		}, 1000);
	},
}

//자신의 this 를 바인딩 하기 때문에 함수의 this 는 setTimeout 함수의 this 인 window 변수에 바인딩 된다.
obj.funcExp();
VM36:5 Window

//자신의 this 를 바인딩 하지 않기 때문에 obj 객체가 바인딩 된다.
obj.funcArrowExp();
Object
VM36:12 obj for test
```

의도한 대로 코드가 흘러가도록 하기 위해서 `Closure` 을 사용할 수 도 있다.

``` javascript
var obj = {
	name : "obj for test",
	funcExp : function() {
		var that = this;
		setTimeout(function() {
				console.dir(that);
				console.log(that.name);
		}, 1000);
	},
	funcArrowExp : function() {
		var that = this;
		setTimeout(() => {
		console.dir(that);
		console.log(that.name);
		}, 1000);
	},
}

//아래 두 상황 모드 같은 변수를 참조한다.
obj.funcExp();
Object
VM902:8 obj for test

obj.funcArrowExp();
Object
VM902:8 obj for test
```

참고
- [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)
