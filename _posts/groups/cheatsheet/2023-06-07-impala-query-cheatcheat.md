---
layout: post
title: "impala query cheatsheet"
date: 2023-06-07
tags: impala cheatsheet
---

> 자주 사용하는 함수/쿼리 저장

``` sql

select
    -- timestamp -> epoch
    EXTRACT(to_timestamp('2021-09-08 12:13:14', 'yyyy-MM-dd HH:mm:ss'), 'EPOCH') as "timestamp -> epoch",
    FROM_TIMESTAMP(to_timestamp('2021-09-08 12:13:14', 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd') as "timestamp -> string"
```