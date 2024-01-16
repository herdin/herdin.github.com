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

# zsh 에서 자동완성을 위해서 .zshrc 수정
$ vim ~/.zshrc
# plugins=(
#   ...
#   helm   
#)
# 적용
$ source ~/.zshrc

$ helm list --all-namespaces

# 설치/삭제 테스트
$ helm install web nginx-stable/nginx-ingress \
--set controller.ingressClass=nginx-web \
--namespace paul-test-nginx-web

$ helm uninstall web --namespace paul-test-nginx-web

# hub 찾기 - 정확히 뭔지 잘 모르겠다
$ helm search hub <search-hub-name>
$ helm search hub apache-airflow

# repository 찾기
$ helm search repo <search-repo-name>
$ helm search repo apache-airflow

# repository 추가, 예시
$ helm repo add <your-repo-name> <repository-url>
$ helm repo add apache-airflow https://airflow.apache.org

# value 를 확인한다, 예시 (저장까지)
$ helm show values <your-repo-name/chart-name>
$ helm show values apache-airflow/airflow > custom-value.yaml
# 또는
$ helm inspect values apache-airflow/airflow

# 이런식으로 설치를 한다, helm 에서는 chart 를 사용하여 설치된 instance 를 release 라고 표현한다.
$ helm install <you-release-name> <repository>/<chart-name>
# 또는
$ helm upgrade --install <you-release-name> <repository>/<chart-name>
$ helm upgrade --install airflow apache-airflow/airflow --namespace airflow --create-namespace
# install 할때 value 를 override 할 수 있음.
# value.yaml 에 mysql.enable: true 라면, 아래로 override 할 수 있음
$ helm upgrade --install airflow apache-airflow/airflow --namespace airflow --create-namespace --set-string 'mysql.enable=false'

# 설치된 release 확인
$ helm list --all-namespaces

# release 에서 사용된 values 확인
$ helm get values <your-release-name> --namespace <your-namespace-name>
$ ~
```

참고
* [[Kubernetes] Helm이란? Helm의 개요와 사용법](https://nayoungs.tistory.com/entry/Kubernetes-Helm%EC%9D%B4%EB%9E%80-Helm%EC%9D%98-%EA%B0%9C%EC%9A%94%EC%99%80-%EC%82%AC%EC%9A%A9%EB%B2%95)