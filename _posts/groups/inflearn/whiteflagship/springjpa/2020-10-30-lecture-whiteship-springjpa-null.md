---
layout: post
title: "Whiteship Spring JPA, Null 처리"
date: 2020-10-30
tags: spring jpa
---

## Null 처리

Spring Data 2.0 부터 java 8 의 Optional 지원

단일 값의 경우 JpaRepository 의 함수에 Optional 을 사용하도록 하자. Entity 를 바로 return 하는 경우, 해당 데이터가 없으면 `null` 이 나온다.

`Collection` 을 return 하는 경우, `null` 이 아니라 `empty Collection` 이 나온다.

Spring 5.0 부터 지원하는 Null annotation 을 지원한다.
- `@NonNullApi`
- `@NonNull`
- `@Nullable`

그런데 막상하니까 잘 안되는 것 같다.

`findBySomeColumn` 함수의 파라미터로 `@NonNull` 은 작동하지 않는다. null 이 들어가도 된다. 하지만 Containing 을 사용한다거나 하면 오류가 난다.
강의에서도 `save` 의 파라미터로 붙였는데 `save` 함수의 파라미터로는 그냥 붙이지않아도 똑같은 Assert.notnull 오류가난다.

package 내부에 package-info.java 를 만들고 `@NonNullApi` 를 붙이면, 해당 패키지의 모든 파라미터 반환타입이 모두 NonNull 이 된다.
