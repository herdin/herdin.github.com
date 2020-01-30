---
layout: post
title: "CSS 적용 우선 순위"
date: 2020-01-30
tags: css writing
---

토이프로젝트를 하다보니 `CSS` 를 자꾸 만지게 되고, 라이브러리의 CSS 를 커스터마이징하다보니 우선순위 때문에 밀릴 때가 있어서 정리한다.

# 1. 사용자 스타일 시트 우선

``` css
.target01 {
  background-color: red;
}
```

``` html
<div class='about'>
  <div class='highlighter-rouge'>THIS IS TARGET</div>
</div>
```


<style>
.target01 {
  background-color: red;
}
</style>

<div class='target01'>THIS IS TARGET</div>

출처
- [CSS 적용 우선순위](https://opentutorials.org/module/484/4149)
