---
layout: post
title: "토비의 스프링 2부, 빠르게 보기"
date: 2021-04-23
tags: spring book
---


## IOC, Inversion of Control, 제어의 역전, IoC Container, Application Context
스프링 애플리케이션에서는 오브젝트의 생성, 관계설정, 삭제 등의 작업을 코드 대신 독립된 컨테이너가 담당한다.
그래서 스프링 컨테이너를 IoC 컨테이너라고도 한다.
그리고 스프링 IoC 컨테이너는 일반적으로 애플리케이션 컨텍스트를 말한다.

BeanFactory, ApplicationContext 두개의 대표적인 인터페이스로 정의되어 있다.

``` java
interface ApplicationContext/*application context*/ extends
  EnvironmentCapable,        ListableBeanFactory,
  HierarchicalBeanFactory/*bean factory*/,	 MessageSource,
  ApplicationEventPublisher, ResourcePatternResolver {
}
```

스프링 컨테이너/IoC 컨테이너는 바로 ApplicationContext 를 구현한 구현체의 오브젝트이다.


POJO 와 메타정보.
메타 정보는 BeanDefinition 인터페이스로 표현되는 추상정보.
xml, 소스코드 애노테이션, 자바코드, 프로퍼티 상관없이 BeanDefinition 의 내용을 표현한 것이라면 무엇이든 가져와
애플리케이션 컨텍스트는 BeanDefinition 의 메타 정보를 이용하여 IoC 와 DI 작업을 수행한다.

소스 타입에 맞는 BeanDefinitionReader 로 소스를 읽어서 BeanDefinition 을 만들기만 하면 된다.

빈 메타 정보
- 빈 아이디, 이름, 별칭
- 클래스, 클래스 이름
- 스코프
- 프로퍼티
- 생성자 파라미터
- 지연된 로딩, 우선 빈 여부, 자동와이어링 여부, 부모 빈 정보, 빈 팩토리 이름 등

미리 구현된 10여개의 ApplicationContext 가 준비되어 있고, 설정을 통해 자동으로 만들어진다.
- StaticApplicationContext -> 코드로 DI
- GenericApplicationContext -> 외부 설정으로 DI
- AnnotationConfigWebApplicationContext

xml -> XmlBeanDefinitionReader -> xml 을 읽어 BeanDefinition 을 생성
properties -> PropertiesBeanDefinitionReader
yaml
java annotation
java class
