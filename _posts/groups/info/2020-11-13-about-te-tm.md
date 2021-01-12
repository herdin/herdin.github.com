---
layout: post
title: "TE/TM"
date: 2020-11-13
tags: corp
---

## 준비

아래 솔루션을 이용할 수 있어야 한다.
- MariaDB
- MongoDB
- Redis
- Kafka

- 요구사항에 맞는 기술선택 및 개발표준 가이드
- 애플리케이션에 맞는 개발도구 선택 및 가이드
- 동일 기능의 프로그램 코드 품질과 효율
- 잠재적 오류를 예측하여 개발
- 언어에 종속적이지 않고 최적 알고리즘 설계

### redis
- [document](https://redis.io/)
- [document config](https://raw.githubusercontent.com/redis/redis/6.0/redis.conf)
- [spring io](https://docs.spring.io/spring-data/redis/docs/2.3.3.RELEASE/reference/html/#preface)
- [medium spring boot web redis cache](https://medium.com/@yongkyu.jang/%EC%9A%B0%EB%A6%AC%EA%B0%80-%EC%84%9C%EB%B9%84%EC%8A%A4%EB%A5%BC-%EA%B0%9C%EB%B0%9C%ED%95%A0-%EB%95%8C-%EB%B0%B1%EC%95%A4%EB%93%9C-%EC%98%81%EC%97%AD%EC%97%90%EC%84%9C-cache%EB%A5%BC-%EC%A0%81%EA%B7%B9%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B2%8C-%EB%90%98%EB%A9%B4-%EC%83%9D%EA%B0%81%ED%96%88%EB%8D%98%EA%B2%83-%EB%B3%B4%EB%8B%A4-%EB%8D%94-%EB%93%9C%EB%9D%BC%EB%A7%88%ED%8B%B1%ED%95%9C-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0%EC%9D%84-%EA%B0%80%EC%A0%B8%EC%98%AC-%EC%88%98-%EC%9E%88%EB%8B%A4-%EA%B3%A0-%EC%83%9D%EA%B0%81%ED%95%9C%EB%8B%A4-98ab99adfd69)

### cache
캐시의 대상이 되는 데이터
- 단순한 정보
- 빈번한 요청
- 자주 변하지 않고 로드시간이 오래걸림
- 최신화가 되지않아도 서비스에 문제가 없음

### Eureka
- [MSA, 스프링 클라우드(2) - 서비스 디스커버리](https://12bme.tistory.com/507)

## 토론면접
- 2차 코딩테스트에서 진행했던 내용을 완성했다 치고, 고객과 poc 가 끝났다고 치자.
  - 쇼핑몰 시스템인데, 임직원 쇼핑몰이 없다. 임직원 쇼핑몰을 msa 로 구성하고싶다.
  - 기존 쇼핑몰 구성
    - 인증 서버(로그인 정보 관리)
    - 상품 서버(상품 정보 관리)
    - 주문 서버(주문 처리, 카프카 이용)
    - 통계 서버(통계 정보 관리)
  - 기존 구성 서버들을 그대로 이용하면서, 임직원 쇼핑몰 시스템을 추가로 구성하는 것
    - 임직원 쇼핑몰 주문 서비스 front-end/back-end (인증 서버, 주문 서버, 임직원 쇼핑몰 상품 관리 서비스, 통계 서버 - 연동)
    - 임직원 쇼핑몰 상품 관리 서비스 front-end/back-end (인증 서버, 상품 서버, 통계 서버 - 연동)
- 그 이후 고객과의 토론을 가정.
- poc 에서 발생했을 수 있는 기술적 이슈에 대해 토론.
  - 해당 아키텍처를 선택한 이유, 그 장단점
  - 생길 수 있는 문제에 대한 해결책
