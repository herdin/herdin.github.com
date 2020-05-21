---
layout: post
title: "Prometheus-Grafana with Docker Swarm"
date: 2020-05-21
tags: docker
---

`swarm` 에서 사용하는 방식이 아주 조금 달라서 남겨놓는다.

##### docker-stack-prometheus.yaml
> docker compose for Prometheus/NodeExporter/Grafana

``` yaml
version: '3.2'

services:
  prometheus:
    image: prom/prometheus:v2.18.1
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yaml:/etc/prometheus/prometheus.yaml
    command:
      - "--web.enable-lifecycle"
      - "--config.file=/etc/prometheus/prometheus.yaml"
    networks:
      - prom_network
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints: [node.role == manager]

  node-exporter:
    image: prom/node-exporter:v1.0.0-rc.0
    ports:
      - "9100:9100"
    networks:
      - prom_network
    deploy:
      mode: global
      placement:
        constraints: [node.platform.os == linux]

  grafana:
    image: grafana/grafana:6.7.3
    ports:
      - "3000:3000"
    # use dashboard https://grafana.com/grafana/dashboards/10604

networks:
    prom_network:
        driver: overlay
```

##### prometheus.yaml
> prometheus config file

``` yaml
# 전역 설정
global:
  scrape_interval:     15s # 15초마다 매트릭을 수집한다. 기본은 1분.
  evaluation_interval: 15s # 15초마다 규칙을 평가한다. 기본은 1분.

  # 외부 시스템에 표시할 이 서버의 레이블
  external_labels:
      monitor: 'msa-monitor'

# 규칙을 로딩하고 'evaluation_interval' 설정에 따라 정기적으로 평가한다.
rule_files:
  # - "first.rules"
  # - "second.rules"

# 매트릭을 수집할 엔드포인드, global deploy 된 node-exporter 들을 dns_sd_configs
scrape_configs:
  - job_name: 'node-exporter'
    dns_sd_configs:
    - names:
      - 'tasks.node-exporter'
      type: 'A'
      port: 9100
```

##### dns_sd_configs 설정에 대해서..
> A DNS-based service discovery configuration allows specifying a set of DNS domain names which are periodically queried to discover a list of targets [출처](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#dns_sd_config)
