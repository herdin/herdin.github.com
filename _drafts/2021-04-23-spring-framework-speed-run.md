---
layout: post
title: "스프링, 빠르게 보기"
date: 2021-04-23
tags: spring
---


- DI, Dependency Injection 과 AOP, Aspect Oriented Programming 은 IoC, Inversion of Control 의 일부다.
- IoC 를 사용하면 객체의 몇몇 특성이나 시점(aspect)에 대한 제어권을 프레임워크나 환경에 넘긴다.

- Spring AOP 는 aspect 를 runtime 또는 compile time 에 도메인 모델에 끼워넣는다. (weaving)
- Spring AOP 는 기본적으로 proxy-based AOP 를 사용합니다. 목표가 되는 target object 를 proxy 로 감싸서 사용한다.
- Spring AOP 는 runtiem weaving 이고, jdk dynamic proxy 또는 CGLIB proxy 를 사용
  - 원래는 interface 가 있으면 dynamic proxy 로 아니면 CGLib 로 proxy 를 만들었지만, 버전이 올라가면서 Enhencer 의 spring core 추가로 의존성이 줄었고, objenesis 를 사용하여 default 생성자가 필요없어지고, 생성자가 두번호출되지 않아져서 모든 proxy 가 CGLib 로 만들어지게 되었다.
  - jdk dynamic proxy - target object 가 한개의 interface 를 구현했다면 가능.
  - CGLIB proxy - target object 가 interface 를 구현하지 않아도 가능. 하지만 상속형태로 proxy 를 구현하기 떄문에, final class, method 는 불가능
- Spring AOP 외에 weaving 을 하려면 AspectJ 를 사용
  - compile/load time weaving 을 하므로 runtime weaving 보다 성능이 우세하고, Spring AOP 보다 더 다양한 pointcut 을 지원한다.
  - 하지만, 대체적으로 Spring AOP 로 해결되는 경우가 많고, AspectJ 는 별도의 컴파일러 설정 등의 추가 설정이 필요하다.
  - compile time weaving : AspectJ 컴파일러가 weaving 된 class 파일 생성
  - pre compile time weaving : 바이너리 weaving 이라고 알려져 있으며, 이미 있는 class 파일과 jar 를 weaving 하기 위해 사용
  - load time weaving : pre compille time weaving 과 비슷하지만, class 가 jvm 에 load 될때 weaving
