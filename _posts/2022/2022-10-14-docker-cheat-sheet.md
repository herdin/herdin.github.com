---
layout: post
title: "docker cheat cheet"
date: 2022-10-14
tags: docker
---

> 도커를 어쩌다 쓰는데 쓸때마다 헷갈려서 적어놓는 커닝페이퍼

* [docker run](https://docs.docker.com/engine/reference/commandline/run/)

``` shell
#-d : detach mode, deamonize
#-p [HOST PORT]:[CONTAINER PORT]: port mapping -> old syntax
#--publish published=[HOST PORT],target=[CONTAINER PORT] -> new syntax
#--name : container name
#--restart=no/on-failure[:max-retries]/always/unless-stopped : restart policy
#--cap-add : Add Linux capabilities
#--rm : Automatically remove the container when it exits
#-it : allocate pseudo-TTY
#ex) docker run -d -p 8081:8080 --name was01 was:0.1



# docker login
# 아무 파라미터가 없으면 dockerhub 로 로그인
$ docker login <REPOSITORY_URL/IP> --username <USERNAME>

# docker commit
$ docker commit <CONTAINER ID/NAME> <NEW IMAGE NAME:TAG>
# docker tag
```