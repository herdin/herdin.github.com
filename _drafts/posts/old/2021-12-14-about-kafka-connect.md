---
layout: post
title: "kafka connect"
date: 2021-12-14
tags: kafka
---


* [카프카 커넥트의 태스크 밸런싱 로직, DistributedHerder(양치기) 그리고 IncrementalCooperativeAssignor 내부 동작 소개](https://blog.voidmainvoid.net/473)
주요 로직은 아래 코드로 갈음. 블로그에서 복붙.
그런데 실제로는 아래와 같이 돌지 않는 것같다. 노는 노드들이 너무 많음..
아.. 커넥터와 태스크를 동등하게 취급해서 동등하게 나눠주는걸까? 아래코드는 태스크만인데..
``` java
protected void assignTasks(List<WorkerLoad> workerAssignment, Collection<ConnectorTaskId> tasks) {
    workerAssignment.sort(WorkerLoad.taskComparator());
    WorkerLoad first = workerAssignment.get(0);

    Iterator<ConnectorTaskId> load = tasks.iterator();
    while (load.hasNext()) {
        int firstLoad = first.tasksSize();
        int upTo = IntStream.range(0, workerAssignment.size())
                .filter(i -> workerAssignment.get(i).tasksSize() > firstLoad)
                .findFirst()
                .orElse(workerAssignment.size());
        for (WorkerLoad worker : workerAssignment.subList(0, upTo)) {
            ConnectorTaskId task = load.next();
            log.debug("Assigning task {} to {}", task, worker.worker());
            worker.assign(task);
            if (!load.hasNext()) {
                break;
            }
        }
    }
}
```

현재 사용 중인 버전 `{"version":"2.5.0.7.1.7.5-1","commit":"6900656b7ec422c0","kafka_cluster_id":"JowUcaIdSaeAuADuGukhYQ"}`

* [Connect REST Interface](https://docs.confluent.io/platform/current/connect/references/restapi.html)
* [Kafka Connect API 명령어 정리](https://dongjuppp.tistory.com/90)

* [커넥터 리밸런싱이 잘안된다. 답변 없음](https://stackoverflow.com/questions/63348308/how-to-get-kafka-connect-to-balance-tasks-connectors-evenly)
* [커넥터 워커가 추가/삭제 되었을때 리밸런싱이 작동했으면 좋겠다](https://forum.confluent.io/t/rebalancing-tasks-when-new-kafka-connect-is-started/876/3)

* [connect.protocol 설정차이](https://www.slideshare.net/HostedbyConfluent/deep-dive-into-kafka-connect-protocol-with-catalin-pop)
* [kafka connect config](https://docs.confluent.io/platform/current/installation/configuration/connect/index.html#connector-client-config-override-policy)

Eager Protocol
- Revoke all Connectors
- Perform round-robin assignment
- Send Connector assignment to queue
- Workers pickup assignment
- Start assigned connectors

Compatible Protocol
- Revoke connectors when the worker left the group or connector/task change
- Generate connector assignment only for the revoked connectors
- Send Connector assignment to queue
- Workers pickup assignment
- Start assigned connectors

Sessioned Protocol
- Setup Session key for encrypted authentication
- Revoke connectors when the worker left the group or connector/task change
- Generate connector assignment only for the revoked connectors
- Send Connector assignment to queue
- Workers pickup assignment
- Start assigned connectors

(Pro)Evenly distributed = Eager
(Con)Uneven distributed = Compatible/Sessioned
(Pro)Incremental rebalance = Compatible/Sessioned
(Con)Not Secured = Eager/Compatible
(Pro)Secured = Sessioned
(Con)Stops all connectors = Eager


* [Incremental Cooperative Rebalancing in Apache Kafka: Why Stop the World When You Can Change It?](https://www.confluent.io/blog/incremental-cooperative-rebalancing-in-kafka/?_ga=2.74764242.1102341778.1697548913-955538524.1697159805)
* [위의 한글블로그](https://devidea.tistory.com/100)
* [apache kafka repostiory](https://github.com/apache/kafka/blob/trunk/connect/runtime/src/main/java/org/apache/kafka/connect/runtime/distributed/IncrementalCooperativeConnectProtocol.java)

* custom connector 개발을 위한 예제들
  * [kafka repository](https://github.com/apache/kafka/tree/3.5/connect/file/src/main/java/org/apache/kafka/connect/file)
* [mirror maker (connector)](https://github.com/apache/kafka/tree/3.5/connect/mirror)


아래는, 실습내용.
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
$ `bin/connect-distributed.sh config/connect-distributed.properties`
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
> docker-compose 파일에 kafka 의 설정 environment 중 KAFKA_ADVERTISED_HOST_NAME: localhost 로 변경하면 된다.

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
