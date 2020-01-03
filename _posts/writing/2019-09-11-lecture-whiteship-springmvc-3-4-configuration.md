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

> 2019-11-03 : 16:19

`web.xml` 없이 web 설정.

``` java
package com.harm;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class WebInit implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setServletContext(servletContext);
        context.register(WebConf.class);
        context.refresh();

        DispatcherServlet dispatcherServlet = new DispatcherServlet(context); //servletContext 를 받은 context 를 주는것이 중요
        ServletRegistration.Dynamic app = servletContext.addServlet("app", dispatcherServlet); //ServletRegistration 은 javax.servlet-api 3.0.1 이상부터 사용가능
        app.addMapping("/app/*");
    }
}
```
``` java
package com.harm;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan
public class WebConf implements WebMvcConfigurer {
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/", ".jsp");
    }
}
```

위 처럼 설정하면 `web.xml` 을 `java configuration` 으로 대체.
`Spring Boot` 가 아니라 `Spring` 임.

## 스프링 부트의 스프링 MVC 설정

> 2019-11-12 에 듣기 시작은했는데 합숙교육 2일차에 너무 무리했나 너무졸리다  
2019-11-26 일단 듣기만.  
2019-12-01 다시 시작..  

`spring-boot-starter-web` 에 의한 `DispatcherServlet` 의 내부 변수들
- handlerMappings
  - SimpleUrlHandlerMapping : favicon
  - RequestMappingHandlerMapping
  - SimpleUrlHandlerMapping : static resources + caching
  - WelcomePageHandlerMapping
- handlerAdapters
  - RequestMappingHandlerAdapter
  - HttpRequestHandlerAdapter : 왜 안에 아무것도 없지?
  - SimpleControllerHandlerAdapter : 왜 안에 아무것도 없지?
- viewResolvers
  - ContentNegotiatingViewResolver : 아래의 네개
  - BeanNameViewResolver
  - ThymeleafViewResolver : Thymeleaf 추가 의존성
  - ViewResolverComposite
  - InternalResourceViewResolver

`spring-boot-autoconfigure` 의존성 내부의 `META-INF/spring.factories` 파일에 `org.springframework.boot.autoconfigure.EnableAutoConfiguration` 항목들이 조건에 따라 설정되는 설정클래스들임.

저 자동설정목록 중에는 `org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration` 도 있는데, 내부에 `@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})` 가 붙어있음.

스프링 MVC 커스터마이징
- application.properties : 가장 간단한 설정
- @Configuration + implements WebMvcConfigurer : 스프링 부트의 스프링 MVC 자동설정 + 추가설정
- @Configuration + @EnableWebMvc + implements WebMvcConfigurer(없어도되지만 편함) : 스프링 부트의 스프링 MVC 자동설정 사용안하는 상태

스프링 부트의 설정 `org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration` 은 `@ConditionalOnClass({Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class})`, `@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})` 두개를 갖고있음.

`@EnableWebMvc` 은 `@Import({DelegatingWebMvcConfiguration.class})` 을 갖고 있고, `public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport` 이므로 스프링 부트 설정을 하지 않게 된다.

> 2019-12-01 23:33 부터 대충 듣기 시작

> 2019-12-05 18:43

스프링 부트는 `WebMvcAutoConfiguration` 에 의해 `Converter`, `GenericConverter`, `Formatter` 타입의 빈들을 자동으로 등록해주므로 `WebMvcConfigurer` 를 상속받은 클래스에서 포매터를 등록해줄 필요 없이 그냥 빈등록만 해주면 된다.

`Thmeleaf` 는 `ThymeleafAutoConfiguration` 설정이 따로 있음.

> 2019-12-17 23:15

`ThymeleafAutoConfiguration` 는 `@EnableConfigurationProperties({ThymeleafProperties.class})` 을 프로퍼티로 사용하고 있다. 그리고 `@ConditionalOnClass({LayoutDialect.class})` 도 있네?


## 스프링 부트 JSP

스프링 부트에서 jsp 를 사용할 떄의 제약사항
- jar 배포가 불가능하다. war 배포를 해야한다.
> 왜안되지?

- `java -jar <myWebProject>.jar` 로 실행가능하지만, 실행가능한 jar(excutable jar)은 지원하지 않는다.
- 특정 서블릿컨테이너(undertow)는 jsp 를 지원하지 않는다.
- writable 에러 페이지를 오버라이딩할 수 없다.

servelt 3.0 부터 web.xml  이 필요없는 설정이 가능해졌는데 (tomcat 7.0 이상) `SpringBootServletInitializer` 는 `WebApplicationInitializer` 의 구현체 이며 이를 가능하게 해준다. 메인함수를 넣으면 해당 스프링부트 프로젝트는 jar 배포도 war 배포도 가능해진다.

## WAR 파일 배포하기

> 2019-12-29 : 20:00

``` yaml
jar 배포 시 application 구조:
  Spring application:
    - Embedded Tomcat:
        DispatcherServlet: referencing IOC Container
    - Spring IOC Container
war 배포 시 application 구조:
    Servlet Container:
      Web Application aRchive:
        - Spring IOC Container
        - DispatcherServlet
```

## WebMvcConfigurer 1부 Formatter

아래와 같은 컨트롤러가 있을 때,

``` java
package run;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import run.vo.Person;

@RestController
public class Sample {

    @GetMapping("/hello1")
    public String hello1() {
        return "hello1";
    }

    @GetMapping("/hello2/{name}")
    public String hello2(@PathVariable String name) {
        return "hello2 " + name;
    }

    @GetMapping("/hello3/{name}")
    public String hello3(@PathVariable("name") Person person) {
        return "hello3 " + person.getName();
    }

    @GetMapping("/hello4")
    public String hello4(@RequestParam("name") Person person) {
        return "hello4 " + person.getName();
    }
}
```

아래와 같은 포매터(프린터와 파서를 합친것)를 직접 `WebMvcConfigurer` 을 구현한 설정 클래스에서 `addFormatters()` 로 등록해줘도 되고, 부트와 같은 경우에는 `@Component` 로 빈설정만 해줘도 포매터로 등록을 해준다.

``` java
package run.formatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.Formatter;
import org.springframework.stereotype.Component;
import run.vo.Person;

import java.text.ParseException;
import java.util.Locale;

//@Component
public class PersonFormatter implements Formatter<Person> {
    private Logger logger = LoggerFactory.getLogger(PersonFormatter.class);

    @Override
    public Person parse(String s, Locale locale) throws ParseException {
        this.logger.info("param {}", s);
        Person person = new Person();
        person.setName(s);
        return person;
    }

    @Override
    public String print(Person person, Locale locale) {
        return null;
    }
}

```
하지만 직접 등록하지 않고 빈등록을 하여 스프링부트가 자동 포매터 설정을 한 경우에는  
아래의 테스트3, 4 가 깨지게 되는데 이유는 주석에도 써놨다시피 `@WebMvcTest` 는 web 관련 빈만 등록해 주기 때문에,  
`@SpringBootTest` 로 모든 빈을 등록할 수 있게 해주고, 추가로 `@AutoConfigureMockMvc` 로 mockmvc 빈도 등록해주도록 설정 하면 된다.

``` java
package run;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@RunWith(SpringRunner.class)
@WebMvcTest //web 관련 bean 만 등록해서
//@SpringBootTest //통합, 모든 bean 등록
//@AutoConfigureMockMvc //@SpringBootTest 로 하면 mockmvc 를 빈등록하지 않기 때문에 설정
public class SampleTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void hello1() throws Exception {
        this.mockMvc
            .perform(get("/hello1"))
            .andDo(print())
            .andExpect(content().string("hello1"));
    }

    @Test
    public void hello2() throws Exception {
        this.mockMvc
            .perform(get("/hello2/foobar"))
            .andDo(print())
            .andExpect(content().string("hello2 foobar"));
    }

    @Test
    public void hello3() throws Exception {
        this.mockMvc
            .perform(get("/hello3/herdin"))
            .andDo(print())
            .andExpect(content().string("hello3 herdin"));
    }

    @Test
    public void hello4() throws Exception {
        this.mockMvc
                .perform(get("/hello4").param("name", "hythloth"))
                .andDo(print())
                .andExpect(content().string("hello4 hythloth"));

        this.mockMvc
                .perform(get("/hello4?name=epubaal"))
                .andDo(print())
                .andExpect(content().string("hello4 epubaal"));
    }
}

```

## 도메인 클래스 컨버터

> 2019-12-30 : 23:55

간단하게 알아본다.  
spring-boot-starter-data-jpa, h2database 의존성을 추가하면 자동으로 도메인 클래스 컨버터가 빈으로 등록이 되고, 컨버터가 빈으로 등록이 된다면 스프링부트에서 자동으로 컨버터가 등록이 된다.

``` java
//엔티티 객체를 선언하고
@Entity
Class Person {
  ...
  @Id
  private Long id;
}

//jpa 레포지토리를 선언한다. 그럼 자동으로 스프링 빈등록이 된다.
Interface PersionRepository implements JpaRepository<Person, Long>

/*
 * 잘은 모르겠는데 h2database 는 일회성 메모리 디비인지;; 아무튼 테스트코드에서
 * 위의 레포지토리를 @Autowired 받아서 Person 객체를 저장하면,
 * @RequestParam("id") Person person, id 로 파라미터가 들어온 것을 레포지토리에서 찾아서
 * Person 객체로 컨버팅 한다음 넘겨주게 된다.
 */
```

## 핸들러 인터셉터
## 핸들러 인터셉터 구현
## 리소스 핸들러
## HTTP 메시지 컨버터
## HTTP 메시지 컨버터  2부 JSON
## HTTP 메시지 컨버터 XML
## 기타 WebMvcConfigurer 설정
## 스프링 MVC 설정 마무리
