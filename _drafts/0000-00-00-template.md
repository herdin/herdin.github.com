---
layout: post
title: "오라클 조인, Nested Loop, Sort Merge, Hash"
date: 2021-02-18
tags: db oracle
---

몇년전 협력 개발자분에게 oracle hint 에 대한 정보를 듣고, 유용하게 사용하고 있었는데,  
join 이 일어나는 과정을 조금만 맛보고자 정리한다.

## Nested Loop Join
선행 테이블의 조건에 맞는 데이터와 같은 값을 후행 테이블에서 조회한다.
선행 테이블의 처리범위가 처리량을 결정한다. 랜덤엑세스방식이며, 후행테이블의 조인조건에 인덱스가 중요하다.
``` sql
SELECT /*+ USE_NL(A B)*/ *
FROM MEMBER A, LEVEL B WHERE 1=1
AND A.MEMBER_ID = B.MEMBER_ID
```

## Sort Merge Join
각 테이블에 대해서 각자 엑세스하여 처리하고, 조인 컬럼 순으로 정렬 후 조인한다.

``` sql
SELECT /*+ USE_MERGE(A B)*/ *
FROM MEMBER A, LEVEL B WHERE 1=1
AND A.MEMBER_ID = B.MEMBER_ID
```

## Hash Join

Nested Loop 의 랜덤 엑세스 문제점과 Sort Merge 의 정렬에 대한 부담을 해결하기 위해 등장.  
데이터가 적은 쪽을 읽어 해시 테이블을 만들고, 큰쪽에서 해시 테이블을 조회하며 조인한다.

비용이 많이 들지만, 수행속도를 보장해야할 경우 사용.

``` sql
SELECT /*+ USE_HASH(A B)*/ *
FROM MEMBER A, LEVEL B WHERE 1=1
AND A.MEMBER_ID = B.MEMBER_ID
```
