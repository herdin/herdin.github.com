---
layout: post
title: "Spring Batch 냄새맡기"
date: 2021-07-26
tags: java spring batch spring-batch
---

Spring Batch 는 Spring 을 만든 Pivotal 과 Accenture 의 합작품이다.

Job - 작업 단위. 여러개의 Step 을 가지며 2-10 개 정도의 Step 을 갖도록하여 너무 많은 책임이 몰리지 않도록 하자.
Step - read > process > write 의 Chunk Processing 의 단위.

* interace ItemReader
	- T read() 메소드
	- null 을 return 하는 경우는 데이터의 마지막을 의미
	- return 되는 T 타입의 데이터는 ItemReader 의 input 으로 사용
* interface ItemProcessor<I, O>
	- O process(I item) 메소드
	- I(input) 는 ItemReader 로부터 받고
	- O(output) 는 ItemWriter 에게 넘겨줄 타입
	- 가공이 필요 없는 경우, ItemReader -> ItemWriter 로 바로 넘겨도 됨
* interface ItemWriter<T>
	- void write(java.util.List<? extends T> items)
	- ItemReader 또는 ItemProcessor 에서 넘겨 받은 Item 들을 모아놨다가 commit-interval 프로퍼티의 갯수만큼 모이면 write 실행


참고
- [Spring Batch, Intro - 스프링 배치 기본 개념 익히기](https://www.fwantastic.com/2019/12/spring-batch-intro.html)