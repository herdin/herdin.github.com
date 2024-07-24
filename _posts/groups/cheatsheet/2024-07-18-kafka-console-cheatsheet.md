---
layout: post
title: "kafka console(shell) cheatsheet"
date: 2024-07-18
tags: git cheatsheet
---

kafka 를 받으면 내부에 console 용 shell script 가 들어있음.

``` shell
# 공통 옵션
--command-config my-config-file-path
--command-config my-config
--bootstrap-server my-bootstrap-server-list
--bootstrap-server localhost:9092,localhost:9093

# kafka-topics
./kafka-topics.sh \

--list

--topic "my-topic" \
--describe

--topic "my-topic" \
--delete

# kafka-console-consumer
./kafka-console-consumer.sh \
--bootstrap-server $BOOTSTRAP_SERVER \
--property print.key=true \
--property key.separator="-" \
--property print.timestamp=true \
--topic "my-topic" \
--partition 10 --offset 0 --max-messages 1

--from-beginning
```