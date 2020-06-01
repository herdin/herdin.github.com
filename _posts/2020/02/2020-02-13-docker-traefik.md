---
layout: post
title: "Traefik 기초 (with docker)"
date: 2020-02-12
tags: opensource docker reverse-proxy
---

재필님에게 배울적만해도 version 1 이었던 것 같은데..
2.0 버전으로 테스트를 한다.

<img src='#' post-src='2020-02-13-docker-traefik.png' title='대문이미지'/>

`Traefik` 은 Service Discovery 와 Routing 을 수행하는 [Reverse Proxy](https://en.wikipedia.org/wiki/Reverse_proxy) 이다.


- Edge Router : service 의 맨 앞에서 어떤 request 가 어떤 service 로 처리될 지 결정한다(routing)
- Auto Service Discovery : 전통적으로 reverse proxy 는 모든 route 설정을 설정정보로 갖고 있지만, `Traefik` 은 그런 정보를 service 들에게서 받는다.(`provider` 에게 api 호출을 한다) service 를 배포할 때, `Traefik` 이 사용할 수 있는 추가 정보를 더함으로 써 `Traefik` 이 해당 정보로 route 를 가능하게 한다.

### Routing & Load Balancing
> 음 컨셉에 대해 좀 더 쓰려고했지만 너무 귀찮아졌다. 그리고 공식홈에 너무 잘 설명이 되어있어서..

- [Providers](https://docs.traefik.io/providers/overview/) discover the services that live on your infrastructure (their IP, health, ...)
  - 서비스 오케스트레이터
- [Entrypoints](https://docs.traefik.io/routing/entrypoints/) listen for incoming traffic (ports, ...)
  - 외부의 요청에대해 `Traefik` 이 listen 하는 지점.
- [Routers](https://docs.traefik.io/routing/routers/) analyse the requests (host, path, headers, SSL, ...)
  - 어떤 rule 에 따라 어떤 service 에 request 를 route 할지.
- [Services](https://docs.traefik.io/routing/services/) forward the request to your services (load balancing, ...)
  - request 를 처리할 수 있는 application.
- [Middlewares](https://docs.traefik.io/middlewares/overview/) may update the request or make decisions based on the request
 (authentication, rate limiting, headers, ...)
 - request 를 service 에 route 하기 전에 전/후처리하는 기능들


### Supported Providers
<div id="pureTableHere"></div>
<script>
require(['util'], (util) => {
 util.genPureTable(
   'pureTableHere',
   ['Provider', 'Type', 'Configuration Type'],
   [
     ['Kubernetes','Orchestrator','Custom Resource'],
     ['Consul Catalog	Orchestrator','Label'],
     ['Marathon','Orchestrator','Label'],
     ['Rancher','Orchestrator','Label'],
     ['File','Manual','TOML/YAML format'],
   ]
 );
});
</script>

# [설정](https://docs.traefik.io/getting-started/configuration-overview/)
`Traefik` 의 설정은 두 가지가 있다.
1. static configuration - startup time - 기동 시 설정
 - 로그설정, entrypoint 설정, metric 설정 등...
2. dynamic configuration - while running - 런타임 설정
 - service, route rule, 등 provider 에게서 받는 정보들로 구성.

## static configuration
`static configuration` 은 세가지 방법이 있고 우선순위는 다음과 같다.

1. In a configuration file - 설정 파일
2. In the command-line arguments - 실행 인자
3. As environment variables - 환경 변수

우선 순위가 높은 설정이 하나라도 발견되면 낮은 우선 순위의 설정은 모두 무시된다.
> mutually exclusive (e.g. you can use only one at the same time)

## dynamic configuration
`dynamic configuration` 은 `provider` 로부터 설정을 받아온다.

docker 를 provider 로 사용할 경우, contianer label 을 통해서 설정을 한다.
그리고 container label 을 붙일 때는 \` `backtick` 이나 `\"` `escaped double-quotes`을 사용해야한다. `Traefik` 이 Golang 으로 만들어져 있는데, Golang 에는 `'` `Single quotes` 가 string literal 이 아니란다.

### Swarm mode
* Swarm mode 에서는 label 을 delpoy 쪽에 넣어야한다.
> Therefore, if you use a compose file with Swarm Mode, labels should be defined in the deploy part of your service.

* 포트 또한 label 에 적어줘야한다.
> Therefore you must specify the port to use for communication by using the label

* Traefik 노드 또한 매니져에 배치해야한다.
> As the Swarm API is only exposed on the manager nodes, you should schedule Traefik on the Swarm manager nodes by default


### docker-compose-traefik.yaml

``` yaml
#도커 컴포즈의 버전
version: '3'

volumes:
  #포테이너의 도커 볼륨 설정
  portainer_data: {}

services:

  reverse-proxy:
    image: traefik:v2.0
    #command: --accesslog=true --api.insecure=true --providers.docker --entrypoints.web.address=:80 --entrypoints.myportainer.address=:9000
    #command 와 environment 는 mutually exclusive 하다.
    environment:
      - TRAEFIK_ACCESSLOG=true #로그 사용
      - TRAEFIK_METRICS_PROMETHEUS=true #metric prometheus 사용
      - TRAEFIK_API_INSECURE=true #traefik 8080 api web ui 사용
      - TRAEFIK_PROVIDERS_DOCKER=true #provider docker 사용
      #entrypoint 설정들
      #TRAEFIK_ENTRYPOINTS_<ENTRYPOINT_NAME>_ADDRESS
      - TRAEFIK_ENTRYPOINTS_WEB_ADDRESS=:80
      - TRAEFIK_ENTRYPOINTS_MYPROMETHEUS_ADDRESS=:9090
      - TRAEFIK_ENTRYPOINTS_MYGRAFANA_ADDRESS=:3000
      - TRAEFIK_ENTRYPOINTS_NODEEXPORTER_ADDRESS=:9100
      - TRAEFIK_ENTRYPOINTS_MYPORTAINER_ADDRESS=:9000
    #entrypoint 들은 expose 해줘야한다.
    ports:
      - "80:80"
      - "8080:8080"
      - "9090:9090"
      - "3000:3000"
      - "9100:9100"
      - "9000:9000"
    volumes:
      #docker provider 사용
      - /var/run/docker.sock:/var/run/docker.sock

  prometheus:
    image: prom/prometheus
    volumes:
      #로컬 설정파일
      - /home/ec2-user/prometheus.yml:/etc/prometheus/prometheus.yml
    labels:
      #http router <myprometheus> 설정
      #  - request 가 myprometheus entrypoint 로 들어오면서 (소문자로 변형되나봄)
      #  - header 에 Host:CUSTOM.USER.DOMAIN.COM 일 때,
      #http service <myprometheus> 설정
      #  - http service 이기 때문에 http://<service-private-ip>:9090 으로 매핑
      - "traefik.http.routers.myprometheus.rule=Host(`CUSTOM.USER.DOMAIN.COM`)"
      - "traefik.http.routers.myprometheus.entrypoints=myprometheus"
      - "traefik.http.services.myprometheus.loadbalancer.server.port=9090"

  grafana:
    image: grafana/grafana
    labels:
      - "traefik.http.routers.mygrafana.rule=Host(`CUSTOM.USER.DOMAIN.COM`)"
      - "traefik.http.routers.mygrafana.entrypoints=mygrafana"
      - "traefik.http.services.mygrafana.loadbalancer.server.port=3000"

  node-exporter:
    image: prom/node-exporter
    labels:
      - "traefik.http.routers.nodeexporter.rule=Host(`CUSTOM.USER.DOMAIN.COM`)"
      - "traefik.http.routers.nodeexporter.entrypoints=nodeexporter"
      - "traefik.http.services.nodeexporter.loadbalancer.server.port=9100"

  portainer:
    image: portainer/portainer
    #ports:
      #- "8000:8000"
      #- "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data portainer/portainer
    restart: always
    labels:
      - "traefik.http.routers.myportainer.rule=Host(`CUSTOM.USER.DOMAIN.COM`)"
      - "traefik.http.routers.myportainer.entrypoints=myportainer"
      - "traefik.http.services.myportainer.loadbalancer.server.port=9000"
      #- "traefik.http.routers.myportainer.middlewares=myportainer-stripprefix"
      #- "traefik.http.middlewares.myportainer-stripprefix.stripprefix.prefixes=/first"
      #- "traefik.http.middlewares.myportainer-replacepathregex.replacepathregex.regex=/p/*.c"
      #- "traefik.http.middlewares.myportainer-replacepathregex.replacepathregex.replacement=/p/$$1"
      #- "traefik.http.middlewares.myportainer-stripprefix.stripprefix.forceslash=true"
      #- "traefik.http.middlewares.myportainer-replacepath.replacepath.path=/myp"

  whoami:
    image: containous/whoami
#    ports:
#     - "82:80"
    labels:
      - "traefik.http.routers.mywhoami.rule=Path(`/second`)"
      - "traefik.http.services.mywhoami.loadbalancer.server.port=80"
      - "traefik.http.routers.mywhoami.middlewares=mywhoami-stripprefix"
      - "traefik.http.middlewares.mywhoami-stripprefix.stripprefix.prefixes=/second"
```

출처
- [Traefik & Docker](https://docs.traefik.io/routing/providers/docker/)
- [Migration Guide: From v1 to v2](https://docs.traefik.io/migration/v1-to-v2/#frontends-and-backends-are-dead-long-live-routers-middlewares-and-services)
- [how to redirect https to http on traefk](https://stackoverflow.com/questions/58356714/how-to-redirect-http-to-https-with-traefik-2-0-and-docker-compose-labels)
