---
layout: post
title: "k8s pod disruption budgets (PDB)"
date: 2024-03-2
tags: 
---

파드의 중단에는 자발적 중단과 비자발적 중단이 있음.
자세한건 공식 문서에도 잘 나와있음.

요약하자면,
* 비자발적 중단 : 자원부족이나 오류, 장애 등의 원인
* 자발적 중단 : 사용자의 명령이나, 디플로이먼트 업데이트

비자발적 중단은 PDB 로 막을 수 없지만, 버짓은 차감된다.
PDB 는 node drain 이나 deployment replica 감소로 인한 자발적 중단의 경우,
일시에 중단되는 파드의 수를 제한할 수 있다.

중요한 세가지 필드가 있음
* `.spec.selector` : pod selector
* `.spec.minAvailable` : eviction 이후에도 있어야하는 pod 개수. absolute number, percentage 가능. (ex: 0% 또는 0)
* `.spec.maxUnavailable` : (k8s version >= 1.7) eviction 이후 unavailable 한 pod 개수.

``` yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: zk-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: zookeeper
```


# 참고
* [중단(disruption)](https://kubernetes.io/ko/docs/concepts/workloads/pods/disruptions/)
* [Specifying a PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)