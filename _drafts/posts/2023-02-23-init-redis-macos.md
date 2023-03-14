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

# 접속후

## cluster 정보
cluster info

SET [Key] [Value]
GET [Key]
# redis cloud service (saas?) 에 따라서 keys 를 기본으로 막았을 수도 있다.
# 그때는 scan 을 사용해야하는데, scan 은 cluster 환경에 적합하지 않은듯. 한 node 에서만 작동한다.
KEYS *
DEL [Key]
## 모든 데이터 지우기
FLUSHALL


GET TEST-INFO-123
GET TEST-INFO-124
GET TEST-INFO-125

get TEST-INFO::0
get TEST-INFO::1
get TEST-INFO::1,2,3


```


# 참고
- [redis-cli사용해서 원격 redis에 접속하기 - 인기쟁이 돌고래](https://cherish-it.tistory.com/35)