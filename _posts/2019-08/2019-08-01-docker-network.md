---
layout: post
title: "Docker Network"
date: 2019-08-01
tags: docker
---

`container` 는 기본적으로 `eth0` 과 `lo` 네트워크 인터페이스를 갖고있음.  
`container` 와 `host` 가 연결해야될 경우, `host` 에 `docker engine` 이 `veth`(virtual eth) 를 생성 후 container 의 eth 와 연결.  
> <(host) - docker() - veth> - <(container) - eth>

`docker` 의 `network driver` 는 `bridge`, `host`, `none`, `container`, `overlay` 가 있음  
`bridge` 는 `container` 끼리 연결. `ip/subnet/gateway` 를 생성.  
`host` 는 말그대로 `host` 의 네트워크를 그대로 사용.  
별도의 포트매핑 필요없음. 삭제불가.  
`none` 은 네트워크를 사용하지 않음. 삭제불가.  
`container` 는 다른 container 의 네트워크 환경을 공유  
`overlay` 는 분산네트워크 상에서 통신할 경우. swarm mode 가 활성화 되어있어야함  

[참고자료](https://jungwoon.github.io/docker/2019/01/13/Docker-4/)
