---
layout: post
title: "gradle, implementation 과 compile 의 차이"
date: 2020-11-13
tags: gradle
---

넘나 쏙쏙 설명해주시는 [블로그]((https://hack-jam.tistory.com/13))가 있어서 이해가 잘되었다.
아래 참고에도 적어놓았다.

물론 깊게 이해하진 못했다.

내가 짠 어플리케이션이 MySpringApplication 이라 치자.
그리고 내 어플리케이션은 Spring MVC 에 의존하고
Spring MVC 는 Spring Core 에 의존한다 치자.

MySpringApplication -> Spring MVC -> Spring Core

여기서 compile 을 사용하여 의존관계를 적었으면, Spring Core 가 변경되었을때, 모든 소스가 rebuild 된다.

하지만 implementation 를 사용하면, Spring Core 가 변경되면 직접 의존하는 Spring MVC 만 rebuild 가 되고,

MySpringApplication 은 build 할 필요가 없다.

최근 버전에는 compile 이 deprecated 되고 api 가 생겼다고한다. 그게 그거같지만 아무튼.

자세한건 참고

참고
- [Gradle, implementation vs compile](https://hack-jam.tistory.com/13)
- [Gradle 6.7, Using dependency configurations](https://docs.gradle.org/current/userguide/dependency_management_for_java_projects.html#sec:configurations_java_tutorial)
