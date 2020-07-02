---
layout: post
title: "Whiteship Spring Data JPA"
date: 2020-06-11
tags: spring jpa writing
---

## 관계형 데이터베이스와 자바
## ORM 개요
## ORM 패러다임 불일치, 2020-06-11
orm 러닝커브가 높은 이유는 orm 으로 해결하는 문제가 쉽지 않아서이다.
> 보다가 중간에 끔

## JPA 프로그래밍 1. 프로젝트 세팅
``` yaml
plugins {
    id 'org.springframework.boot' version '2.2.4.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
}

group 'org.example'
version '1.0-SNAPSHOT'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    implementation('org.springframework.boot:spring-boot-starter-data-jpa')
    compile('org.postgresql:postgresql:42.2.5')
    testCompile group: 'junit', name: 'junit', version: '4.12'
}
```

``` yaml
spring:
  datasource:
    url: jdbc:postgresql://<DATABASE-IP>:<DATABASE-PORT>/<DATABASE-NAME>
    username: <DATABASE-USER-NAME>
    password: <DATABASE-USER-PASSWORD>
    jpa:
      hibernate:
        ddl-auto: create
      show-sql: true
      properties:
        hibernate:
          format_sql: true
logging:
  level:
    root: debug
```

``` java
@Entity
public class Account {
    @Id @GeneratedValue
    private Long id;
    private String username;
    private String password;
    //setter/getter..
}
```

## JPA 프로그래밍 2. 엔티티 타입 맵핑, 2020-06-25
* `@Entity` - 객체
* `@Table` - 관계
* `@Id` - 에는 primitive type 과 wrapper type 둘다 가능하지만, primitive type 은 0 으로 초기화가 되기 때문에, id 가 0 인지 그냥 초기화 된 객체인지 헷갈릴 소지가 있다.
* `@Column` - 모든 field 에 생략되어있다. 기본값으르 변경할때 추가한다. @Column(nullable = false) 기본값 true

## JPA 프로그래밍 3. Value 타입 맵핑
* Entity Type, Value Type
