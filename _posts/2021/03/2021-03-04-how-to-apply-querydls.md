---
layout: post
title: "querydls 설정"
date: 2021-03-04
tags: java jpa gradle
---

#### gradle plugins 설정
``` groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.4.3'
    id "io.spring.dependency-management" version "1.0.11.RELEASE"
    id "com.ewerk.gradle.plugins.querydsl" version "1.0.10"
}
```

#### 의존성 추가
``` groovy
dependencies {
    //...
    implementation 'com.querydsl:querydsl-jpa'
}
```

#### 빌드 스크립트 추가
왜 스크립트를 따로 추가해야하는지 아직 잘 모르겠다.
``` groovy
//querydsl configuration
def querydslDir = "$buildDir/generated/querydsl"
querydsl {
    jpa = true
    querydslSourcesDir = querydslDir
}
sourceSets {
    main.java.srcDir querydslDir
}
configurations {
    querydsl.extendsFrom compileClasspath
}
compileQuerydsl {
    options.annotationProcessorPath = configurations.querydsl
}
```
