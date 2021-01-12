---
layout: post
title: "AWS 비용 상세"
date: 2021-01-12
tags: aws
---

## 비용 상세
* 월 비용 = 각 항목의 과금의 합
* 항목의 월 비용 = 해당 항목의 월 전체 사용량 * 해당 항목의 단가
* 항목의 월 전체 사용량 = 해당 항목의 일일 사용량의 합

## 항목 분류
* BoxUsage - EC2 인스턴스 항목
* EBS - EC2 에 붙여 사용하는 볼륨 항목
* Transfer - 네트워크 사용량
* etc.. - 그외 것들.. elastic IP, NAT Gateway 등.

## 항목 상세

글을 쓰고있는 1월달 비용을 보는 중인데,

AWS 비용 관리 > Cost Explorer 에서 상세 항목을 확인해보면서 적는다.

#### `APN2-BoxUsage:t2.small`
* APN2 - 서울리전
* BoxUsage:t2.small - EC2, t2.small 등급

#### `APN2-EBS:VolumeUsage.gp2`
* APN2 - 서울리전
* EBS:VolumeUsage - 볼륨사용, gp2 등급

#### `APN2-EBS:SnapshotUsage`
* APN2 - 서울리전
* EBS:SnapshotUsage - 볼륨사용, Snapshot 에 사용

#### `APN2-ElasticIP:IdleAddress`
* APN2 - 서울리전
* ElasticIP:IdleAddress - ElasticIP, 유휴 주소(ec2 에 연결안됨)

#### `HostedZone`
* 도메인이라고 보면 될듯.
* 처음 25개 호스팅 영역의 경우 월별 호스팅 영역당 0.50 USD
* 추가 호스팅 영역의 경우 월별 호스팅 영역당 0.10 USD

#### `DNS-Queries`
* 도메인을 등록한 다음, 쿼리가 요청된 수만큼 비용계산
* 표준쿼리와 지연시간기반라우팅쿼리 란게 있다.
* 지연시간기반라우팅쿼리는 그냥 라우팅해주는 것이 아니라 aws 내부 시스템에서 어떤 서버가 응답이 가장 빠른지를 측정하고있다가 가장 빠른 서버로 라우팅해주는 서비스라고한다.
* 따라서 지연시간기반라우팅쿼리는 쪼끔 더 비싸다.
* 표준쿼리가 월별 첫 10억 개 쿼리의 경우 1백만 쿼리당 0.40 USD 라면, 지연시간기반라우팅쿼리는 0.60 USD.

매일 지불하고 있는 개인 ec2 기반으로 적은거라 극히 일부만 적었지만 대충 어떤 내용인지 알듯하다.


참고
- [3분시리즈 AWS 과금 특집 - EC2 비용 뒤집어 보기 Part2](https://wisen.co.kr/pages/blog/blog-detail.html?idx=4329)
