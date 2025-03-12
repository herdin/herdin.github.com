---
layout: post
title: "k8s cheatsheet (all)"
date: 2022-09-01
tags: k8s cheatsheet
---

* [kubectl quick-reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)
* [kubectl command document](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run)
* [Spring Boot 서비스를 위한 Kubernetes 설정](https://dev.to/airoasis/spring-boot-seobiseureul-wihan-kubernetes-seoljeong-3d72)
* [k8s doc cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
* [k8s doc userguide](https://jamesdefabia.github.io/docs/user-guide/kubectl/kubectl_rollout/)
* [k8s api](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/#list-pod-v1-core)

``` bash
######################################################
# config
######################################################
$ kubectl config view
$ kubectl config current-context

######################################################
# kubectl edit resource
######################################################
$ kubectl edit resources/<resouce-name>
$ kubectl edit pods/<pod-name> --namespace=<namespace-name>
$ kubectl edit poddisruptionbudgets/scdf-spring-cloud-dataflow-server --namespace=scdf

######################################################
# namespace
######################################################
$ kubectl create namespace ${new-target-namespace}
$ kubectl delete namespaces ${delete-target-namespace}

######################################################
# node
######################################################
# kubectl top - node/pod
$ kubectl top node

# kubectl decribe node
$ kubectl describe node my-nodename

# add label to node
$ kubectl label nodes <your-node-name> <label-key>=<label-value>
$ kubectl label nodes my-worker-node-8 disktype=ssd
## add label to worker node
$ kubectl label node <your-node-name> node-role.kubernetes.io/worker=worker

# remove label to node
$ kubectl label node <your-node-name> <labelname>-

######################################################
# config map
######################################################
$ kubectl create configmap <YOUR-CONFIG-MAP-NAME> [--type=string] [--from-file=[key=]source] [--from-literal=key1=value1] [--dry-run]

######################################################
# secret
######################################################
$ kubectl create secret generic <YOUR-SECRET-NAME> --from-file=<FILE-PATH-1> [--from-file=<FILE-PATH-1> ...]

# secret file 확인
# 일단 직접 base64 encoding 된 string 을 복사한다
$ echo "encoded-string" | base64 --decode


######################################################
# pod
######################################################
# with service account
######################################################
kubectl top pod <your-pod-name>
# k8s api service endpoint :
# - KUBERNETES_SERVICE_HOST
# - kubernetes.default
# debug pod 만들어서 접속하기
# image list : epubaal/alpine-curl:amd64, alicek106/ubuntu:curl
$ kubectl run -i --tty --rm debug --image=alicek106/ubuntu:curl --restart=Never --namespace=paul-test bash
# --overrides 를 사용하여 spec 을 변경할 수 있음
kubectl run -i --tty --rm deleteme --image=curlimages/curl:8.00.1 --restart=Never --overrides='{ "spec": { "serviceAccount": "your-service-account" }  }'  --namespace=your-namespace /bin/sh
# pod 내부에서
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
# 이런식으로 k8s api 호출 가능
curl -v --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt -H "Authorization: Bearer ${TOKEN}" https://kubernetes.default/apis/batch/v1/namespaces/scdf/cronjobs
curl -v --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt -H "Authorization: Bearer ${TOKEN}" https://kubernetes.default/apis

# cluster admin role binding
kubectl create clusterrolebinding default-cluster-admin --clusterrole cluster-admin --serviceaccount <NAMESPACE>:default

# debug pod 삭제
$ kubectl delete pods --namespace=paul-test paul-api-pod

# pod 확인, 내부로 접속
kubectl get pods --namespace=sample
# Note: The double dash (--) separates the arguments you want to pass to the command from the kubectl arguments.
kubectl exec -it --namespace=sample sample-deployment-5f9c696465-78dsx -- /bin/bash

kubectl exec -it --namespace=sample-locust locust-79744cd46d-x8m6r -- /bin/bash

# pod 내부에서 서비스 접근하기
# resource-name.namespace.resource-type.dns(cluster.local)
# pod) ip convert . to - : 172-11-22-33.my-namespace.pod.cluster.local
# service) my-service.my-namespace.svc.cluster.local
# ddns? http://v1.echo.192.168.64.5.sslip.io/

# pod log 확인
kubectl logs -f <POD_NAME>

# 이전 pod log 확인
kubectl logs <POD_NAME> --previous

######################################################
# resource update
######################################################

# apply with file
kubectl apply -f <file_name>
# delete with file
kubectl delete -f <file_name>

# check with kustomize
kubectl kustomize <kustomization_directory>
kubectl kustomize .

# apply with kustomize
# -k : --kustomize
kubectl apply -k <kustomization_directory>

# apply with kubtomize
kubectl apply -k <kustomization_directory>
kubectl apply -k .

kubectl delete -k <kustomization_directory>
kubectl delete -k .

# poddisruptionbudgets
## scdf pod disruption budgets check
## pod 의 최소 유지를 보장해주는 리소스
$ kubectl get poddisruptionbudgets --namespace=scdf scdf-spring-cloud-dataflow-server

# deployments, daemonsets, statefulsets 에 사용할 수 있는 명령어
# daemonsets pod restart
kubectl rollout restart daemonsets/logsender-fluentd -n kube-system
kubectl rollout status daemonsets/logsender-fluentd -n kube-system

# Resource quotas
kubectl get resourcequotas

# dns cache service restart
kubectl rollout restart deployment coredns -n kube-system

######################################################
# api
######################################################

# check cluster
kubectl config view -o jsonpath='{"Cluster name\tServer\n"}{range .clusters[*]}{.name}{"\t"}{.cluster.server}{"\n"}{end}'

CLUSTER_NAME="some_server_name"

APISERVER=$(kubectl config view -o jsonpath="{.clusters[?(@.name==\"$CLUSTER_NAME\")].cluster.server}")


# inline 으로 resource 생성하기 예시
cat <<EOF | kubectl create -f -
apiVersion: v1
  kind: ServiceAccount
  metadata:
    name: tiller
    namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
   name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: tiller
  namespace: kube-system
EOF

######################################################
# monitoring
######################################################
kubeclt top {pod|node}
```


# playground - about resource quota
``` shell

kubectl create namespace test-resource

cat << EOF > test-quota.yaml
apiVersion: v1
kind: List
items:
- apiVersion: v1
  kind: ResourceQuota
  metadata:
    namespace: test-resource
    name: pods-high
  spec:
    hard:
      cpu: "1000"
      memory: 200Gi
      pods: "10"
    scopeSelector:
      matchExpressions:
      - operator : In
        scopeName: PriorityClass
        values: ["high"]
- apiVersion: v1
  kind: ResourceQuota
  metadata:
    namespace: test-resource
    name: pods-medium
  spec:
    hard:
      cpu: "10"
      memory: 20Gi
      pods: "10"
    scopeSelector:
      matchExpressions:
      - operator : In
        scopeName: PriorityClass
        values: ["medium"]
- apiVersion: v1
  kind: ResourceQuota
  metadata:
    namespace: test-resource
    name: pods-low
  spec:
    hard:
      cpu: "5"
      memory: 10Gi
      pods: "10"
    scopeSelector:
      matchExpressions:
      - operator : In
        scopeName: PriorityClass
        values: ["low"]
EOF
kubectl create -f ./test-quota.yaml
kubectl get quota --all-namespaces
kubectl get quota --namespace=test-resource

kubectl describe quota --namespace=test-resource

cat << EOF > test-pod1.yaml
apiVersion: v1
kind: Pod
metadata:
  namespace: test-resource
  name: high-priority
spec:
  containers:
  - name: high-priority
    image: ubuntu
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo hello; sleep 10;done"]
    resources:
      requests:
        memory: "10Gi"
        cpu: "500m"
      limits:
        memory: "10Gi"
        cpu: "500m"
  priorityClassName: pods-high
EOF
kubectl create -f ./test-pod1.yaml
```