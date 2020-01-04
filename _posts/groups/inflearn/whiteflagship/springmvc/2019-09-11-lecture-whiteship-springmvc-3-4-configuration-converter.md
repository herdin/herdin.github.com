---
layout: post
title: "Whiteship Spring MVC 3/4 Configuration - Converter"
date: 2020-01-05
tags: web spring
---

## HTTP 메시지 컨버터
## HTTP 메시지 컨버터  2부 JSON
## HTTP 메시지 컨버터 XML

기본 HTTP 컨버터
  - 바이트배열
  - 문자열
  - Resource
  - Form (MultiVauleMap<String, String>)

의존성에 의해 등록되는 컨버터 (WebMvcConfigurationSupport, spring boot 아님, 그냥 spring 임)
  - JAXB2
  - Jackson2
  - Jackson
  - Gson
  - Atom
  - Rss
> 스프링부트는 Jsckson2 가 기본적으로 의존성에 추가되어있음.

아래와 같은 핸들러가 있을 때,

``` java
@GetMapping("/hello6")
public Person hello6(@RequestBody Person person) {
    person.setAge(person.getAge()+10);
    return person;
}

@GetMapping("/hello7")
public Animal hello7(@RequestBody Animal animal) {
    animal.setAge(animal.getAge()+10);
    return animal;
}
```

Accept 헤더에 따라 json 컨버터를 사용할지, xml 컨버터를 사용할지가 결정된다. json 컨버터는 스프링부트에서 기본등록을 해주고, xml 컨버터는 의존성에 의해 등록이 되는데 추가 설정을 해줘야한다.

아래의 세 의존성과,

``` xml
<groupId>javax.xml.bind</groupId>
<artifactId>jaxb-api</artifactId>

<groupId>org.glassfish.jaxb</groupId>
<artifactId>jaxb-runtime</artifactId>

<groupId>org.springframework</groupId>
<artifactId>spring-oxm</artifactId>
<version>${spring-framework.version}</version>
```

설정된 빈등록을 해줘야한다.

``` java
@Bean
public Jaxb2Marshaller jaxb2Marshaller() {
    Jaxb2Marshaller jaxb2Marshaller = new Jaxb2Marshaller();
    jaxb2Marshaller.setPackagesToScan(Animal.class.getPackage().getName());
    return jaxb2Marshaller;
}
```
