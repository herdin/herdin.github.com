---
layout: post
title: "Diffie–Hellman key exchange"
date: 2020-01-03
tags: algorithm
---

[리얼월드HTTP](https://ridibooks.com/v2/Detail?id=443000682) 를 읽다가 챕터 4.2.3 키교환 에 나오는 DH 알고리즘 풀이가 이해가 안됐는데, 사무실의 차장님 도움으로 조금 알게 되었다.

## 요점만 간단히, long story short; TLDR;

세션키를 만드는 과정에서 서로의 공유키를 주고 받을 때, 제 3자가 중간에서 교환하고있는 공유키들을 알게되더라도

공유키를 이용해 만든 세션키를 유추하기 어렵게 만드는 방법.

## 좀 더 자세히?

서버의 개인키는 `y`, 공유키 `p, q, ys(=q^y mod p)`
클라이언트의 개인키는 `x`, 공유키는 `p, q, xs(=q^x mod p)`

서로의 공유키를 주고 받은 다음, 대칭키를 만든다.

```
(q^y mod p)^x mod p = (q^x mod p)^y mod p
```

아니 이게 어떻게 같지?? -> 아래의 모듈러 거듭제곱법 참고

`ys = q^y mod p` 라는 연산이 있을 때,  
q, y, p 를 알면 연산이 쉽지만
ys, q, p 를 안다고해서 y 를 쉽게 구할 수 없는 성질을 이용한 것이라고한다.
이런 것을 이산로그 문제라고한다. 수행하기는 쉽지만, 돌아가기 어렵다. 마치 해싱처럼.

신기하게도 3^x mod 17 에서 x 를 1부터 16까지 늘리면
x 에 따라서 결과가 해싱한것마냥 균등하게 나온다

위의 원리를 이용하여 키교환을 하는것.

## 모듈러 제곱법?

[모듈로 거듭제곱법](https://johngrib.github.io/wiki/discrete-math-modular/) 이란 것이 있는데,

```
A^B mod C = ((A mod C)^B) mod C
```

그냥 법칙이란다 외우자.

위의 모듈러 거듭제곱법을 적용하면

```
(q^y mod p)^x mod p
= (q^y)^x mod p

(q^x mod p)^y mod p
= (q^x)^y mod p

지수법칙의 두번째, 거듭제곱의 거듭제곱법
(q^y)^x mod p = q^(yx) mod p
(q^x)^y mod p = q^(xy) mod p
```

> 띠이용

참고
- [디피 헬만 알고리즘(Diffie-Hellman Algorithm)](https://www.crocus.co.kr/1233)
