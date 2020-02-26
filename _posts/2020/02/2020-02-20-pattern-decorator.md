---
layout: post
title: "Decorator pattern"
date: 2020-02-20
tags: design-pattern
---

다이어그램이나 글로 표현한 설명이 한번에 와닿지 않아서 java 로 구현한 예제로 갈음한다.
> 아래는 슈도코드(pseudocode)이다.

``` java
interface Component {
  public void someAction();
}

class ComponentDecorator implements Component {
  private ComponentDecorator component;
  public Decorator(Component component) {
    this.component = component;
  }
  @Override
  public void someAction() {
    component.someAction();
  }
}

class DefaultDecorator extends Component {
  @Override
  public void someAction() {
    //do some action for default decorator
  }
}

class ADecorator extends ComponentDecorator {
  public ADecorator(Component component) {
    super(component);
  }
  @Override
  public void someAction() {
    super.someAction();
    someActionA();
  }
  public void someActionA() {
    //do some action for A
  }
}

class BDecorator extends ComponentDecorator {
  public BDecorator(Component component) {
    super(component);
  }
  @Override
  public void someAction() {
    super.someAction();
    someActionB();
  }
  public void someActionB() {
    //do some action for B
  }
}
```

`interface Component` 를 상속받는 `class DefaultDecorator`

아래와 같이 데코레이팅해서 사용할 수 있다.
``` java
new BDecorator(new ADecorator(new DefaultDecorator())).someAction();
/* action order
1. do some action for default decorator
2. do some action for A
3. do some action for B
*/

new ADecorator(new BDecorator(new DefaultDecorator())).someAction();
/* action order
1. do some action for default decorator
2. do some action for B
3. do some action for A
*/
```
