---
layout: post
title: "javascript Object.freeze, const"
date: 2019-08-01
tags: javascript
---

javascript 에서 불변객체를 만드는 방법.  
어려운 개념이 아닌 것 같아서 예제 코드로 갈음한다.

```javascript
/* in javascript console
 * > input
 * < output
 */
> var obj = {name: "epu baal", age: 33}; //나이만 먹는 불쌍한 개발자 선언
< undefined

> obj //의미 없는 확인
< {name: "epu baal", age: 33}

> obj.age = 18; //회춘 시도
< 18

> obj //회춘 확인
< {name: "epu baal", age: 18}

> Object.freeze(obj); //그상태로 변경을 금한다.
< {name: "epu baal", age: 18}

> obj.name = "infinity stone"; //하도 시끄러운 마블코믹스
< "infinity stone"

> obj //변경되지 않는다.
< {name: "epu baal", age: 18}

> obj = {name: "chmunk", age: NaN}; //재할당은 가능. 아래의 const 와 비교.
```

객체 내부의 값을 변경할 수 없게 하는 `Object.freeze` 와 달리 예약어 `const` 는 변수값을 바꾸지 못하게 한다.
> `java` 의 `final` 같은건가?

```javascript
> const con = {name: "epu baal", age: 33}; //33살처먹고 이런 예제 쓰는 한신한 개발자
< undefined

> con //의미 없는 확인
< {name: "epu baal", age: 33}

> con.age = 18; //회춘 시도
< 18

> con //회춘 확인
< {name: "epu baal", age: 18} //K-성공

> con = {name: "chmunk", age: NaN}; //재할당 시도
< Uncaught TypeError: Assignment to constant variable. //불-가
    at <anonymous>:1:5
```
