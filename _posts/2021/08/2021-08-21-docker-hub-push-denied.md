---
layout: post
title: "docker hub, push, denied: requested access to the resource is denied"
date: 2021-03-31
tags: shovel-knight docker
---

`docker push`를 했는데, `denied: requested access to the resource is denied` 이런 메세지를 보게되면 태그를 확인해보자.

push 하려는 docker hub repository 의 account 와 image 의 docker hub account 를 다르게 작성하면 저런 메세지가 나온다.


##### epubaal repository 에 herdin/naver-study-alpine:0.0 으로 push 했을 경우.
``` shell
$ docker push herdin/naver-study-alpine:0.0
The push refers to repository [docker.io/herdin/naver-study-alpine]
4324da7242dc: Preparing 
50644c29ef5a: Preparing 
denied: requested access to the resource is denied
```

#### 태그를 변경하여 다시 push, epubaal repository 에 epubaal/naver-study-alpine:0.0 로 push.

``` shell
$ docker tag naver-study-alpine:0.0 epubaal/naver-study-alpine:0.0
[ec2-user@ip-172-31-17-181 .docker]$ docker push epubaal/naver-study-alpine:0.0
The push refers to repository [docker.io/epubaal/naver-study-alpine]
4324da7242dc: Pushed 
50644c29ef5a: Pushed 
0.0: digest: sha256:bfa648d69224b08d22427e30dbb66299f277cafac727e4c92174fac9b7ef1306 size: 735
```

성공