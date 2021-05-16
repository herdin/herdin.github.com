---
layout: post
title: "java, hashcode 와 equals"
date: 2021-05-13
tags: java
---

`Obejct` 의 `hashcode` 함수와 `equals` 함수를 읽고 정리한다.


```
If two objects are equal according to the {@code equals(Object)}
method, then calling the {@code hashCode} method on each of
the two objects must produce the same integer result.
```

* 두개의 object 가 equals 함수에 의해 같다고 판정되면, hashcode 함수는 같은 int 값을 생성해야한다.
* 하지만 object 가 equals 함수에 의해 다르다고 판정되더라도, hashcode 함수가 다른 int 값을 생성해야하는 것은 아니다.
* hashcode 는 HashMap/Table 에서 사용한다고 한다.

> equals 는 동등성이고 hashcode 는 동일성이라고 설명을 하는데 이건 좀 와닿지 않는다.  
> hashcode 가 동일성이라면, 동등성보다 더 까다로운 조건 아닌가? 그런데 동등하지 않는데 동일하다?  
> hash 의 충돌 때문에 그럴 수 있다고하는데 그렇기엔 동일성이라는 설명이 앞뒤가 맞지 않는 것같다..

* HashMap 에서 key 로 객체를 사용할 경우, equals 와 hashcode 를 함께 사용한다. -> Override 할 경우 주의.
