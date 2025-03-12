---
layout: post
title: "@ConfigurationProperties 삽질 기록"
date: 2024-10-23
tags: shovel-knight spring java
---

spring boot 2.6.1 모듈과 3.2.4 모듈을 같이 손보고있는 중이었음

3.2.4 에서는 아래와 같은 모양이다
``` kotlin
@EnableConfigurationProperties(MyProperties::class)
@Configuration
class MyConfig {
    // ...
}

@ConfigurationProperties(prefix="my")
class MyProperties(
    val name: String,
    val age: Int
)
```
2.6.1 에서도 똑같이 했는데, MyProperties 가 비워진 상태로 들어오는 현상.
이걸로 반나절을 씨름한 것 같다.

# TL;DR;
- `@ConstructorBinding` 는 2.2 부터 생성자 주입을 통해 immutable property 를 지원하기위해 도입됨.
- 그게 아니라면 setter 주입이 필요하다
- 3.x 부터는 ConfigurationProperties class 가 하나의 생성자를 가질 경우, ConstructorBinding 을 생략해도 된다.
- 버전차이로 고통받았다.

> 2.6.1 에서도 아래와 같이 고치면 주입이 가능했다. 하지만 생성자 주입을 쓰기로 결정.
``` kotlin
@ConfigurationProperties(prefix="my")
class MyProperties(
    var name: String,
    var age: Int
) {
    constructor(): this("", 0)
}
```

# 좀 더 주절주절..
- `@ConfigurationPropertiesScan` 이 붙어 있다면 ConfigurationProperties class 를 알아서 스캔한다.
- `@EnableConfigurationProperties(MyProperties::class)` 를 사용하려면 쓴것처럼 사용하려는 property class 를 모두 나열해야한다.\
- spring boot 3.x 부터는 ConstructorBinding 의 package 위치가 변경되었고, class 가 아니라 생성자에 사용하도록 변경되었다.