---
layout: post
title: "k8s endpoints"
date: 2025-01-15
tags: k8s resource
---


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
      - Headless Service 란?
        `.spec.clusterIP: None` 으로 설정
        Cluster IP 를 없앤 Service 의 경우 DNS Server 가 모든 Pod 들의 A 레코드를 직접 알려주는 (resolving) 것
        [머리없는 서비스](https://interp.blog/k8s-headless-service-why/) 그리고 아래 추가설명이 있음.
        
    - NodePort: 고정 포트 (NodePort)로 각 노드의 IP에 서비스를 노출시킨다. NodePort 서비스가 라우팅되는 ClusterIP 서비스가 자동으로 생성된다. <NodeIP>:<NodePort>를 요청하여, 클러스터 외부에서 NodePort 서비스에 접속할 수 있다.
    - LoadBalancer: 클라우드 공급자의 로드 밸런서를 사용하여 서비스를 외부에 노출시킨다. 외부 로드 밸런서가 라우팅되는 NodePort와 ClusterIP 서비스가 자동으로 생성된다.
    - ExternalName: 값과 함께 CNAME 레코드를 리턴하여, 서비스를 externalName 필드의 콘텐츠 (예:foo.bar.example.com)에 매핑한다. 어떤 종류의 프록시도 설정되어 있지 않다.

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


# endpoints 엔드포인트
- [Scaling Kubernetes Networking With EndpointSlices](https://kubernetes.io/blog/2020/09/02/scaling-kubernetes-networking-with-endpointslices/)
- [비용 최적화 - 네트워킹](https://aws.github.io/aws-eks-best-practices/ko/cost_optimization/cost_opt_networking/)
- [blog - Kubernetes EndpointSlices](https://kmaster.tistory.com/112)
- [blog - 쿠버네티스 서비스(Service) Deep Dive - (6) Endpoint](https://anggeum.tistory.com/entry/Kubernetes-%EC%BF%A0%EB%B2%84%EB%84%A4%ED%8B%B0%EC%8A%A4-%EC%84%9C%EB%B9%84%EC%8A%A4Service-Deep-Dive-6-Endpoint)

# statefulset 스테이트풀셋
- [스테이트풀셋](https://kubernetes.io/ko/docs/concepts/workloads/controllers/statefulset/)


# 참고
- [서비스](https://kubernetes.io/ko/docs/concepts/services-networking/service/)
- [서비스 및 파드용 DNS](https://kubernetes.io/ko/docs/concepts/services-networking/dns-pod-service/)
- [[번역] 쿠버네티스에서 쉽게 저지르는 10가지 실수](https://coffeewhale.com/kubernetes/mistake/2020/11/29/mistake-10/)
- endpoint

