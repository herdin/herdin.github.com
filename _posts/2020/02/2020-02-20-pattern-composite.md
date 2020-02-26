---
layout: post
title: "Composite pattern"
date: 2020-02-20
tags: design-pattern
---

다이어그램이나 글로 표현한 설명이 한번에 와닿지 않아서 java 로 구현한 예제로 갈음한다.
> 아래는 슈도코드(pseudocode)이다.

``` java
interface Component {
  public void someAction();
}

class Leaf implements Component {
  @Override
  public void someAction() {
    //do some action for leaf
  }
}

class Composite implements Component {
  private List<Component> componentList;
  @Override
  public void someAction() {
    //do some action for Composite
  }
  public void addComponent(Component component) {
    componentList.add(component);
  }
}
```

`interface Component` 를 구현한 `class Leaf` 와 `class Composite` 가 있고, `class Composite` 는 여러개의 `interface Component` 를 갖을 수 있는 모양새를 의미한다.
