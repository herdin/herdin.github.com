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

request 의 parameter 를 handler method 의 argument 로 받을 때, `@RequestParam(value = "name", required = false, defaultValue = "DEFAULT_NAME") String paramName` 이렇게 받을 수 도 있지만, 변수 명을 맞춰주고 생략할 수도 있다.

전에 살펴보았던 `@MatrixVariable` 로 Path Variable 을 받는 방법
``` java
@RequestMapping(value = "/usage05/hello1/id/{id}")
@ResponseBody
public User hello1(@PathVariable String id, @MatrixVariable String name, @MatrixVariable String nickname, @MatrixVariable String anagram) {
    logger.debug("id -> {}, name -> {}, nickname -> {}, anagram -> {}", id, name, nickname, anagram);
    User user = new User.Builder().id(id).name(name).nickname(nickname).anagram(anagram).build();
    return user;
}
```

`@RequestParam` 에서 사용할 수 있는 옵션들을 모두 써았다.

``` java
@RequestMapping("/usage05/hello2")
@ResponseBody
public String hello2(@RequestParam(value = "name", required = false, defaultValue = "DEFAULT_NAME") String thisIsName) {
    logger.debug("thisIsName -> {}", thisIsName);
    return "hello2-" + thisIsName;
}
```

value 를 생략하면, 변수명을 request parameter 의 key 값과 맞추면 된다.

``` java
@RequestMapping("/usage05/hello3")
@ResponseBody
public String hello3(@RequestParam String name) {
    logger.debug("name -> {}", name);
    return "hello3-" + name;
}
```

`@RequestParam` 조차 생략이 가능하다.
> 비추

``` java
@RequestMapping("/usage05/hello4")
@ResponseBody
public String hello4(String name) {
    logger.debug("name -> {}", name);
    return "hello4-" + name;
}
```

request parameter 의 모든 key-value 를 map 으로 받아 볼 수도 있다.

``` java
@RequestMapping("/usage05/hello5")
@ResponseBody
public String hello5(@RequestParam Map<String, String> params) {
    params.forEach((k, v) -> { logger.debug("k, v -> {}, {}", k, v);});
    logger.debug("name -> {}", params.get("name"));
    return "hello5-" + params.get("name");
}
```


## 핸들러 메소드 4부 폼 서브밋

- `@{}`: URL 표현식
- `${}`: variable 표현식
- `*{}`: selection 표현식, ()객체안에서 필드를 뽑아낼 때)

## 핸들러 메소드 5부 @ModelAttribute

`@RequestParam` 은 request parameter(?key=value) 를 하나씩 받아왔다면, request parameter 들을 한꺼번에 객체에 맵핑해주는 기능이다. `@RequestParam` 처럼 `@ModelAttribute` 도 생략이 가능하다.

json 형태의 request parameter 들은 jackson 컨버터로 json data -> pojo 로 변환한다면, request 내부의 key=value.. 들은 @ModelAttribute 로 변환할 수 있다.

### Event.java

``` java
public class Event {
    int id;
    String name;
    int limit;
    //... conttructor, getter, setter, Overrided toString
}    
```

### Controller

``` java
///usage06/hello2/events
@RequestMapping(value = "/usage06/hello2/events")
@ResponseBody
public String hello2(@ModelAttribute Event event) {
    logger.debug("event -> {}", event);
    return event.toString() ;
}
```

## 핸들러 메소드 6부 @Validated

`@ModelAttribute` 를 사용해서 여러 request parameter 들을 객체로 맵핑할때, validation 을 수행할 때 사용한다.

`@interface javax.validation.Valid` 와 `javax.validation.constraints.NotBlank, NotNull, Min, Max, ...` 등을 사용할 수도 있고, validation group 을 만들고, handler 마다 다른 validation group 을 적용하려면 `@interface org.springframework.validation.annotation.Validated` 를 사용해야 한다.

### Event.java
`ValidationGroupForNotBlack.class` 는 그냥 빈 interface 를 만들면된다.
``` java
public class Event {
    @Min(1)
    int id;
    @NotBlank(groups = ValidationGroupForNotBlack.class)
    String name;
    @Min(value = 0, groups = ValidationGroupForNotBlack.class)
    int limit;
    //... conttructor, getter, setter, Overrided toString
}
```

``` java
@RequestMapping(value = "/usage06/hello3/events")
public String hello3(@Valid @ModelAttribute Event event, BindingResult bindingResult) {
  //이렇게 받으면 annotation 붙은 validation 이 모두 적용된다.
}
@RequestMapping(value = "/usage06/hello4/events")
public String hello4(@Validated(ValidationGroupForNotBlack.class) @ModelAttribute Event event, BindingResult bindingResult) {
  //이렇게 받으면 정의된 valitioin group 에 따라 다른 validation 을 한다.
}
```



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
