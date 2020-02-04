---
layout: post
title: "css, flexbox"
date: 2020-01-29
tags: web css
---

flexbox 가 나오기 전까지 레이아웃을 위해 우리는
- Block
- Inline
- Table
- Positioned
를 사용했다.

flexbox 를 사용해서 좀 더 쉽게 레이아웃을 구성해보자!

flex layout 은 container 와 item 으로 나뉘어진다.

container 속성

``` css
.flex-container {
  display: flex; /*flex layout 을 사용한다.*/
  flex-direction: column; /*배치방향*/
  /*
  column; 열의 방향(위에서 아래로)으로 item 이 배치된다.
  column-reverse; 아래서 위로 item 이 배치된다.
  row; 열의 방향(왼쪽에서 오른쪽으로)으로 item 이 배치된다.
  row-reverse; 오른쪽에서 왼쪽으로 item 이 배치된다.
  */
  flex-wrap: wrap; /*이건뭔지모르겠네 줄바꿈?*/
  /*
  wrap; item 줄바꿈이 된다.
  nowrap; 줄바꿈이 되지않고 한줄로 나오게 된다.
  wrap-reverse; 한줄로 나오되 순서가 바뀐다.
  */
  flex-flow: row wrap; /*flex-direction 과 flex-wrap 를 한번에 사용한다.*/
  justify-content: center; /*좌우 정렬*/
  /*
  center; item 들을 가운데 정렬한다.
  flex-start; item 들을 왼쪽정렬한다.
  flex-end; item 들을 오른쪽정렬한다.
  space-around; item 들과 끝부분 사이에 공간을 동일하게 둔다.
  space-between; item 들 사이에 공간을 동일하게 둔다.
  */
  align-items: center; /*상하 정렬*/
  /*
  center; 중앙 정렬
  flex-start; 상측 정렬
  flex-end; 하측 정렬
  stretch; 상하를 늘린다.
  baseline; item 내용물의 중앙값을 맞춘다.
  */
  align-content: space-between; /*item 들의 line 을 조정한다*/
  /*
  stretch; 상하로 item 을 늘려서 정렬한다.
  나머지는 justify-content 의 속성값과 같음
  */
}

.flex-item {
  order: 3; /*item 의 순서를 정의.*/
  flex-grow: 1; /*item 의 상대적 크기를 정의, 커짐*/
  flex-shrink: 0; /*item 의 상대적 크기를 정의, 작아짐*/
  flex-basis: 200px; /*너비를 정의*/
  flex: {flex-grow} {flex-shrink} {flex-basis}; /*한꺼번에 정의*/
  align-self: center; /*container's align-items 를 덮어쓴다*/
}
```

출처
- [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)
