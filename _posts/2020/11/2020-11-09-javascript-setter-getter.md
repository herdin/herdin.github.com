---
layout: post
title: "javascript, setter, getter"
date: 2020-11-09
tags: javascript
---

> 아니 javascript 에도 stter getter 가 있단말야? - 8년차 개발자

## Setter

어떤 객체의 속성에 값을 설정하려고할때 호출되는 함수를 바인드 한다. 라고 적혀있다.
파라미터는 하나라고 한다.

어떤 객체에 countValue 라는 값과, countValue 를 증가시키기 위한 count 라는 setter 가 있다고 하면, 아래와 같이 정의한다.
``` javascript
let obj = {
  countValue: 0,
  set count(val) {
    this.countValue += val;
  }
};
```

그리고 이렇게 사용한다.
``` javascript
obj.count = 10;
//{countValue: 10}
obj.count = 11;
//{countValue: 21}
```

지울떈 요래 지운다

``` javascript
delete obj.count
```

이미 정의된 객체에 대해선 아래와 같이 정의할 수 있다. 이렇게 정의한 것은 delete 로 못지운다.
``` javascript
let obj = { countValue: 0 };
Object.defineProperty(obj, "count", { set: function (value) { this.countValue += value; } });

obj.count = 123;
//{countValue: 123}
obj.count = 77;
//{countValue: 200}
```

## Getter

마찬가지로 어떤객체의 property 를 찾을 때 호출되는 함수를 바인딩한다.  
아래와 같이 `setter`/`getter` 를 정의하고, 사용해보자.

``` javascript
let obj = {
  countValue: 0,
  get countDisplay() {
    return 'count value is [' + this.countValue + ']';
  },
  set count(value) { this.countValue += value; }
};

obj.count = 1;
obj.count = 1;
//{countValue: 2}
console.log(obj.countDisplay);
"count value is [2]"
```

참고
- [setter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set)
- [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
