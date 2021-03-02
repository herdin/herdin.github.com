---
layout: post
title: "intellij 에 lombok 설치"
date: 2021-03-03
tags: intellij ide shovel-knight
---

미루고 미루던 롬복을 설치했다.

* Settings -> Plugins -> lombok 설치 후 restart
* Settings -> Build, Execution, Deployment -> Compiler -> Annotation Processors -> Enable annotation processing 체크
* `build.gradle` 에 의존성 설정(1), annotationProcessor 설정(2), compileQuerydsl 설정(3)

``` groovy
dependencies {
    implementation 'org.projectlombok:lombok:1.18.4' //(1)
    annotationProcessor 'org.projectlombok:lombok' //(2)
    //...
}

//(3) 아래로 쭉
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

> 마지막 annotationProcessor 설정하는 것 때문에 약간 시간이 지연되었다.
> compileQuerydsl 설정을 하지 않으면, 아마 컴파일할때 오류가 난다. compileQuerydsl 이게 없어요~ 하면서
> annotationProcessor 설정을 하지 않으면, 컴파일할때(아마?) 오류가 난다. 코드상으론 이상이 없는데 컴파일 결과에서 lombok 으로 생성된 getter 나 setter 를 모른다고 한다.
