---
layout: post
title: "kafka console cheatsheet"
date: 2022-12-26
tags: kafka console cheatsheet
---

```shell
##########################
# common config
##########################
# 모든 script 에 사용되는 옵션
--command-config <CONFIG FILE IF EXISTS> \
--bootstrap-server <SERVER_LIST:server-url-1:port,server-url-2:port,...> \

##########################
# kafka-configs
##########################
# [broker config]https://godekdls.github.io/Apache%20Kafka/broker-configuration/#groupmaxsessiontimeoutms
# [consumer config](https://godekdls.github.io/Apache%20Kafka/consumer-configuration/)
./kafka-configs.sh \
--bootstrap-server $BOOTSTRAP_SERVER \
--entity-type brokers --all --describe

--client-defaults \
--broker-defaults \
##########################
# kafka-topics
##########################
# topic list 확인
./kafka-topics.sh \
--topic <TOPIC NAME, REG EXP 가능>
--list

# topic 만들기
./kafka-topics.sh \
--topic <TOPIC NAME> \
--create --partitions 3 --replication-factor 1

# topic  확인
./kafka-topics.sh \
--topic <TOPIC NAME, REG EXP 가능>
--describe


##########################
# kafka-console-consumer
##########################
./kafka-console-consumer.sh \
--topic <TOPIC NAME> \

## key, value 를 나눠서 확인하고싶을때
--property print.key=true \
--property key.separator="-" \

## 처음부터 확인
--from-beginning

## 특정 파티션/오프셋 확인
--partition 0 \
--offset 127

## 가져올 message 갯수
--max-messages 10

##########################
# kafka-consumer-groups
##########################
# 모든 consumer group 정보 확인
./kafka-consumer-groups.sh \
--list

# consumer group 정보 확인 (consumer lag 포함)
./kafka-consumer-groups.sh \
--group <CONSUMER GROUP NAME> \
--describe

# consumer group offset reset
./kafka-consumer-groups.sh \
--group <CONSUMER GROUP NAME> \
--topic <TOPIC NAME> \
--reset-offsets --to-latest --dry-run
# --execute 이 옵션이 없으면 dry-run 함. 그럼 dry-run 옵션은 왜있는거지? 나중에 필수로 바뀔거라함.
# --to-earliest (--dry-run|--execute)
# --to-latest (--dry-run|--execute)
# --to-offset <OFFSET>
# 더있는데 귀찮아서 생략

# consumer group delete
./kafka-consumer-groups.sh \
--group <CONSUMER GROUP NAME> \
--delete

```