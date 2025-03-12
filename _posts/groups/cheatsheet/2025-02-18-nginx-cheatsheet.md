---
layout: post
title: "nginx cheatsheet"
date: 2025-02-18
tags: nginx cheatsheet
---

`$remote_addr`: nginx로 요청을 보낸 client의 address 정보. LB, proxy 를 경유하게되면 마지막 장비의 IP 가 기록됨.
`$http_x_forwarded_for`: nginx로 들어왔을 때 존재 하던 X-Forwarded-For 설정을 그대로 넘겨준다.
`$proxy_add_x_forwarded_for`: nginx로 들어왔을 때 존재 하던 X-Forwarded-For 설정에 $remote_addr 값 추가 

클라이언트IP 하나만 웹서비스로 전달하고자 할 경우
```
proxy_set_header X-Forwarded-For $http_x_forwarded_for;
```

* [ngx_http_core_module](https://nginx.org/en/docs/http/ngx_http_core_module.html)
* [ngx_http_realip_module](https://nginx.org/en/docs/http/ngx_http_realip_module.html)
* [ngx_http_proxy_module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)