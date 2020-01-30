---
layout: post
title: "CSS 적용 우선 순위"
date: 2020-01-30
tags: css writing
---

<link rel="stylesheet" type="text/css" href="{{ site.url }}/assets/css/2020-01-30-css-apply-priority.css" />

토이프로젝트를 하다보니 `CSS` 를 자꾸 만지게 되고, 라이브러리의 CSS 를 커스터마이징하다보니 우선순위 때문에 밀릴 때가 있어서 정리한다.

<span style='background-color:#76ff78;color:white;'>사용자(인라인, 페이지에 직접 정의한 style)</span> 와 <span style='background-color:#7273ff;color:white;'>작성자(link 로 연결된 css style)</span> 의 색을 달리하여 구분해 보았다.

# 1. 사용자 스타일 시트 우선

## 사용자 스타일 시트
``` css
.test .important {
  background-color: #76ff78!important;
}
.test .notimportant {
  background-color: #76ff78;
}
.test .userimportant {
  background-color: #76ff78;
}
.test .writerimportant {
  background-color: #76ff78;
}
```

### 작성자 스타일 시트
``` css
.test .important {
  background-color: #7273ff!important;
}
.test .notimportant {
  background-color: #7273ff;
}
.test .userimportant {
  background-color: #7273ff;
}
.test .writerimportant {
  background-color: #7273ff!important;
}

```

``` html
<div class='test'>
  <div class='important'>THIS IS TARGET</div>
</div>
```
---

<style>
.test .important {
  background-color: #76ff78!important;
}
.test .notimportant {
  background-color: #76ff78;
}
.test .userimportant {
  background-color: #76ff78!important;
}
.test .writerimportant {
  background-color: #76ff78;
}
</style>

<div class='test'>
  <div class='important'>THIS IS IMPORTANT</div>
  <div class='notimportant'>THIS IS NOT IMPORTANT</div>
  <div class='userimportant'>THIS IS USER IMPORTANT</div>
  <div class='writerimportant'>THIS IS WRITER IMPORTANT</div>
</div>

출처
- [CSS 적용 우선순위](https://opentutorials.org/module/484/4149)
