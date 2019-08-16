---
layout: post
title: "Travis CI 에서 java 8 사용"
date: 2019-08-14
tags: ci opensource shovel-knight
---

`Travis` 를 개인 자바 프로젝트 CI 용도로 사용 중이다.  
2019-08-09 까지는 컴파일이 됐는데, 2019-08-14 부터 컴파일 에러가 나는거다.  
따로 설정을 바꿔준 적은 없고 그냥 소스만 수정해서 push 했는데..

```shell
...
[ERROR] COMPILATION ERROR :
[INFO] -------------------------------------------------------------
[ERROR] /home/travis/build/herdin/SimpleJava/src/main/java/com/harm/unit/xml/jaxb/JaxBStudy001.java:[10,22] package javax.xml.bind does not exist
[ERROR] /home/travis/build/herdin/SimpleJava/src/main/java/com/harm/unit/xml/jaxb/JaxBStudy001.java:[11,22] package javax.xml.bind does not exist
...
```

이런 에러가 계속 나고있었다.  
뭔 설정문제같은데.. 하면서 헤메다가

회사동료가 jdk 버전 바뀐게 아니냐고 해서 로그를 보니

``` shell
...
$ javac -J-Xmx32m -version
javac 11.0.2
...
```

갑자기 왜 jdk11 로 컴파일을하지....????

[문서](https://docs.travis-ci.com/user/languages/java/#overview) 를 뒤져보니 간단하게 해결했다.

`.travis.yml` 설정에

``` yaml
jdk:
  - openjdk8
```

추가로 끝..
