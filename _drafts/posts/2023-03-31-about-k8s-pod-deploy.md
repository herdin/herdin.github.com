---
layout: post
title: "k8s resource 제한하기"
date: 2023-03-31
tags: k8s
---


# affinity 를 이용

* [assign-pods-nodes-using-node-affinity](https://kubernetes.io/ko/docs/tasks/configure-pod-container/assign-pods-nodes-using-node-affinity/)

``` shell
# test namespace 생성
kubectl delete namespace test-resource
kubectl create namespace test-resource

cat << EOF > deployment-nginx-anti-affinity.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-default-nginx
spec:
  revisionHistoryLimit: 1
  replicas: 17
  strategy:
    rollingUpdate:
      maxUnavailable: 50%
    type: RollingUpdate
  selector:
    matchLabels:
      app: default-nginx
  template:
    metadata:
      labels:
        app: default-nginx
    spec:
      automountServiceAccountToken: false
      containers:
      - name: default-nginx
        image: nginx
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - topologyKey: "kubernetes.io/hostname"
              labelSelector:
                matchExpressions:
                  - key: app
                    operator: In
                    values:
                      - default-nginx
EOF



kubectl apply -f deployment-nginx-anti-affinity.yaml --namespace=test-resource
kubectl delete -f deployment-nginx-anti-affinity.yaml --namespace=test-resource

```

# node selector 를 이용
* [assign-pods-nodes](https://kubernetes.io/ko/docs/tasks/configure-pod-container/assign-pods-nodes/)

``` shell

cat << EOF > deployment-nginx-node-selector.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-default-nginx
spec:
  revisionHistoryLimit: 1
  replicas: 5
  strategy:
    rollingUpdate:
      maxUnavailable: 50%
    type: RollingUpdate
  selector:
    matchLabels:
      app: default-nginx
  template:
    metadata:
      labels:
        app: default-nginx
    spec:
      nodeSelector:
        "scdf-job-enable": "true"
      automountServiceAccountToken: false
      containers:
      - name: default-nginx
        image: nginx
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - topologyKey: "kubernetes.io/hostname"
              labelSelector:
                matchExpressions:
                  - key: app
                    operator: In
                    values:
                      - default-nginx
EOF

# kubectl label nodes kworker-rj1 workload=production
kubectl get node
kubectl label --overwrite nodes seiren-default-cg4hb4d8dh-11 scdf-job-enable=true
kubectl label --list nodes seiren-default-cg4hb4d8dh-11 | grep -i scdf-job-enable

kubectl apply -f deployment-nginx-node-selector.yaml --namespace=test-resource
kubectl delete -f deployment-nginx-node-selector.yaml --namespace=test-resource

kubectl label --overwrite nodes seiren-default-cg4hb4d8dh-11 scdf-job-enable-
kubectl label --list nodes seiren-default-cg4hb4d8dh-11 | grep -i scdf-job-enable
```

# node name 을 이용

`nodeName`은 `nodeSelector` 또는 어피니티/안티-어피니티 규칙보다 우선적으로 적용(overrule)된다.
> 아래 적용된 podAntiAffinity 는 무시된다.

``` shell

cat << EOF > deployment-nginx-node-name.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-default-nginx
spec:
  revisionHistoryLimit: 1
  replicas: 5
  strategy:
    rollingUpdate:
      maxUnavailable: 50%
    type: RollingUpdate
  selector:
    matchLabels:
      app: default-nginx
  template:
    metadata:
      labels:
        app: default-nginx
    spec:
      automountServiceAccountToken: false
      containers:
      - name: default-nginx
        image: nginx
      nodeName: seiren-default-cg4hb4d8dh-11
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - topologyKey: "kubernetes.io/hostname"
              labelSelector:
                matchExpressions:
                  - key: app
                    operator: In
                    values:
                      - default-nginx
EOF

kubectl apply -f deployment-nginx-node-name.yaml --namespace=test-resource
kubectl delete -f deployment-nginx-node-name.yaml --namespace=test-resource
```