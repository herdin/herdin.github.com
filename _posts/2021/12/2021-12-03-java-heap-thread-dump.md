---
layout: post
title: "java heap/thread dump 얻기"
date: 2021-12-03
tags: java dump
---

개발서버에 tomcat 이 응답을 안하는 현상.

로그 좀 보고 메트릭을 봤는데 도통 알수가 없었는데..

팀원분이 바로 OOM 인걸 찾으시고 heap dump 분석을 하셔서 문제를 해결.

대단하당.. 나도 따라해봐야징..

catalina log 에 OOM 이라고 뜬걸 안까봤었다.. ㅠ,ㅠ 아무튼

##### java process id 확인

``` shell
$ ps -ef | grep tomcat
# 또는
$ ps -ef | grep java
```

##### heap dump 를 받자

``` shell
$ jmap -dump:format=b,file=dump-20211202213000.hprof ${pid}
```

[MAT](https://www.eclipse.org/mat/) 로 분석하면 된다. 근데 분석을 어떻게할지 잘 모르겠당 ㅋ.ㅋ

leak report 받으니까 문제가 있는 class 를 바로 알려주던뎅 ㅠ,ㅠ?

##### thread dump 를 받자

``` shell
$ jstack ${pid}
```


참고
- [스레드 덤프 분석하기](https://d2.naver.com/helloworld/10963)