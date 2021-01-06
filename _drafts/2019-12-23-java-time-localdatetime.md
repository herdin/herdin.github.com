---
layout: post
title: "java, java.time package, LocalDateTime"
date: 2019-12-23
tags: java writing
---

로컬 날짜만 사용할 때 -> `java.time.LocalDate`
로컬 시간만 사용할 때 -> `java.time.LocalTime`
로컬 날짜 시간 사용할 떄 -> `java.time.LocalDateTime`
존 날짜 시간 사용할 때 -> `java.time.ZonedDateTime`

위의 모든 클래스들은 `Immutable` 하므로 매번 다른 객체를 생성한다.

출처
- [JAVA 자바 java.time 패키지 / 날짜와 시간을 조작하기 : 빼기와 더하기, 변경하기, 날짜와 시간을 비교하기](https://altongmon.tistory.com/220)
- [날짜와 시간 & 형식화](https://jongmin92.github.io/2018/06/06/Java/java-date-time/)
