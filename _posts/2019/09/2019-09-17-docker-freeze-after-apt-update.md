---
layout: post
title: "docker 에서 apt udpate 이후 멈춤"
date: 2019-09-17
tags: docker shovel-knight
---

### ubuntu image base 에서 dockerfile 에 RUN apt update 사용시

[stackoverflow 답변](https://stackoverflow.com/questions/27273412/cannot-install-packages-inside-docker-ubuntu-image)

``` shell
#1. apt udpate 이후 멈춰있음
RUN apt update
RUN apt intall -y wget

#2. 실행됨
RUN apt update && apt install -y wget
```

> 빌어먹을거 뭔차이지..
