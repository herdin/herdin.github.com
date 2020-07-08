---
layout: post
title: "Docker service, compose, stack 이게 다 뭐지"
date: 2020-04-22
tags: docker
---

매번 헷갈리는데다가 잘 모르겠어서 정리한다.

### docker compose

단일 Host 환경에서 다수의 서비스(컨테이너)를 관리할 때 사용한다.

##### 주요 명령어
```
$ docker-compose -f <COMPOSE-FILE-PATH> up -d --scale <SERVICE-NAME>=<SCALE-NUMBER>
$ docker-compose -f <COMPOSE-FILE-PATH> down
$ docker-compose -f <COMPOSE-FILE-PATH> restart <SERVICE-NAME>
```

### docker service

`swarm mode` 의 명령어로 클러스터의 서비스를 관리할 때 사용

##### 주요 명령어
```
$ docker service create --name <NAME> --publish published=<HOST PORT>,target=<CONTAINER PORT> --replicas <REPLICA NUMBER> <REPOSITORY>/<IMAGE NAME>:<TAG>
$ docker service update
$ docker service ls
$ docker service ps
$ docker service rm
```

### docker stack

compose 의 `swarm mode` 버전. compose 파일을 사용할 수 있다.
> Swarm mode 상태에서 compose.yaml 를 사용하여 다수의 Host 환경(클러스터) 다수의 서비스(컨테이너)를 관리할 때 사용한다.

##### 주요 명령어
``` shell
# stack 으로 swarm 에 배포
$ docker stack deploy --compose-file <COMPOSE FILE NAME> <STACK NAME>
$ docker stack ls
$ docker stack ps
$ docker stack rm
$ docker stack services
```
