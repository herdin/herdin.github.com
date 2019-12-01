---
layout: post
title: "Whiteship Spring MVC 3/4 Configuration"
date: 2019-09-11
tags: web spring writing
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

## 스프링 부트 JSP
## WAR 파일 배포하기
## WebMvcConfigurer 1부 Formatter
## 도메인 클래스 컨버터
## 핸들러 인터셉터
## 핸들러 인터셉터 구현
## 리소스 핸들러
## HTTP 메시지 컨버터
## HTTP 메시지 컨버터 2부 JSON
## HTTP 메시지 컨버터 XML
## 기타 WebMvcConfigurer 설정
## 스프링 MVC 설정 마무리
