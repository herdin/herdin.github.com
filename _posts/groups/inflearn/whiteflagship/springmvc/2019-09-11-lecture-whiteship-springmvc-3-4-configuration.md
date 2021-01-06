---
layout: post
title: "Whiteship Spring MVC 3/4 Configuration"
date: 2019-09-11
tags: web spring
---

# 스프링 MVC 설정
## 스프링 MVC 빈 설정

> 2019-09-10 : 02:00

별다른 설정을 하지 않아도 `DispatcherServlet` 에 기본으로 등록되어있는 기본 전략 `Bean` 들을 사용하게 된다.  

> 2019-10-07 : 12:20

`InternalResourceViewResolver` 같은 경우는 `prefix` 와 `suffix` 가 기본적으로 없는 상태로 등록된다.  
유저가 직접 `InternalResourceViewResolver` 을 사용할 때 설정 가능하다. (대부분의 빈들이 그러하다)  
HandlerMapping 은 어떤 요청이 들어왔을때, 그 요청을 처리할 수 있는 Handler 를 찾아주는 Interface 이다. (HandlerIntercepter 설정 가능.)  

## @EnableWebMvc

`@Configuration` 이 적힌 클래스에 `@EnableWebMvc` 을 적어주면 `DelegatingWebMvcConfiguration` 를 import 하고 해당 `class` 는 `WebMvcConfigurationSupport` 를 상속받는다.
실질적인 빈 설정은 WebMvcConfigurationSupport 에서 한다.

> 2019-10-31
으 2-4 랑 3-4 보다가 너무 졸려서.. ㅠㅠ 3-4 04:31 까지 봄

> 2019-11-01 : 16:30
`@EnableWebMvc` 를 사용하기 위해서는 어노테이션이 달려있는 Config 클래스를 사용하는 Context 에 DispatcherServlet 이 사용하는 서블릿컨텍스트와 동일한 서블릿컨텍스트를 줘야함.

RequestMapping, RequestAdapter, ViewResolver 가 뭐가 등록되는지 확인했음.

## WebMvcConfigurer

> 2019-11-03 : 16:19

`web.xml` 없이 web 설정.

``` java
package com.harm;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class WebInit implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setServletContext(servletContext);
        context.register(WebConf.class);
        context.refresh();

        DispatcherServlet dispatcherServlet = new DispatcherServlet(context); //servletContext 를 받은 context 를 주는것이 중요
        ServletRegistration.Dynamic app = servletContext.addServlet("app", dispatcherServlet); //ServletRegistration 은 javax.servlet-api 3.0.1 이상부터 사용가능
        app.addMapping("/app/*");
    }
}
```
``` java
package com.harm;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan
public class WebConf implements WebMvcConfigurer {
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/", ".jsp");
    }
}
```

위 처럼 설정하면 `web.xml` 을 `java configuration` 으로 대체.
`Spring Boot` 가 아니라 `Spring` 임.

## 스프링 부트의 스프링 MVC 설정

> 2019-11-12 에 듣기 시작은했는데 합숙교육 2일차에 너무 무리했나 너무졸리다  
2019-11-26 일단 듣기만.  
2019-12-01 다시 시작..  

`spring-boot-starter-web` 에 의한 `DispatcherServlet` 의 내부 변수들
- handlerMappings
  - SimpleUrlHandlerMapping : favicon
  - RequestMappingHandlerMapping
  - SimpleUrlHandlerMapping : static resources + caching
  - WelcomePageHandlerMapping
- handlerAdapters
  - RequestMappingHandlerAdapter
  - HttpRequestHandlerAdapter : 왜 안에 아무것도 없지?
  - SimpleControllerHandlerAdapter : 왜 안에 아무것도 없지?
- viewResolvers
  - ContentNegotiatingViewResolver : 아래의 네개
  - BeanNameViewResolver
  - ThymeleafViewResolver : Thymeleaf 추가 의존성
  - ViewResolverComposite
  - InternalResourceViewResolver

`spring-boot-autoconfigure` 의존성 내부의 `META-INF/spring.factories` 파일에 `org.springframework.boot.autoconfigure.EnableAutoConfiguration` 항목들이 조건에 따라 설정되는 설정클래스들임.

저 자동설정목록 중에는 `org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration` 도 있는데, 내부에 `@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})` 가 붙어있음.

스프링 MVC 커스터마이징
- application.properties : 가장 간단한 설정
- @Configuration + implements WebMvcConfigurer : 스프링 부트의 스프링 MVC 자동설정 + 추가설정
- @Configuration + @EnableWebMvc + implements WebMvcConfigurer(없어도되지만 편함) : 스프링 부트의 스프링 MVC 자동설정 사용안하는 상태

스프링 부트의 설정 `org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration` 은 `@ConditionalOnClass({Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class})`, `@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})` 두개를 갖고있음.

`@EnableWebMvc` 은 `@Import({DelegatingWebMvcConfiguration.class})` 을 갖고 있고, `public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport` 이므로 스프링 부트 설정을 하지 않게 된다.

> 2019-12-01 23:33 부터 대충 듣기 시작

> 2019-12-05 18:43

스프링 부트는 `WebMvcAutoConfiguration` 에 의해 `Converter`, `GenericConverter`, `Formatter` 타입의 빈들을 자동으로 등록해주므로 `WebMvcConfigurer` 를 상속받은 클래스에서 포매터를 등록해줄 필요 없이 그냥 빈등록만 해주면 된다.

`Thmeleaf` 는 `ThymeleafAutoConfiguration` 설정이 따로 있음.

> 2019-12-17 23:15

`ThymeleafAutoConfiguration` 는 `@EnableConfigurationProperties({ThymeleafProperties.class})` 을 프로퍼티로 사용하고 있다. 그리고 `@ConditionalOnClass({LayoutDialect.class})` 도 있네?


## 스프링 부트 JSP

스프링 부트에서 jsp 를 사용할 떄의 제약사항
- jar 배포가 불가능하다. war 배포를 해야한다.
> 왜안되지?

- `java -jar <myWebProject>.jar` 로 실행가능하지만, 실행가능한 jar(excutable jar)은 지원하지 않는다.
- 특정 서블릿컨테이너(undertow)는 jsp 를 지원하지 않는다.
- writable 에러 페이지를 오버라이딩할 수 없다.

servelt 3.0 부터 web.xml  이 필요없는 설정이 가능해졌는데 (tomcat 7.0 이상) `SpringBootServletInitializer` 는 `WebApplicationInitializer` 의 구현체 이며 이를 가능하게 해준다. 메인함수를 넣으면 해당 스프링부트 프로젝트는 jar 배포도 war 배포도 가능해진다.

## WAR 파일 배포하기

> 2019-12-29 : 20:00

``` yaml
jar 배포 시 application 구조:
  Spring application:
    - Embedded Tomcat:
        DispatcherServlet: referencing IOC Container
    - Spring IOC Container
war 배포 시 application 구조:
    Servlet Container:
      Web Application aRchive:
        - Spring IOC Container
        - DispatcherServlet
```

## WebMvcConfigurer 1부 Formatter
[링크]({{ site.baseurl }}/2019/09/11/lecture-whiteship-springmvc-3-4-configuration-formatter)

## 핸들러 인터셉터
## 핸들러 인터셉터 구현
## 리소스 핸들러
## 기타 WebMvcConfigurer 설정
## 스프링 MVC 설정 마무리
