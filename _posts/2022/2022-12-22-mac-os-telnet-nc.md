---
layout: post
title: "mac 에서 server port 확인"
date: 2022-12-22
tags: mac
---

telnet 을 깔아도되지만, nc 를 사용해보자.

``` shell
# -z : zero 
$ nc -z <server_host> <port>
# example
$ nc -z 
```