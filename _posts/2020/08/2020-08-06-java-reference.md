---
layout: post
title: "java, reference 에 대해서"
date: 2020-08-06
tags: java
---

java GC 는 객체가 garbage 인지를 판단하기위해서 reachability 란 개념을 사용하는데, 참조가 가능한지를 판단하는 것이다.

이전에는 gc 작업에 사용자 코드가 관여하지 않았으나, jdk 1.2 부터는 java.lang.ref 패키지를 통해 제한적으로 gc 와 사용자 코드가 상호작용할 수 있도록 되었다.

Strong reference 는 Object obj = new Object(); 로 직접 만드는 것을 의미한다.
java.lang.ref.SoftReference, WeakReference, PhantomReference 를 래퍼 객체로 이용하여 사용할 수 있다.

gc 작업이 이루어질 때, unreachable 객체뿐만 아니라 weakly reachable 객체도 가비지 객체로 간주된다.
> weakly reachable 객체 : WeakReference 에 의해 참조되는 객체

하나의 객체는 다음 5가지 reachability 중 하나가 될 수 있다.
* strongly reachable: root set으로부터 시작해서 어떤 reference object도 중간에 끼지 않은 상태로 참조 가능한 객체, 다시 말해, 객체까지 도달하는 여러 참조 사슬 중 reference object가 없는 사슬이 하나라도 있는 객체
* softly reachable: strongly reachable 객체가 아닌 객체 중에서 weak reference, phantom reference 없이 soft reference만 통과하는 참조 사슬이 하나라도 있는 객체
* weakly reachable: strongly reachable 객체도 softly reachable 객체도 아닌 객체 중에서, phantom reference 없이 weak reference만 통과하는 참조 사슬이 하나라도 있는 객체
* phantomly reachable: strongly reachable 객체, softly reachable 객체, weakly reachable 객체 모두 해당되지 않는 객체. 이 객체는 파이널라이즈(finalize)되었지만 아직 메모리가 회수되지 않은 상태이다.
* unreachable: root set으로부터 시작되는 참조 사슬로 참조되지 않는 객체

soft/weak/phantom reference obejct 들은 래퍼로 생성할 경우 ReferenceQueue 를 추가로 생성자 인자로 받을 수 있는데, gc 가 일어나서 삭제 될 경우, ReferenceQueue 에 래퍼 객체를 넣어 준다고 한다.

``` java
tag = "weak";
logger.debug("{} reference create.", tag);
WeakReference<ReferenceTarget> weak = new WeakReference<>(new ReferenceTarget(tag), rq);
logger.debug("{} before check {}", tag, (weak.get() == null)? "null":weak.get().hashCode()); //여기선 존재한다.
ReferenceStudy001.collect(); //System.gc();
logger.debug("{} after check {}", tag, (weak.get() == null)? "null":weak.get().hashCode()); //gc 후 사라진다.
enqueueObject = rq.poll(); //ReferenceQueue 에서 하나 꺼내보면
logger.debug("enqueue to ReferenceQueue ? -> {}, equal? -> {}", enqueueObject, weak.equals(enqueueObject)); //weak 와 같다!
logger.debug("{} reference remove.", tag);
weak.clear();
ReferenceStudy001.collect();
```

softly reachable, weakly reachable과는 달리, phantomly reachable 은 파이널라이즈와 메모리 회수 사이에 관여한다.
PhantomReference 로만 참조되는 객체는 먼저 파이널라이즈된 이후에 phantomly reachable로 간주된다.
그리고 PhantomReference class 는 다른 java.lang.ref 패키지의 class 들과 다르게 생성자에서 항상 ReferenceQueue 를 필요로 한다.

> 파이날라이즈된다는게 Object.finalize 함수를 호출해준다는 것 같다..

GC 대상을 판별하는 순서
* strong/soft/weak reachable 판별
* 그도아니면 파이널라이즈
* 그리고 phantom reachable 이면 PhantomReference 를 ReferenceQueue 넣는다.
  * PhantomReference 는 메모리회수를 바로하지 않고 clear() 를 실행해서 객체참조를 null 로 변경해야 메모리 회수가 진행된다.
* 아니면 메모리 회수

참고
- [Java Reference와 GC](https://d2.naver.com/helloworld/329631)
