---
layout: post
title: "Nginx with docker"
date: 2020-03-06
tags: docker nginx
---

# TL;DR

일단 바로 실행한다.

``` shell
$ docker run --name mynginx -d -p 81:80 nginx:latest
```

접속해서, index.html 을 변경한다음 되는지 확인해보자.

``` shell
$ docker exec -it <container id> /bin/bash
# 밑으로는 contianer 내부
# devian linux 이므로 apt-get 을 사용한다.
$ apt-get update
# vim 도 없어서 깔아야한다..
$ apt-get install vim
$ cd /usr/share/nginx/html
# 아무렇게나 수정한다음
$ vim index.html
# 리로드
$ service nginx reload
```

참고
* [Nginx 기본 환경 설정](https://prohannah.tistory.com/136)
* [nginx variable 변수](https://opentutorials.org/module/384/4508)
