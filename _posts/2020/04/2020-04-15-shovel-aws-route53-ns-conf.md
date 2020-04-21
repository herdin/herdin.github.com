---
layout: post
title: "AWS Route53 네임서버(NS, NameServer) 변경"
date: 2020-04-15
tags: cloud aws shovel-knight
---

`Cloudflare` 를 사용해보려고 aws route53 ns 를 cloudflare 쪽으로 변경해서 작동하는 것 까진 봤는데,
> route53 > 호스팅영역 > 레코드 중에 ns 를 변경했다.

그냥 궁금해서 dns 만 사용해보려고 cloudflare 를 써본거라 의미가 없고 번거로운 것 같아서, 다시 aws ns 로 변경하려고했는데, 몇일 기다려도 자꾸 내 도메인의 ns 가 cloudflare 로 잡혀있었다. 심지어 cloudflare 에서 내 도메인을 삭제했는데!!

대체 호스팅영역과 등록된도메인의 차이가 뭔지 잘 모르겠는데, route53 > 도메인 > 등록된 도메인에서 네임서버를 변경하니까 바로 적용이 됐다..
