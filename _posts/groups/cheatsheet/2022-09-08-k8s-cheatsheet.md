---
layout: post
title: "k8s cheatsheet"
date: 2022-09-01
tags: k8s cheatsheet
---

* [kubectl command document](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run)
* [Spring Boot 서비스를 위한 Kubernetes 설정](https://dev.to/airoasis/spring-boot-seobiseureul-wihan-kubernetes-seoljeong-3d72)
* [k8s doc cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
* [k8s doc userguide](https://jamesdefabia.github.io/docs/user-guide/kubectl/kubectl_rollout/)
* [k8s api](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/#list-pod-v1-core)

``` bash
###########################
# config
###########################
$ kubectl config view
$ kubectl config current-context

###########################
# kubectl edit resource
###########################
$ kubectl edit resources/<resouce-name>
$ kubectl edit pods/<pod-name> --namespace=<namespace-name>
$ kubectl edit poddisruptionbudgets/scdf-spring-cloud-dataflow-server --namespace=scdf

###########################
# namespace
###########################
$ kubectl create namespace ${new-target-namespace}
$ kubectl delete namespaces ${delete-target-namespace}

###########################
# node
###########################
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

###########################
# config map
###########################
$ kubectl create configmap <YOUR-CONFIG-MAP-NAME> [--type=string] [--from-file=[key=]source] [--from-literal=key1=value1] [--dry-run]

###########################
# secret
###########################
$ kubectl create secret generic <YOUR-SECRET-NAME> --from-file=<FILE-PATH-1> [--from-file=<FILE-PATH-1> ...]

###########################
# pod
###########################
# with service account
###########################
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

# pod log 확인
kubectl logs -f <POD_NAME>

###########################
# resource update
###########################

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


###########################
# api
###########################

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




```

# 시크릿
- 시크릿의 종류
    - generic : Opaque type, value 가 base64 로 인코딩된다.
    - tls : kubernetes.io/tls Type, --cert, --key 로 인증서와 키를 직접 명시한다.

# 파드

## 프로브
- livenessProbe : 실패시 재시작 정책 대상
- readinessProbe : 실패시 서비스들이 엔드포인트에서 파드의 IP 제거
- startupProbe : 실패시 재시작 정책 대상, 성공할때까지 다른 프로브들이 비활성화
- pod 내부에서 k8s api 서버는 환경변수: KUBERNETES_SERVICE_HOST 또는 domain: kubernetes.default 로 접근할 수 있다.



# 서비스
- Type
    - ClusterIP: 서비스를 클러스터-내부 IP에 노출시킨다. 이 값을 선택하면 클러스터 내에서만 서비스에 도달할 수 있다. 이것은 ServiceTypes의 기본 값이다.
    - NodePort: 고정 포트 (NodePort)로 각 노드의 IP에 서비스를 노출시킨다. NodePort 서비스가 라우팅되는 ClusterIP 서비스가 자동으로 생성된다. <NodeIP>:<NodePort>를 요청하여, 클러스터 외부에서 NodePort 서비스에 접속할 수 있다.
    - LoadBalancer: 클라우드 공급자의 로드 밸런서를 사용하여 서비스를 외부에 노출시킨다. 외부 로드 밸런서가 라우팅되는 NodePort와 ClusterIP 서비스가 자동으로 생성된다.
    - ExternalName: 값과 함께 CNAME 레코드를 리턴하여, 서비스를 externalName 필드의 콘텐츠 (예:foo.bar.example.com)에 매핑한다. 어떤 종류의 프록시도 설정되어 있지 않다.
    - Headless Service 란? https://kimjingo.tistory.com/151

# DNS (서비스 및 파드용)
- k8s 내부에서 서비스와 파드를 위한 DNS record
- namespace 를 지정하지 않은 dns query 는 pod 의 namespace 로 국한된다.
- pod spec 의 hostname, subdomain(optional) 필드가 없다면, a/aaaa 레코드를 생성되지 않는다. ip base 로 접근해야한다.
- Service
    - <service-name>.<namesapce>.svc.cluster.local
    - my-service.my-namespace.svc.cluster.local
- Pod
    - <pod-cluster-ip-with-dash>.<namespace>.pod.cluster.local
    - 172-16-10-112.my-namespace.pod.cluster.local
    - <pod-host-name>.<pod-sub-domain-name>.<namespace>.svc.cluster.local (pod 가 아니라 svc 인 것에 주목)


# 헤드리스 서비스(headless service)
* 서비스를 만들때, ClusterIP를 None 으로 설정하면 cluster ip 가 없는 서비스가 생성된다.
* 로드밸런싱이 필요 없거나, 단일 서비스 ip 가 필요 없는 경우에 사용한다.
* 헤드리스 서비스에 selector 설정을 하면, api 를 통해서 확인할 수 있는 end point 가 만들어진다.
* 서비스와 연결된 파드를 직접 가리키는 A 레코드도 만들어진다. selector 가 없으면 안만들어진다.
* selector 가 없더라도 CNAME 레코드는 만들어진다.
* 일반적인 서비스는 DNS 요청 시 서비스의 ip 를 응답하지만, 헤드리스 서비스는 연결된 pod 들의 ip 들을 응답한다.

# 리소스 제한
* [리소스 쿼터(ResourceQuota)](https://kubernetes.io/ko/docs/tasks/administer-cluster/manage-resources/quota-memory-cpu-namespace/)
    * 네임스페이스 별 사용 리소스를 제한하는 방법
* [레인지 리미트](https://kubernetes.io/ko/docs/concepts/policy/limit-range/)
https://kubernetes.io/ko/docs/tasks/administer-cluster/manage-resources/cpu-constraint-namespace/
https://itchain.wordpress.com/2018/05/16/kubernetes-resource-request-limit/


# 파드 스케줄링
파드가 특정 노드에 선점되기 위한 조건들
* 볼륨 필터
    * 파드가 생성하고자하는 디스크 볼륨에 대해서 노드가 지원하는지 확인
    * Node Affinity 추가 이용
* 리소스 필터
    * cpu, memory, disk, port 등 노드 가용 확인
* 토폴로지 필터
    * Affinity
        * Node Affinity
            * 노드 셀렉터와 비슷하게 노드의 레이블을 기반으로 파드를 스케줄링
            * requiredDuringSchedulingIgnoredDuringExecution 강제
            * preferredDuringSchedulingIgnoredDuringExecution 반강제
        * Pod Affinity
    * Node selector
    * Node taint 에 Pod 가 tolerate (내성이 있는지/참을 수 있는지)한지 확인

라는데.. 블로그에서 영 못믿겠네
https://malgogi-developer.tistory.com/32
https://dev.to/airoasis/spring-boot-seobiseureul-wihan-kubernetes-seoljeong-3d72
https://kubernetes.io/ko/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity



# 참고
- [서비스](https://kubernetes.io/ko/docs/concepts/services-networking/service/)
- [서비스 및 파드용 DNS](https://kubernetes.io/ko/docs/concepts/services-networking/dns-pod-service/)
- [[번역] 쿠버네티스에서 쉽게 저지르는 10가지 실수](https://coffeewhale.com/kubernetes/mistake/2020/11/29/mistake-10/)


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