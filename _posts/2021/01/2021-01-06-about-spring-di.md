---
layout: post
title: "Spring 에서 DI 를 어떻게 해야 잘했다고 소문날까"
date: 2021-01-06
tags: spring
---

아무생각 없이 `@Autowired` 를 주구장창 쓰고있었는데..

보게되는 코드 또는 블로그마다 field injection 을 기피하는 것 같길래 찾아봤더니만

> intelliJ 에서도 자꾸 field injection 하지마라고 하고 ㅎㅎ;;

안 좋은 점이 있었다.

> 이런거 생각도 못하고 사용만했구나

일단 스프링에서 의존성을 주입받는 방법 3가지.

## 1. Field Injection (필드 주입)

평소에 그냥 쓰던 필드에 `@Autowired` 사용하는 방법이다.

``` java
@Autowired
SomeService someService;
```

이렇게 주입을 받게 되면 아래와 같은 단점이 존재한다.
- field 에 final 을 붙일 수가 없기 때문에, 주입받은 의존성이 변경(mutable)될 수 있다.
- `org.springframework.beans.factory.annotation.Autowired` 의 annotation 을 사용하기 때문에, Spring DI Container 와의 의존성이 생긴다. 이것은 POJO 를 지향하는 Spring 의 관점과도 맞지 않을 뿐 더러, Test 시에도 용이하지 않다.
- class 간 순환의존관계가 생겼을 떄 알 수 없다.
- 주입 받기 쉽기 때문에, 의도치 않게 여러 의존성을 주입받아서 class 간의 의존관계를 복잡하게 만들 수 있다.

## 2. Setter Injection (세터 메소드 주입)

``` java
SomeService someService;
@Autowired
public void setSomeService(SomeService someService) {
    this.someService = someService;
}
```

단점은 `1. Field Injection (필드 주입)` 과 유사하지만, 주입받을 떄마다 setter 메소드를 만들어야된다는 점에서, 의도치않게 의존관계를 복잡하게 만들지 않을 가능성이 높다.

## 3. Constructor Injection (생성자 주입) -> 이렇게 하자

``` java
final SomeService someService;
public InitRunner(SomeService someService) {
    this.someService = someService;
}
```

생성자 주입을 사용하게 되면 아래와 같은 장점이 있다.
- 주입받는 의존객체의 final 을 선언할 수 있게 되어, 불변성(immutable) 을 보장 받는다.
- 의존관계가 단순해진다. -> 개발자가 생성자를 만들 때, 의존관계가 되는 class 들을 알 수 있어서 부담스러워질 수 있다.
- class 간 순환 의존관계가 생겼을 떄 알 수 있다. `BeanCurrentlyInCreationException` 발생.
