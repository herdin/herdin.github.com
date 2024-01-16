---
layout: post
title: "Springframework Event publish"
date: 2020-12-24
tags: java spring
---

Springframework 에서 Event 를 발행하는 방법

1. ApplicationEventPublisher(ApplicationContext) 를 사용하여 명시적으로 이벤트 발행
2. `@DomainEvents` 와 `@AfterDomainEventPublication` 를 이용하는 방법
>`EventPublishingRepositoryProxyPostProcessor` 에 의해 Spring data repository 의 메소드 중 save 로 시작하는 메소드가 호출 되었을 경우, 이벤트를 발행한다. JPA 의 dirty checking 에 의해 save 메소드 동작 없이 변경이 될 경우에는 호출되지 않는다는 단점이 있다.

3. AOP 를 이용하는 방법
