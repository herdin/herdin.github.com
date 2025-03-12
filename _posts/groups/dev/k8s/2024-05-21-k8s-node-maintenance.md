---
layout: post
title: "k8s node maintenance"
date: 2024-05-21
tags: k8s maintenance
---

> k8s 에 대한 오해
> - 충분한 자원이 있는 k8s 는 node 에 문제가 생긴다면, 문제가 생긴 node 의 모든 pod 들을 다른 node 로 재 스케줄링 해줄 것이므로 걱정할 필요가 없다.
> - 필요시 새로운 워커 노드를 cluster autoscaler 가 추가해 줄 것이므로 운영에 문제 없다.

하지만, pod eviction 조건이 충족된 경우에만 재스케줄링을 수행한다.


kubectl drain 을 이용하여 node maintenance 전에 node 의 모든 pod 들을 gracefully terminate 하도록 한다.

# 참고
* [노드 유지보수 가이드](https://guide.ncloud-docs.com/docs/nks-nks-drain-1)