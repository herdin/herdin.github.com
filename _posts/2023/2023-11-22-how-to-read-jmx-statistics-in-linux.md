---
layout: post
title: "jmx 통계정보 linux 에서 확인"
date: 2023-11-22
tags: jmx java
---

``` shell
# jar 다운로드
$ wget https://github.com/jiaqi/jmxterm/releases/download/v1.0.1/jmxterm-1.0.1-uber.jar
$ wget https://github.com/jiaqi/jmxterm/releases/download/v1.0.2/jmxterm-1.0.2-uber.jar

# java 가 있어야함
$ java -jar jmxterm-1.0.1-uber.jar
$ java -jar jmxterm-1.0.2-uber.jar

# jmx port open
$>open localhost:1101

# 모든 mbean 확인
$>beans
...
#domain = NIO:
NIO:name=accepted,scope=0,type=selectors
NIO:name=accepted,type=total
NIO:name=asyncTasks,scope=0,type=selectors
NIO:name=asyncTasks,type=total
NIO:name=asyncTimeMS,scope=0,type=selectors
NIO:name=asyncTimeMS,type=total
...

$> get -b java.lang:type=Memory *
$> get -b java.util.logging:type=Logging *
$> get -b java.lang:type=ClassLoading *
```


참고
* [How to Read JMX Statistics via The Shell](https://www.googlecloudcommunity.com/gc/Cloud-Product-Articles/How-to-Read-JMX-Statistics-via-The-Shell/ta-p/77629)