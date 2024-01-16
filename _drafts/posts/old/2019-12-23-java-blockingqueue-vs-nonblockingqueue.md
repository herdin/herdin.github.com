---
layout: post
title: "java, blocking queue vs non blocking queue"
date: 2019-12-23
tags: java writing
---

> 아래는 다시 쓸것.

회사 스터디에서 토이프로젝트를 진행하는 동료가 크롤링/분석 서비스를 만드는데, 크롤링을 하는데 있어서 속도가 너무 안나와서 스레딩을 쓰려하다보니 나온 여러 라이브러리와 컬렉션들을 이야기하다가 잘 모르는 부분이 있어서 정리한다.

> 위는 다시 쓸것.

### ConcurrentLinkedQueue
`java.util.concurrent.ConcurrentLinkedQueue`

- unbounded thread-safe queue
- efficient non-blocking algorithm
- unlike in most collections, the size method is NOT a constant-time operation

보통 concurrent 패키지는 락을 잡지 않는 것 같다. `ConcurrentLinkedQueue` 같은 경우는 CAS(Compare-and-swap, `sun.misc.Unsafe`, atomic instruction) 를 사용한다고 한다.

### LinkedBlockingQueue
`java.util.concurrent.LinkedBlockingQueue`

- optionally-bounded blocking queue

출처
- [JDK 1.8 API ConcurrentLinkedQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentLinkedQueue.html)
- [JDK 1.8 API LinkedBlockingQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/LinkedBlockingQueue.html)
- [Which concurrent Queue implementation should I use in Java?](https://stackoverflow.com/questions/1301691/which-concurrent-queue-implementation-should-i-use-in-java?rq=1)
- [Compare-and-swap](https://en.wikipedia.org/wiki/Compare-and-swap)
- [Java sun.misc.Unsafe](http://rangken.github.io/blog/2015/sun.misc.unSafe/)
- [블로킹 큐(Blocking Queues)](https://parkcheolu.tistory.com/29)

### Executor
`java.util.concurrent.Executor`

### ExecutorService
`java.util.concurrent.ExecutorService`

### ForkJoinPool
`java.util.concurrent.ForkJoinPool`

### RecursiveTask
`java.util.concurrent.RecursiveTask`

### ForkJoinPool

출처
- [Java Concurrency - Fork-Join framework](https://www.tutorialspoint.com/java_concurrency/concurrency_fork_join.htm)
- [ExecutorService](https://swampwar.github.io/2019/12/20/ExecutorService.html)


1. ㅁㄴㅇㄹ
``` java
 sdfasdf
```
1. ㅁㄴㅇㄹ
1. ㅁㄴㅇㄹ
