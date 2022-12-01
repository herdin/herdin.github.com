---
layout: post
title: "docker cheat cheet"
date: 2022-10-14
tags: docker
---

> 도커를 어쩌다 쓰는데 쓸때마다 헷갈려서 적어놓는 커닝페이퍼

# [run](https://docs.docker.com/engine/reference/commandline/run/)

``` shell
# docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
#-d : detach mode, deamonize
#-p [HOST PORT]:[CONTAINER PORT]: port mapping -> old syntax
#--publish published=[HOST PORT],target=[CONTAINER PORT] -> new syntax
#--name : container name
#--restart=no/on-failure[:max-retries]/always/unless-stopped : restart policy
#--cap-add : Add Linux capabilities
#--rm : Automatically remove the container when it exits
#-it : allocate pseudo-TTY

# ex)
$ docker run -d -p 8081:8080 --name was01 was:0.1
```


# [build](https://docs.docker.com/engine/reference/commandline/build/)

```shell
# docker build [OPTIONS] PATH | URL | -
#-f : --file : dockerfile name
#-t : --tag : tag name
# 마지막 파라미터는 Dockerfile 위치 (도커파일 이름을 명시하지 않은 경우, Dockerfile 를 찾는다)
$ docker build -t my-app .
$ docker build -t my-app -f my-dockerfile ./dockerfiles
```

# [tag](https://docs.docker.com/engine/reference/commandline/tag/)

``` shell
# docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
$ docker tag my-soruce-app some-other-repository.com/my-repository/my-target-app:1.0.0
```


# etc

```shell
# docker login
# 아무 파라미터가 없으면 dockerhub 로 로그인
$ docker login <REPOSITORY_URL/IP> --username <USERNAME>

# docker commit
$ docker commit <CONTAINER ID/NAME> <NEW IMAGE NAME:TAG>
# docker tag
```