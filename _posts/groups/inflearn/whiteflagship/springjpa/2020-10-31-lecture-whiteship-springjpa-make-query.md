---
layout: post
title: "Whiteship Spring JPA, 쿼리 만들기"
date: 2020-10-31
tags: spring jpa
---

## 쿼리 만들기

쿼리 만드는 전략
#### `org.springframework.data.repository.query.QueryLookupStrategy.Key`
``` java
public static enum Key {
  CREATE, USE_DECLARED_QUERY, CREATE_IF_NOT_FOUND;
  //...
}
```
- `CREATE` : JpaRepository 의 interface 의 메소드 명을 분석하여 쿼리를 만들어 준다.
- `USE_DECLARED_QUERY` : 미리 정의되어 있는 쿼리를 찾아서 사용하는것 -> 기본값은 JPQL, native 를 사용하고 싶다면 `@Query(query="SELECT ~~", nativeQuery=true)` 설정.
- 'CREATE_IF_NOT_FOUND' : 미리 정의한 쿼리가 있으면 쓰고, 없으면 만들기 -> 위의 두개를 모두 사용 -> 기본값

위의 전략을 변경하려면 `@EnableJpaRepositories(queryLookupStrategy=queryLookupStrategy.Key.CREATE_IF_NOT_FOUND)` 이런식으로 변경할 수 있다.

미리 정의 되어 있는 쿼리를 찾는 순서는 `@Query`, `@Procedure`(정확치않음), `@NamedQuery` 순서이다.

메소드명으로 쿼리를 만드는 방법

- [쿼리 메소드](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.query-creation)
- [키워드](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.details)

like 를 사용할 경우
``` java
List<User> findByUsernameLike(String username);
List<User> findByUsernameStartingWith(String username);
List<User> findByUsernameEndingWith(String username);
List<User> findByUsernameContaining(String username);
List<Comment> findByCountGreaterThan(int count);
List<Comment> findByCountGreaterThanOrderByCountDesc(int count);
List<Comment> findByTextContaining(String text);
List<Comment> findByTextContains(String text); //findByTextContaining 차이없음
List<Comment> findByTextContainingIgnoreCase(String text);
List<Comment> findByTextContainingIgnoreCaseAndCountGreaterThan(String text, int count);
Page<Comment> findByTextContainingIgnoreCase(String text, Pageable pageable);
Stream<Comment> findByTextContainingIgnoreCaseAndCountLessThan(String text, int count);
```
