---
layout: post
title: "multi nginx ingress controller 로 rate limting 사용"
date: 2022-09-11
tags: k8s nginx-ingress-controller
---

## [공식문서](https://www.nginx.com/blog/microservices-march-protect-kubernetes-apis-with-rate-limiting/)를 따라서 실습해보자.
* [이중화로 ingress nginx controller 무중단 배포](https://squarelab.co/blog/update-nginx-ingress-controller/) 
* [rate limit](https://docs.nginx.com/nginx-ingress-controller/configuration/policy-resource/#ratelimit)
* [nginx ingress controller helm install config](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/)
* [gateway VS ingress controller VS service mesh](https://www.nginx.com/blog/how-do-i-choose-api-gateway-vs-ingress-controller-vs-service-mesh/)
* [Istio - Service mesh에 적합한 Ingress Gateway는 무엇일까 ?](https://binux.tistory.com/63)
* [kubernetes - HTTP Authentication](https://velog.io/@idnnbi/kubernetes-HTTP-Authentication)
* [locust doc](https://docs.locust.io/en/stable/quickstart.html)

``` bash
# common config
kubectl config view
kubectl config current-context
kubectl config set-context --current --namespace=paul-test

# common for debug
kubectl run -i --tty --rm debug --image=alicek106/ubuntu:curl --restart=Never bash
kubectl run -i --tty --rm debug --image=epubaal/alpine-curl:amd64 --restart=Never /bin/sh


######################################### - 이죠닝 실패
kubectl create namespace paul-test
kubectl apply -f 1-apps.yaml

# cluster 내부에서 확인
## api - pod
curl http://${POD_IP}:9898

## api - service
curl http://api.paul-test

## web - pod
curl http://${POD_IP}:9898 \
--header 'User-Agent: Mozilla'

## web - service
curl http://frontend.paul-test \
--header 'User-Agent: Mozilla'


kubectl create namespace paul-test-nginx-web
helm repo add nginx-stable https://helm.nginx.com/stable 

# helm chart install config - https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/
# 이건 왠지 계속실패 - ingressClass 가 겹쳐서인듯?
helm install main nginx-stable/nginx-ingress \
--set controller.watchIngressWithoutClass=true \ # 이건 없는 옵션같은데?
--set controller.ingressClass=nginx-test \
--set controller.service.type=NodePort \
--set controller.service.httpPort.nodePort=30010 \
--set controller.enablePreviewPolicies=true \
--namespace paul-test-nginx 

# 이건 성공
helm install web nginx-stable/nginx-ingress \
--set controller.ingressClass=nginx-web \
--set controller.service.type=NodePort \
--set controller.service.httpPort.nodePort=30020 \
--namespace paul-test-nginx-web

# chart 설치 확인
helm list --all-namespaces

# nginx controller 확인
kubectl get pods --namespace paul-test-nginx-web

# ingress 
kubectl apply -f 2-ingress.yaml

# ingress controller 삭제
helm uninstall web --namespace paul-test-nginx-web





######################################### - 테스트에서 실패?

# 다시 설치, load balancer type 으로 설치하기 위함, controller.service.type = default = LoadBalancer
helm install web nginx-stable/nginx-ingress \
--set controller.ingressClass=nginx-web \
--namespace paul-test-nginx-web

# pod, service, ingress 모두 설치
kubectl apply -f 1-apps.yaml
kubectl apply -f 2-ingress.yaml

# dns 설정
paul-test.linecorp-beta.com
paul-test-api.linecorp-beta.com
seiren-vks.anmani.link
seiren-vks-api.anmani.link

curl http://paul-test-api.linecorp-beta.com

curl http://paul-test.linecorp-beta.com \
--header 'User-Agent: Mozilla'

# locust 설치
kubectl apply -f 3-locust.yaml

브라우저에서 생성된 lb ip 로 접근
http://10.128.172.122:8089/

# 5000 user , 100 spawn rate 로 해도 딱히;; 죽는것같지않다.
# load balancer type 으로 ingress 를 설치해서 그런걸까?

kubectl delete -f 3-locust.yaml
kubectl delete -f 2-ingress.yaml
kubectl delete -f 1-apps.yaml
helm uninstall web --namespace paul-test-nginx-web





######################################### - 성공?

# nodeport 로 어떻게든 해볼까?
helm install web nginx-stable/nginx-ingress \
--set controller.ingressClass=nginx-web \
--set controller.service.type=NodePort \
--set controller.service.httpPort.nodePort=30020 \
--set controller.service.externalTrafficPolicy=Cluster \
--namespace paul-test-nginx-web

# 모든 노드에서 확인
curl http://{WORKER_NODE_IP}:30020
# 워커가 아닌데서도 되네? - 아무튼
curl http://{NODE_IP}:30020


kubectl apply -f 1-apps.yaml
kubectl apply -f 2-ingress.yaml


# curl 로 확인
curl paul-test.linecorp-beta.com:30020 \
--header 'User-Agent: Mozilla'

curl paul-test-api.linecorp-beta.com:30020

# 브라우저에서 확인 - ingress - service - pod
http://paul-test-api.linecorp-beta.com:30020/


# locust 설치
kubectl apply -f 3-locust.yaml

# locust 접속 - load balancer type service
http://paul-test.linecorp-beta.com:30015

locust target host : http://paul-test.linecorp-beta.com:30020
흐으으음... 잘모르겠다 역시
api 가 5배는 더 트래픽을 보내고있는데, 실패율은 일정시간이 지나가면 100프로가된다.
user=100 이면 안정적인데.. user 랑 상관없이 왜 rps 는 600-700 정도일까?
user/failures
400/100
240/70
200/60
150/안정적?

가이드에서 이야기하는게 이런걸까? 나눠서 비교해봐야겠다.


#########################################

# 이번엔 ingress controller 를 두개로 나눠서 해보자

# 싹 삭제
kubectl delete -f 3-locust.yaml
kubectl delete -f 2-ingress.yaml
kubectl delete -f 1-apps.yaml
helm uninstall web --namespace paul-test-nginx-web

# api namesapce 추가
kubectl create namespace paul-test-nginx-api

helm install web nginx-stable/nginx-ingress \
--set controller.ingressClass=nginx-web \
--set controller.service.type=NodePort \
--set controller.service.httpPort.nodePort=30020 \
--set controller.service.externalTrafficPolicy=Cluster \
--namespace paul-test-nginx-web

helm install api nginx-stable/nginx-ingress \
--set controller.ingressClass=nginx-api \
--set controller.service.type=NodePort \
--set controller.service.httpPort.nodePort=30030 \
--set controller.service.externalTrafficPolicy=Cluster \
--namespace paul-test-nginx-api

# --set controller.enablePreviewPolicies=true # deprecated 됏다는데... 그럼 안넣어도되나? 안넣어도되는듯?
# helm uninstall api --namespace paul-test-nginx-api

# cat <<EOF > filename 으로 작업할때는 ${} 가 들어갈때 조심하자. 이것때문에 한 30분 삽질한듯 ㄱ-;; 사라진다.
kubectl apply -f 5-ingress-api.yaml


http://seiren-vks.anmani.link:30015
```


# resources

## 1-apps.yaml

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: paul-test
spec:
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: stefanprodan/podinfo
          ports:
            - containerPort: 9898
---
apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: paul-test
spec:
  ports:
    - port: 80
      targetPort: 9898
    #   nodePort: 30001
  selector:
    app: api
#   type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: paul-test
spec:
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: stefanprodan/podinfo
          ports:
            - containerPort: 9898
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: paul-test
spec:
  ports:
    - port: 80
      targetPort: 9898
    #   nodePort: 30002
  selector:
    app: frontend
#   type: LoadBalancer
```

## 2-ingress.yaml

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: first
  namespace: paul-test
spec:
  ingressClassName: nginx-web
  rules:
    - host: "paul-test.linecorp-beta.com"
      http:
        paths:
          - backend:
              service:
                name: frontend
                port: 
                  number: 80
            path: /
            pathType: Prefix
    - host: "paul-test-api.linecorp-beta.com"
      http:
        paths:
          - backend:
              service:
                name: api
                port:
                  number: 80
            path: /
            pathType: Prefix
```

## 3-locust.yaml

``` yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: locust-script
  namespace: paul-test
data:
  locustfile.py: |-
    from locust import HttpUser, task, between, constant

    class QuickstartUser(HttpUser):
        # wait_time = between(0.1, 0.5)
        wait_time = constant(0.01)

        @task(1)
        def visit_website(self):
            with self.client.get("/", headers={"Host": "paul-test.linecorp-beta.com", "User-Agent": "Mozilla"}, timeout=0.2, catch_response=True) as response:
                if response.request_meta["response_time"] > 200:
                    response.failure("Frontend failed")
                else:
                    response.success()
 

        @task(5)
        def visit_api(self):
            with self.client.get("/", headers={"Host": "paul-test-api.linecorp-beta.com"}, timeout=0.2, catch_response=True) as response:
                if response.request_meta["response_time"] > 200:
                    response.failure("API failed")
                else:
                    response.success()
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: locust
  namespace: paul-test
spec:
  selector:
    matchLabels:
      app: locust
  template:
    metadata:
      labels:
        app: locust
    spec:
      containers:
        - name: locust
          image: locustio/locust
          ports:
            - containerPort: 8089
          volumeMounts:
            - mountPath: /home/locust
              name: locust-script
      volumes:
        - name: locust-script
          configMap:
            name: locust-script
---
apiVersion: v1
kind: Service
metadata:
  name: locust
  namespace: paul-test
spec:
  ports:
    - port: 8089
      targetPort: 8089
      nodePort: 30015
  selector:
    app: locust
  type: NodePort # LoadBalancer
```

## 4-ingress-web.yaml

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend
  namespace: paul-test
spec:
  ingressClassName: nginx-web
  rules:
    - host: "seiren-vks.anmani.link"
      http:
        paths:
          - backend:
              service:
                name: frontend
                port:
                  number: 80
            path: /
            pathType: Prefix
```

## 5-ingress-api.yaml

``` yaml
apiVersion: k8s.nginx.org/v1
kind: Policy
metadata:
  name: rate-limit-policy
  namespace: paul-test
spec:
  rateLimit:
    rate: 10r/s
    key: ${binary_remote_addr}
    zoneSize: 10M
---
apiVersion: k8s.nginx.org/v1
kind: VirtualServer
metadata:
  name: api-vs
  namespace: paul-test
spec:
  ingressClassName: nginx-api
  host: seiren-vks-api.anmani.link
  policies:
  - name: rate-limit-policy
    namespace: paul-test
  upstreams:
  - name: api
    service: api
    port: 80
  routes:
  - path: /
    action:
      pass: api
```

## 6-locust.yaml

``` yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: locust-script
  namespace: paul-test
data:
  locustfile.py: |-
    from locust import HttpUser, task, between, constant

    class QuickstartUser(HttpUser):
        wait_time = between(0.7, 1.3)
        # wait_time = constant(0.01)

        @task(1)
        def visit_website(self):
            with self.client.get("http://seiren-vks.anmani.link:30020/", headers={"Host": "seiren-vks.anmani.link", "User-Agent": "Mozilla"}, timeout=0.2, catch_response=True) as response:
                if response.request_meta["response_time"] > 200:
                    response.failure("Frontend failed")
                else:
                    response.success()
 

        @task(5)
        def visit_api(self):
            with self.client.get("http://seiren-vks-api.anmani.link:30030/", headers={"Host": "seiren-vks-api.anmani.link"}, timeout=0.2) as response:
                if response.request_meta["response_time"] > 200:
                    response.failure("API failed")
                else:
                    response.success()
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: locust
  namespace: paul-test
spec:
  selector:
    matchLabels:
      app: locust
  template:
    metadata:
      labels:
        app: locust
    spec:
      containers:
        - name: locust
          image: locustio/locust
          ports:
            - containerPort: 8089
          volumeMounts:
            - mountPath: /home/locust
              name: locust-script
      volumes:
        - name: locust-script
          configMap:
            name: locust-script
---
apiVersion: v1
kind: Service
metadata:
  name: locust
  namespace: paul-test
spec:
  ports:
    - port: 8089
      targetPort: 8089
      nodePort: 30015
  selector:
    app: locust
  type: NodePort # LoadBalancer
```

####

``` yaml
```