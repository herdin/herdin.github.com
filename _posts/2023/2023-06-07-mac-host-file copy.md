---
layout: post
title: "Connection to the Docker daemon at 'localhost' failed with error [2] No such file or directory"
date: 2023-06-07
tags: mac docker
---


# TL;DR;

``` shell
$ sudo ln -sf "$HOME/.docker/run/docker.sock" /var/run/docker.sock
```

# description
gradle boot image build 를 하려는데 갑자기 아래와 같은 오류 발생

`Connection to the Docker daemon at 'localhost' failed with error "[2] No such file or directory`

[link1](https://github.com/spring-projects/spring-boot/issues/32897) -> [link2](https://github.com/docker/for-mac/issues/6529)

linux 환경의 docker 와 mac os 의 docker desktop 에서 socker.sock 파일 위치가 달라서 그런것같다.
아무튼 위와 같이 심볼릭 링크를 만들어주면 해결.