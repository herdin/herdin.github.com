---
layout: post
title: "또 Docker CE 설치하기"
date: 2019-10-15
tags: docker shovel-knight
---

공짜 `GCE instance` 가 맛탱이가 가서 다시 하나 파고 `Docker` 를 설치하려고 하니 또 머가 바뀐것같아서 버벅대는걸 기록으로 남긴다.

먼저 `linux` 버전..

``` shell
$ cat /etc/*-release | uniq
CentOS Linux release 8.0.1905 (Core)
NAME="CentOS Linux"
VERSION="8 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="8"
PLATFORM_ID="platform:el8"
PRETTY_NAME="CentOS Linux 8 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-8"
CENTOS_MANTISBT_PROJECT_VERSION="8"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="8"

CentOS Linux release 8.0.1905 (Core)
```

> 메뉴얼 설치를 했다가 잘안되서 이것저것하다가 됐는데, 왜 되는질 몰라서 새로운 instance 에서 다시 설치한다.

메뉴얼 설치(download the RPM package and install it manually)가 있고 레포지토리를 통한 설치(Install using the repository)가 있는데, 레포지토리를 권장한다고 한다.  
권장 방법으로..

``` shell
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

$ sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/centos/docker-ce.repo

$ sudo yum install docker-ce docker-ce-cli containerd.io
```

자 설치했다... 이제 실행..

``` shell
$ sudo systemctl start docker
$ docker ps -a
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.40/containers/json?all=1: dial unix /var/run/docker.sock: connect: permission denied
```

얼씨구.
현재 `user` 를 `docker group` 에 넣어 줘야 한다.

``` shell
# 유저 확인
$ cat /etc/passwd
...
herdin86:x:1000:1001::/home/herdin86:/bin/bash
...

# 그룹 확인
$ cat /etc/group
...
herdin86:x:1001:
docker:x:991:
...

# 유저에 그룹추가
$ sudo usermod -a -G docker $USER
$ sudo systemctl restart docker

# 다시 로그인 한다.
$ exit

...

$ docker version
Client: Docker Engine - Community
 Version:           19.03.3
 API version:       1.40
 Go version:        go1.12.10
 Git commit:        a872fc2f86
 Built:             Tue Oct  8 00:58:10 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.3
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.12.10
  Git commit:       a872fc2f86
  Built:            Tue Oct  8 00:56:46 2019
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.2.6
  GitCommit:        894b81a4b802e4eb2a91d1ce216b8817763c29fb
 runc:
  Version:          1.0.0-rc8
  GitCommit:        425e105d5a03fabd737a126ad93d62a9eeede87f
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683

$ docker run hello-world
  Unable to find image 'hello-world:latest' locally
  latest: Pulling from library/hello-world
  1b930d010525: Pull complete
  Digest: sha256:c3b4ada4687bbaa170745b3e4dd8ac3f194ca95b2d0518b417fb47e5879d9b5f
  Status: Downloaded newer image for hello-world:latest

  Hello from Docker!
  This message shows that your installation appears to be working correctly.

  To generate this message, Docker took the following steps:
   1. The Docker client contacted the Docker daemon.
   2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
      (amd64)
   3. The Docker daemon created a new container from that image which runs the
      executable that produces the output you are currently reading.
   4. The Docker daemon streamed that output to the Docker client, which sent it
      to your terminal.

  To try something more ambitious, you can run an Ubuntu container with:
   $ docker run -it ubuntu bash

  Share images, automate workflows, and more with a free Docker ID:
   https://hub.docker.com/

  For more examples and ideas, visit:
   https://docs.docker.com/get-started/
```

끝.
