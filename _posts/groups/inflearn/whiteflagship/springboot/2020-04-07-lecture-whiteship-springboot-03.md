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
