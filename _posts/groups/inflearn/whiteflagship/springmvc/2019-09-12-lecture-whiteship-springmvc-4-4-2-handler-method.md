---
layout: post
title: "Whiteship Spring MVC 4/4 Usage 2/2 핸들러 메소드"
date: 2019-09-12
tags: web spring writing
---

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

Thymeleaf 표현식
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

validation 을 수행한 뒤, 나오는 에러는 파라미터로 받은 `BindingResult` 에서 확인할 수 있다.

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

post 요청 후 refresh 를 했을때, 같은 post 요청이 일어나는 것을 막기 위해 [Post/Redirect/Get 패턴](https://en.wikipedia.org/wiki/Post/Redirect/Get) 이라는 것이 있다.
post 요청은 요청을 처리 한 뒤, get 으로 redirect 하는 것을 말한다.

## 핸들러 메소드 8부 @SessionAttributes

핸들러에 파라미터로 `javax.servlet.http.HttpSession` 를 받으면 session 객체를 가져올 수 있다. 받아서 뭔가 하던지 말던지. 아무튼.

``` java
@RequestMapping(value = "/usage07/hello1/events")
@ResponseBody
public String hello1(Event event, HttpSession httpSession) {
    logger.debug("-> {}", event);
    httpSession.setAttribute("myEvent", event);
    return "hello1";
}
```

그런데 저렇게 하지 않아도, Model 에 "myEvent" 로 넣어 줄 attribute 를 session 에도 넣고 싶다면, 아래와 같이 Controller 에 annotation 으로 `@SessionAttributes` 을 달고, 거기에 attribute name 을 넣어주면 자동으로 session 에 넣어준다.

``` java
@Controller
@SessionAttributes({"myEvent"})
public class Usage07SessionAttribute {
    private Logger logger = LoggerFactory.getLogger(Usage07SessionAttribute.class);

    @RequestMapping(value = "/usage07/hello1/events")
    @ResponseBody
    public String hello1(Event event, HttpSession httpSession, Model model) {
        logger.debug("-> {}", event);
//        httpSession.setAttribute("myEvent", event);
        model.addAttribute("myEvent", event);
        return "hello1";
    }
}

@Test
public void hello1() throws Exception {
    MvcResult result = mockMvc.perform(get("/usage07/hello1/events")
            .param("id", "2")
            .param("name", "spring")
            .param("limit", "-10")
    )
            .andDo(print())
            .andExpect(status().isOk())
        .andExpect(request().sessionAttribute("myEvent", CoreMatchers.notNullValue()))
    .andReturn()
    ;
    Event myEvent = (Event) result.getRequest().getSession().getAttribute("myEvent");
    logger.debug("event id -> {}", myEvent.getId()); //2 가 나온다.
}
```
## 핸들러 메소드 9부 멀티 폼 서브밋

위와같이 단순히 session 에 넣어주는 것을 이용할 수도 있지만, form 에서 많은 데이터를 입력 받을때 나눠서 입력 받기 위해 사용할 수도 있다.
위에서 배운 `@ModelAttribute` 은 session 의 attribute 도 매핑해 주기 때문에 같이 이용하여 나눠서 입력 받고, 마지막에 `SessionStatus sessionStatus` 를 파라미터로 받아서 `sessionStatus.setComplete();` 를 호출해 줌으로써 세션의 attribute 를 만료시킬 수도 있다.

``` java
@Controller
@SessionAttributes({"myEvent"})
public class Usage07SessionAttribute {
    private Logger logger = LoggerFactory.getLogger(Usage07SessionAttribute.class);
    private static ArrayList<Event> events = new ArrayList<>();

    //초기 url
    //id form 으로 이동
    @GetMapping("/usage07/events/form")
    public String form(Model model) {
        model.addAttribute("size", events.size());
        return "/events/id";
    }

    //id를 입력받는다.
    @PostMapping("/usage07/events/id")
    public String setId(@ModelAttribute Event event, Model model) {
        logger.debug("-> {}", event);
        Event newEvent = new Event();
        newEvent.setId(event.getId());
        model.addAttribute("myEvent", newEvent); //여기서 세션에 들어가게된다.
        return "redirect:/usage07/events/name";
    }

    //name form 으로 이동
    @GetMapping("/usage07/events/name")
    public String gotoName() {
        return "/events/name";
    }

    //name 입력 시 ModelAttribute 로 session 에 있는 myEvent 도 취합하여 갖고 온다.
    @PostMapping("/usage07/events/name")
    public String setName(@ModelAttribute("myEvent") Event event, Model model) {
        logger.debug("-> {}", event);
        model.addAttribute("myEvent", event); //그리고 마찬가지로 myEvent 이름으로 session 에 넣게된다.
        return "redirect:/events/limit";
    }

    //limit form 으로 이동
    @GetMapping("/events/limit")
    public String gotoLimit() {
        return "/events/limit";
    }

    //limit 을 입력받고 session 의 myEvent 와 취합하여 갖고온다.
    @PostMapping("/usage07/events/limit")
    public String setLimit(@ModelAttribute("myEvent") Event event, Model model, SessionStatus sessionStatus) {
        logger.debug("-> {}", event);
        events.add(event); //입력이 모두 완료 되었으므로 repository 에 저장
        sessionStatus.setComplete(); //그리고 session 의 myEvent 를 만료시킨다.
        return "redirect:/usage07/events/form";
    }
}
```

## 핸들러 메소드 10부 @SessionAttribute

session 의 attribute 를 가져올때, 파라미터로 그냥 `javax.servlet.http.HttpSession` 을 받아서 가져올 수도 있지만, 그렇게 되면 Object 타입으로 가져오게 되서 캐스팅을 해야되므로 Type Safe 하지 않다.

`@SessionAttribute` 로 파라미터를 가져오게되면 Type Safe 하게 가져올 수 있다.

``` java
@GetMapping("/usage08/visit")
@ResponseBody
public String visit(@SessionAttribute LocalDateTime visitTime) { //session 에 visitTime 이름으로 LocalDateTime type 의 데이터를 넣었다고 치자.
    logger.debug("visit time -> {}", visitTime);
    return visitTime.toString();
}
```

## 핸들러 메소드 11부 RedirectAttributes

Spring MVC 에선 기본적으로 Model 에 primitive type 을 넣고 redirect 를 하게 되면, url path parameter 로 ?key=value 로 붙게 되는데, Spring boot 의 설정(`org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties`) 의 `ignoreDefaultModelOnRedirect` 값이 기본으로 true 로 되어있다. 해당 값이 true 이면 model 에 넣은 primitive type 을 redirect 시 url parameter 로 넘겨주지 않는다.

아래 설정으로 변경할 수 있다.
```
spring.mvc.ignore-default-model-on-redirect: false
```

아무튼, 아래와 같이 `redirect` 시 `@RequestParam` 나 `@ModelAttribute` 로 받아 줄 수 있다.

``` java
@Controller
@SessionAttributes({"initEvent"})
public class Usage09RedirectFlashAttribute {
  //...
  @GetMapping("/usage09/redirect/redirectattribute/init")
  public String init(Model model, RedirectAttributes redirectAttributes) {
      Event initEvent = new Event();
      initEvent.setId(11);
      initEvent.setName("NEW EVENT 111");
      initEvent.setLimit(111);
      model.addAttribute("initEvent", initEvent); //1)
      redirectAttributes.addAttribute("id", "22");
      redirectAttributes.addAttribute("name", "NAME IN REDIRECT");
      redirectAttributes.addAttribute("limit", "2222");    
      return "redirect:/usage09/redirect/next";
  }

  @GetMapping("/usage09/redirect/session/next")
  @ResponseBody
  public String next(@ModelAttribute Event event,
                     @RequestParam Map<String, String> paramMap,
                     @SessionAttribute Event initEvent,
                     HttpSession session) {
      logger.debug("recv event -> {}", event);
      logger.debug("session event -> {}", initEvent);
      logger.debug("session get -> {}", session.getAttribute("initEvent"));
      Iterator<String> iter = paramMap.keySet().iterator();
      while(iter.hasNext()) {
          String key = iter.next();
          logger.debug("{} -> {}", key, paramMap.get(key));
      }
      return "hello!@";
  }
  //...
}
```

`@Controller` 에 `@SessionAttributes({"initEvent"})` 를 붙였고, 일부러 `1)` 부분에 model 에 같은 이름으로 initEvent 를 세팅해줘서 initEvent 라는 이름으로 session 에 저장하도록 의도했다.

next 핸들러의 첫번째 파라미터로 `@ModelAttribute Event event` 를 `@ModelAttribute("initEvent") Event event`, 또는 `@ModelAttribute Event initEvent` 로 변경해주면, session 의 initEvent 가 redirectAttributes 에 의해 덮어써 지는 것을 볼 수있다.

왜그런진 모르겠으나 같게 써주지말자.. `@ModelAttribute` 는 세션에서 데이터를 찾는데 없다면, Exception 이 나고, 있어도 변경이 되게 된다. 둘다 의도치 않은 상황..

## 핸들러 메소드 12부 Flash Attributes

앞에서 본 `RedirectAttributes` 는 url path 에 query parameter 로 전달하기 떄문에, string 으로 변환이 가능해야한다. 복합객체전달이 힘듬.

`RedirectAttributes` 의 `addFlashAttribute()` 를 사용하면, redirect 했을 떄, session 을 이용하여 객체를 전달하게 된다. query paramter 에 남지도 않고 깔끔함.

``` java
@GetMapping("/usage09/flash/send")
public String flashSend(RedirectAttributes redirectAttributes) {
    Event flashEvent = new Event();
    flashEvent.setId(123);
    flashEvent.setName("flash-event-name");
    flashEvent.setLimit(456);
    redirectAttributes.addFlashAttribute("flashEvent", flashEvent);
    return "redirect:/usage09/flash/recv";
}

@GetMapping("/usage09/flash/recv")
@ResponseBody
public String flashRecv(@ModelAttribute("flashEvent") Event event) {
    logger.debug("recv -> {}", event);
    return "flash!";
}
```

- [xpath 문법](https://www.w3schools.com/xml/xpath_syntax.asp)
- [xpath test](https://www.freeformatter.com/xpath-tester.html#ad-output)

## 핸들러 메소드 13부 MultipartFile

MultipartFile 을 사용하기 위해서는 MultipareResolver 가 DispatcherSerlvet 에 설정이 되어있어야하는데 기본적으로는 설정이 안되있다. spring boot 에선 설정이 된다. (spring-boot-starter/spring-boot-autoconfigure/META-INF/spring.factories/MultipartAutoConfiguration)

form 의 `enctype="multipart/form-data"` 로 보내주고 request hanlder 의 request parameter 로 받아서 처리하면 된다.

``` java
@PostMapping("/usage10/file")
public String upload(@RequestParam("uploadFile") MultipartFile file, RedirectAttributes redirectAttributes) {
    logger.debug("upload file name -> {}", file.getOriginalFilename());
    logger.debug("upload file size -> {}", file.getSize());
    redirectAttributes.addFlashAttribute("message", "server got " + file.getOriginalFilename());
    return "redirect:/usage10/file";
}
```
## 핸들러 메소드 14부 ResponseEntity

리소스를 다운로드 받을 떄, 응답 상태코드/헤더/본문을 설정할 수 있는 ResponseEntity 를 사용해 본다. file 의 media type 을 알아낼 수 있는 [Apache Tika - a content analysis toolkit](https://tika.apache.org/) 를 사용했다.

### pom.xml
``` xml
<dependency>
  <groupId>org.apache.tika</groupId>
  <artifactId>tika-core</artifactId>
  <version>1.23</version>
</dependency>
```

``` java
@GetMapping("/usage10/file/{filename}")
public ResponseEntity<Resource> get(@PathVariable String filename) throws IOException {
    Resource resource = resourceLoader.getResource("classpath:/" + filename);
    Tika tika = new Tika();
    String mediaType = tika.detect(resource.getFile());
    return ResponseEntity
            .ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
            .header(HttpHeaders.CONTENT_TYPE, mediaType)
            .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(resource.getFile().length()))
            .body(resource);
}
```
## 핸들러 메소드 15부 @RequestBody & HttpEntity

요청 본문(body)의 데이터를 HttpMessageConvert 로 변환하여 handler(Controller 의 mapping 함수) 의 argument 로 받아올 수 있다. 요청 헤더의 contentType 을 보고 HandlerAdapter 가 HttpMessageConvert 를 사용하여 argument 를 revolving 한다.

HttpEntity 를 handler argument 로 받아오면 헤더접근이 가능해진다.

아래 두 가지 방법으로 기본 메세지 컨버터들이 설정이 된다. (부트를 안썻을때, 썻을때)
- `@EnableWebMvc` -> `DelegatingWebMvcConfiguration` -> `WebMvcConfigurationSupport`
- Spring Boot autoconfigure -> `WebMvcAutoConfiguration` -> `EnableWebMvcConfiguration` -> `DelegatingWebMvcConfiguration` -> `WebMvcConfigurationSupport`

``` java
@PostMapping("/hello1")
public String hello1(@RequestBody Event event) {
    logger.debug("recv event -> {}", event);
    return "hello1";
}

@PostMapping("/hello2")
public String hello2(HttpEntity<Event> httpEntity) {
    logger.debug("recv http entity -> {}", httpEntity);
    logger.debug("recv event -> {}", httpEntity.getBody());
    return "hello2";
}
```


## 핸들러 메소드 16부 @ResponseBody & ResponseEntity
@ResponseBody 가 붙은 method 의 return value 는 요청의 accept header 를 참고하여 HttpMessageConvert 를 선택, 사용하여 응답 본문(body) 에 적히게 된다.

handler 의 return value 가 ResponseEntity 타입일 경우, 응답 본문에 들어간다. (@ResponseBody 가 없어도)

## 핸들러 메소드 17부 정리 및 과제
- (@JsonView)[https://www.youtube.com/watch?v=5QyXswB_Usg&t=188s]
- PushBuidler: HTTP/2, 스프링 5
- 과제는 [spring-petclinic 분석](https://github.com/spring-projects/spring-petclinic)
> [chrome plugin octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc/related?hl=ko_KR) 를 깔면 웹에서 github 를 편하게 볼 수 있음.

## 모델 @ModelAttribute
Controller 내부에서 공통적으로 참고해야될 model 이 있는 경우, 함수에 `@ModelAttribute` 를 붙여주고, argument 로 model 을 받아서 필요한 데이터를 넣어주거나, 데이터를 반환해주면 해당 데이터를 다른 handler 에서 접근할 수 있게된다.

@RequestMapping 과 함께 사용하게되면 해당 함수에서 반환한 데이터를 모델에 자동으로 담아준다. 이때 view name 은 RequestToViewNameTranslator 에 의해서 request mapping url 과 동일한 view name 을 찾아준다.

``` java
@Controller
@RequestMapping("/owners/{ownerId}")
class PetController {

  private static final String VIEWS_PETS_CREATE_OR_UPDATE_FORM = "pets/createOrUpdatePetForm";
  @Autowired
  private final OwnerRepository owners;

  @ModelAttribute("owner")
  public Owner findOwner(@PathVariable("ownerId") int ownerId) {
    return this.owners.findById(ownerId);
  }

  @GetMapping("/pets/new")
  public String initCreationForm(Owner owner, ModelMap model) {
    Pet pet = new Pet();
    owner.addPet(pet);
    model.put("pet", pet);
    return VIEWS_PETS_CREATE_OR_UPDATE_FORM;
  }
}
```

## 데이터 바인더 @InitBinder
특정 Controller 에서만 바인딩/검증설정을 변경하고 싶을 때 사용.
``` java
//바인딩 설정
webDataBinder.setDisallowedFields();
//포매터 설정
webDataBinder.addCustomFormatter();
//Validator 설정
webDataBinder.addValidators();
//특정 모델 객체에만 바인딩 또는 Validator 설정을 적용하고 싶은 경우
@InitBinder(“event”)

@InitBinder("owner")
public void initOwnerBinder(WebDataBinder dataBinder) {
  dataBinder.setDisallowedFields("id");
}

@InitBinder("pet")
public void initPetBinder(WebDataBinder dataBinder) {
  dataBinder.setValidator(new PetValidator());
}
```

## 예외 처리 핸들러 @ExceptionHandler
특정 예외가 발생한 요청을 처리하는 핸들러 정의
``` java
@ExceptionHandler
public ResponseEntity<Event> errorHandler(OtherEventException exception, Model model) {
    model.addAttribute("message", exception.getMessage());
    return ResponseEntity.ok().body(new Event(9, "99", 999));
}

@ExceptionHandler({RuntimeException.class, IllegalArgumentException.class})
public String errorHandler(Exception exception, Model model) {
    model.addAttribute("message", exception.getMessage());
    return "error";
}

@ExceptionHandler
public String errorHandler(EventException exception, Model model) {
    model.addAttribute("message", exception.getMessage());
    return "error";
}

//요기서 에러가나면 그에 해당하는 ExceptionHandler 로 가게된다.
@PostMapping("/usage12/hello1")
public String hello1(@ModelAttribute Event event) {
    logger.debug("recv event -> {}", event);
    switch(event.getId()) {
        case 1:
            throw new EventException("hello, this is exception for event exception handler.");
        case 2:
            throw new RuntimeException("hello, this is exception for runtime exception handler.");
        case 3:
            throw new OtherEventException("hello, this is exception for other event exception handler.");
        default:
            throw new IllegalArgumentException("hello, this is exception for illegal argument exception handler.");
    }
}
```


## 전역 컨트롤러 @ControllerAdvice
위의 경우와 달리 특정 Controller 안에서의 처리가 아니라 모든 Controller 에서 아래의 어노테이션을 처리하고 싶다면, Controller 만들듯이 class 를 만들고 `@ControllerAdvice` 를 붙여준 뒤 아래의 어노테이션으로 설정해주면된다.
- @ExceptionHandler
- @InitBinder
- @ModelAttribute

범위를 주고싶을 때는 아래와 같이 줄 수 있다.
``` java
// Target all Controllers annotated with @RestController
@ControllerAdvice(annotations = RestController.class)
public class ExampleAdvice1 {}

// Target all Controllers within specific packages
@ControllerAdvice("org.example.controllers")
public class ExampleAdvice2 {}

// Target all Controllers assignable to specific classes
@ControllerAdvice(assignableTypes = {ControllerInterface.class, AbstractController.class})
public class ExampleAdvice3 {}
```

## 스프링 MVC 강좌 마무리

더 봐야 할 것들

* 비동기 요청 처리
* CORS 설정
* HTTP/2
* 웹 소켓
* 웹 플럭스
