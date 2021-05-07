---
layout: post
title: "커리어 빌딩, spring"
date: 2021-04-27
tags: job spring
---

## 스프링
### 기본개념
### 설정
### 프로파일
### 빈 생명주기
### 주기별 프로세서들
### 스프링 이벤트 종류
- ContextRefreshedEvent : ApplicationContext를 초기화 했거나 리프래시 했을 때 발생.
- ContextStartedEvent : ApplicationContext를 start()하여 라이프사이클 빈들이 시작 신호를 받은 시점에 발생
- ContextStoppedEvent : ApplicationContext를 stop()하여 라이프사이클 빈들이 정지 신호를 받은 시점에 발생
- ContextClosedEvent : ApplicationContext를 close() 하여 싱글턴 빈들이 소멸되는 시점에 발생.
- RequestHandledEvent : HTTP 요청을 처리했을 때 발생.
### aop
- [Spring AOP (3)](https://jaehun2841.github.io/2018/07/21/2018-07-21-spring-aop3/#spring-bean%EC%97%90-%EB%8C%80%ED%95%9C-proxy%EB%8A%94)
- [Dynamic Proxy와 CGlib의 차이점](https://yeti.tistory.com/225)
### 주요포인트 +버전별차이?

### Spring
#### Spring 의 구조와 원리에 대해서 간략하게 설명해 보세요.
#### Spring Bean Lifecycle
#### Spring Bean Scope
- singleton
- prototype
- request - lifecycle in http request, valid at web aware spring context
- session - lifecycle in http session, valid at web aware spring context
- application - lifecycle in servlet context, valid at web aware spring context
- web socket - lifecycle in web socket, valid at web aware spring context

### JPA
#### fetch type 차이
- EAGER, LAZY

#### transient detached 차이

#### N+1 문제 발생 원인과 해결방법
OneToMany 의 경우 성능 저하 문제가 생길 수 있다.
FetchType.EAGER, Post -> Comment 관계의 경우, select * from Post 를 하면, select post 1, select comment * post count 가 발생.
해결방안
- FetchType.LAZY 로 변경, loop 를 돌며 comment 를 조회하는 경우 N+1 발생
- JPQL fetch join 사용
- FetchType.EAGER, Batch Size 조절

#### RDB 와 OOP 세계의 불일치를 JPA가 해결한 방법
#### JPA를 쓰면 무엇이 더 좋을까?
#### 1차 캐시와 2차캐시는 뭐가 다를까?
#### JPA에 적합하지 않은 경우는 어떤게 있을까? 등등
