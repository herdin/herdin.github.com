---
layout: post
title: "Gradle 기초"
date: 2020-04-06
tags: build gradle writing
---

# Gradle 이란?
`Ant` 와 `Maven` 의 장점만 취한 빌드 툴이다.  
`Ant` 의 빌드 단위 간의 의존관계 설정
`Maven` 의 관례

기본 설정 파일은 gralde.build 이고 settings.gradle 이 있다면 함께 빌드 한다.
gradle 속성 파일은 gradle.properties 이다.


## gradle task
gradle 의 모든 빌드 단위(ant 의 target 같음)

``` groovy
task hello {
    doLast {
        println 'Hello world!'
    }
}

task intro(dependsOn: hello) << {
    println "I'm Gradle"
}
```

gradle 은 maven 이 가지는 기본 라이프 사이클이 없다.

## gradle wrapper 는 또뭐야
gradle 의 설치 없이 빌드를 가능하게 해준다
> 호옹이??

```
.
├── build.gradle
├── settings.gradle
├── gradle
│ └── wrapper
│   ├── gradle-wrapper.jar
│   └── gradle-wrapper.properties
├── gradlew
└── gradlew.bat
```
gradlew 는 shell(linux), gradlew.bat 은 batch(window) 내부를 보면 settings.gradle 의 gradle 을 다운받아서 사용하는 것을 볼 수 있다. 


참고
- [Gradle 강의](https://www.slipp.net/wiki/pages/viewpage.action?pageId=11632748)
- [gradle scp 사용하여 원격 서버에 war 배포하기](https://jojoldu.tistory.com/51?category=721560)
