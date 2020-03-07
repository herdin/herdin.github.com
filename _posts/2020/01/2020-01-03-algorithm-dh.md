---
layout: post
title: "Diffie–Hellman key exchange"
date: 2020-01-03
tags: algorithm
---

[리얼월드HTTP](https://ridibooks.com/v2/Detail?id=443000682) 를 읽다가 챕터 4.2.3 키교환 에 나오는 DH 알고리즘 풀이가 이해가 안됐는데, 사무실의 차장님 도움으로 조금 알게 되었다.

> long story short;

서버의 개인키는 `y`, 공유키 `p, q, ys(=q^y mod p)`
클라이언트의 개인키는 `x`, 공유키는 `p, q, xs(=q^x mod p)`

서로의 공유키를 주고 받은 다음, 대칭키를 만든다.

```
(q^y mod p)^x mod p = (q^x mod p)^y mod p
```

아니 이게 어떻게 같지??

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
