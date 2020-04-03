---
layout: post
title: "PostgreSQL with Docker"
date: 2020-01-15
tags: docker
---

AWS 에 RDS 로 PostgreSQL 을 쓰는것보다 docker 로 쓰는게 더 싸지않을까?
> 아님말구

### image pull
먼저 최-신 이미지부터 땡기자
``` shell
$ docker pull postgres
```

### `volume` 생성
> docker 삭제 시, 데이터를 유지할거니까

``` shell
$ docker volume create pgdata
```

### 도커 컨테이너 기동
`-d` detached 백그라운드 실행  
`-p hostPort:containerPort` 포트 매핑  
`-e` 환경변수  
`-v host-src:container-dest` 볼륨 매핑

``` shell
docker run \
 -d \
 -p 5432:5432 \
 --name pgsql \
 -e POSTGRES_PASSWORD=mysecretpassword \
 -v pgdata:/var/lib/postgresql/data \
 postgres

```

### 내부 설정
``` shell
docker exec -it pgsql bash

root@cb9222b1f718:/# psql -U postgres
psql (10.3 (Debian 10.3-1.pgdg90+1))
Type "help" for help.
postgres=# create database mytestdb;
CREATE DATABASE
postgres=#\q

create user mytestuser;
grant all privileges on database mytestdb to mytestuser;

alter user mytestuser password 'password1234'
```

이렇게 하면 대충 사용설정은 끝난다.


### 다시 amazon-linux 에서 깔아서 설정해보도록 하자
