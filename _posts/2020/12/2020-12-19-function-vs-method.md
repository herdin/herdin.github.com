---
layout: post
title: "함수와 메소드의 차이"
date: 2020-12-19
tags: language
---

함수는 독립된 상태로 존재할 경우.

``` c
int sum(int a, int b) {
  return a + b;
}
```

메소드는 클래스같은 곳에 종속되어 있을 경우.

``` java
class Math {
  public int sum(int a, int b) {
    return a + b;
  }
}
```

별것도 아닌만큼 기억해놓자.
