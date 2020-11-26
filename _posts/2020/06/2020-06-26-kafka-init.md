---
layout: post
title: "Apache Kafka 기초"
date: 2020-06-18
tags: middleware queue kafka
---

## Apache Kafka
LinkedIn 에서 개발된 분산 메시징 시스템으로 2011년 오픈소스로 공개되었다.

Publish-Subscribe (pub/sub) 모델이고, 기본적으로 클러스터모드로 기동하며, 분산처리를 zookeeper 가 담당한다.
zookeeper 없이는 기동하지 않는다.


주요 용어.
* `producer` : 카프카로 데이터를 전달하는 프로그램
* `consumer` : 카프카에서 데이터를 가져가는 프로그램
* `topic` : 전달하는 데이터의 구분
* `partition` : topic 별로 데이터를 쌓을 때, 나눠 담는 영역.
* `consumer-group` : topic 을 가져가는 프로그램 그룹

> 주절주절 설명을 할텐데, 아무래도 설명보다는 이후에 할 <a href="#practice">실습 결과</a>를 보면 이해가 더 빠를 것 같다.

<img src="#" post-src="2020-06-26-kafka-init-01.png" alt=""/>

`producer` 가 어떤 `topic` 에 `A B C D E ...` 라는 데이터를 쌓을 때, `partition` 이 3개 라면,
* partition 0 : producer >> `...GDA` >> consumer
* partition 1 : producer >> `...HEB` >> consumer
* partition 2 : producer >> `...IFC` >> consumer

저런 식으로 쌓이게 된다. 물론 저렇게 로드밸런싱된것처럼 나눠서 쌓이진 않는 것 같다. 그림에서의 번호는 `offset`(index) 를 의미하는 것 같다.  
하나의 `topic` 에 하나의 `partition` 에서만 순서 보장이 된다.

<img src="#" post-src="2020-06-26-kafka-init-02.png" alt=""/>

`consumer` 가 각자의 `offset` 을 관리할 수 있고, 위와 같은 경우는 1개의 `partition` 에 2개의 `consumer` 가 접근하는 것처럼 보이는데 이렇게 되려면, 2개의 `consumer` 가 다른 `consumer group` 을 가져야 하는 것 같다.
> 모바일에서 상품을 구매한다 치자.
> 구매정보를 결제시스템도 알아야하지만, 배송시스템과 통계시스템도 알아야 한다.
> 1, 2, 3 의 구매정보가 있는데,
> 1번정보를 결제시스템이 가져가고
> 2번정보를 배송시스템이 가져가고 이렇게 된다면, 제대로 시스템이 돌아갈 수 없다.
> 1, 2, 3 의 구매정보를 모든 시스템이 다 가져가야한다. 이럴때, 각 시스템별로 `consumer-group` 을 따로 설정하면 각 시스템이
> 모든 정보를 받을 수 있다.

1개의 `partition` 에서, 1개의 `consumer group` 의 2개의 `consumer` 가 있다고 하면, 하나의 `consumer` 는 계속 놀게 된다. 마치 `consumer` 하나가 `partition` 하나를 점유하는 것처럼 보인다.

어떤 `consumer` 가 카프카의 데이터를 소비했다고 해서, 카프카 내부에서 데이터가 사라진 것은 아니다. 카프카 내부에 데이터가 사라지는 기간을 설정할 수 있다.

<img src="#" post-src="2020-06-26-kafka-init-03.png" alt=""/>

`consumer group` 이 나뉘어져 있다면, 위와 같이 같은 `topic` 을 다른 `consumer` 가 각각 가져갈 수 있다.

## <span id="practice">실습</span>

#### docker-compose file
for kafka-zookeeper
``` yaml
version: '3.5'

services:

    zookeeper:
        image: zookeeper:3.4
        ports:
            - "2181:2181"
        networks:
            - kafka

    kafka:
        image: wurstmeister/kafka:2.12-2.5.0
        ports:
            - "9092:9092"
        environment:
            # host 를 command 로 가져올 경우,
            - HOSTNAME_COMMAND=curl ifconfig.me
            #- KAFKA_ADVERTISED_HOST_NAME:
            # kafka 브로커가 들어오는 연결을 수신 대기하는 주소 및 리스너 이름 목록
            - KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092
            # kafka 브로커를 가리키는 사용 가능 주소 목록. kafka는 초기 연결 시 이를 client에게 보냄
            #   따라서 이곳에 PLAINTEXT://localhost:9092 또는 PLAINTEXT://127.0.0.1:9092 로 써놓고
            #   외부에서 접근하게되면 접속이 처음에는 되는듯 하지만 로컬에는 kafka 가 없기 때문에
            #   localhost:9092 또는 127.0.0.1:9092 에 접속 못한다는 메세지를 볼 수 있다.
            - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://_{HOSTNAME_COMMAND}:9092
            # ZooKeeper 연결 문자열. ,로 구분 ex) <zookeeper서버의 hostname>:<zookeeper서버의 포트번호>
            - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
            # 생성할 Topic명:Partition 개수:Replica 개수
            #- KAFKA_CREATE_TOPICS: "javainuse-topic:1:1"
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
        networks:
            - kafka
        depends_on:
            - zookeeper

networks:
    kafka:
        name: kafka-network
```

외부와 내부를 나누고 싶다면, 환경변수만 아래와 같이 바꿔준다.  
외부는 `9092` 포트, 내부는 `9093` 포트

``` yaml
        environment:
            - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
            - HOSTNAME_COMMAND=curl ifconfig.me
            # kafka 브로커가 들어오는 연결을 수신 대기하는 주소 및 리스너 이름 목록
            # OUTSIE, INSIDE 를 나눠어 보았다. 외부접근과 내부접근의 포트를 나눌 목적
            - KAFKA_LISTENERS=OUTSIDE://0.0.0.0:9092,INSIDE://kafka:9093
            - KAFKA_ADVERTISED_LISTENERS=OUTSIDE://_{HOSTNAME_COMMAND}:9092,INSIDE://kafka:9093
            # 리스너의 프로토콜 정의, 리스너가 두개 이상이 되면 아래 설정들이 필요한가?
            - KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=OUTSIDE:PLAINTEXT,INSIDE:PLAINTEXT
            - KAFKA_INTER_BROKER_LISTENER_NAME=INSIDE
```

docker-compose version 이 `3.5`이상부터 network 등의 resource 에 name 을 붙일 수 있게 되었다.  
이렇게 하면, 원래 docker-compose file 이 존재하는 directory 의 이름이 docker resource(network/volumes/service/...) 의 prefix 가 되는데, prefix 없이 name 을 그대로 가져가게 된다.  
생성되는 resource 는 name 그대로 되지만 compose file 내부에서는 써준그대로(ex:kafka) 접근이 되나보다

#### kafka command 다운로드
따로 프로그램을 만들 필요 없이, kafka 를 받으면 포함되어있는 command line shell 을 이용하여 실습을 해본다. **docker version 의 kafka 와 일치하는 버전을 받아야한다.**

``` shell
$ wget http://mirror.navercorp.com/apache/kafka/2.0.1/kafka_2.12-2.0.1.tgzwget http://mirror.navercorp.com/apache/kafka/2.5.0/kafka_2.12-2.5.0.tgz
$ tar -zxvf  kafka_2.12-2.5.0.tgz
$ cd kafka_2.12-2.5.0
```

#### topic 생성
복제본=1  
파티션=1  
topic=`com.harm.topic.1`, `com.harm.topic.2`

``` shell
$ sh bin/kafka-topics.sh \
  --zookeeper localhost:2181 \
  --create \
  --replication-factor 1 \
  --partitions 1 \
  --topic com.harm.topic.1
WARNING: Due to limitations in metric names, topics with a period ('.') or underscore ('_') could collide. To avoid issues it is best to use either, but not both.
Created topic com.harm.topic.1.
```
``` shell
$ sh bin/kafka-topics.sh \
  --zookeeper localhost:2181 \
  --create \
  --replication-factor 1 \
  --partitions 1 \
  --topic com.harm.topic.2
WARNING: Due to limitations in metric names, topics with a period ('.') or underscore ('_') could collide. To avoid issues it is best to use either, but not both.
Created topic com.harm.topic.2.
```
#### topic 생성 확인
``` shell
$ sh bin/kafka-topics.sh --zookeeper localhost:2181 --list
com.harm.topic.1
com.harm.topic.2
```

#### 메세지 생성
`com.harm.topic.1` topic 은 1 2 3  
``` shell
$ sh bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic com.harm.topic.1
# 2020-11-13 해보니 bootstrap-server is not a recognized option 이런 오류가 난다.
# --bootstrap-server -> --broker-list 로 고치니 된다.
$ sh bin/kafka-console-producer.sh --broker-list localhost:9092 --topic com.harm.topic.1

--broker-list
>1
>2
>3
>
```
`com.harm.topic.2` topic 은 1 2 3 4 5
``` shell
$ sh bin/kafka-console-producer.sh --broker-list localhost:9092 --topic com.harm.topic.2
>1
>2
>3
>4
>5
>
```

#### 메세지 받기
`--consumer-property group.id=<GROUP-ID>` 옵션이 없으면 매번 새로운 `consumer group` 을 만들기 때문에, 각 `consumer` 마다 만들어진 메세지를 모두 확인할 수 있다.

> 받을 때는 `--bootstrap-server` 옵션을 써야되네..

``` shell
$ sh bin/kafka-console-consumer.sh --topic com.harm.topic.1 --bootstrap-server localhost:9092 --from-beginning
1
2
3
```
``` shell
$ sh bin/kafka-console-consumer.sh --topic com.harm.topic.1 --bootstrap-server localhost:9092 --from-beginning
1
2
3
```
``` shell
$ sh bin/kafka-console-consumer.sh --topic com.harm.topic.2 --bootstrap-server localhost:9092 --from-beginning
1
2
3
4
5
```

#### consumer group 확인
아래처럼 자동생성된것처럼 보이는 `consumer group` 을 확인할 수 있다. 각 `consumer` 마다 각자 다른 `consumer group` 을 갖고 있기 때문에, 해당 topic 의 모든 데이터를 접근할 수 있다.
``` shell
$ sh bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
console-consumer-91758
console-consumer-3126
console-consumer-57191
```

#### partition 증가
`com.harm.topic.2` topic 의 `partition` 을 2 로 증가 시킨다.
``` shell
$ sh bin/kafka-topics.sh \
  --zookeeper localhost:2181 \
  --alter \
  --partitions 2 \
  --topic com.harm.topic.2
WARNING: If partitions are increased for a topic that has a key, the partition logic or ordering of the messages will be affected
Adding partitions succeeded!
```

### consumer group 사용
`partition` n 개의 `topic` 을 하나의 `consumer group` 에 `consumer` 가 1개 이상이 있으면, n-1 개의 `consumer` 들은 놀게 된다. ~~개꿀~~

``` shell
$ sh bin/kafka-console-consumer.sh \
  --topic com.harm.topic.1
  --bootstrap-server localhost:9092 \
  --from-beginning \
  --consumer-property group.id=com.harm.topic.1.group.1
1
2
3
```

``` shell
$ sh bin/kafka-console-consumer.sh \
  --topic com.harm.topic.1 \
  --bootstrap-server localhost:9092 \
  --from-beginning \
  --consumer-property group.id=com.harm.topic.1.group.1

```

하지만 파티션 갯수만큼 consumer 들이 consumer group 에 있다면,

``` shell
sh bin/kafka-console-consumer.sh \
  --topic com.harm.topic.2 \
  --bootstrap-server localhost:9092 \
  --from-beginning \
  --consumer-property group.id=com.harm.topic.2.group.1
1
2
3
4
5
10
11
12
```
``` shell
sh bin/kafka-console-consumer.sh \
  --topic com.harm.topic.2 \
  --bootstrap-server localhost:9092 \
  --from-beginning \
  --consumer-property group.id=com.harm.topic.2.group.1
6
7
89
13
14
```
1 2 3 4 5 는 partition 을 늘리기 전의 메세지기 때문에, 먼저 접근한 consumer 가 가져왔고,  
그 뒤의 데이터인 6 7 89 10 11 12 13 14 는 각 partition 의 데이터를 consumer 가 가져왔다.

결과를 놓고 partition 의 내부 데이터를 추론해보자면,
> 89는 오타다. 2자리 데이터가 있는 관계로 | 로 데이터를 나눈다.

* partition-0 : producer >> `12|11|10|5|4|3|2|1` >> consumer
* partition-1 : producer >> `14|13|89|7|6` >> consumer

#### 사용했던 커맨드 정리
``` shell
$ sh bin/kafka-topics.sh --zookeeper localhost:2181 --create --replication-factor 1 --partitions 1 --topic com.harm.topic.1
$ sh bin/kafka-topics.sh --zookeeper localhost:2181 --list
$ sh bin/kafka-topics.sh --zookeeper localhost:2181 --alter --partitions 2 --topic com.harm.topic.2

$ sh bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic com.harm.topic.1

$ sh bin/kafka-console-consumer.sh --topic com.harm.topic.1 --bootstrap-server localhost:9092 --from-beginning --consumer-property group.id=com.harm.topic.1.group.1
$ sh bin/kafka-console-consumer.sh --topic test --bootstrap-server localhost:9092 --partition 0 --offset 1

$ sh bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
$ sh bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group console-consumer-36650
```


## Spring Kafka, Committing Offsets

Spring Kafka 에서 consumer-group 에 consumer 가 추가되거나 삭제될 때, partition rebalancing 이 일어나는데,
이때마다 자꾸 모든 offset 을 읽어 오는 일이 있어서 찾아보게 되었다.

결론 -> commit 을 안해서;;

`enable.auto.commit` 의 값이 `true` 이면(기본값), offset 은 auto commit 된다.  
`false` 이면, ack mode 의 설정에 따라 달라진다.



> 공식 문서의 Committing Offsets  
> Several options are provided for committing offsets.  
> If the `enable.auto.commit` consumer property is `true`, Kafka auto-commits the offsets according to its configuration. If it is `false`, the containers support several AckMode settings (described in the next list). The default AckMode is BATCH.  
> Starting with version 2.3, the framework sets enable.auto.commit to false unless explicitly set in the configuration.  
> Previously, the Kafka default (true) was used if the property was not set.  
>
> The consumer poll() method returns one or more ConsumerRecords. The MessageListener is called for each record. The following lists describes the action taken by the container for each AckMode (when transactions are not being used):
> - `RECORD`: Commit the offset when the listener returns after processing the record.
> - `BATCH`: Commit the offset when all the records returned by the poll() have been processed.
> - `TIME`: Commit the offset when all the records returned by the poll() have been processed, as long as the ackTime since the last commit has been exceeded.
> - `COUNT`: Commit the offset when all the records returned by the poll() have been processed, as long as ackCount records have been received since the last commit.
> - `COUNT_TIME`: Similar to TIME and COUNT, but the commit is performed if either condition is true.
> - `MANUAL`: The message listener is responsible to acknowledge() the Acknowledgment. After that, the same semantics as BATCH are applied.
> - `MANUAL_IMMEDIATE`: Commit the offset immediately when the Acknowledgment.acknowledge() method is called by the listener.0



참고
- [Kafka Official Document](https://kafka.apache.org/documentation)
- [Kafka Console Command](https://datacadamia.com/dit/kafka/kafka-console-consumer)
- [Kafka Listeners – Explained](https://www.confluent.io/blog/kafka-listeners-explained/)
- [Sring Kafka](https://docs.spring.io/spring-kafka/docs/current/reference/html/#committing-offsets)
- [아파치 카프카란 무엇인가?](https://soft.plusblog.co.kr/14?category=792301)
- [Kafka 운영자가 말하는 Kafka Consumer Group](https://www.popit.kr/kafka-consumer-group/)
