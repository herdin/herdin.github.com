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

## 핸들러 메소드 1부 아규먼트와 리턴 타입
핸들러 메소드의 파라미터로 `WebRequest`, `NativeWebRequest`, `HttpServletRequest`, `HttpServletResponse` 등을 받아서 사용할 수 있음.

## 핸들러 메소드 2부 URI 패턴

아래와 같이 uri path 에 있는 값을 사용할때는 `@PathVariable` 을 사용하면 되지만
``` java
@RequestMapping("/usage01/hello5/{name}")
public String hello5(@PathVariable String name)
```

`@PathVariable`, `@RequestHeader` 는 자주본거고

[RFC 3986](https://tools.ietf.org/html/rfc3986#section-3.3) 에서 `Matrix Variables` 라는 것을 논의 중인가보다.

``` java
//GET pets/42;q=11;r=22
@GetMapping("/pets/{petId}")
public void findPet(@PathVariable String petId, @MatrixVariable int q) {
    // petId == 42
    // q == 11
}

// GET /owners/42;q=11/pets/21;q=22
@GetMapping("/owners/{ownerId}/pets/{petId}")
public void findPet(
        @MatrixVariable(name="q", pathVar="ownerId") int q1,
        @MatrixVariable(name="q", pathVar="petId") int q2) {
    // q1 == 11
    // q2 == 22
}

// GET /pets/42
@GetMapping("/pets/{petId}")
public void findPet(@MatrixVariable(required=false, defaultValue="1") int q) {
    // q == 1
}

// GET /owners/42;q=11;r=12/pets/21;q=22;s=23
@GetMapping("/owners/{ownerId}/pets/{petId}")
public void findPet(
        @MatrixVariable MultiValueMap<String, String> matrixVars,
        @MatrixVariable(pathVar="petId") MultiValueMap<String, String> petMatrixVars) {
    // matrixVars: ["q" : [11,22], "r" : 12, "s" : 23]
    // petMatrixVars: ["q" : 22, "s" : 23]
}
```

기본으로 세팅되어 있진 않고, 아래와 같은 설정이 필요하다. 기본적으로 path 의 `;` 을 제거하나보다.

``` java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UrlPathHelper;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        UrlPathHelper urlPathHelper = new UrlPathHelper();
        urlPathHelper.setRemoveSemicolonContent(false);
        configurer.setUrlPathHelper(urlPathHelper);
    }
}
```

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
