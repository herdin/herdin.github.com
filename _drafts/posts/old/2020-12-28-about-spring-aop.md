---
layout: post
title: "Spring AOP(Aspect Oriented Programming) 기초"
date: 2020-12-28
tags: spring
---

### AOP(Aspect Oriented Programming, 관점지향프로그래밍)
Spring 의 주요 Component 중 하나로, OOP(Object-oriented programming) 에서 주요 모듈은 class 지만, AOP 에서의 주요 모듈은 Aspect(관점) 이다.  
Cross-Cutting Concern(횡단 관심사) 를 코드에서 분리함으로써 모듈성을 증가시키는 것이다. 다시말해, 코드를 수정하지 않고 코드에서 횡단(말그대로)으로 공통적인 기능(관심)을 분리 하는 것이다.

### 주요 개념
- Aspect
  - 여러 클래스의 종단 관심사(cross cut)를 모듈화 한것
  - 여러 객체에 공통적으로 적용할 공통 관심사
  - 로깅을 남긴다던지, 알람을 보낸다던지...
  - Pointcut + Advice
- Joinpoint
  - Advice가 적용 가능한 지점들, Point cut 의 후보들
  - Advice 를 Target Object 에 Weaving 하는 지점
  - Spring AOP 에서 Joint Point 는 항상 함수 실행시점을 의미
- Advice
  - 특정 Joinpoint 에서 수행할 실제 행동.
  - Target Object 에 Weaving 된 구체적인 동작
  - 로깅을 남긴다던지, 알람을 보낸다던지...
  - Advice 와 Pointcut 을 결합하여 Advisor 라고도 한다
- Pointcut
  - Joinpoint 를 특정하는 것
  - Advice 를 어디에서 Weaving 할지 정의하는 것
  - 하나의 또는 복수의 Joinpoint 를 하나로 묶은 것
  - 하나의 Pointcut 은 복수의 Advice 를 연결할 수도 있고, 반대로 복수의 Pointcut 을 하나의 Advice 에 연결할 수도 있다.
- Target Object
  - Aspect를 적용하는 곳
  - 클래스, 메서드, ...
- Weaving
  - Advice 를 Target Object 에 적용하는 것.
  - compile time, load time, run time, 다양한 시점에 적용할 수 있지만, Spring AOP 는 run time 에 적용한다.
  - 종류
    - Compile Time Weaving(CTW)
    - Runtime Weaving(RTW) 스프링의 방식
    - Load Time Weaving(LTW)
    - Post-Compile Weaving
    - [종류 정리](https://velog.io/@dnjwm8612/AOP-Weaving-Proxy)

### 사용 annotation 목록
- `@Around` - Joinpoint 앞과 뒤에서 실행
- `@Before` - Joinpoint 앞에서 실행
- `@After` - Joinpoint 뒤에서 실행
- `@AfterReturning` - Joinpoint 메소드 호출이 정상 종료되고 나서 실행
- `@AfterThrowing` - Joinpoint 메소드에서 예외가 던져질때 실행

## 스프링 AOP 특징
스프링 IoC Container 의 bean 에만 aop 기능을 제공하여
- 중복 코드 증가
- 프록시 클래스 작성의 번거로움
- 객체간 의존도 증가

등의 문제를 해결


``` groovy
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

참고
- [관점 지향 프로그래밍](https://ko.wikipedia.org/wiki/%EA%B4%80%EC%A0%90_%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
- [https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop)
- [Spring AOP 용어 설명](https://devbox.tistory.com/entry/spring-AOP-%EC%9A%A9%EC%96%B4-%EC%84%A4%EB%AA%85)
