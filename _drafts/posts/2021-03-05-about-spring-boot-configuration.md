---
layout: post
title: "Spring Boot, Externalized Configuration"
date: 2021-03-05
tags: spring
---

#### 외부 설정을 이용하는 방법
- property 파일
- yaml 파일
- 환경 변수
- 커맨드 라인 인자

#### 적용 순서
다양한 `PropertySource` 를 가지고 있는 스프링 부트에서는 아래와 같은 순서로 설정이 적용된다.

아래있는 설정이 위에 있는 설정을 엎어친다

```
1. Default properties (specified by setting SpringApplication.setDefaultProperties).
2. @PropertySource annotations on your @Configuration classes. Please note that such property sources are not added to the Environment until the application context is being refreshed. This is too late to configure certain properties such as logging.* and spring.main.* which are read before refresh begins.
  -> 프로퍼티 소스는 늦게 동작한다. 그리고 실제론 디폴트가 우선순위가 더 높았다.
3. Config data (such as application.properties files)
  3.1. Application properties packaged inside your jar (application.properties and YAML variants).
  3.2. Profile-specific application properties packaged inside your jar (application-{profile}.properties and YAML variants).
  3.3. Application properties outside of your packaged jar (application.properties and YAML variants).
  3.4. Profile-specific application properties outside of your packaged jar (application-{profile}.properties and YAML variants).
4. A RandomValuePropertySource that has properties only in random.*.
5. OS environment variables.
6. Java System properties (System.getProperties()).
7. JNDI attributes from java:comp/env.
8. ServletContext init parameters.
9. ServletConfig init parameters.
10. Properties from SPRING_APPLICATION_JSON (inline JSON embedded in an environment variable or system property).
11. Command line arguments.
12. properties attribute on your tests. Available on @SpringBootTest and the test annotations for testing a particular slice of your application.
13. @TestPropertySource annotations on your tests.
  -> 실제로 해보니 12의 @SpringBootTest 가 우선순위가 더 높았다.)
14. Devtools global settings properties in the $HOME/.config/spring-boot directory when devtools is active.
```



참고
- [Externalized Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)
