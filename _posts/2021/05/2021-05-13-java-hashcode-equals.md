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


> 3.1 equals() 와 관련된 규약
> - Reflexive : Object must be equal to itself.
> - Symmetric : if a.equals(b) is true then b.equals(a) must be true.
> - Transitive : if a.equals(b) is true and b.equals(c) is true then c.equals(a) must be true.
> - Consistent : multiple invocation of equals() method must result same value until any of properties are modified. So if two objects are
> equals in Java they will remain equals until any of there property is modified.
> - Null comparison : comparing any object to null must be false and should not result in NullPointerException. For example a.equals(null)
> must be false, passing unknown object, which could be null, to equals in Java is is actually a Java coding best practice to avoid NullPointerException in Java.


> 3.2 hashCode() 와 관련된 규약
> - equals() 로 비교시 두개의 오브젝트가 같다면, hashCode() 값도 같아야 한다.
> - equals() 로 비교시 false 라면, hashCode() 값은 다를수도, 같을수도 있다. 그러나 성능을 위해서는 hashCode() 값이 다른것이 낫다. 그래야 해싱 알고리즘으로 Set 에 해당 오브젝트가 존재하는지 아닌지 빠르게 검색할 수 있다.
> - hashCode() 값이 같다고 해서, eqauls() 가 true 를 리턴하는 것은 아니다. 해싱 알고리즘 자체의 문제로, 같은 해시값이 나올 수 있다.
