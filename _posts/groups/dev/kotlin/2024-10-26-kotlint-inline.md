---
layout: post
title: "kotlin inline"
date: 2024-10-26
tags: kotlin
---

# 요약
kotlin 에서는 `return` 예약어는 lambda 에서 사용할 수 없다.
명명된/익명 함수에서만 호출이 가능하다.

lambda 에서는 `return@methodNameOrCustomLabel` 형식으로 사용할 수 있다.

ineline 함수가 lambda parameter 를 갖고 있을 때, lambda 에서 non-local-return 을 사용할 수 있다.
non-local-return 이란 return 을 사용했을때 함수가 반환되는 지점이 lambda 를 호출한 inline 함수가 아니라 inline 함수를 호출한 (외부) 지점인 것을 말한다.

# 참고
[Kotlin 강좌 23. 람다에서의 리턴(Return)](https://blog.naver.com/PostView.nhn?blogId=yuyyulee&logNo=221390355858)