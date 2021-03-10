---
layout: post
title: "querydsl 설정"
date: 2021-03-04
tags: java jpa gradle
---

#### gradle plugins 설정
``` groovy
plugins {
    //...
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

위의 설정을 다 마치고, IntelliJ 를 사용할 때는

`File | Settings | Build, Execution, Deployment | Build Tools | Gradle` 의 설정에 가서
- Build and run using
- Run Tests using
을 모두 IntelliJ IDEA 로 바꿔놓는다.

#### 기본 레포지토리 설정
``` java
public interface AccountRepository extends JpaRepository<Account, Long>, QuerydslPredicateExecutor<Account> {}
```

#### 레포지토리 익스텐션 설정
기본레포지토리를 사용하지 않을 경우?
