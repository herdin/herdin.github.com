---
layout: post
title: "Docker 기초"
date: 2019-07-29
tags: docker
---
![많이 보던 그 그림](/assets/images/posts/2019-07-29-docker.jpg)

[Docker document](https://docs.docker.com/)

`docker` vs `vm` 이라기보단 `container` vs `vm` 이라고 해야한다.
`docker` 는 많은 `container` 기술 중 하나이다.
`vm` 은 `hypervisor` 로 하드웨어 가상화를 한 뒤에 `guest OS` 를 올리고, 그 위에 `application` 이 필요한 `bins/lib` 가 올라 간다.

> 따라서 격리화 수준이 높고
>  - 보안 수준이 높다. (하나의 vm 이 뚫려도 host 는 안전하다.)
>  - 완전 다른 os 를 올릴 수 있다.
>
> application 까지 io 처리를 하기 위한 커널단계가 많다.
>   - 느리다

`application` 마다 `guest OS` 가 필요하기 때문에 용량이 크다. >> 배포시 고려요소

> `docker` 를 알게된지 얼마 안됐지만, 몇달마다 문서가 바뀌는걸 보니 좀 당황스럽다..
> 설치 방법도 써놓으려고 했는데 문서가 자꾸 바뀌네 ㅠㅠ
> `docker` group 에 `linux user` 를 추가해야 `root` 권한 없이 `docker` 를 실행할 수 있다.

docker 의 Images, containers, volumes, or customized configuration files 들이 저장되는 장소

```
/var/lib/docker
```

## docker image build
`docker file` 로 `docker images` 를 만든다.

```  shell
$ docker build -t [REPO/IMAGE_NAME]:[IMAGE_TAG] [DOCKER FILE LOCATION]
$ docker build -t [REPO/IMAGE_NAME]:[IMAGE_TAG] (-f [DOCKER FILE NAME]) [DOCKER FILE LOCATION]

#-t : tag
$ docker build -t test-redis:0.1 .

#-f : docker"f"ile
#--cidfile="container_id_file_path" : write container id to file
$ docker build -t was:0.1 .
$ docker build -t was:0.2 -f DockerfileForWas02 .
```

## Dockerfile example
```
FROM alpine:3.10

LABEL maintainer="herdin86@gmail.com"

RUN apk add git
RUN apk add openjdk11
RUN mkdir /msa
COPY ./build/libs/GradleSpringBootMybatis-1.0-SNAPSHOT.jar /msa

CMD ["java", "-jar", "/msa/GradleSpringBootMybatis-1.0-SNAPSHOT.jar"]
```
* FROM: 도커 파일을 만들 베이스이미지를 지정한다.
* LABEL
* RUN
* ADD
* COPY
* ADD 와 COPY 의 차이점
    * URL을 복사할 source로 사용할 수 있다. remote에 있는 파일을 받아서 복사하게 된다.
    * source 파일이 gzip과 같이 일반적으로 잘 알려진 압축형태인 경우, 압축을 풀어준다.
    * 압축된 remote 파일인 경우, 압축을 풀어주지는 않는다.
    * ADD 보다 RUN 으로 작업을 할 경우, 더 명시적이고 이미지가 더 작아진다고한다.
    > ADD 대신 COPY 와 RUN 을 사용하자.

* 출처
    - [Docker Tip #2: The Difference between COPY and ADD in a Dockerfile](https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile)
    - [[Docker] ADD vs COPY in Dockerfile](https://blog.leocat.kr/notes/2017/01/07/docker-add-vs-copy)

## CMD 와 ENTRYPOINT 의 차이점

ENTRYPOINT 의 명령어는 변경되지 않는다.
CMD 는 컨테이너 생성 시 명령어를 변경할 수 있다.

``` shell
# 아래와 같은 두 파일이 있을 경우,
cat <<EOF > DockerfileCMD
FROM alpine
CMD ["echo", "hello, cmd"]
EOF

cat <<EOF > DockerfileENTRY
FROM alpine
ENTRYPOINT ["echo", "hello, entrypoint"]
EOF

# 이미지 생성
$ docker build -t test:cmd -f DockerfileCMD .
$ docker build -t test:entry -f DockerfileENTRY .

# 실행
$ docker run --name test-cmd test:cmd echo wow
$ docker run --name test-entry test:entry echo wow
# 재실행
$ docker start test-cmd
$ docker start test-entry

$ docker logs test-cmd
wow
wow

$ docker logs test-entry
hello, entrypoint echo wow
hello, entrypoint echo wow
```


## docker image commit

`container` 로 부터 `images` 를 만든다.

```  shell
$ docker commit (-a "[AUTHOR_INFO]") (-c "[COMMENT]") [CONTAINER_ID/NAME] [REPO/IMAGE_NAME]:[IMAGE_TAG]

$ docker commit -a "epu baal <herdin86@gmail.com>" -c "new images" devwas02 newdevwas:0.1
```

## docker images tag

`remote repository` 에서 사용할 `tag` 를 저장한다.

``` shell
$ docker tag [DOCKER_IMAGE_NAME]:[IMAGE_VERSION] [IMAGE_REPOSITORY_URL]:[IMAGE_VERSION_IN_REPOSITORY]

$ docker tag web:0.1 123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/myweb01:0.1
```
## docker image push

`remote repository` 로 `image` 를 전송한다.

```  shell
$ docker push [IMAGE_REPOSITORY_URL]:[IMAGE_VERSION_IN_REPOSITORY]

$ docker push 546552822736.dkr.ecr.ap-northeast-2.amazonaws.com/herdinecr01:0.1
```
## docker image rmi (remove image)

`docker images` 를 삭제한다.

```  shell
$ docker rmi [REPO/IMAGE_NAME]:[IMAGE_TAG] #remove image

$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
elevator            0.4                 0f06f1b3604e        About an hour ago   885MB
elevator            0.3                 d0e16464a89f        10 days ago         874MB
elevator            0.2                 367e2c8e5b19        10 days ago         873MB
elevator            0.1                 6bc1755dfb94        10 days ago         874MB
alpine              latest              b7b28af77ffe        4 weeks ago         5.58MB
redis               4-alpine            8ce91e22cd3f        3 months ago        35.5MB
vault               1.1.2               8a23297b2305        3 months ago        108MB
centos              latest              9f38484d220f        4 months ago        202MB
golang              1.10                6fd1f7edb6ab        6 months ago        760MB
$ docker rmi centos:latest #delete with image-name:tag
Untagged: centos:latest
Untagged: centos@sha256:a799dd8a2ded4a83484bbae769d97655392b3f86533ceb7dd96bbac929809f3c
Deleted: sha256:9f38484d220fa527b1fb19747638497179500a1bed8bf0498eb788229229e6e1
Deleted: sha256:d69483a6face4499acb974449d1303591fcbb5cdce5420f36f8a6607bda11854

$ docker rmi b7b28af77ffe #delete with image-id
Untagged: alpine:latest
Untagged: alpine@sha256:6a92cd1fcdc8d8cdec60f33dda4db2cb1fcdcacf3410a8e05b3741f44a9b5998
Deleted: sha256:b7b28af77ffec6054d13378df4fdf02725830086c7444d9c278af25312aa39b9
Deleted: sha256:1bfeebd65323b8ddf5bd6a51cc7097b72788bc982e9ab3280d53d3c613adffa7
```

## docker container run/stop/start/exec/logs/kill/ps/rm

``` shell
docker run [REPO/IMAGE_NAME]:[IMAGES_TAG]
#-d : detach mode, deamonize
#-p [HOST PORT]:[CONTAINER PORT]: port mapping -> old syntax
#--publish published=[HOST PORT],target=[CONTAINER PORT] -> new syntax
#--name : container name
#--restart=no/on-failure[:max-retries]/always/unless-stopped : restart policy
#--cap-add : Add Linux capabilities
#ex) docker run -d -p 8081:8080 --name was01 was:0.1
```

`--cap-add` : 컨테이너에서 cgroups의 특정 Capability를 사용합니다. ALL을 지정하면 모든 Capability 를 사용합니다. [출처](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter20/28)  
여기서 모든 Capability 는 [여기서](https://linux.die.net/man/7/capabilities) 볼 수 있다.  
> 그럼 Capability 는 뭘까? ㅠㅠ ㅎ그흑 [참고](https://access.redhat.com/documentation/ko-kr/red_hat_enterprise_linux/6/html/resource_management_guide/ch01)

``` shell
docker ps
#-a : all, default
#-f : filter : status=exited/running, status=exited/running/...

docker start [CONTAINER_ID/ID_PREFIX/NAME]
docker logs [CONTAINER_ID/ID_PREFIX/NAME]
docker stop [CONTAINER_ID/ID_PREFIX/NAME] #send stop signal
docker kill [CONTAINER_ID/ID_PREFIX/NAME]
docker rm [CONTAINER_ID/ID_PREFIX/NAME]

docker exec -it [CONTAINER_NAME] [COMMANDS..]
#ex) docker exec -it was01 /bin/bash
```

## docker volume
`docker` 에서 사용하는 `volume` 관련된 명령어들.

``` shell
docker volume ls #volume list
docker volume inspect [DOCKER_VOLUME_NAME]
docker volume rm $(docker volume ls -f dangling=true -q) #remove dangling volume
#or using 1.13.x
docker volume prune #remove dangling volume
```



## docker daemon config

* docker 는 container 에서 stdout 으로 나오는 출력을 특정 위치 `/var/lib/docker/containers/{containerID}` 에 파일로 쌓는다
* 기본으로 logrotate 를 하지 않는다!
* 기본 config 위치: `/etc/docker/daemon.json`
* 다른 config 위치를 사용하고싶다면 dockerd 명령어로 --config-file 옵션을 줘야하는듯?

``` bash
# validate config file
$ dockerd --validate --config-file=/tmp/valid-config.json


$ cat <<EOF > daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "1m",
    "max-file": "3"
  }
}
EOF

```

## 참고
- [만들면서 이해하는 도커(Docker) 이미지의 구조](https://www.44bits.io/ko/post/how-docker-image-work)
- [Configure the default logging driver](https://docs.docker.com/engine/logging/configure/#configure-the-default-logging-driver)
- [Daemon configuration file](https://docs.docker.com/reference/cli/dockerd/#daemon-configuration-file)