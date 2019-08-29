---
layout: post
title: "Docker 이미지 초기화"
date: 2019-08-27
tags: docker writing
---

# init redis

## 1. docker redis 맛보기

### 1.1. 일단 띄워보기

``` shell
#redis docker run
docker run -d --name SAredis redis:latest
```

> 이러면 뜨긴뜬다 일단은..

### 1.2. CentOS(container) - Redis(container) 연동

> docker link 를 사용하므로 권장하지 않음

``` shell
#make linux, install redis-cli, connect redis container

#centos for redis-cli
docker run -it --link SAredis:inredis --name SAcentos centos:latest

#now we are in centos
#install wget, gcc, make
yum install -y wget && yum install -y gcc && yum install -y make
#download redis-cli, uncompress, compile
wget http://download.redis.io/redis-stable.tar.gz && tar xvzf redis-stable.tar.gz && cd redis-stable && make
#regist redis-cli for easyuse
cp src/redis-cli /usr/bin/
#connect redis-server
redis-cli -h inredis -p 6379
#user redis now!
>set hello redisWorld
>get hello
"redisWorld"
```

### 1.3. 개발용으로 일회성으로만 사용하려면..

> rm 옵션으로 종료시 삭제되도록한다. 별로 의미는 없음.

``` shell
#just use one-time container for redis-cli
docker run -it --link SAredis:inredis --rm redis redis-cli -h inredis -p 6379
>get hello
"redisWorld"
```

### 2. host 파일 사용하기

``` shell
docker run
-d
--name test-vault
-p 8201:8200
-v /tools/vault/data/file:/vault/file
-v /tools/vault/data/logs:/vault/logs
docker.io/vault:1.1.2
```

왜 뜬금없이 `vault` 냐면, 예전에 이렇게 실행했다가 알 수 없는 `permission denied` 가 떠서 한참 찾다 포기했는데,  이번에 `redis` 설정하면서도 똑같이..

``` shell
docker run
-d
--name tredis
-p 6379:6379
-v /tools/redis/data:/data
docker.io/redis:4-alpine
```

저렇게 했더니 container 가 실행하자마자 죽어서 로그를 보니, container 내부에서 volume 설정하다가 `permission denied` 가 똑같이 떠서 다시한번 한참 구글링을 했는데

[God Stackoverflow](https://stackoverflow.com/questions/24288616/permission-denied-on-accessing-host-directory-in-docker)

끝에 `z` or `Z` 를 붙이면 자동으로 `chcon` 을 써주면서 해결된다. `Z` 보단 `z` 가 나은 것 같다

``` shell
-v /host/dir:/container/dir:z
-v /host/dir:/container/dir:Z
```

위의 옵션을 사용하면 아래의 명령어를 자동으로 사용해준다고 한다.....

``` shell
chcon -Rt svirt_sandbox_file_t /container/dir #z 사용시
chcon -Rt svirt_sandbox_file_t -l s0:c1,c2 /container/dir #Z 사용시
```

[참고는 했지만 이해는 안된다.](http://www.projectatomic.io/blog/2015/06/using-volumes-with-docker-can-cause-problems-with-selinux/)

그럼 저 빌어먹을 `z` , `Z` 옵션은 뭐냐? [참고..]({{ site.url }}/selinux/)
