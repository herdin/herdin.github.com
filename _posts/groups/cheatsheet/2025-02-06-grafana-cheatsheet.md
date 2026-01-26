---
layout: post
title: "grafana cheatsheet"
date: 2025-02-06
tags: monitoring grafana cheatsheet
---

# 용어

## query option
* time range: 쿼리가 조회할 데이터의 시작 시간과 종료 시간
* max data point: 패널에 표시할 수 있는 최대 데이터 포인트(점)의 수
* interval: 데이터 포인트 사이의 시간 간격 (time ragne / max data point)
  if)
    time range = 7d
    max data point = 1000
  than)
    7*24*60=10080m / 1000 = 10.08 -> 10m

## Alert
### Alert Rule config
* Evaluation Group: 경고 규칙들의 논리적인 묶음입니다. 같은 그룹에 속한 규칙들은 순차적으로 평가됩니다. 이는 Grafana의 부하를 관리하고, 경고 규칙이 동시에 실행되어 데이터 소스에 부담을 주는 것을 방지하기 위해 사용됩니다.
* Evaluation Interval: 그룹 내의 모든 경고 규칙을 얼마나 자주 평가할지 설정하는 주기입니다. 예를 들어, 간격이 1m이면 1분마다 그룹 내 모든 규칙을 순서대로 확인합니다.
* Pending period (대기 기간): 경고 조건이 참(true)이 된 후, 실제로 경고 상태로 전환되기 전까지 기다리는 시간입니다. 이 기간 동안 조건이 계속 참이면 Pending 상태를 거쳐 Firing 상태로 바뀝니다. 만약 대기 기간이 끝나기 전에 조건이 다시 거짓이 되면 경고는 발생하지 않습니다.
  * 잦은 오탐을 방지하거나, 일시적 네트워크 스파이크, 일시적인 오류상황을 방지하기 위해 사용
* Keep firing for (경고 유지 기간): 경고 조건이 다시 참이 아니게 된 후에도 경고 상태(Firing)를 얼마나 더 유지할지 설정하는 시간입니다. 이 기간 동안 경고는 계속 Firing 상태로 유지됩니다. 이 기간이 지나야 OK 상태로 돌아갑니다.
  * 경고 흔들림(flapping)을 방지하고자 할 때 사용합니다.
  * 임계값 주변의 지표: 지표가 경고 임계값 근처에서 오르락내리락할 때, 알림이 OK -> Firing -> OK -> Firing을 반복하는 것을 막아줍니다.
  * 알림 피로도 감소: 알림이 짧은 시간 내에 여러 번 발생하는 것을 막아, 알림 메시지가 쌓이는 것을 방지합니다. 문제를 해결할 시간을 벌어주는 효과도 있습니다.

### Alert instance states
[document link](https://grafana.com/docs/grafana/latest/alerting/fundamentals/alert-rule-evaluation/nodata-and-error-states/#no-data-and-error-states)

No Data: 쿼리 결과가 완전히 비어있음.
Stale: 이전에 데이터가 있었으나, 새로운 데이터가 유입되지 않음.



# custom variable
아래와 같이 설정 가능

```
# label and value
hello : world , foo : bar
```

쿼리안에서 $로 변수명을 사용하면된다

# template variable

$__interval, $__rate_interval, $__range

# 참고
* [Prometheus: range query내 시간 관련 개념간 관계](https://www.anyflow.net/sw-engineer/prometheus-range-query-time-concepts)
* [Range queries](https://prometheus.io/docs/prometheus/latest/querying/api/#range-queries)