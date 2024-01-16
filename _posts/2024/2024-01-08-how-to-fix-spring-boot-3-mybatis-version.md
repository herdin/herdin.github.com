---
layout: post
title: "Invalid value type for attribute 'factoryBeanObjectType': java.lang.String"
date: 2024-01-08
tags: intellij springboot java mybatis shovel-knight 
---

spring boot 3 로 버전업

mybatis 에서 spring context 기동 시 이딴 에러가 난다
> `org.mybatis.spring.boot:mybatis-spring-boot-starter` 사용


`Invalid value type for attribute 'factoryBeanObjectType': java.lang.String`


그럼 버전이 안맞는 거임.

[maven repository](https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter/3.0.2) 에서 Compile Dependencies 을 유심히 보면 spring-boot-starter 버전이나 spring-boot-starter-jdbc 버전을 확인하여 현재 사용중인 spring boot 버전에 맞는 mybatis-starter 를 사용하였다.

끝.