---
layout: post
title: "Java transient"
date: 2020-03-06
tags: java
---

매번 볼떄마다 새로워서 정리한다.

# java 의 transient 은 언제 써야할까?

object 를 직렬화(serialize)를 할 때, 직렬화 과정에서 제외할 변수에 사용한다.

아래와 같은 Data class 가 있다고 하면,
> name 에 transient 를 선언해 주었다.

``` java
public static class Data implements Serializable {
    final long serialVersionUID = 101L;
    final String id;
    transient final String name;
    final int age;
    final LocalDateTime birthTime;
    //..., constructor, getter, setter, ...
}
```

직렬화/역직렬화를 했을때, 아래와 같이 직렬화 과정에서 빠져서 역직렬화 시, null 이 나오게 된다.

```
2020-03-06 15:09:03.109 DEBUG --- [ main ] c.h.u.l.s.SerializeStudy001 : before serialize -> Data{
serialVersionUID=101
, id='id-1'
, name='name-1'
, age=10
, birthTime=2020-03-06T15:09:03.109478900
}
2020-03-06 15:09:03.135 DEBUG --- [ main ] c.h.u.l.s.SerializeStudy001 : serialize and base64 -> rO0ABXNyADNjb20uaGFybS51bml0Lmxhbmcuc2VyaWFsaXplLlNlcmlhbGl6ZVN0dWR5MDAxJERhdGFI0KwNC5OWuQIABEkAA2FnZUoAEHNlcmlhbFZlcnNpb25VSURMAAliaXJ0aFRpbWV0ABlMamF2YS90aW1lL0xvY2FsRGF0ZVRpbWU7TAACaWR0ABJMamF2YS9sYW5nL1N0cmluZzt4cAAAAAoAAAAAAAAAZXNyAA1qYXZhLnRpbWUuU2VylV2EuhsiSLIMAAB4cHcOBQAAB+QDBg8JAwaGg/R4dAAEaWQtMQ==
2020-03-06 15:09:03.140 DEBUG --- [ main ] c.h.u.l.s.SerializeStudy001 : deserialize -> Data{
serialVersionUID=101
, id='id-1'
, name='null'
, age=10
, birthTime=2020-03-06T15:09:03.109478900
}
```
