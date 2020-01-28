---
layout: post
title: "Whiteship Spring MVC 4/4 Usage"
date: 2019-09-12
tags: web spring writing
---

# 스프링 MVC 활용
## 스프링 MVC 활용 소개
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
@RequestMapping(value = "/usage02/hello1", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
```
## 요청 맵핑하기 4부 헤더와 매개변수
## 요청 맵핑하기 5부 HEAD와 OPTIONS
## 요청 맵핑하기 6부 커스텀 애노테이션
## 요청 맵핑하기 7부 연습 문제
## 핸들러 메소드 1부 아규먼트와 리턴 타입
## 핸들러 메소드 2부 URI 패턴
## 핸들러 메소드 3부 요청 매개변수 (단순 타입)
## 핸들러 메소드 4부 폼 서브밋
## 핸들러 메소드 5부 @ModelAttribute
## 핸들러 메소드 6부 @Validated
## 핸들러 메소드 7부 폼 서브밋 에러 처리
## 핸들러 메소드 8부 @SessionAttributes
## 핸들러 메소드 9부 멀티 폼 서브밋
## 핸들러 메소드 10부 @SessionAttribute
## 핸들러 메소드 11부 RedirectAttributes
## 핸들러 메소드 12부 Flash Attributes
## 핸들러 메소드 13부 MultipartFile
## 핸들러 메소드 14부 ResponseEntity
## 핸들러 메소드 15부 @RequestBody & HttpEntity
## 핸들러 메소드 16부 @ResponseBody & ResponseEntity
## 핸들러 메소드 17부 정리 및 과제
## 모델 @ModelAttribute
## 데이터 바인더 @InitBinder
## 예외 처리 핸들러 @ExceptionHandler
## 전역 컨트롤러 @ControllerAdvice
## 스프링 MVC 강좌 마무리
