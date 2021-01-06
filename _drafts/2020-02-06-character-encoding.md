---
layout: post
title: "Character Encoding"
date: 2020-02-06
tags: encoding
---

한글은 문자집합의 구성에 따라
- 조합형
- 완성형
- 유니코드
등으로 나누어 진다.

## 유니코드란?

전세계의 모든 문자집합을 하나로 모은것.
유니코드 값을 나타내기 위해 코드포인트를 사용하는데, `U+` 를 붙여서 표시한다.
```
A -> U+0041 or \u0041
```

공식적으로 31비트 문자 집합이지만, 현재까지는 21비트 이내로 모두 표현이 가능하다.


Java는 String에서 사용하는 인코딩은 UTF-16 BE(Big Endian)이다. 문자열 전송/수신을 위해서 직렬화가 필요할 때에는 변형된 UTF-8(Modified UTF-8)을 사용한다. Java의 DataInput, DataOutput 인터페이스 구현체에서는 문자열을 기록하거나 읽어들일 때 이 변형된 UTF-8을 사용한다. 

## 여러 캐릭터 셋 간의 차이점
## java 에서의 string 처리
- [NAVER D2 - 한글 인코딩의 이해 2편: 유니코드와 Java를 이용한 한글 처리](https://d2.naver.com/helloworld/76650)
