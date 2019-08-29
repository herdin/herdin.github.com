---
layout: post
title: "Docker 이미지 초기화 - CentOS"
date: 2019-08-27
tags: docker writing
---

# init centos

`docker.io/centos:7` 부터는 기본적으로 `ifconfig` 가 없고 `ip` 라는 명령이 추가된 것 같은데,
막상 docker 에서 실행해 보면 안나온다.. 떠그랄

``` shell
$ yum install -y net-tools
```

굳이 `ifconfig` 를 사용하기 위해서 저걸 깐다.
