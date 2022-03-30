---
layout: post
title: "fully executable spring boot application"
date: 2022-03-03
tags: spring-boot
---

spring boot application 를 `java -jar myApplication.jar` 로 실행하지않고, 그냥 `./myApplication.jar` 로 실행하고싶다.

또는, linux service 에 등록해서 사용하고싶다.

> linux service 로 등록하면 어떤 이점이 있을까?

maven 일 경우
``` xml
<plugin>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-maven-plugin</artifactId>
	<configuration>
		<executable>true</executable>
	</configuration>
</plugin>
```

gradle 일 경우
``` groovy
bootJar {
	launchScript()
}
```


참고
* [62. Installing Spring Boot Applications](https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/deployment-install.html)