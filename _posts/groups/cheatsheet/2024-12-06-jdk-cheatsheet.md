---
layout: post
title: "jdk cheatsheet"
date: 2024-12-06
tags: java cheatsheet
---

``` shell
######################################################
# heap dump jvm option
# -XX:+HeapDumpOnOutOfMemoryError : OOM 발생시 heap dump 생성
# -XX:HeapDumpPath : heap dump path
# -XX:OnOutOfMemoryError : OOM 발생시 스크립트, 재수행을 할수도있음
$ java -jar -XX:+HeapDumpOnOutOfMemoryError \
   -XX:HeapDumpPath=/data/log/heapdump \
   -XX:OnOutOfMemoryError="kill -9 %p" \\
   my-application-0.0.0-SNAPSHOT.jar

######################################################
# 실행중인 java process, jmap heap dump 생성
$ ps -ef | grep java
$ jmap -dump:format=b,file=testdump.hprof ${pid}
```

