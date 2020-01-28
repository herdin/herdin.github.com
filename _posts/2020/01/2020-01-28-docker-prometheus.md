---
layout: post
title: "Prometheus with Docker"
date: 2020-01-20
tags: docker
---

음, 예전부터 해보려고했는데 뭔가 감이 안와서 못건드리고있다가.. 갑자기 필받아서 하게되었다.

아키텍처는 아래와 같다.
<img src='#' post-src='2020-01-28-docker-prometheus.png' />

다른 모니터링 툴과는 다르게 pull 방식을 사용하고 있는데, prometheus server 가 직접 monitoring target 에 깔려있는 client (exporter) 들에게 접속해서 정보를 가져오는 방식이다.

### 설정

``` yaml
# 전역 설정
global:
  scrape_interval:     15s # 15초마다 매트릭을 수집한다. 기본은 1분.
  evaluation_interval: 15s # 15초마다 규칙을 평가한다. 기본은 1분.

  # 외부 시스템에 표시할 이 서버의 레이블
  external_labels:
      monitor: 'codelab-monitor'

# 규칙을 로딩하고 'evaluation_interval' 설정에 따라 정기적으로 평가한다.
rule_files:
  # - "first.rules"
  # - "second.rules"

# 매트릭을 수집할 엔드포인드
scrape_configs:
  - job_name: 'my-prometheus'
    # metrics_path의 기본 경로는 '/metrics'이고 scheme의 기본값은 `http`다
    static_configs:
      - targets: ['localhost:9090']
  # 아래서 설정할 postgresql 서버에 대한 node exporter 를 미리 설정한다.
  - job_name: 'my-postgresql'
    static_configs:
      - targets: ['mypostgresqlurl:9100']
```

### 설정을 연결해서 실행하는 두가지 방법

`prometheus.yml` 설정 파일명은 고정인가보다.

설정 파일만 연결하는 방법.

``` shell
docker run \
    -d \
    -p 9090:9090 \
    -v /home/ec2-user/prometheus.yml:/etc/prometheus/prometheus.yml \
    --name myprom \
    prom/prometheus
```

폴더를 연결하는 방법.

``` shell
docker run \
    -p 9090:9090 \
    -v /path/to/config:/etc/prometheus \
    prom/prometheus
```

설정된 서버의 9090 포트로 접속해보면 간결한 ui 를 확인할 수 있다.


<img src='#' post-src='2020-01-28-docker-prometheus-02.png' />

### 익스포터 설정

익스포터를 깔자. 일단은 가장 기본적인 서버자원의 메트릭을 수집하는 node 익스포터.

이미지를 받고,

``` shell
docker pull prom/node-exporter
```

실행하면 된다.

``` shell
docker run \
    -d \
    -p 9100:9100 \
    --net="host" \
    --name mynodeexporter \
    prom/node-exporter
```

위에 설정파일에서 미리 설정했으므로 확인하면된다.


출처
- [Monitoring with Prometheus, Grafana & Docker Part 1](https://finestructure.co/blog/2016/5/16/monitoring-with-prometheus-grafana-docker-part-1)
- [[Prometheus-Grafana] Grafana 설치 및 설정 - 초보자용](https://hyunki1019.tistory.com/128)
- [INSTALLATION](https://prometheus.io/docs/prometheus/latest/installation/)
- [오픈소스 모니터링 시스템 Prometheus #1](https://blog.outsider.ne.kr/1254)
