---
layout: post
title: "Spock 이 뭐지?"
date: 2020-11-13
tags: test spock
---


<img src="#" post-src="2020-11-13-about-spock.jpg">

> 응 아냐

Spock 이란 BDD(Behaviour-Driven Development) 프레임워크이다.
TDD(Test-driven Development) 프레임워크인 JUnit 보다 기대하는 동작과 테스트의 의도를 더 잘 드러내 준다고 한다.

뿐만 아니라 설정과 사용법도 쉽다!

> 어차피 블로그에서 짜집기 하는거 요점만 써야겠다.

JUnit 도 잘 모르지만 JUnit 과의 차이를 들어서 어떤 점에서 테스트의 의도가 더 잘 보이는지 알아보자.

여러 글에서도 다설명하고 있지만, 나도 똑같이 쓴다.

#### build.gradle
``` groovy
plugins {
    id 'org.springframework.boot' version '2.2.4.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
    id 'groovy' // groovy 지원
}

group 'org.example'
version '1.0-SNAPSHOT'

sourceCompatibility = 13

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.slf4j:slf4j-api:1.7.12'
    implementation 'ch.qos.logback:logback-classic:1.2.3'
    implementation 'org.springframework.boot:spring-boot-starter'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testCompile 'org.spockframework:spock-core:1.1-groovy-2.4'
    testCompile 'org.spockframework:spock-spring:1.1-groovy-2.4'
}
```






참고
- [창천향로 - Spock 소개 및 튜토리얼](https://jojoldu.tistory.com/228)
- [우형기술블로그 - Spock으로 테스트코드를 짜보자](https://woowabros.github.io/study/2018/03/01/spock-test.html)
- [NaverD2 - Spock으로 테스트하기](https://d2.naver.com/helloworld/568425)
