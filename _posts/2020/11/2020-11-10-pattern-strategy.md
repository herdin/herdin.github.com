---
layout: post
title: "Strategy Pattern"
date: 2020-11-10
tags: design-pattern
---

어떤 행동을 캡슐화 하여, 동적으로 행동을 변경할 수 있는 패턴이다.

행동에 해당한는 class 를 만들어서 해동을 사용하는 class 에 주입하는 방식이다.

#### 이동하는 전략 class
``` java
public interface MovingStrategy {
    void move();
}

public class MovingWithWheel implements MovingStrategy {
    @Override
    public void move() { System.out.println("굴러감"); }
}

public class MovingWithWing implements MovingStrategy {
    @Override
    public void move() { System.out.println("날아감"); }
}
```

#### 이동가능한 것
``` java
public class MovableThing {
    final String name;
    final MovingStrategy movingStrategy;

    public MovableThing(String name, MovingStrategy movingStrategy) {
        this.name = name;
        this.movingStrategy = movingStrategy;
    }

    public void moveThing() {
        movingStrategy.move();
    }
}
```

#### 사용
``` java
MovableThing car = new MovableThing("car", new MovingWithWheel());
MovableThing airplane = new MovableThing("airplane", new MovingWithWing());
car.moveThing(); //굴러감
airplane.moveThing(); //날아감
```
