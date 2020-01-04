---
layout: post
title: "Whiteship Spring MVC 2/4 Mechanism"
date: 2019-09-10
tags: web spring writing
---

# 스프링 MVC 동작 원리
## 스프링 MVC 소개
## 서블릿 소개
## 서블릿 애플리케이션 개발
## 서블릿 리스너와 필터
## 스프링 IoC 컨테이너 연동

> 2019-09-09  
> 이전까지는 연동을 안했나보다.. 설정듣다가 갑지기 돌아와서 들으니 또 허우적대네..  

`web.xml` 에 `ContextLoaderListener` 를 등록한다.  
`ApplicationContext` 를 `ServletContext` 에 등록하여 다른 `Servlet` 들이 사용할 수 있게 해준다.  
`ContextLoaderListener` 소스를 들어가 보면 안에서 등록하는 것을 볼 수있다.  
`FrontController Pattern` 을 `DispatcherServlet` 으로 구현했다.
`DispatcherServlet` 에서 `WebApplicationContext` 를 만들때, 기존에 이미 `Root WebApplicationContext` 가 있다면, `Root WebApplicationContext` 를 부모로 하는 `WebApplicationContext` 만든다.  
`Root WebApplicationContext` 는 다른 `Servlet` 들이 공통으로 이용할 수 있다. `Scope` 가 다름.
`Root WebApplicationContext` 는 주로 `Web` 과 관련된 `Bean` 들은 등록되지 않는다. (`Contrller`, `ViewResulver`, `HandlerMapping`) vs (`Service`, `Repository`)

> 2019-10-31

스프링 IoC 컨테이너 연동을 위한 의존성 추가

``` xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.1.3.RELEASE</version>
</dependency>
```
`web.xml` 에

``` xml
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
<context-param>
    <param-name>contextClass</param-name>
    <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
</context-param>
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>com.harm.AppConfig</param-value>
</context-param>

<servlet>
    <servlet-name>app</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextClass</param-name>
        <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
    </init-param>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>com.harm.WebConfig</param-value>
    </init-param>
</servlet>
<servlet-mapping>
    <servlet-name>app</servlet-name>
    <url-pattern>/app/*</url-pattern>
</servlet-mapping>
```


## 스프링 MVC 연동
## DispatcherServlet 1부
## DispatcherServlet 2부
## DispatcherServlet 3부
## 스프링 MVC 구성 요소
## 스프링 MVC 동작 원리 마무리
