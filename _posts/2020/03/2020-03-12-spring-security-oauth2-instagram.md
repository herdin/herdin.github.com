---
layout: post
title: "Spring Security Oauth2.0 Instagram.."
date: 2020-03-12
tags: java shovel-knight
---

```
spring boot 2.1.3.RELEASE
spring-boot-starters 2.1.3.RELEASE (security 5.1.4.RELEASE)
spring-boot-starter-oauth2-client 2.1.3.RELEASE
```

위의 버전을 사용하고`@EnableWebSecurity` 과 `ClientRegistrationRepository` 를 사용하면서 프로퍼티를 최대한 활용한 자동설정을 Instagram 최신 API(2020-03-31 부터 사용해야하는 basic display api) 에 사용하려고하면 token request 까지 모두 처리하고 access token 을 받아왔음에도 불구하고 컨버팅 과정에서 token type 이 응답에 없다는 이유로 오류가 난다.

괜히 시큐리티 써서 연결하려다가 개피봤네 젠장 ㅠㅠ
