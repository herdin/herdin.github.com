---
layout: post
title: "kafka connect"
date: 2021-12-14
tags: kafka
---

팀에서 사용하고 있는 kafka connect. 발 끝이라도 따라가봅시다!

[사용한 kafka docker-compose file repository](https://github.com/wurstmeister/kafka-docker)

## kafka 실행

#### docker-compose-single-broker.yml

``` dockerfile
version: '2'
services:
  zookeeper:
    container_name: my-keeper
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
    networks:
      - my-net
  kafka:
    container_name: my-kafka
    build: .
    ports:
      - "9092:9092"
    networks:
      - my-net
    environment:
      KAFKA_ADVERTISED_HOST_NAME: my-kafka
      KAFKA_CREATE_TOPICS: "test:1:1"
      KAFKA_ZOOKEEPER_CONNECT: my-keeper:2181
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

networks:
  my-net:
    driver: bridge

```

test 용 script 를 위해 kafka 를 받았음
kafka_2.13-2.7.1.tgz

``` shell
# 생성 및 실행
$ docker-compose -f docker-compose-single-broker.yml up

# 지울땐,
$ docker-compose -f docker-compose-single-broker.yml down

# 다시 시작할땐,
$ docker-compose -f docker-compose-single-broker.yml start

# 잘떳는지? 시험삼아 이미 생성된 topic 을 또 만들어봄. download 받은 kafka 폴더안에 있음
$ ./kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
```

## 무지성 connect 실행

이렇게 connect 를 실행 https://data-engineer-tech.tistory.com/34
``` shell
$ bin/connect-distributed.sh config/connect-distributed.properties
```

잘 실행되었는지 확인, 무슨명령어인지는 몰라
``` shell
$ curl -XGET http://localhost:8083
$ curl -XGET http://localhost:8083/connector-plugins
```

## 그냥 실행하면 재미없으니, 도커로

단순히 `connect-distributed.sh` 를 실행하기 위한 도커이미지를 준비.

curl 은 그냥 넣었고, java, bash 가 필요했다.

#### Dockerfile-alpine-jdk-curl-bash
``` dockerfile
FROM openjdk:8-jre-alpine
  
RUN apk --no-cache add curl && apk --no-cache add bash
```

> jdk, curl, bash 라서 jcb

``` shell
$ docker build -t alpine-jcb:0.1 -f Dockerfile-alpine-jdk-curl-bash .
```

이제 이미지 위에서 쉘을 돌리자. 설정파일 하나 복사했음. 한군데 수정함.

``` shell
cp connect-distributed.properties my.connect-distributed.properties
```
```
bootstrap.servers=my-kafka:9092
```


```shell
$ docker run -d \
--name my-connect \
--network=kafka-docker_my-net \
-p 8083:8083 \
-v /Users/user/Repository/kafka-docker/mytest/kafka_2.13-2.7.1:/kafka \
alpine-jcb:0.1 /kafka/bin/connect-distributed.sh /kafka/config/my.connect-distributed.properties
```

## ui 도 보고싶어용!!

고맙게도 만들어주신 분이 계시다. [LANDOOP kafka connect ui git-hub](https://github.com/lensesio/kafka-connect-ui)

``` shell
$ docker run -d -p 8000:8000 \
--name my-connect-ui \
--network=kafka-docker_my-net \
-e "CONNECT_URL=http://my-connect:8083" \
landoop/kafka-connect-ui
```

`http://localhost:8000/` 접속

## file source-sink connect 구성
[source-sink connect example](https://wedul.site/683)

### file source connect 구성

web-ui 에서 create 해서 요따구로 만듬.

```
name=my-file-src-1
connector.class=org.apache.kafka.connect.file.FileStreamSourceConnector
file=/my-kafka-data/my
tasks.max=1
topic=my-file-1
```

connector 생성 확인

```
$ curl http://localhost:8083/connectors
```


./kafka-console-consumer.sh --bootstrap-server=localhost:9092 --topic my-data-1 --from-beginning
아이씨 docker 바깥에서 하니까 Error connecting to node my-kafka:9092 요지랄하네 젠장.
아까 만들었던 docker image 를 사용하자.

docker run -d --rm -it \
--name my-shell-for-kafka \
--network=kafka-docker_my-net \
-v /Users/user/Repository/kafka-docker/mytest/kafka_2.13-2.7.1:/kafka \
alpine-jcb:0.1 /bin/bash

docker exec -it <CONTAINER_ID> /bin/bash
/kafka/bin/kafka-console-consumer.sh --bootstrap-server=my-kafka:9092 --topic my-file-1 --from-beginning
{"schema":{"type":"string","optional":false},"payload":"ITEM001,SHOP001,929,2018-10-01 01:01:01"}
{"schema":{"type":"string","optional":false},"payload":"ITEM002,SHOP001,480,2018-10-01 01:01:01"}
{"schema":{"type":"string","optional":false},"payload":"ITEM001,SHOP001,25,2018-10-01 01:01:01"}
{"schema":{"type":"string","optional":false},"payload":"ITEM003,SHOP001,6902,2018-10-01 02:02:02"}

키야 ㅎ.ㅎ 키시시싯 내일해야지 키시시시싯

### file sink connect 구성



connector plugins 확인
$ curl http://localhost:8083/connector-plugins


docker run --rm -it -p 8000:8000 \
-e "CONNECT_URL=http://127.0.0.1" \
landoop/kafka-connect-ui