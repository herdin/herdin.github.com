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

~~그리고 ExceptionHandler 에서 IllegalStateException 로 잡게되면, IllegalStateException.cause.targetException 에 들어있는 decoded exception 을 사용할 수 있게된다.~~
그리고 ExceptionHandler 에서 decoded exception 로 잡아서 처리하면된다. (위의 부분은 circuit breaker 버전이 낮은 경우 그렇다. 아마 3.1 이상이면 되는듯. `FeignCircuitBreakerInvocationHandler.invoke` 함수의 fallback exception 처리 확인 참고. unwrapAndRethrow(exception) 을 사용하면 높은 버전임)

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

# 추가로 알게된 사실들

* 아래 설정은 circuit breaker 사용하기 위한 필수 설정임. 이거 그냥 circuit breaker 관련 bean 이 있으면 될 줄 알았는데, 아니었음..
```
feign:
  circuitbreaker:
    enabled: true
```

* `org.springframework.cloud:spring-cloud-starter-openfeign` 3.1.0 버전과 3.1.3 버전(아마도 이후?) 은 fallback 에서 나온 exception 을 handling 하는 방식이 다르기 때문에, 3.1.3 버전을 사용해야 `@ExceptionHandler` 를 사용할때 깔끔하게 사용할 수 있다.
* 3.1.0
``` java
// FeignCircuitBreakerInvocationHandler 93 line
			Function<Throwable, Object> fallbackFunction = throwable -> {
				Object fallback = this.nullableFallbackFactory.create(throwable);
				try {
					return this.fallbackMethodMap.get(method).invoke(fallback, args);
				}
				catch (Exception e) {
					throw new IllegalStateException(e); // <-- 이부분
				}
			};
			return circuitBreaker.run(supplier, fallbackFunction);

```
* 3.1.3
``` java
// FeignCircuitBreakerInvocationHandler 95 line
			Function<Throwable, Object> fallbackFunction = throwable -> {
				Object fallback = this.nullableFallbackFactory.create(throwable);
				try {
					return this.fallbackMethodMap.get(method).invoke(fallback, args);
				}
				catch (Exception exception) {
					unwrapAndRethrow(exception); // <-- 이부분
				}
				return null;
			};
```
* feign 은 classpath 에 bulkhead(`io.github.resilience4j:resilience4j-feign` 에 속해 있음) 가 있는 경우, bulkhead 패턴을 사용하는데.. 이부분은 좀 더 학습이 필요하다.

# 참고
* [Spring Cloud OpenFeign](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/#spring-cloud-feign-circuitbreaker-fallback)
* [우아한 feign 적용기](https://techblog.woowahan.com/2630/)
* [feign 좀더 나아가기](https://techblog.woowahan.com/2657/)
* [Spring circuitbreaker actuator health check  설정 ](https://tweety1121.tistory.com/entry/Spring-circuitbreaker-actuator-health-check-%EC%84%A4%EC%A0%95)