---
layout: post
title: "redis, mac 에서 사용하기"
date: 2022-02-23
tags: redis mac
---

remote redis 를 설치했는데, DataGrip 에서 어떻게 접속할지 몰라서 찾아봄

``` shell
# 설치한다 redis
$ brew install redis

# 접속한다 redis
$ redis-cli -h {HOST} -p {PORT} -a {PASSWORD}
# -u : url 접속, -c : cluster 없는 경우 접속 노드에서만 조회한다
$ redis-cli -c -u redis://{USERNAME}:{PASSWORD}@{HOST}:{PORT}


(예시)
터미널> redis-cli -h 127.0.0.1 -p 6379 -a PassWord!
```


# 참고
- [redis-cli사용해서 원격 redis에 접속하기 - 인기쟁이 돌고래](https://cherish-it.tistory.com/35)