---
layout: post
title: "Docker compose 기초"
date: 2020-02-12
tags: docker
---

단일 노드에서 container 끼리의 의존관계를 해결하기 위해 `docker-compose` 를 사용한다.
> 여러 노드에서는 `docker-swarm`

## 설치하자
``` shell
#download
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#apply execute permission
sudo chmod +x /usr/local/bin/docker-compose
#make link
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

## 기본 커맨드 정리
기본 컴포즈 파일명은 `docker-compose.yml` 또는 `docker-compose.yaml` 이다. 없다면 `-f` 옵션으로 파일을 지정하자.  
커맨드 바로 뒤에 넣으면 되는듯 하다. `docker-compose -f <FILE> up` 이런식

### docker-compose up [options] [--scale SERVICE=NUM...] [SERVICE...]
> Builds, (re)creates, starts, and attaches to containers for a service.
> Unless they are already running, this command also starts any linked services.

buld, create, start 까지 다 해준다.

### docker-compose down [options]
> Stops containers and removes containers, networks, volumes, and images created by up.

`up` 커맨드로 생성된 컨테이너/네트워크/볼륨/이미지를 다 지운다.

## docker-compose ps [options] [SERVICE...]

### docker-compose build
> 이건 뭔지 모르겠다.

### docker-compose create
> This command is deprecated. Use the up command with --no-start instead.

서비스를 위한 컨테이너를 생성한다. `deprecated` 되었다. `up` 커맨드의 `--no-start` 옵션을 사용하자.



## 기본 커맨드 up/down/restart

``` shell
$ docker-compose -f <COMPOSE-FILE-PATH> up -d --scale <SERVICE-NAME>=<SCALE-NUMBER>
#-f : compose File
#-d : detached

$ docker-compose -f <COMPOSE-FILE-PATH> down
$ docker-compose -f <COMPOSE-FILE-PATH> restart <SERVICE-NAME>
```






## 실습 - 단순 서비스 - `subicura/whoami`
container 간의 의존관계가 없는 단순한 `whoami`(http:4567 요청 시인스턴스의 해쉬값 반환) 서비스들을 구성해보자.

먼저 container 들을 정의한 `.yaml`/`.yml` 파일이 필요하다.
> 분명 `yaml` 이 표준이라는 것 같은데 대부분 `yml` 을 사용한다..
그리고 `vim` 에디터에서 yaml indent 가 왜이렇게 넓은지 모르겠다..

아래 예제에는 `subicura` 님의 docker hub 이미지를 사용했다.

### docker-compose-whoami.yaml
``` yaml
version: '3'

services:
        whoami1:
                image: subicura/whoami:1
                ports:
                        - "4500:4567"
        whoami2:
                image: subicura/whoami:1
                ports:
                        - "4501:4567"
```

만든 파일로 실행

``` shell
$ docker-compose -f docker-compose-whoami.yaml up -d
#-f : file
#-d : detached
```

실행된 container 들을 확인해보자

``` shell

$ docker-compose -f docker-compose-whoami.yaml ps
       Name                     Command               State           Ports
------------------------------------------------------------------------------------
ec2-user_whoami1_1   /bin/sh -c bundle exec rub ...   Up      0.0.0.0:4500->4567/tcp
ec2-user_whoami2_1   /bin/sh -c bundle exec rub ...   Up      0.0.0.0:4501->4567/tcp

$ curl localhost:4500
2240f99b5b27
$ curl localhost:4501
d2a4026413e8
```

실행된 container 중지 및 삭제

``` shell
$ docker-compose -f docker-compose-whoami.yaml down
Stopping ec2-user_whoami1_1 ... done
Stopping ec2-user_whoami2_1 ... done
WARNING: Found orphan containers (ec2-user_redis1_1, ec2-user_counter1_1) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Removing ec2-user_whoami1_1 ... done
Removing ec2-user_whoami2_1 ... done
Removing network ec2-user_default

$ docker-compose -f docker-compose-whoami.yaml ps
Name   Command   State   Ports
------------------------------
```

# 응용 서비스 - `subicura/counter`
container 간의 의존관계가 있는 서비스를 구성해보자.
요청할때마다 증가시킨 counter 값을 반환하며 증가시킨 counter 를 `redis` 에 저장하는 서비스를 구성해보자.

### docker-compose-counter.yaml
``` yaml
version: '3'

services:
        counter1:
                image: subicura/counter
                ports:
                        - "4600:4567"
                networks:
                        - internal-redis
                environment:
                        - "REDIS_HOST=redis1"
        redis1:
                image: redis:latest
                networks:
                        - internal-redis
networks:
        internal-redis:
                driver: bridge

```

실행하자

``` shell
$ docker-compose -f docker-compose-counter.yaml up -d
```

확인하자

``` shell
$ docker-compose -f docker-compose-counter.yaml ps
       Name                      Command               State           Ports
-------------------------------------------------------------------------------------
ec2-user_counter1_1   /bin/sh -c bundle exec rub ...   Up      0.0.0.0:4600->4567/tcp
ec2-user_redis1_1     docker-entrypoint.sh redis ...   Up      6379/tcp

$ curl localhost:4600
abc023f9c363 > 8
$ curl localhost:4600
abc023f9c363 > 9
$ curl localhost:4600
abc023f9c363 > 10
```

counter 값이 증가하는 것을 볼 수 있다.
docker-compose 로 구성된 서비스들은 따로 docker network 를 생성하지 않아도 한 네트워크로 묶이게 된다고 한다.
> By default Compose sets up a single network for your app [출처](https://docs.docker.com/compose/networking/)

# scale up

```
docker-compose -f docker-compose-counter.yaml up -d -scale counter1=5
```



출처
- [Docker Compose](https://docs.docker.com/compose/)
- [도커 컴포즈를 활용하여 완벽한 개발 환경 구성하기](https://www.44bits.io/ko/post/almost-perfect-development-environment-with-docker-and-docker-compose#%EB%8F%84%EC%BB%A4-%EC%BB%B4%ED%8F%AC%EC%A6%88%EB%A1%9C-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0)
