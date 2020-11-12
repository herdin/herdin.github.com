---
layout: post
title: "Consistent Hashing 란?"
date: 2020-11-12
tags: algorithm web cache
---

어쩌다가 [if(kakao)2020 코멘터리 01 : 카카오톡 캐싱 시스템의 진화 — Kubernetes와 Redis를 이용한 캐시 팜 구성](https://tech.kakao.com/2020/11/10/if-kakao-2020-commentary-01-kakao/) 이 글을 보게 되었는데, 일단 모르는 이야기가 많지만 그 중에서도 특히 `Consistent Hashing` 란 단어가 눈에 들어와서 찾아 보게 되었다.

> 해싱이면 해싱이지 일정한 해싱이 뭐지?

[이런](https://www.akamai.com/es/es/multimedia/documents/technical-publication/consistent-hashing-and-random-trees-distributed-caching-protocols-for-relieving-hot-spots-on-the-world-wide-web-technical-publication.pdf) 논문이 있다고 한다. 참고만 하자.

> 기존 캐싱서버들은 어떻게 관리를 하는지 모르겠어서 비교가 안되네
> 기존에는 캐싱서버가 추가되거나 삭제되면 통째로 리밸런싱을 하나? 아무튼..

해싱을 해서 0 부터 1까지의 수가 나온다고 하자.
어떤 key 를 해싱한 값이 해당 캐시 노드의 해시값보다 크면서 가까운 노드로 캐싱이 된다고 치자.
```
ex)
host 들의 해시값들
hash('host10') = 0.25
hash('host20') = 0.50
hash('host30') = 0.75

hasing('/some/resource/112') = 0.4
라고하면, 0.4보다 크면서 가까운 값이 0.50 인 host20 으로 해싱이된다.
```

이렇게 key 를 해싱한 값을 기준으로 캐싱서버의 해싱값과 비교하여 캐싱 될 서버를 선택하는데, 최대 해싱 값을 넘어가는 부분은 첫번째 서버로 선택하도록 하는 것을 `hasing Ring` 을 구성한다 라고 하는것 같다.

```
기존의 캐시서버 host hasing 값
hash('host10') = 0.25
hash('host20') = 0.50
hash('host30') = 0.75

key 의 해싱된 값들 -> 선택된 캐싱 서버
0.00 ~ 0.24 -> host10
0.25 ~ 0.49 -> host20
0.50 ~ 0.74 -> host30
0.75 ~ 0.00 -> host10

새로운 host 가 추가된다고하면
hash('host21') = 0.60

0.00 ~ 0.24 -> host10
0.25 ~ 0.49 -> host20
0.50 ~ 0.59 -> host21 -> 원래 host30 으로 캐싱되던 key 들이 host21 로 가게되어 miss 가 난다
0.60 ~ 0.74 -> host30
0.75 ~ 0.00 -> host10
```
위와 같이 새로운 캐시서버가 추가되어도 기존의 캐시된 데이터들은 유지한채 1/k 만큼의 캐싱 손실만을 가져가게 된다.

하지만 서버 갯수가 적을 경우 캐싱 서버간 균일하게 데이터를 캐싱할 수 없다. 위의 예제의 3개의 서버만 보더라도

host10 은 0.75 ~ 0.00, 0.00 ~ 0.24 = 100 의 구간,  
host20 은 0.25 ~ 0.49 = 25 의  구간,  
host30 은 0.50 ~ 0.74 = 25 의 구간 을 담당하므로 균일하지가 못하다. 따라서 가상의 `vnode` 를 만들어 구간을 촘촘하게 구성을 하게되면, 세 노드가 균일한 캐싱 데이터를 담당할 수 있게 된다.

```
hash('host10') = 0.25
hash('host20') = 0.50
hash('host30') = 0.75

위와 같이 쓰던 것을

hash('host100') = 0.10 -> host10
hash('host101') = 0.40 -> host10
hash('host102') = 0.70 -> host10
hash('host201') = 0.20 -> host20
hash('host202') = 0.50 -> host20
hash('host203') = 0.80 -> host20
hash('host301') = 0.30 -> host30
hash('host302') = 0.60 -> host30
hash('host303') = 0.90 -> host30
```

위와 같이 바꾸면

host10 은 0.00 ~ 0.09, 0.30 ~ 0.39, 0.60 ~ 0.69, 0.90 ~ 0.99 = 40 의 구간  
host20 은 0.10 ~ 0.19, 0.40 ~ 0.49, 0.70 ~ 0.79 = 30 의 구간  
host30 은 0.20 ~ 0.29, 0.50 ~ 0.59, 0.80 ~ 0.89 = 30 의 구간  
로 가상노드 `vnode` 가 없었을 때 보단 더 균등 해졌다. 가상노드를 더 많이 둘 수록 더욱 더 균등해 질 것이다.

서버가 추가되거나 삭제될때는 괜찮지만, 교체해야될 경우 같은 서버 해싱 key 를 쓰도록 하자.
예를 들어 IP 를 사용하게 되면 장비 교체로 IP 가 달라지게 되면 hash Ring 이 손상될 수 있다.


참고
- [[입 개발] Consistent Hashing 에 대한 기초](https://charsyam.wordpress.com/2016/10/02/%EC%9E%85-%EA%B0%9C%EB%B0%9C-consistent-hashing-%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B8%B0%EC%B4%88/)
