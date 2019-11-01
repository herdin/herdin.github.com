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

> 2019-11-01 : 17:02
시작

## 스프링 부트의 스프링 MVC 설정
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
