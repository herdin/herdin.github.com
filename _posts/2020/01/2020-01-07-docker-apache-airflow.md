---
layout: post
title: "apache airflow docker 실행하기"
date: 2020-01-07
tags: docker
---

사무실 차장님이 apache airflow 를 갑자기 도커에서 올려보고 싶다고하셔서 그냥 기록에 남긴다.

``` shell
# docker, docker-registry 설치
$ yum -y install docker docker-registry
# 부팅 시 docker 실행
$ systemctl enable docker.service
# docker service 실행
$ systemctl start docker.service
# 현재유저 docker group 에 추가
$ sudo usermod -a -G docker $USER
# docker service restart
$ sudo systemctl restart docker
# 다시 로그인
$ exit
# airflow 이미지를 받는다.
$ docker pull puckel/docker-airflow
# airflow 실행
$ docker run -d -p 8080:8080 --name myairflow puckel/docker-airflow
```

8080 포트로 접속해보자 끝.

참고
- [docker apache airflow 설치하기](https://cofs.tistory.com/407)
