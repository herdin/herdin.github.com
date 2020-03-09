---
layout: post
title: "Java volatile"
date: 2020-03-06
tags: java
---

매번 볼떄마다 새로워서 정리한다.

# java 의 volatile 은 언제 써야할까?

thread 에서 어떤 변수 값을 읽거나 쓸때, main-memory 에서 읽거나 쓰는 것을 보장해야할 때 사용한다. 값을 읽거나 쓸때, 아무런 처리를 하지 않으면 cpu cache 에만 반영을 하고, main-memory 에는 적용이 안될 수 가 있다.

하나의 thead 에서만 값을 수정하는 경우에 사용하면 된다. 다른 thread 들이 언제 읽어도 항상 최신 값을 보장 받을 수 있다.

하지만 여러 thread 에서 값을 변경하는 경우는 읽고 쓰는 일종의 트랜잭션을 보장해야 하는데, 이때는 `synchronized` 등으로 `critical section` 을 보호해야 한다.

> - [임계구역(critical section)](https://ko.wikipedia.org/wiki/%EC%9E%84%EA%B3%84_%EA%B5%AC%EC%97%AD) : 공유자원을 접근하는 코드부분
> - 세마포어(Semaphore) : 공유된 자원의 데이터를 여러 프로세스가 접근하는 것을 막는 것
> - 뮤텍스(Mutex) : 공유된 자원의 데이터를 여러 쓰레드가 접근하는 것을 막는 것
