---
layout: post
title: Thread Safe, Mutex, Sepaphore, Critical Section ...
date: 2019-12-22
tags: java
---

`Thread Safe` 를 찾다보니 이것저것 덩달아 나오는 개념들을 아주 간단하게 정리하려 한다.

### Thread Safe

`Thread Safe` 란, 어떤 함수나 변수 또는 객체가 멀티스레딩 환경에서 동시에 접근을 하더라도 프로그램 실행에 문제가 없음을 뜻한다.

`Thread Safe` 를 위한 방법
- Re-entrancy : 동시에 접근해도 올바른 결과를 주어야함
- Thread local storage 사용
- Mutual Exclusion : 자원을 세마포어/뮤텍스로 동시 접근을 막는다.
- Atomic operations : 원자 연산을 이용하여 공유 자원에 접근한다.

### Semaphore
공유 자원에 여러 프로세스의 동시 접근을 막는다.

### Mutex
공유 자원에 여러 스레드의 동시 접근을 막는다.

### Critical Section
임계구역으로 해석이 되며, 공유 자원에 접근하는 프로그램 코드 부분을 의미한다.

출처
- [[OS] Thread Safe란?](https://gompangs.tistory.com/entry/OS-Thread-Safe%EB%9E%80)
- [Semaphore란? 세마포어와 뮤텍스의 차이는?](https://jwprogramming.tistory.com/13)
