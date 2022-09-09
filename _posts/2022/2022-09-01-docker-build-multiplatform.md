---
layout: post
title: "docker build for multiplatform"
date: 2022-09-01
tags: docker
---

``` bash

# 아키텍처 확인
$ arch
arm64

$ docker buildx create --name multiarch-builder --use

$ docker buildx inspect --bootstrap

$ docker buildx build --push -t epubaal/alpine-curl:latest --platform linux/arm64,linux/amd64 -f alpine-curl .

# --push 없이 빌드만 한상태에서 push 하면 hub.docker.com > tag 에서 digest 쪽에 아키텍처가 하나만 보인다. build 할때 push 하면 두 아키텍처에 대한 이미지?가 다 보인다
# 음 근데 m1 에서 kubectl 로 image 를 선택하면 멀티플랫폼 빌드인데도 불구하고 자꾸 arm64(m1) 이미지가 받아지지?

kubectl run -i --tty debug --image=epubaal/alpine-curl@sha256:045e0c1371a418ce2c2aeb57d55b206aea27517f3484c4a7d9b98a638261b9de --restart=Never /bin/sh
# 이렇게 digest 를 명시해주면 가능하다. 흠 불편한디?

그냥 따로 build, tag 를 붙였다.

$ docker buildx build --push -t epubaal/alpine-curl:arm64 --platform linux/arm64 -f alpine-curl .
$ docker buildx build --push -t epubaal/alpine-curl:amd64 --platform linux/amd64 -f alpine-curl .
```