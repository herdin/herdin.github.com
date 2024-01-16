---
layout: post
title: "No matching variant of org.springframework.boot:spring-boot-gradle-plugin:3.2.0 was found"
date: 2024-01-08
tags: intellij gradle java shovel-knight
---

`git clone` 해서 프로젝트를 연것 뿐인데 아래 에러가 뜨면서 빌드도 안된다.
> 프로젝트는 java17 이고, mac terminal 의 JAVA_HOME 은 java11 로 되어있음

``` shell
A problem occurred configuring root project 'ithaca'.
> Could not resolve all files for configuration ':classpath'.
   > Could not resolve org.springframework.boot:spring-boot-gradle-plugin:3.2.0.
     Required by:
         project : > org.springframework.boot:org.springframework.boot.gradle.plugin:3.2.0
      > No matching variant of org.springframework.boot:spring-boot-gradle-plugin:3.2.0 was found. The consumer was configured to find a library for use during runtime, compatible with Java 11, packaged as a jar, and its dependencies declared externally, as well as attribute 'org.gradle.plugin.api-version' with value '8.5' but:
          - Variant 'apiElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.2.0 declares a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component for use during compile-time, compatible with Java 17 and the consumer needed a component for use during runtime, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.5')
          - Variant 'javadocElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.2.0 declares a component for use during runtime, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 11)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.5')
          - Variant 'mavenOptionalApiElements' capability org.springframework.boot:spring-boot-gradle-plugin-maven-optional:3.2.0 declares a library, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component for use during compile-time, compatible with Java 17 and the consumer needed a component for use during runtime, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.5')
          - Variant 'mavenOptionalRuntimeElements' capability org.springframework.boot:spring-boot-gradle-plugin-maven-optional:3.2.0 declares a library for use during runtime, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component, compatible with Java 17 and the consumer needed a component, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.5')
          - Variant 'runtimeElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.2.0 declares a library for use during runtime, packaged as a jar, and its dependencies declared externally:
              - Incompatible because this component declares a component, compatible with Java 17 and the consumer needed a component, compatible with Java 11
              - Other compatible attribute:
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.5')
          - Variant 'sourcesElements' capability org.springframework.boot:spring-boot-gradle-plugin:3.2.0 declares a component for use during runtime, and its dependencies declared externally:
              - Incompatible because this component declares documentation and the consumer needed a library
              - Other compatible attributes:
                  - Doesn't say anything about its target Java version (required compatibility with Java 11)
                  - Doesn't say anything about its elements (required them packaged as a jar)
                  - Doesn't say anything about org.gradle.plugin.api-version (required '8.5')
```

자세히 보면 이런 에러가 보인다

`Doesn't say anything about its target Java version (required compatibility with Java 11)`

intellij > Settings >  Build, Execution, Deployment > Build Tools > Gradle 메뉴
Gradle Projects > Gradle > Gradle JVM 을 확인하여 java17 로 세팅해준다.

끝.