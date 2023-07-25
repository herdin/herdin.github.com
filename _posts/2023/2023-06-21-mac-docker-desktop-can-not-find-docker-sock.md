---
layout: post
title: "mac os host file 수정하기"
date: 2023-06-07
tags: mac
---

> 도커 데스크탑 최신버전에서 고쳐짐. 옵션을 켜주면된다.
> Option > Advanced > Allow the default Docker socket to be used (requires password)

docker desktop version 이 올라가면서 자동으로 docker.sock link 파일을 만들어주지 않는다고한다. 최신버전에선 고쳐졌다는데 여전히 안된다. (현재버전 4.20.1)

이 상태로 intellij 에서 test container 를 사용하면 docker.sock 을 찾을 수 없어서 test case 가 기동하지 않는다.

간단하게 고쳐주자.

``` shell
$ docker context ls
NAME                TYPE                DESCRIPTION                               DOCKER ENDPOINT                              KUBERNETES ENDPOINT   ORCHESTRATOR
default             moby                Current DOCKER_HOST based configuration   unix:///var/run/docker.sock                                        
desktop-linux *     moby                Docker Desktop                            unix:///Users/user/.docker/run/docker.sock                         

# 위에 docker endpoint 를 확인하여 아래 커맨드를 수정하여 사용
$ sudo ln -svf /Users/user/.docker/run/docker.sock /var/run/docker.sock
```

참고
* [Docker socket is not found while using Intellij IDEA and Docker desktop on MacOS](https://stackoverflow.com/questions/74173489/docker-socket-is-not-found-while-using-intellij-idea-and-docker-desktop-on-macos)