---
layout: post
title: "Docker Swarm 기초"
date: 2020-04-21
tags: docker
---

## Docker Swarm?
docker compose 를 단일 Host 에서 다수의 Container 를 관리할 때 사용하는 tool 이라면,  
docker swarm 은 다수의 Host 에서 다수의 Container 를 관리하는 Orchestration tool 이다.

container orchestration 에 관련된 용어
* 스케줄링
* 클러스터링
* 서비스 디스커버리
* 로깅
* 모니터링

docker swarm 에 관련된 용어
* 스웜
* 노드
* 매니져 노드
* 워커 노드
* 서비스
* 태스크

docker swarm 의 기능
* 스케줄링
* 고가용성
* 멀티 호스트 네트워크
* 서비스 디스커버리
* 순차적 업데이트
* 상태 체크
* 비밀값 저장
* 로깅
* 모니터링
* 크론/반복작업

## 방화벽 설정
* TCP 2377 : 클러스터 통신에 사용, 매니져 노드 설정
* TCP/UDP 7946 : 노드 간 통신에 사용
* UDP 4789 : overlay network 통신에 사용

> * TCP port 2376 for secure Docker client communication. This port is required for Docker Machine to work. Docker Machine is used to orchestrate Docker hosts.
> * TCP port 2377. This port is used for communication between the nodes of a Docker Swarm or cluster. It only needs to be opened on manager nodes.
> * TCP and UDP port 7946 for communication among nodes (container network discovery).
> * UDP port 4789 for overlay network traffic (container ingress networking). [출처](https://docs.docker.com/engine/swarm/swarm-tutorial/)

## 실습 환경

``` shell
$ uname -a
Linux ip-172-31-19-236.ap-northeast-2.compute.internal 4.14.173-137.229.amzn2.x86_64 #1 SMP Wed Apr 1 18:06:08 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux

$ docker version
Client:
 Version:           19.03.6-ce
 API version:       1.40
 Go version:        go1.13.4
 Git commit:        369ce74
 Built:             Thu Apr 16 21:07:02 2020
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          19.03.6-ce
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.13.4
  Git commit:       369ce74
  Built:            Thu Apr 16 21:07:32 2020
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.3.2
  GitCommit:        ff48f57fc83a8c44cf4ad5d672424a98ba37ded6
 runc:
  Version:          1.0.0-rc10
  GitCommit:        dc9208a3303feef5b3839f4323d9beb36df0a9dd
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683
```

## 도커 스웜 테스트 1 : 단순 서비스

#### 도커 스웜 테스트 1-1 매니져 노드, 클러스터 생성

``` shell
$ docker swarm init --advertise-addr 52.79.178.154
Swarm initialized: current node (jho6fofwpt861eurfetfh056j) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-1kbbjmd5p5sb9uylaashywluok8zb31c0gcb1hkoswivicib8p-dxqb1swd8mkfpvzpho3gqt706 52.79.178.154:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

#### 도커 스웜 테스트 1-2 워커 노드, 클러스터 조인

``` shell
$ docker swarm join --token SWMTKN-1-1kbbjmd5p5sb9uylaashywluok8zb31c0gcb1hkoswivicib8p-dxqb1swd8mkfpvzpho3gqt706 52.79.178.154:2377
This node joined a swarm as a worker.
```

#### 도커 스웜 테스트 1-2 매니져 노드, 워커 노드 확인
``` shell
$ docker node ls
ID                            HOSTNAME                                           STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
jho6fofwpt861eurfetfh056j *   ip-172-31-17-141.ap-northeast-2.compute.internal   Ready               Active              Leader              19.03.6-ce
6wh2hrid4l1am7v9646htmorg     ip-172-31-24-181.ap-northeast-2.compute.internal   Ready               Active                                  19.03.6-ce
```

#### 도커 스웜 테스트 1-3 매니져 노드, 테스트 서비스 생성 및 실행

``` shell
$ docker service create \
--name simple \
--publish published=8000,target=5000 \
--replicas 2 \
madvirus/simplenode:0.1

cw4lzeyfjyv2jiq4ilioxx9ik
overall progress: 2 out of 2 tasks
1/2: running   [==================================================>]
2/2: running   [==================================================>]
verify: Service converged

$ docker ps -a
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS              PORTS               NAMES
4e3b3a80775f        madvirus/simplenode:0.1   "/sbin/tini -- node …"   30 seconds ago      Up 29 seconds                           simple.1.jlucsacjsqjkl10vjxbe9dpsr
```

## 도커 스웜 테스트 2 : 다른 Host 의 서비스간 연동

* 꼭 방화벽 설정을 하자.

* 다수의 Host 간 overlay network communication 을 사용할 때는 `init` 과 `join` 에 옵션에 신경 쓰도록 하자. 그냥 하면 안된다. [출처 - Containers not reachable from one host to another #2687](https://github.com/docker/classicswarm/issues/2687)
> 도커 스웜을 사용하는데 multi-host overlay network communication 을 사용하지 않는 케이스가 더 드물긴 하겠다.

예제의 이미지 및 예제는 [subicura](https://subicura.com/2017/02/25/container-orchestration-with-docker-swarm.html) 님의 예제를 따라했다.

#### 도커 스웜 테스트 2-1 매니져 노드, 클러스터 생성
``` shell
$ docker swarm init \
  --advertise-addr <매니져의 private IP> \
  --data-path-addr <매니져의 public IP>
Swarm initialized: current node (jiy0eq1yjqeno7a1p42xc0u7i) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-4wuffcin19vz2fbxj5h9i2cj00t1qc531k2l26s6qqrx3got2u-2vb5wce8xl4oox47mkt4zjs7v <매니져의 private IP>:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```
#### 도커 스웜 테스트 2-2 워커 노드, 클러스터 조인
``` shell
$ docker swarm join --token SWMTKN-1-4wuffcin19vz2fbxj5h9i2cj00t1qc531k2l26s6qqrx3got2u-2vb5wce8xl4oox47mkt4zjs7v <매니져의 private IP>:2377 \
  --advertise-addr <워커의 private IP> \
  --data-path-addr <워커의 public IP>
```

join token 을 까먹었을 때는 매니져 노드에서 `docker swarm join-token [OPTIONS] (worker|manager)` 명령어로 확인할 수 있다.

#### 도커 스웜 테스트 2-2 매니져 노드, 워커 노드 확인
``` shell
$ docker node ls
ID                            HOSTNAME                                           STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
jiy0eq1yjqeno7a1p42xc0u7i *   ip-172-31-19-236.ap-northeast-2.compute.internal   Ready               Active              Leader              19.03.6-ce
mnhkib62pbuffoveicruiqkbt     ip-172-31-20-141.ap-northeast-2.compute.internal   Ready               Active                                  19.03.6-ce
```
#### 도커 스웜 테스트 2-3 매니져 노드, 테스트 서비스 생성 및 실행

##### 도커 overlay network `backend` 생성
> `--attachable` 옵션을 사용하지 않으면 생성된 네트워크를 붙일 수 없게 된다.

``` shell
$ docker network create --attachable \
  --driver overlay \
  backend
a63zeq6bz5rhnhs5775izjho3
```
##### 도커 overlay network `backend` 확인
``` shell
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
a63zeq6bz5rh        backend             overlay             swarm
59e5dbd70870        bridge              bridge              local
fe956b6979ae        docker_gwbridge     bridge              local
3d4136a42d5f        host                host                local
5sw44x291kx4        ingress             overlay             swarm
edd62390b4e3        none                null                local
```
##### redis service 생성
``` shell
$ docker service create --name redis \
  --network=backend \
  redis
zh5om8ptgixbgzen1ckq6fa8d
overall progress: 1 out of 1 tasks
1/1: running   [==================================================>]
verify: Service converged
```

##### counter service 생성
``` shell
$ docker service create --name counter \
>   --network=backend \
>   --replicas 3 \
>   -e REDIS_HOST=redis \
>   -p 4568:4567 \
>   subicura/counter
mr29riduvri1njyk2r2rzf091
overall progress: 3 out of 3 tasks
1/3: running   [==================================================>]
2/3: running   [==================================================>]
3/3: running   [==================================================>]
verify: Service converged
```

##### 서비스 작동 확인
```shell
$ curl localhost:4568
8468f484bad9 > 1
$ curl localhost:4568
cd4845cf5e7b > 1
8468f484bad9 > 1
$ curl localhost:4568
cd4845cf5e7b > 1
8468f484bad9 > 1
49bf6c09ec4d > 1
$ curl localhost:4568
cd4845cf5e7b > 1
8468f484bad9 > 2

```

## `compose.yaml` 로 docker stack deploy 하기

#### compose.yaml
``` yaml
version: '3'

services:
    counter:
        image: subicura/counter
        networks:
            - backend
        ports:
            - "4568:4567"        
        environment:
            - REDIS_HOST=redis
        depends_on:
            - redis
        deploy:
            replicas: 6
    redis:
        image: redis:latest
        networks:
            - backend
networks:
    backend:
        driver: overlay
```

#### docker stack
##### --compose-file <COMPOSE FILE NAME>
사용할 compose 파일을 지정한다.

##### deploy
docker stack 을 배포한다.

``` shell
# stack deploy
$ docker stack deploy --compose-file=docker-stack-redis-counter.yaml redis-counter
Creating network redis-counter_backend
Creating service redis-counter_counter
Creating service redis-counter_redis
```

private docker registry 를 사용할때, 아래와 같은 오류 메세지가 나온다면..
```shell
$ docker stack deploy --compose-file docker-stack-msa-example.yaml msa
Updating service msa_reverse-proxy (id: nfriag5srtkz5pm3wvyhh14pv)
Updating service msa_mas-example (id: 6uskrqm442a4f33pqn6333d1w)
image 081582853021.dkr.ecr.ap-northeast-2.amazonaws.com/msa.example:latest could not be acc                                                                                              essed on a registry to record
its digest. Each node will access 081582853021.dkr.ecr.ap-northeast-2.amazonaws.com/msa.exa                                                                                              mple:latest independently,
possibly leading to different nodes running different
versions of the image.
```
docker swarm 에서 이미지는 각 노드들이 pull 받아서 사용한다고한다. 따라서 각 노드에게 docker registry login 을 할 수 있는 방법을 알려줘야한다.

먼저 로그인을 매니져에서 하고
``` shell
$ aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 081582853021.dkr.ecr.ap-northeast-2.amazonaws.com/msa.example  
```

`--with-registry-auth` 옵션을 추가하여 deploy 를 하면 된다.
``` shell
docker stack deploy --compose-file docker-stack-msa-example.yaml msa --with-registry-auth
```

##### services <STACK NAME>
<STACK NAME> 에 해당 하는 docker stack 의 service 들을 확인한다.

``` shell
$ docker stack services msa-stack
ID                  NAME                      MODE                REPLICAS            IMAGE                                                                  PORTS
j4dz8g19gpiz        msa-stack_mas-example     replicated          1/1                 081582853021.dkr.ecr.ap-northeast-2.amazonaws.com/msa.example:latest
kibhkufhhqdx        msa-stack_reverse-proxy   replicated          1/1                 traefik:v2.0                                                           *:8080->8080/tcp, *:8090->8090/tcp

# service 확인을 그냥 이렇게 할 수도 있다.
$ docker service ls
ID                  NAME                    MODE                REPLICAS            IMAGE                        PORTS
hn30ozc08wgp        portainer_agent         global              2/2                 portainer/agent:latest
vmj756j2j7tp        portainer_portainer     replicated          1/1                 portainer/portainer:latest   *:8000->8000/tcp, *:9000->9000/tcp
055wm54tjo8v        redis-counter_counter   replicated          6/6                 subicura/counter:latest      *:4568->4567/tcp
m4gxnpzyx1ej        redis-counter_redis     replicated          1/1                 redis:latest
```

##### ls
``` shell
# stack 확인
$ docker stack ls
NAME                SERVICES            ORCHESTRATOR
portainer           2                   Swarm
redis-counter       2                   Swarm
```

##### rm <STACK NAME>
<STACK NAME> 에 해당하는 docker stack 을 삭제한다.
