---
layout: post
title: "tomcat version 확인하기"
date: 2022-03-15
tags: tomcat
---

``` shell
cd tomcat/lib 
java -cp catalina.jar org.apache.catalina.util.ServerInfo
```

참고
* [Tomcat: How to find out running Tomcat version?](https://stackoverflow.com/questions/14925073/tomcat-how-to-find-out-running-tomcat-version)