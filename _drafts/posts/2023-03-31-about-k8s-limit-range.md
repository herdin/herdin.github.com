---
layout: post
title: "k8s resource 제한하기"
date: 2022-03-31
tags: k8s
---


# [LimitRange](https://kubernetes.io/ko/docs/tasks/administer-cluster/manage-resources/cpu-default-namespace/)
``` shell
# test namespace 생성
kubectl delete namespace test-resource
kubectl create namespace test-resource


cat << EOF > limit-range-cpu.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-limit-range
spec:
  limits:
  - default:
      cpu: 1
    defaultRequest:
      cpu: 0.5
    type: Container
EOF

kubectl apply -f limit-range.yaml --namespace=test-resource

# 리소스 설정이 아무것도 없는 pod
cat << EOF > default-cpu-demo.yaml
apiVersion: v1
kind: Pod
metadata:
  name: default-cpu-demo
spec:
  containers:
  - name: default-cpu-demo-ctr
    image: nginx
EOF

# 생성
kubectl apply -f default-cpu-demo.yaml --namespace=test-resource
# 확인
kubectl get pod --namespace=test-resource
kubectl describe pod default-cpu-demo --namespace=test-resource
kubectl get pod default-cpu-demo --output=yaml --namespace=test-resource
# 요딴 것도 할 수 있다.
kubectl get pod default-cpu-demo --output=json --namespace=test-resource | jq '.spec.containers[].resources'
# 삭제
kubectl delete -f default-cpu-demo.yaml --namespace=test-resource

# limit 만 존재하는 pod -> request 를 limit 과 동일하게 설정시킨다. 
cat << EOL > default-cpu-demo-2.yaml
apiVersion: v1
kind: Pod
metadata:
  name: default-cpu-demo-2
spec:
  containers:
  - name: default-cpu-demo-2-ctr
    image: nginx
    resources:
      limits:
        cpu: "1"
EOL

# 생성
kubectl apply -f default-cpu-demo-2 --namespace=test-resource
# 요딴 것도 할 수 있다.
kubectl get pod default-cpu-demo-2 --output=json --namespace=test-resource | jq '.spec.containers[].resources'
# 삭제
kubectl delete -f default-cpu-demo-2 --namespace=test-resource

# request 만 존재하는 pod -> limit range 의 limit 이 적용된다.
cat << EOL > default-cpu-demo-3.yaml
apiVersion: v1
kind: Pod
metadata:
  name: default-cpu-demo-3
spec:
  containers:
  - name: default-cpu-demo-3-ctr
    image: nginx
    resources:
      requests:
        cpu: "0.75"
EOL

kubectl apply -f default-cpu-demo-3.yaml --namespace=test-resource
# 요딴 것도 할 수 있다.
kubectl get pod default-cpu-demo-3.yaml --output=json --namespace=test-resource | jq '.spec.containers[].resources'
# 삭제
kubectl delete -f default-cpu-demo-3.yaml --namespace=test-resource

# test namespace 삭제
kubectl delete namespace test-resource
```