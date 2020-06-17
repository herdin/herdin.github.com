---
layout: post
title: "early return/continue 출발합니다 출발!!"
date: 2020-06-12
tags: design-pattern
---

`design-pattern` 은 아니지만, 딱히 어디다 넣어야될지 몰라서 넣었다.

#### 개똥

``` java
int ageType = 0;
if(person.getAge() >= 90) {
  ageType = 9;
} else {
  if(person.getAge() >= 80) {
    ageType = 8;
  } else {
    if(person.getAge() >= 70)
    ageType = 7;
  }
}
return ageType;
```

#### early return
``` java
if(person.getAge() > 90) {
  return 9;
}
if(person.getAge() > 80) {
  return 8;
}
if(person.getAge() > 70) {
  return 7;
}
```

`continue` 도 마찬가지다.

기본이라고 생각하지만, 개발을 했으면 테스트랑 별개로 직접 사용해봐야하는 것처럼,
코드를 짜고 남에 코드인 것 처럼 읽어보는 것이 중요한 것 같다.

출처
- [니들은 else 같은거 쓰지마라](https://velog.io/@gomjellie/else-%EC%93%B0%EC%A7%80%EB%A7%88)
