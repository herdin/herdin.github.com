---
layout: post
title: "Kafka 시작하기"
date: 2019-09-26
tags: opensource writing
---

[Apache Kafka](https://kafka.apache.org/) 는 Message Broker 이다.
비슷한 녀석으로 [RabbitMQ](https://www.rabbitmq.com) 가 있지만 2019-09-26 기준 Google trend 에서 8배 정도의 차이를 보이고 있어서 RabbitMQ 보다 Kafka 를 먼저 알아 보기로 했다.

비동기 처리를 하며 메세지를 보내는 쪽을 Producer 라 하고, 메세지를 받는 쪽이 Consumer 라고 한다.
