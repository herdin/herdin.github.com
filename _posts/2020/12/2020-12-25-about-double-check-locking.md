---
layout: post
title: "Double-checked Locking Pattern (DCLP) 을 쓰지 말아야 하는 이유"
date: 2020-12-25
tags: design-pattern
---

> 아래 예시는 이해를 돕기위한 자료로 정확하지 않음. 대충 이런 뜻이구나 정도로 이해하길 바람.

아래와 같은 싱글톤 패턴에서 `SingletonResource` 라는 싱글톤 자원을 초기화하고 관리한다고 치자.

``` java
class SingletonResource {
  private int count = -1;
  private SingletonResource() {
    count = 0;
  }
  private SingletonResource singletonResource;
  private static Lock mutex = Lock.init(); //이런 mutex 가 있다고 치자, lock 이 안되면 throw runtime exception
  public ResLock getInstance() {
    if(singletonResource == null) { // 1)
      mutex.lock();
      if(singletonResource == null) { // 2)
        singletonResource = new SingletonResource(); // 3)
      }
    }
    return singletonResource;
  }
  public int getCount() { return count; }
}
```

`3)` 부분은 코드상으로는 한줄로 표현되어있지만, 실제로는
- 새로운 객체를 위한 메모리를 할당하고
- 할당된 메모리 주소를 변수에 저장하고
- 만들어진 객체를 초기화하는
여러 단계를 거친다.

조건이 하나일 경우에는 여러개의 스레드가 `1)` 의 첫번째 조건을 다같이 통과 한 것조차 막을 수 없다.

조건이 두개인 경우에는, 여러개의 스레드가 `1)` 의 첫번째 조건을 다같이 통과 한 것을 mutex 로 조절할 수 있다.  
적어도 `2)` 영역의 critical section 에는 하나의 스레드가 접근하는 것을 보장한다.  
하지만, 메모리를 할당하고, 변수에 메모리의 주소를 저장한 것이 실제 메모리에 반영이 되었는지는 보장할 수가 없다.  
따라서, 처음으로 lock 을 획득한 스레드가 변수 초기화를 하는 것에 대한 보장은 되지만, 다음 스레드가 진입했을때, 해당 객체가 null 이 아니라고 해서 초기화 작업을 끝냈을 것이라는 보장이 없는 것이다.
> SingletonResource.getInstance().getCount() == -1 인 경우가 생길 수 있음.

이럴 때를 위해 `volatile` 이란 키워드가 있지만, 컴파일러가 어떻게 내부 코드를 재해석하느냐에 따라서 `singletonResource` 변수에 `volatile` 키워드를 붙이는 것은 효과가 전혀 없을 수 있다.
> 메모리할당, 변수저장, 초기화를 위해 내부적으로 임시변수를 사용하는 경우

### 그래서 어쩌라고?

여러 방식이 있지만, 내가 쓸만한 방법을 두가지만 적어 놓겠다.

#### 1. Eager Initialization - 이른 초기화

singleton 객체를 필요할 때가 아니라, class 를 로드하는 시점에 singleton 객체가 생성된다.

``` java
public static class EagerInitializationSingletonResource {
    private static final EagerInitializationSingletonResource eagerInitializationSingletonResource = new EagerInitializationSingletonResource();
    private int count = -1;
    private EagerInitializationSingletonResource() {
        count = 0;
    }
    public static EagerInitializationSingletonResource getInstance() {
        return eagerInitializationSingletonResource;
    }
    public int getCount() { return count; }
}
```

#### 2. Initialization-on-demand Holder Idiom - Static Holder 사용

singleton 객체가 필요할 때(첫 getInstance 메소드가 호출될 때), singleton 객체가 생성된다.

Bill Pugh Singleton(또는 Static holder singleton pattern, Initialization-on-demand holder idiom) 이라 불리는 방식.  
JVM 의 static initializer 에 의해서 초기화 되는 private static class 의 특성을 이용한 것으로 thread safe는 보장이 되는 원리를 이용한 것이다. synchronized 를 이용하지 않고도 같은 효과를 낼 수 있다.

``` java
public static class StaticHolderSingletonResource {
    private int count = -1;
    private StaticHolderSingletonResource() {
        count = 0;
    }
    public static StaticHolderSingletonResource getInstance() {
        return SingletonHelper.INSTANCE;
    }
    public int getCount() { return count; }
    private static class SingletonHelper {
        private static final StaticHolderSingletonResource INSTANCE = new StaticHolderSingletonResource();
    }
}
```





참고
- [C++ and The Perils of Double-Checked Locking: Part I](https://www.drdobbs.com/cpp/c-and-the-perils-of-double-checked-locki/184405726)
- [C++ and the Perils of Double-Checked Locking: Part II](https://www.drdobbs.com/cpp/c-and-the-perils-of-double-checked-locki/184405772)
- [위의 자료 번역](https://m.blog.naver.com/PostView.nhn?blogId=oidoman&logNo=90159469620&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [Initialization-on-demand holder idiom](https://en.wikipedia.org/wiki/Initialization-on-demand_holder_idiom)
- [[java/Design Pattern] 싱글톤의 Lazy 초기화](https://sabarada.tistory.com/128)
