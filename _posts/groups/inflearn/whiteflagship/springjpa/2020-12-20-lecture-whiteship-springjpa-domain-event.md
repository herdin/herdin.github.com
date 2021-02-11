---
layout: post
title: "Whiteship Spring JPA, Domain Event"
date: 2020-12-20
tags: spring jpa
---

Spring 의 기능인 Application Event Publish 기능을 이용하여 Domain class 에서 이벤트가 발생했을 떄, Event 를 발행하는 방법

### 1. 직접 발행
### 2. Spring Data 의 `@DomainEvents` 이용하기
RepositoryProxyPostProcessor, EventPublishingRepositoryProxyPostProcessor
### 3. AOP 이용하기
