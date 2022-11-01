---
layout: post
title: "spring open feign, error handling 하기"
date: 2022-10-27
tags: spring feign
---

> spring cloud open feign 을 도입하긴 했는데, error handling 을 하다보니 고민이되어 글로 정리 한다.

# 요구사항
* connection error 이건 400 이상의 http status 이건, 제대로된 응답을 받지 못할 경우 동일한 응답을 받고싶다. (defined error dto)

# 결론
decoder 만 써보기도하고, fallback 만 써보기도하고, feign client method 의 return type 을 dto, feign.Response 모두 써보기도 했다.

error decoder 와 fallback factory, 그리고 @ExceptionHandler 모두를 써야 원하는 결과를 얻을 수 있었다.

보통 블로그의 예제들을 보면, custom error decoder 를 구현하고 decoded exception 을 직접 ExceptionHandler 에서 처리하는 예제가 많이 보인다.

하지만 circuit breaker 를 사용하게되면, decoded exception 은 fallback 에 의해 무시되게 되는데, 이럴땐 fallback 을 직접 구현하지말고 fallback factory 를 통해 cause 를 넘겨주도록 구한하여, fallback 에서 cause 에 따라 적절한 exception 을 던져야한다.

그리고 ExceptionHandler 에서 IllegalStateException 로 잡게되면, IllegalStateException.cause.targetException 에 들어있는 decoded exception 을 사용할 수 있게된다.

## 추가로 actuator 에서 circuit breaker 의 상태를 보기위한 설정

``` yaml
management:
  health:
    circuitbreakers:
      enabled: true # 필수, /health 에서 circuitbreakers 항목이 보이게된다.
  endpoint:
    health:
      show-details: always # 필수, 안하면 /health 에서 server 의 status 만 보이게되고 나머지 상세정보(circuitbreaker 포함)가 아무것도 안보이게된다.
  endpoints:
    web:
      exposure:
        include: info, caches, configprop, mappings, env, refresh, health, prometheus, circuitbreakers # 선택, /actuator/circuitbreakers 활성화
  server:
    port: ${actuator.port:8081}
  metrics:
    tags:
      application: ${spring.application.name}

resilience4j:
  circuitbreaker:
    configs:
      default:
        register-health-indicator: true # 필수, /health 에서 circuitbreakers 상태를 제공한다. 없으면 unkonwn 으로 표시됨
```

# 참고
* [Spring Cloud OpenFeign](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/#spring-cloud-feign-circuitbreaker-fallback)
* [우아한 feign 적용기](https://techblog.woowahan.com/2630/)
* [feign 좀더 나아가기](https://techblog.woowahan.com/2657/)
* [Spring circuitbreaker actuator health check  설정 ](https://tweety1121.tistory.com/entry/Spring-circuitbreaker-actuator-health-check-%EC%84%A4%EC%A0%95)