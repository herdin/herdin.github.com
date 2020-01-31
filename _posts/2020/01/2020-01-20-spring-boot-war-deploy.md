---
layout: post
title: "Spring Boot, web.xml 없는 설정 + 간단원리"
date: 2020-01-20
tags: spring
---

### 사용법
1. Spring Boot 환경에서 war 배포를 하려면 SpringBootServletInitializer abstract class 를 상속받은 뒤, configure 함수를 override 해야 한다.
2. `<packaging>war</packaging>` 배포방식을 war 로 바꿔준다. (maven)
3. `<artifactId>spring-boot-starter-tomcat</artifactId><scope>provided</scope>` Embedded Tomcat 의존성 스코프를 변경해준다.
4. package 하여 만들어진 war 파일을 배포한다.

### 사용되는 spring class 들
- <abbr title='org.springframework.boot.web.servlet.support/abstract class' style='color:blue;'>SpringBootServletInitializer</abbr> implements <abbr title='org.springframework.web/interface' style='color:darkblue;'>WebApplicationInitializer</abbr>
- <abbr title='org.springframework.web/class' style='color:crimson;'>SpringServletContainerInitializer</abbr> implements <abbr title='javax.servlet/interface' style='color:darkred;'>ServletContainerInitializer</abbr>

-------------------

### Servlet 3.0+ 에서의 ServletContext 설정 방법 추가
Servlet 3.0+ 에서 web.xml 없이 ServletContext 를 설정할 수 있는 방법이 추가되었다고 한다.
`classpath:META-INF/services/javax.servlet.ServletContainerInitializer` 라는 **텍스트파일** 에 `ServletContainerInitializer` 를 구현한 클래스를 넣으면 ServletContext 파라미터가 있는 interface 의 `onStartup` 함수를 실행시켜주는 것이다.

`org.springframework:spring-web:5.1.5.RELEASE/spring-web-5.1.5.RELEASE.jar/META-INF/services/javax.servlet.ServletContainerInitializer` 를 뒤져보면
```
org.springframework.web.SpringServletContainerInitializer
```

적혀있는 것을 확인할 수 있다.

또, `ServletContainerInitializer` 를 구현한 클래스에 `@HandlesTypes` 를 이용하여 클래스들을 넣어두면
``` java
public void onStartup(Set<Class<?>> set, ServletContext servletContext) throws ServletException
```
함수의 set 파라미터로 해당 클래스의 구현체들이 넘어온다.

`SpringServletContainerInitializer` 의 소스를 보면 `@HandlesTypes({WebApplicationInitializer.class})` 어노테이션을 갖고 있고, 파라미터로 넘어온 구현체들을 실행해주는 역할만 하고 있는 것을 볼 수 있다.

-------------------

### 그런데 도대체 DispatcherServlet 초기화 및 설정은 누가해주는거지??
`AbstractDispatcherServletInitializer` 에서 DispatcherServlet 을 등록하는 것 같은데, 구현 클래스가 누군질 모르겠네..

```
package org.springframework.web.servlet.support;
public abstract class AbstractAnnotationConfigDispatcherServletInitializer extends AbstractDispatcherServletInitializer
```

출처
- [“How-to” Guides](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-traditional-deployment)
- [스프링 3.1 (8) web.xml 없는 스프링 개발](http://toby.epril.com/?p=1205)
- [Interface ServletContainerInitializer](https://javaee.github.io/javaee-spec/javadocs/javax/servlet/ServletContainerInitializer.html)
