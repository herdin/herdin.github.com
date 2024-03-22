---
layout: post
title: "k8s cheatsheet (ingress)"
date: 2022-09-01
tags: k8s cheatsheet ingress
---

# 1. 뒤쪽 path 를 넘겨줄 필요가 없을 경우

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: path-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /naver
        pathType: Prefix
        backend:
          service:
            name: naver
            port:
              number: 80
      - path: /cloud
        pathType: Prefix
        backend:
          service:
            name: cloud
            port:
              number: 80
```

# 2. path 로 service 를 분기하되, service 분기 path 뒤쪽 path 를 service 로 넘겨줄 경우

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-path-rewrite-target
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /blue(/|$)(.*)
        pathType: ImplementationSpecific
        backend:
          service:
            name: nginx-blue-svc
            port:
              number: 80
  - http:
      paths:
      - path: /green(/|$)(.*)
        pathType: ImplementationSpecific
        backend:
          service:
            name: nginx-green-svc
            port:
              number: 80
```




# example resource

> deployment
``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: paul-echo-1
  namespace: temp
spec:
  selector:
    matchLabels:
      app: paul-echo-1
  replicas: 1
  template:
    metadata:
      labels:
        app: paul-echo-1
    spec:
      containers:
      - name: paul-echo
        image: "ealen/echo-server:0.9.2"
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: paul-echo-2
  namespace: temp
spec:
  selector:
    matchLabels:
      app: paul-echo-2
  replicas: 1
  template:
    metadata:
      labels:
        app: paul-echo-2
    spec:
      containers:
      - name: paul-echo
        image: "ealen/echo-server:0.9.2"
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
```

> service
``` yaml
apiVersion: v1
kind: Service
metadata:
  name: paul-echo-1
  namespace: temp
spec:
  selector:
    app: paul-echo-1
  ports:
  - name: paul-echo
    port: 3000
    targetPort: 80
    protocol: TCP
---
apiVersion: v1
kind: Service
metadata:
  name: paul-echo-2
  namespace: temp
spec:
  selector:
    app: paul-echo-2
  ports:
  - name: paul-echo
    port: 3000
    targetPort: 80
    protocol: TCP
```

> ingress
``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: paul-echo
  namespace: temp
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
    - host: "paul-echo.your-own-domain.com"
      http:
        paths:
          - backend:
              service:
                name: paul-echo-1
                port: 
                  number: 3000
            path: /1(/|$)(.*)
            pathType: Prefix
    - host: "paul-echo.your-own-domain.com"
      http:
        paths:
          - backend:
              service:
                name: paul-echo-2
                port: 
                  number: 3000
            path: /2(/|$)(.*)
            pathType: Prefix
```

# 참고
* [Ingress 활용 예제 - naver cloud](https://guide.ncloud-docs.com/docs/k8s-k8sexamples-ingress)
* [4.1.2 NGINX Ingress Controller에서 PATH 기반 라우팅 - TheKoguryo's 기술블로그](https://thekoguryo.github.io/oracle-cloudnative/oss/ingress-controller/2.nginx-ingress-path/)