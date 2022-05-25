---
layout: post
title: "nginx mirror test"
date: 2022-05-05
tags: nginx
---


## nginx 설치

``` shell
# nginx-1.21.6 download
$ ./configure --prefix={nginx install location}
$ make
$ make install
$ cd {nginx install location}
```

## nginx 설정

/hello1 이 들어오면 /hello2 로도 보내준다.

``` conf
http {
	...
    upstream backend {
        server 127.0.0.1:8080;
        keepalive 1024;
    }
    ...
    server {
        listen       80;
        server_name  localhost;
    	...
        location /hello1 {
            mirror /mirror;
            proxy_pass http://backend/hello1;
        }
        location = /mirror {
            internal;
            proxy_pass http://backend/hello2;
        }
        ...
```

## backend 서버 설정

간단하게 spring boot 로 GET /hello1, GET /hello2 를 구성한다. 8080 포트로 해야겠지? 로그도 찍어준다.

## 테스트

nginx 를 띄우고
``` shell
$ cd {nginx install location}
# start up
$ ./sbin/nginx

# shut down
# $ ./sbin/nginx -s stop
```

브라우져에 http://localhost/hello1 을 실행하여 tomcat 에 로그가 둘다 찍히는지 확인

참고
- [nginx mirror module](http://nginx.org/en/docs/http/ngx_http_mirror_module.html#example)

