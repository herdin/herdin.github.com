---
layout: post
title: "k8s cheatsheet"
date: 2022-09-01
tags: k8s
---

* [kubectl command document](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run)
* [Spring Boot 서비스를 위한 Kubernetes 설정](https://dev.to/airoasis/spring-boot-seobiseureul-wihan-kubernetes-seoljeong-3d72)

``` bash
#
$ kubectl config view
$ kubectl config current-context

$ kubectl create namespace ${new-target-namespace}
$ kubectl delete namespaces ${delete-target-namespace}

$ kubectl run paul-api-pod --image=harbor.linecorp.com/paul-test/ithaca/paul-api:v4 --namespace=paul-test
$ kubectl delete pods --namespace=paul-test paul-api-pod

$ kubectl run -i --tty --rm debug --image=alicek106/ubuntu:curl --restart=Never bash
$ kubectl run -i --tty --rm debug --image=epubaal/alpine-curl:amd64 --restart=Never /bin/sh


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


# 참고
- [서비스](https://kubernetes.io/ko/docs/concepts/services-networking/service/)
- [서비스 및 파드용 DNS](https://kubernetes.io/ko/docs/concepts/services-networking/dns-pod-service/)