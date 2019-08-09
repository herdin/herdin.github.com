---
layout: post
title: "AWS RDS mariadb config"
date: 2019-08-09
tags: aws
---

> `RDS` 는 `Relational Database Service` 이다.

1. AWS RDS 생성 (free tier)
2. 한글설정을 위한 파라미터 그룹 생성
  - 아래의 6가지 utf-8 설정
    - character_set_client
    - character_set_server
    - character_set_client
    - character_set_database
    - character_set_filesystem
    - character_set_results
  - 아래의 2가지 utf8_general_ci 설정
    - collation_connection
    - collation_server
3. EC2 보안그룹 생성
4. 인바운드 규칙 기본VPC, TCP 3306 위치무관
5. (2, 3) 에서 만든 파라미터그룹, 보안그룹을 적용
6. HeidiSQL 에서 TCP 연결, 엔드포인트의 host/port
7. 끝.

> 그냥 만들어도 되던데.....??
