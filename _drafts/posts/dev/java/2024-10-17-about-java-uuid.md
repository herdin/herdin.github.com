---
layout: post
title: "about java uuid"
date: 2024-10-17
tags: java
---

UUID(Universally Unique Identifier)

36개의 문자로 구성
    32개의 16진수(hex str) 문자
    4개의 `-` 하이픈/대시가 포함

XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
{low time}-{mid time}-{mid time + version}-{clock sequence and variant}-{node}

3번째 문자의 첫번째숫자는 버전을 의미한다고 한다.
