---
layout: post
title: "Linux, kerberos 명령어 사용"
date: 2025-07-21
tags: linux command kerberos
---

``` shell
# ticket 삭제
$ kdestroy
# --all : 모두 삭제
$ kdestroy --all

# ticket 생성
# 항상 -f | -F | --forwardable 옵션을 함꼐 사용했음
$ kinit -f

# ticket 조회
# -l lists credential caches in collection
$ klist

```

# 참고
* [kerberos 명령어](https://m.blog.naver.com/hancury/221775416124)