---
layout: post
title: "spring, transactional event listener"
date: 2025-04-24
tags: shovel-knight java
---

트랜잭션 전후에 작업을 위한 interface = TransactionSynchronization
@TransactionalEventListener 를 사용하면 TransactionalApplicationListenerSynchronization.PlatformSynchronization 구현체를 사용
spring event publish ? 시점에 TransactionalApplicationListenerMethodAdapter 에서 TransactionSynchronizationManager 에 TransactionSynchronization 를 등록


TransactionAspectSupport

spring 에서는 `AbstractPlatformTransactionManager` 를 사용하여 transaction 처리를 한다

TransactionSynchronizationUtils
TransactionSynchronization

* [예외 먹는 @TransactionalEventListener](https://lenditkr.github.io/spring/transactional-event-listener/)
* [예외 먹는 @TransactionalEventListener](https://jongmin4943.tistory.com/entry/Spring-%EC%9D%98-TransactionalEventListener-%EC%8B%A4%ED%96%89-%EC%88%9C%EC%84%9C)
