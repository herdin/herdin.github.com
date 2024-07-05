---
layout: post
title: "linux nmap port scan 사용법"
date: 2024-07-04
tags: linux command
---

특정 서버의 열려있는 port 를 스캔하는 프로그램

``` shell
# install
$ brew install nmap

# scan port range
$ nmap -v -p 80-3000 target.server.domain
```

# 참고
* [brew nmap](https://formulae.brew.sh/formula/nmap)
* [nmap 사용법 정리 및 실습](https://velog.io/@dhlife09/nmap-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%A0%95%EB%A6%AC)