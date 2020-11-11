---
layout: post
title: "Whiteship Spring JPA, 프로젝트 설정, entity 상태"
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

#### entity 의 상태
- Transient : JPA 가 모르는 상태, 그냥 객체를 생성만 한 상태. DB 에 들어갈지 안 들어갈지도 모르는 상태.
- Persistent : JPA 가 관리하는 상태. save 를 한 상태. 바로 DB 에 들어가는것은 아니다.
  이제 DB 에 넣어야겠다 라고 JPA 가 결정할 때 들어간다.
  session.save(object); session.load(Object.class, object.getId()); 를 하면 select 를 하지 않는다. -> 1차 캐싱
  Dirty checking -> 객체를 save 로 JPA 가 관리하는 상태로 만든 후, 값을 변경하면, insert 후 update 를 하는데
  값이 변경되다가 다시 save 했을 당시의 값으로 돌아오면 update 도 하지 않는다.
  write behind -> ??
- Detached : JPA 가 관리하지 않는 상태. 객체를 Transactional 스코프에서 사용하다가 해당 함수가 끝났을때.
- Removed : JPA 가 관리하긴 하지만 삭제하기로 한 상태

사용에 따른 entity 의 상태 변화

``` java
Object obj = new Object(); //Transient
Session.save(obj); //Persistent
Session.get();
Session.load();

Session.evict(); //Persistent -> Detached
Session.clear();
Session.close();

Session.update(); //Detached -> Persistent
Session.merge();
Session.saveOrUpdate();

Session.delete(); //Persistent -> Removed
```

`sesion.save(object)` 를 했다고해서 바로 isnert 하지 않는다. save 를 호출하면 Transient -> Persistent 로 entity 의 상태가 변경된다.
psersistance context 에 entity 가 들어간 상태. 1차 캐싱이 이루어진다. 코드로 살펴보면.

``` java
Account account = new Account();
account.setName("herdin-01");
entityManager.persist(account); //분명 psersist 부터 호출하고 (1)
logger.debug("account -> {}", account); //로깅해보고 (2)
account.setName("herdin-02"); //값을 변경하고 persist 를 호출하지 않았지만, (3)
```
실제 실행은 로깅이 먼저 찍히고 (2), insert 가 실행되고 (1), update 가 실행된다 (3)
이런 기능이 dirty checking, write behind 라고 한다.

#### cascade
관계가 `@OneToMany`/`@ManyToOne` 일 경우, 사용한다. entity 의 상태를 전파한다. 기본적으로는 아무것도 전파하지 않는다.
``` java
  @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
  Set<Skill> ownedSkills;
```
