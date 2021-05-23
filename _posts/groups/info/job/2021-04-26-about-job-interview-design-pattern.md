---
layout: post
title: "커리어 빌딩, design pattern"
date: 2021-05-12
tags: job design-pattern
---

<!-- ------------------------------------------ -->
## 생성 패턴, Creational Patterns

#### abstract factory

#### builder

#### factory
* template pattern 의 생성패턴 버전
* 상위 클래스에게 알려지지 않은 구체 클래스를 생성하는 패턴

#### static factory method
* 객체 생성을 생성자가 아닌 static method 에서 함
* 이름이 있으므로 `List.of(1, 2, 3)` 가독성이 좋다
* 호출할 떄마다 새로운 객체를 만들지 않아도 된다.
* 하위 객체를 반환할 수도 있다.

#### prototype

#### singleton
* 객체생성을 한번만 해야될 경우
* 객체를 한번만 만들기 때문에 메모리 소모와 gc 를 줄일 수 있다.
* double check locking -> 해결방안이 있음

<!-- ------------------------------------------ -->
## 구조 패턴, Structural Patterns

#### adapter

#### bridge

#### composite

#### decorate

#### facade

#### flyweight

#### proxy

<!-- ------------------------------------------ -->
## 행동 패턴, Behavioral Patterns

#### chain of responsibility

#### command
command interface 구현체에 따라 내부 객체의 어떤 동작을 수행 할지를 결정

#### interpreter

#### iterator

#### observer

#### strategy
동작(전략)을 외부에서 interface 구현체로 받아 사용

#### template method
* 알고리즘의 구조를 메소드에 정의하고, 하위 클래스에서 알고리즘의 구조 변경 없이 알고리즘을 재정의하는 패턴 - GoF
* 상속을 통해 수퍼클래스의 기능을 확장할 때 사용, 변하지 않는 기능은 수퍼클래스에다 만들고, 확장되거나 자주 변하는 기능을 서브클래스에서 만들도록 함 - toby
* abstract class 에서 abstract method 순서등을 정의한 method 를 구현함으로써, abstract class 를 구현한 클래스에서 구체적인 행위를 구현.

#### visitor

#### mediator, 중재자

#### state

#### memento

<!-- ------------------------------------------ -->
## 아키텍처 패턴

#### front controller

#### MVC, 모델-뷰-컨트롤러

#### pub/sub

#### dao

#### dto

#### ioc

<!-- ------------------------------------------ -->
## 기타 패턴

#### dependency injection

#### interceptor filter

#### lazy loading

#### mock object



참고
- [디자인패턴 위키](https://ko.wikipedia.org/wiki/%EB%94%94%EC%9E%90%EC%9D%B8_%ED%8C%A8%ED%84%B4_(%EC%B1%85))
