---
layout: post
title: "서버 상태를 확인하기"
date: 2019-10-08
tags: devops writing
---

[참고 포스트](https://b.luavis.kr/server/linux-performance-analysis)

``` shell
$ uptime
$ dmesg | tail
$ vmstat 1
$ mpstat -P ALL 1
$ pidstat 1
$ iostat -xz 1
$ free -m
$ sar -n DEV 1
$ sar -n TCP,ETCP 1
$ top
```
