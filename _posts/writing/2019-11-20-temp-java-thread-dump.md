---
layout: post
title: "Java Thread Dump"
date: 2019-11-19
tags: temp java
---

[출처](https://d2.naver.com/helloworld/10963)

> Java에서는 Monitor를 이용해 스레드를 동기화한다. 모든 Java 객체는 하나의 Monitor를 가지고 있다. 그리고 Monitor는 하나의 스레드만 소유할 수 있다. 어떠한 스레드가 소유한 Monitor를 다른 스레드가 획득하려면 해당 Monitor를 소유하고 있는 스레드가 Monitor를 해제할 때까지 Wait Queue에서 대기하고 있어야 한다.

> Java 스레드는 데몬 스레드(Daemon Thread)와 비데몬 스레드(Non-daemon Thread)로 나눌 수 있다. 데몬 스레드는 다른 비데몬 스레드가 없으면 동작을 중지한다. 예를 들면, main 함수가 실행되는 스레드는 비데몬 스레드로 해당 스레드가 중지 하게 되면 가비지 컬렉션이나, JMX 등의 작업을 처리하는 데몬 스레드들도 동작을 중지한다. main 함수가 실행되는 스레드를 HotSpot VM에서는 VM Thread라고 부른다.
