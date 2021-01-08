---
layout: post
title: "javascript, class 관련 키워드"
date: 2020-01-07
tags: javascript
---


### `class`
- ES5 부터 명세에 포함되었다.
- 프로토타입 기반의 상속을 사용하여 주어진 이름의 class 를 만든다.
- class 본문은 strict mode 에서 실행된다.
- class 선언은 hoisting 대상이 아니다.
- 중복선언은 `SyntaxError ` 를 발생시킨다.

### `constructor`

- class 내부에서 객체를 생성하고 초기화하는 특별한 메소드이다.
- class 당 하나만 가질 수 있다.
- 메소드 내부에서 `super` 를 사용하여, 상위클래스의 생성자를 호출할 수도 있다.
- 정의가 되지않을 경우, 기본 생성자 메소드를 사용한다.

### `static`

- class 의 정적 메소드를 정의할 때 사용한다.
- static 메소드에서 같은 class 의 static 메소드를 호출할 때는 `this` 를 사용할 수 있으나, 일반 메소드에서는 불가능하다.
- 일반 메소드에서 static 메소드를 호출할 때는
  - `CLASS_NAME.STATIC_METHOD_NAME()` 형식으로 호출하거나,
  - `this.constructor.STATIC_METHOD_NAME()` 형식으로 호출해야 한다.

### `extends`
- class 를 다른 class 의 자식으로 만든다.
- 내장객체를 상속받을수도 있다.
- 상속받은 class 에서 파생된 다른 class 의 기본 생성자로 다른 class 의 생성자를 반환하고 싶다면, `Symbol.species` 을 사용할 수 있다.

### `super`
- 부모의 메소드를 호출할 경우 사용한다.
- 생성자 안에서 `this` 가 호출되기 전에 호출해야한다.
- `super` 를 이용한ㄷ 부모 class 의 property 삭제는 할 수 없다.

### 이것저것 사용한 예제.

``` javascript
class Area { //class 키워드를 이용한 class 정의
  name = 'default name'; //public 멤버 변수
  #height = -1; //# 키워드를 이용한 private 멤버변수, 실험적 기능이고, 크롬에서 작동함.
  #width = -1;
  constructor(name, height, width) {
    this.name = name;
    this.#height = height; //public field 와 private field 를 초기화 하는 방법 확인
    this.#width = width;
  }
  set setName(name) { this.name = name; }
  set setHeight(height) { this.#height = height; }
  set setWidth(width) { this.#width = width; } //setter
  get getName() { return this.name; } //getter
  get getHeight() { return this.#height; }
  get getWidth() { return this.#width; }
  get area() { return this.#height*this.#width; }
  printInfo() { //일반 메소드
    console.log(`this area name is ${this.name}, height is ${this.getHeight}, width is ${this.getWidth}`);
  }
  static distance(fromArea, toArea) { //static 메소드
    return (fromArea.getHeight - toArea.getHeight)*(fromArea.getWidth - toArea.getWidth);
  }
  static printDistance(fromArea, toArea) {
    console.log(`from ${fromArea.getName} to ${toArea.getName} is ${Area.distance(fromArea, toArea)}`);
  }
}

let area1 = new Area('area A', 2, 4);
let area2 = new Area('area B', 3, 5);

area1.area

class ConstructionArea extends Area {
  buildType = 'default type';
  constructor(name, height, width, buildType) {
    super(name, height, width);
    this.buildType = buildType;
  }
  get getBuildType() { return this.buildType; }
  printInfo() { //자식 메소드
    super.printInfo(); //부모 메소드를 사용하는 자식 메소드
    console.log(`build type is ${this.getBuildType}`);
  }
}

let consArea1 = new ConstructionArea('gap', 300, 200, 'building');
consArea1.printInfo();
//this area name is gap, height is 300, width is 200
//build type is building
```

끝.

참고
- [class](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/class)
