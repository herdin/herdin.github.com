---
layout: post
title: "Java Thread Dump"
date: 2019-11-19
tags: java
---

# Thread dump 란?

> Java에서는 Monitor를 이용해 스레드를 동기화한다. 모든 Java 객체는 하나의 Monitor를 가지고 있다. 그리고 Monitor는 하나의 스레드만 소유할 수 있다. 어떠한 스레드가 소유한 Monitor를 다른 스레드가 획득하려면 해당 Monitor를 소유하고 있는 스레드가 Monitor를 해제할 때까지 Wait Queue에서 대기하고 있어야 한다.

> Java 스레드는 데몬 스레드(Daemon Thread)와 비데몬 스레드(Non-daemon Thread)로 나눌 수 있다. 데몬 스레드는 다른 비데몬 스레드가 없으면 동작을 중지한다. 예를 들면, main 함수가 실행되는 스레드는 비데몬 스레드로 해당 스레드가 중지 하게 되면 가비지 컬렉션이나, JMX 등의 작업을 처리하는 데몬 스레드들도 동작을 중지한다. main 함수가 실행되는 스레드를 HotSpot VM에서는 VM Thread라고 부른다.

> java.lang.Thread 클래스를 이용해 스레드를 생성하면 Thread-(Number) 형식으로 스레드 이름이 생성된다. java.util.concurrent.ThreadFactory 클래스를 이용했으면 pool-(number)-thread-(number) 형식으로 스레드 이름이 생성된다.

# 덤프 받기

- jstack 사용

``` shell
jstack <PID>
```

- jcmd 사용

``` shell
jcmd <PID> Thread.print
```

- kill signal 주기

```
kill -3 <PID>
```

- VisualVM 사용
`jvisualvm.exe` 실행, 덤프 버튼 사용.

# 덤프 분석하기

[Universal GC Log Analyzer](https://gceasy.io/) 간단하게 덤프를 업로드함으로써 분석정보를 볼 수 있음.



출처
- [스레드 덤프 분석하기](https://d2.naver.com/helloworld/10963)
- [THREAD DUMP, HEAP DUMP 생성 및 분석 방법](https://yenaworldblog.wordpress.com/2018/05/09/thread-dump-%EC%83%9D%EC%84%B1-%EB%B0%8F-%EB%B6%84%EC%84%9D-%EB%B0%A9%EB%B2%95/)
