---
layout: post
title: "Unable to find a @SpringBootConfiguration, you need to use @ContextConfiguration or @SpringBootTest(classes=...) with your test"
date: 2019-12-24
tags: java spring-boot
---

Springboot 테스트를 실행했는데

```
Unable to find a @SpringBootConfiguration, you need to use @ContextConfiguration or @SpringBootTest(classes=...) with your test
```

같은 에러가 난다면 테스트패키지가 스프링 부트 패키지를 찾지 못한 것이다. 찾을 수 있도록 패키지(상위나 동일한 경로)를 만들어 주거나, 설정파일을 추가해 주면된다.
