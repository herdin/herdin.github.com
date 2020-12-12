---
layout: post
title: "Whiteship Spring JPA, 프로젝트 설정, 기초"
date: 2020-07-23
tags: spring jpa
---

## 프로젝트 설정

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>springJPAMaven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <name>demospringdata</name>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.3.RELEASE</version>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency> <!-- org.postgresql:postgresql:42.2.5-->
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

> 아직도 plugin 을 왜 넣는지 모르네..

저렇게 하고, main 에 spring application 으로 기동하고, runner 로 테스트했다.

#### logging 설정
``` yaml
spring:
  datasource:
    url: jdbc:postgresql://MY-POSTGRESQL-URL:PORT/DATABASE-NAME
    username: USER-NAME
    password: USER-PASSWORD
  jpa:
    hibernate:
      ddl-auto: create
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        temp:
          use_jdbc_metadata_defaults: false
logging:
  level:
    root: info
    com:
      harm: debug
    org:
      hibernate:
        type:
          descriptor:
            sql: trace
```

```
#실행 시, ddl 을 어떻게 할 것인지
spring.jpa.hibernate.ddl-auto=create
# sql 을 로깅할 것인지  logging.level.org.hibernate.SQL=debug 와 같음
spring.jpa.hibernate.show-sql=true
# 로깅 sql 을 이쁘게 보여줄 것인지
spring.jpa.hibernate.properties.hibernate.format_sql=true
# 기동 시 나는 오류 제거 clob 관련?
spring.jpa.hibernate.properties.temp.use_jdbc_metadata_defaults=false
# 바인딩 변수를 보여주는 것
logging.level.org.hibernate.type.descriptor.sql=trace
```

- 관계에는 방향이 있다. owning side(상대방 객체 레퍼런스를 갖는 쪽) 가 있고 non-owning side(상대방 객체 레퍼런스를 모르는 쪽) 가 있다. `foreign key` 를 갖고 있는 클래스가 owner 이다.
- owner 쪽에 관계를 세팅해줘야(관계가 있는 객체의 레퍼런스를 세팅해줘야) 관계가 적용이된다.
- `@ManyToOne` 을 갖고 있는 class 가 owner 이고, 이런 경우는 별도 테이블 없이 owner table 에 foreign key 컬럼을 추가하는 방식이 된다.
- `@OneToMany` 의 경우, join table 이 생긴다.
- 양방향 관계는 `@ManyToOne` 을 갖고 있는 관계가 오너이고(foreign key 를 갖고 있으므로), 오너가 아닌 쪽에서 오너에서 관계를 정의한 field 의 명칭을 알려줘야한다.
- 양방향 관계를 설정할때는, 양쪽 객체에 모두 관계를 설정해줘야한다. 한쪽 class 에서 양쪽의 관계를 세팅하도록 함수를 만들면 편하다. 그런 함수를 `convenient method` 라고 한다.
- `@ManyToOne`, `@OneToMany` 에서 cascade 옵션을 주어서 한 객체의 상태 변화(참고 entity 의 상태)를 다른 객체로 전파할 수 있다.
- EntityManager 나 Session 을 Persistance Context 라고 부른다.
