---
layout: post
title: "Gradle, SpringBoot, Mybatis 사용시, gradle build 후 실행하면 mapper xml 을 못찾는 현상"
date: 2020-04-06
tags: gradle spring-boot mybatis shovel-knight
---

## 개발환경
intellJ 에서 기본 build 를 gradle 로 위임해서 사용한다.

```
├── build
├── src
│ ├── main
│ │ ├── java
│ │ │ └── app
│ │ │  ├── controller .. controllers
│ │ │  ├── mapper .. mapper interface
│ │ │  └── MainApp .. spring boot application
│ │ └ resources
│ │   ├── app
│ │   │ └── mapper .. mapper xml
│ │   ├ application.yaml
│ │   └ logback-spring.xml
│ └── test
│   └── gradle-wrapper.properties
├── gradlew
└── gradlew.bat
...
```

## 사용 플러그인
``` groovy
plugins {
    id 'org.springframework.boot' version '2.2.6.RELEASE'
    id 'io.spring.dependency-management' version '1.0.8.RELEASE'
    id 'java'
}
```

## mybatis mapper xml 을 찾지 못함.

spring boot plugin 의 bootJar 로 jar 를 실행하면 괜찮은데, 그냥 빌드하고 실행하면, mapper 를 찾지 못한다는 오류가 난다.
```
org.apache.ibatis.binding.BindingException: Invalid bound statement
```

그래서 `build` 된 항목을 살펴 보았더니
```
├── build
│ ├── classes
│ ├── libs
│ ├── resources
│ └── tmp
...
```

### 첫시도 - sourceSets 수정

요렇게 구성이 되어있었고, mapper xml 은 resources 에 들어가 있었다. classpath 에 xml 이 들어가 있는 jar 는 문제가 없고, classpath 에 xml 이 없기 때문에 resources 를 불러오지 못한다고 생각하여 아래와 같이 `build.gradle` 을 수정해서 해결이 되긴했는데..

``` groovy
sourceSets {
    main {
      output.resourcesDir = output.classesDir
    }
}
```

해결한 다음 글을 쓰려고 sourceSets 을 원복시키고 실행했더니, 이젠 application.yaml 도 못찾는 것 같았다.. 안그래도 어떻게 가져가고있는지 궁금했는데.. 이상하다...........

저러면 bootJar task 로 나온 jar 파일 속에 리소스 파일이 두개씩생기네 하하


### 두번째 시도 - Copy Task 사용

``` groovy
task localBuild {
    println 'localBuild'
    doLast {
        println "localBuild.doLast -> project.projectDir -> " + project.projectDir
        copy {
            println 'localBuild.doLast.copy ' + '$buildDir/resources -> $buildDir/classes/java'
            from "$buildDir/resources"
            into "$buildDir/classes/java"
        }
    }
}
//bootJar 는 assemble 을 하지 않는다. local build 일 경우에만 resources 를 복사하도록 한다.
assemble.dependsOn "localBuild"
```

`$buildDir/resources` 의 모든 파일을 `$buildDir/classes/java` 로 복사해주는 `localBuild` Task 를 정의했다.

그리고 `bootJar` task 에서는 동작하지 않도록 `assemble` task 에 의존성을 주었다.

이렇게하면.. build 를 수행하는 로컬환경에서만 리소스들이 복사되어 들어가게 된다. CI 환경에서는 `bootJar` 를 수행하니 상관없다.

> 그런데 아무리 생각해도 그냥 빌드했을때, 프로퍼티 파일도 못읽는건 영 이해가 안된다..
