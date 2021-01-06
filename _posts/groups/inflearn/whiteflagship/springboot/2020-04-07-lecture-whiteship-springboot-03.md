---
layout: post
title: "Whiteship Spring Boot 03 Principle"
date: 2020-04-07
tags: spring spring-boot
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

## 스프링 웹 MVC 3부: ViewResolve, 2020-06-11
`Accept header` 는 브라우져가 어떤 타입의 데이터를 원한다를 서버에서 알려주는 정보 중 하나. 저런 정보들을 참고하여 뷰를 선택한다. [참고 Content Negotiation](https://docs.spring.io/spring/docs/5.2.7.RELEASE/spring-framework-reference/web.html#mvc-multiple-representations)  
> `xml` 은 기본 컨버터에 등록이 안되어있으므로 추가 설정을 해야한다. `HttpMessageConvertersAutoConfiguration`

## 스프링 웹 MVC 4부: 정적 리소스 지원, 2020-06-11
* 기본 리소스 위치
* `classpath:/static`
* `classpath:/public`
* `classpath:/resources`
* `classpath:/META-INF/resources`
* `spring.mvc.static-path-patter` 프로퍼티로 설정 변경 가능, 이때는 기존 기본설정이 다 사라짐(아마도?)
* `spring.mvc.static-locations` 리소스 찾을 위치 변경 가능

> 아 msa prototype 만들때는 gradle build 를 하면, build/classes, build/resources 두군데로 들어가고 resources 를 classpath 에서 못찾아서 gradle.build 에 task 를 추가해서 classes 에 resources 를 복사하는걸 넣었었다. 그런데 또 이렇게하면 bootJar 실행 시, jar 에 resources 가 두개 겹쳐서 들어가게 된다... 근데 또 지금 잠깐 실습해보는데 따로 task 로 복사하지 않아도 resources 를 잘찾네? 왜이러지?

Spring boot 의 기본 설정을 가져가면서, 추가 설정을 하려면 아래처럼. `/r/어쩌구` 인 요청에 해당하는 것을 `classpath:/r/` 이하에서 찾게된다.
``` java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/r/**")
                .addResourceLocations("classpath:/r/")
                .setCachePeriod(20)
                ;
    }
}
```

## 스프링 웹 MVC 5부: 웹JAR, 2020-06-12
Front 에서 사용하는 js/css 등의 자원을 jar 로 묶을 수 있다.

###### 이렇게 의존성 추가를 하고,
``` groovy
dependencies {
    compile('org.springframework.boot:spring-boot-starter-web:2.2.2.RELEASE')
    compile('org.springframework.boot:spring-boot-starter-thymeleaf:2.2.2.RELEASE')
    compile('org.webjars.bower:jquery:3.2.1')
    testCompile('org.springframework.boot:spring-boot-starter-test:2.2.2.RELEASE')
}
```
##### 이렇게 사용하면 된다.
``` html
<script src="/webjars/jquery/3.2.1/dist/jquery.min.js"></script>
<script>
    $(function(){
       alert('hello, webjar');
    });
</script>
```

내부 모습은 이렇다
<img src="#" post-src="2020-04-07-lecture-whiteship-springboot-03.PNG" />
