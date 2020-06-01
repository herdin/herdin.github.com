---
layout: post
title: "Whiteship Spring Boot 03 Principle"
date: 2020-04-07
tags: spring spring-boot writing
---

> 1부는 소개
> 2부는 시작하기

# 3부 스프링 부트 원리
## 의존성 관리 이해
## 의존성 관리 응용
pom.xml parent 의 원리 및 응용

## 자동설정의 이해
`@SpringBootApplication` 는 아래 세가지 어노테이션으로 이루어져 있다.

- `@SpringBootConfiguration` : `@Configuration` 과 같음.
- `@ComponentScan` : 빈등록 1단계, 어노테이션이 붙은 패키지를 기준으로 하위 패키지까지의 `@Component` 들을 빈으로 등록한다.
- `@EnableAutoConfiguration` : 빈등록 2단계, META-INF/spring.factories 의 ...EnableAutoConfiguration 하위의 빈들을 조건에 따라 등록한다.

## 자동 설정 만들기 1부: Starter와 AutoConfigure
## 자동 설정 만들기 2부: @ConfigurationProperties
## 내장 웹 서버 이해
## 내장 웹 서버 응용 1부 : 컨테이너와 포트
## 내장 웹 서버 응용 2부 : HTTPS와 HTTP2
## 톰캣 HTTP2
## 독립적으로 실행 가능한 JAR
스프링 부트의 전략
내장 JAR : 기본적으로 자바에는 내장 JAR를 로딩하는 표준적인 방법이 없음.
애플리케이션 클래스와 라이브러리 위치 구분
org.springframework.boot.loader.jar.JarFile을 사용해서 내장 JAR를 읽는다.
org.springframework.boot.loader.Launcher를 사용해서 실행한다.

## 스프링 부트 원리 정리


## ?? 중간은?


## 스프링 웹 MVC 1부
Spring Boot 가 제공해주는 Web MVC 기능을 사용하면서, 추가적으로 설정을 하기 위해선 `@Configuration` + `WebMvcConfigurer` interface 를 이용.
> `@EnableWebMvc` 를 사용하게되면 Spring Boot 가 제공하는 Web MVC 기능이 사라지고, 모두 재정의 해야한다.

## 스프링 웹 MVC 2부
HttpMessageConverters 스프링프레임웍에서 제공하는 인터페이스이고, MVC 의 일부분.

Http 요청 본문으로 들어오는것을 객체로 또는 반대로 변환. RequestBody, ResponseBody 와 같이 사용

StringMessageConverter, JsonMessageConverter
