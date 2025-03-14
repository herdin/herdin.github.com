---
layout: post
title: "intellij 에 lombok 설치"
date: 2021-03-03
tags: intellij ide shovel-knight
---

> 체-신 인텔리제이에서는 롬복설정이 되어있잖아?? 사용법을 먼저 쓴다

## 자주쓰는 Annotation

``` java
@Slf4j //private static final Logger log = LoggerFactory.getLogger(MyObject.class);
@Getter, @Setter
@NoArgsConstructor, @RequiredArgsConstructor, @AllArgsConstructor
```

## 설치/설정
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
```

> 마지막 annotationProcessor 설정하는 것 때문에 약간 시간이 지연되었다.
> annotationProcessor 설정을 하지 않으면, 컴파일할때(아마?) 오류가 난다. 코드상으론 이상이 없는데 컴파일 결과에서 lombok 으로 생성된 getter 나 setter 를 모른다고 한다.


참고
- [Lombok features](https://projectlombok.org/features/all)