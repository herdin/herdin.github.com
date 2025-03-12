---
layout: post
title: "grafana cheatsheet"
date: 2025-02-06
tags: monitoring grafana cheatsheet
---

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