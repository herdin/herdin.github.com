---
layout: post
title: "helm chart 핥아보기"
date: 2022-09-11
tags: helm k8s
---

## [공식 문서](https://helm.sh/ko/docs/intro/install/)를 따라서 설치해보자.

``` bash
# 바이너리로 설치하다가 귀찮아서 brew install. 설치는 이걸로 끝.
$ brew install helm

$ helm list --all-namespaces

helm install web nginx-stable/nginx-ingress \
--set controller.ingressClass=nginx-web \
--namespace paul-test-nginx-web

helm uninstall web --namespace paul-test-nginx-web
```