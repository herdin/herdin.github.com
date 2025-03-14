---
layout: post
title: "docker/nerdctl cheat cheet"
date: 2022-10-14
tags: docker cheatsheet
---

> 도커를 어쩌다 쓰는데 쓸때마다 헷갈려서 적어놓는 커닝페이퍼

# [run](https://docs.docker.com/engine/reference/commandline/run/)

``` shell
# docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
#-d : detach mode, deamonize
#-p [HOST PORT]:[CONTAINER PORT]: port mapping -> old syntax
#--publish published=[HOST PORT],target=[CONTAINER PORT] -> new syntax
#--name : container name
#--restart=no/on-failure[:max-retries]/always/unless-stopped : restart policy
#--cap-add : Add Linux capabilities
#--rm : Automatically remove the container when it exits
#-it : allocate pseudo-TTY
#-v, --volume : volume (mount) hostPath:containerPath

# ex1) was container run
$ docker run -d -p 8081:8080 --name was01 was:0.1
# ex2) one-time test container run and shell-in
$ docker run --rm -it ghcr.io/subicura/echo:v1
# ex2) one-time test container run and shell-in with /bin/sh
$ docker run --rm --name test -it ghcr.io/subicura/echo:v1 /bin/sh

```

# [exec](https://docs.docker.com/engine/reference/commandline/exec/)
``` shell
$ docker exec -it <CONTAINER_ID> /bin/sh
```

# [build](https://docs.docker.com/engine/reference/commandline/build/)

```shell
# docker build [OPTIONS] PATH | URL | -
#-f : --file : dockerfile name
#-t : --tag : tag name
# 마지막 파라미터는 Dockerfile 위치 (도커파일 이름을 명시하지 않은 경우, Dockerfile 를 찾는다)
$ docker build -t my-app .
$ docker build -t my-app -f my-dockerfile ./dockerfiles
```

# [tag](https://docs.docker.com/engine/reference/commandline/tag/)

``` shell
# docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
$ docker tag my-soruce-app some-other-repository.com/my-repository/my-target-app:1.0.0
```

# image 정리

``` shell
# 일단 프룬. 이렇게하면 여러번 빌드해서 레이블이 없는 이미지(dangling) 를 삭제한다. 삭제해도 무조건 괜찮은 친구들.
docker image prune

# 이미지가 아래처럼 있는 경우
paul-test/nginx/nginx v50
paul-test/nginx/nginx v49
paul-test/nginx/nginx v48
paul-test/nginx/nginx v47
paul-test/nginx/nginx v46
paul-test/nginx/nginx v45
paul-test/nginx/nginx v44
paul-test/nginx/nginx v43
paul-test/nginx/nginx v42
paul-test/nginx/nginx v41
paul-test/nginx/nginx v40
paul-test/nginx/nginx v39
paul-test/nginx/nginx v38
paul-test/nginx/nginx v37
paul-test/nginx/nginx v36
paul-test/nginx/nginx v35
paul-test/nginx/nginx v34
paul-test/nginx/nginx v33
paul-test/nginx/nginx v32
paul-test/nginx/nginx v31
paul-test/nginx/nginx v30
paul-test/dummy/nginx v30
paul-test/dummy/nginx v29
paul-test/nginx/nginx v29
paul-test/dummy/nginx v28
paul-test/nginx/nginx v28
paul-test/dummy/nginx v27
paul-test/nginx/nginx v27
paul-test/dummy/nginx v26
paul-test/nginx/nginx v26
paul-test/dummy/nginx v25
paul-test/nginx/nginx v25
paul-test/dummy/nginx v24
paul-test/nginx/nginx v24
paul-test/dummy/nginx v23
paul-test/nginx/nginx v23
paul-test/dummy/nginx v22
paul-test/nginx/nginx v22

# 이렇게 한다.
docker rmi $(docker images --filter=reference='paul-test/*/nginx' -q)

docker images --filter "dangling=true" -q --no-trunc
```

# etc

``` shell
# docker login
# 아무 파라미터가 없으면 dockerhub 로 로그인
$ docker login <REPOSITORY_URL/IP> --username <USERNAME>

# docker commit
$ docker commit <CONTAINER ID/NAME> <NEW IMAGE NAME:TAG>
# docker tag
```


# 이미지를 만들때

``` shell
$ docker run --name <CONTAINER_NAME> -it <REPOSITORY>/<IMAGE_NAME>:<IMAGE_VERSION> /bin/sh
# docker 안에서 작업..
$ docker commit <CONTAINER_NAME> <IMAGE_NAME>:<IMAGE_VERSION>
$ docker login <REPOSITORY_URL> --username <USERNAME>
$ docker tag <IMAGE_NAME>:<IMAGE_VERSION> <REPOSITORY_URL>/<IMAGE_NAME>:<IMAGE_VERSION>
$ docker push <REPOSITORY_URL>/<IMAGE_NAME>:<IMAGE_VERSION>
```

# test container image
``` shell
##################################
# ghcr.io/subicura/echo:v1
##################################
$ docker run -d --name echo-subicura echo -p 3000:3000 ghcr.io/subicura/echo:v1
$ curl http://localhost:3000?foo=bar
version: v1
hostname: 604ff4895d4b
headers:
  host: localhost:3000
  user-agent: curl/8.1.2
  accept: '*/*'
query:
  foo: bar

##################################
# ealen/echo-server:0.9.2
##################################
$ docker run --name echo-ealen -d -p 3000:80 ealen/echo-server:0.9.2
$ curl "http://localhost:3000/hello/world?foo=bar" | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   502  100   502    0     0  54737      0 --:--:-- --:--:-- --:--:-- 83666
{
  "host": {
    "hostname": "localhost",
    "ip": "::ffff:192.168.65.1",
    "ips": []
  },
  "http": {
    "method": "GET",
    "baseUrl": "",
    "originalUrl": "/hello/world?foo=bar",
    "protocol": "http"
  },
  "request": {
    "params": {
      "0": "/hello/world"
    },
    "query": {
      "foo": "bar"
    },
    "cookies": {},
    "body": {},
    "headers": {
      "host": "localhost:3000",
      "user-agent": "curl/8.1.2",
      "accept": "*/*"
    }
  },
  "environment": {
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "HOSTNAME": "5de522b720ea",
    "NODE_VERSION": "20.11.0",
    "YARN_VERSION": "1.22.19",
    "HOME": "/root"
  }
}
```
