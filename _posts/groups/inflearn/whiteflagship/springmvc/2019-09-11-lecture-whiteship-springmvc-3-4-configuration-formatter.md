---
layout: post
title: "Whiteship Spring MVC 3/4 Configuration - Formatter"
date: 2020-01-05
tags: web spring
---

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

포매터등록을 하지 않으면, PathVariable/RequestParam 에 대한 String 을 Person class 로 변경할 방법을 모르기 때문에 `org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException` 이 난다.


> 아래는 그냥.. 추가로..

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
