---
layout: post
title: "h2 데이터베이스 사용"
date: 2021-03-03
tags: database
---
> 그 동안 h2 를 왜인지 모르겠지만 안쓰고 있었다.  
> 그래서 db 를 aws ec2 에 docker 로 postgreSQL 를 아래와 같이 사용했다.
> - gcp 평생무료티어에 ssh 로 접속 -> 스크립트로 aws ec2 기동 및 eip 설정
> - postgreSQL docker container 는 기동시 자동으로 뜨도록 설정  
>
> 근데 gcp 에 ssh 로 접속해서 스크립트 실행하는 것 조차 귀찮아..............  
> 그냥 JUnit Test 에는 h2 를 사용하도록 해야겠다고 결심했다.

#### build.gradle

``` groovy
dependencies {
  //...
  implementation 'com.h2database:h2'
}
```

참고
- [스프링부트 h2 설정](https://bgpark.tistory.com/78)
- [SpringBoot에서 H2 데이터베이스 사용하기](https://youngjinmo.github.io/2020/03/h2-database/)
