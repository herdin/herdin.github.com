---
layout: post
title: "Whiteship Spring JPA, Query DSL"
date: 2021-03-03
tags: spring jpa
---

쿼리 메소드를 이용하여 쿼리를 할 수도 있지만,

`findByFirstNameIgnoreCaseAndLastNameStartsWithIgnoreCaseAnd...` 이런 함수는 읽으면 읽히지만 너무 길어서 가독성이 떨어진다.

쿼리 메소드는 대두분 두 가지다
- Optional<T>

### 그래서 쿼리 DLS 이 뭐냐

쿼리를 자바코드로 만드는 것. 아래 참고에 레퍼런스 문서를 걸어 놨다. 한글화가 되었다니..

공식 문서에는 목적을 이렇게 정의한다.

`타입에 안전한 방식으로 HQL 쿼리를 실행하기 위한 목적`

JPA 와는 독립적이다. 다른 방식도 지원한다.

### 설정법은 따로 정리
### 기본 repository 를 확장했을 때 주의점.

`JpaRepository` 를 상속받은 Custom class 를 기본 repository 로 사용하고 있었다면,

interface 를 정의하고

``` java
@NoRepositoryBean //repository 가 아님을 알려준다.
interface MyCustomRepository<T, ID>
  extends JpaRepository<T, ID> {}
```

구현체인 `SimpleJpaRepository` 와 내가 만든 `MyCustomRepository` 를 상속, 구현 해주면되는데
``` java
public class MyCustomDefaultRepositoryImpl<T, ID>
  extends SimpleJpaRepository<T, ID>
  implements MyCustomDefaultRepository<T, ID> {}
```

`SimpleJpaRepository` 는 `QuerydslPredicateExecutor` 를 구현하지 않앗기 때문에, 그냥 사용할 수 없다.


참고
- [Querydsl - 레퍼런스 문서](http://www.querydsl.com/static/querydsl/4.0.1/reference/ko-KR/html_single/#intro)
