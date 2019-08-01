---
layout: post
title: "Alpine linux commands"
date: 2019-08-01
tags: linux alpine
---

`Docker Base image` 로 사용되는 작은 리눅스다.  
5MB 밖에 안되어 가끔 이미지 만들때 사용하는데 뭔가 좀 달라서 사용했던 것들을 적어보려한다.

``` shell
cat $(echo $HISTFILE) #echo command history
apk search [SEARCH TARGET PACKAGE NAME]
apk add [INSTALL TARGET PACKAGE NAME]
```
