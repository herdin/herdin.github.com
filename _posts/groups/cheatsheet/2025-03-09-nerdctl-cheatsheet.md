---
layout: post
title: "containerd nerdctl cheatcheet"
date: 2025-03-09
tags: containerd nerdctl cheatsheet
---

> containerd 를 처음 써보면서 nerdctl 이 생소해 적어놓는 cheatcheat
> docker cli 와 다른 부분을 중점적으로 적는다

# [nerdctl github](https://github.com/containerd/nerdctl)


``` shell
# 동일한 명령어들
nerdctl ps -a
nerdctl run --rm --name test -it ghcr.io/subicura/echo:v1 /bin/sh
nerdctl stop 88 && nerdctl rm 88

# 다른 명령어들
```