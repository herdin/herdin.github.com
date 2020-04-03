---
layout: post
title: "Whiteship Spring MVC 4/4 Usage 1/2 요청 맵핑하기"
date: 2019-09-12
tags: web spring
---

## 요청 맵핑하기 1부 HTTP Method

여러가지 매핑 방법들이 있음.
``` java
@RequestMapping(value = "/hello", method = RequestMethod.GET)
@GetMapping("/hello")
@PostMapping("/hello")
@PutMapping
@DeleteMapping
@PatchMapping
```

메소드 또는 클래스에 붙일 수 있다.

## 요청 맵핑하기 2부 URI 패턴

Spring boot 에선 url 에 확장자 자동 지원을 막았다. /hello, /hello.zip (RFD Attack)
확장자를 보고 브라우져가 자동으로 다운 받으려고 시도를 하기 때문.
Accept 헤더에 확장자를 넣거나, 파라미터로 확장자를 넣는 방법을 사용하자.
``` java
@RequestMapping({"/usage01/hello", "/usage01//world"})
@RequestMapping("/usage01/hello2/???") //? 는 한글자
@RequestMapping("/usage01/hello3/*")
@RequestMapping("/usage01/hello4/**")
@RequestMapping("/usage01/hello5/{name:[a-z]+}") //정규식 매핑은 `@PathVariable` 로 받을 수 도 있음.
@ResponseBody
public String hello5(@PathVariable String name) { return name; }
```
## 요청 맵핑하기 3부 미디어 타입

``` java
//특정 미디어타입의 요청만 매핑
@RequestMapping(value = "/usage02/hello1", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
//특정 미디어타입의 요청을 특정 미디어타입으로 반환
@RequestMapping(value = "/usage02/hello2", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
```
## 요청 맵핑하기 4부 헤더와 매개변수

``` java
//특정 헤더가 있는 요청만 매핑
@RequestMapping(value = "/usage03/hello1", headers = HttpHeaders.CACHE_CONTROL)
//특정 헤더가 없는 요청만 매핑
@RequestMapping(value = "/usage03/hello2", headers = "!" + HttpHeaders.FROM)
//특정헤더에 특정값이 있는
@RequestMapping(value = "/usage03/hello3", headers = HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS + "=akey")
//특정 파라미터가 있는 요청만 매핑
@RequestMapping(value = "/usage03/hello4", params = "name")
//특정 파라미터가 없는 요청만 매핑
@RequestMapping(value = "/usage03/hello5", params = "!name")
//특정 파라미터에 특정 값이 들어온 요청만 매핑
@RequestMapping(value = "/usage03/hello6", params = "name=spring")
//특정 파라미터에 특정 값이 들어오지 않은 요청만 매핑
@RequestMapping(value = "/usage03/hello7", params = "name!=spring")
```

## 요청 맵핑하기 5부 HEAD와 OPTIONS
따로 구현하지 않아도, HEAD, OPTIONS Method 를 제공한다.

## 요청 맵핑하기 6부 커스텀 애노테이션
``` java
//Custom Annotation 을 사용할때는 꼭 @Retention Annotation 을 써주자.
@Retention(RetentionPolicy.RUNTIME)
@Documented
@RequestMapping(method = RequestMethod.GET, value = "/usage02/hello3", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
@ResponseBody
public @interface Usage02Hello3GetMediaTypeJsonMapping
```
## 요청 맵핑하기 7부 연습 문제
...
