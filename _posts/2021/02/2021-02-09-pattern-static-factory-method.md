---
layout: post
title: "정적 팩토리 메소드"
date: 2021-02-09
tags: design-pattern
---

낙후된 환경에서 정적 팩토리 메소드를 `of` 로 명명하고 사용했더니, Sonar cube 가 메소드명으로 너무 짧은걸 쓰지말라며 major issue 로 잡았다.

주변 사람들이 이해를 못하는 와중에 나도 명쾌하게 설명할 수가 없어서, 이번 기회에 정리하기로 했다.

## 정적 팩토리 메소드, static factory method

객체를 캡슐화 하는 기법으로, 객체를 생성하는 메소드를 만들고, static 을 선언하는 방법이다.

흔히 볼 수 있는 `String.valueOf()` 메소드나 `List.of(1, 2, 3)` 을 생각하면 되겠다.

흔히 사용하는 네이밍 컨벤션은 다음과 같다.

* `valueOf` : argument 로 들어오는 값을 가지는 인스턴스를 생성할 경우
* `of` : valueOf 의 줄인 형태
* `getInstance` : argument 로 들어오는 값을 가질 수도 아닐수도있는 인스턴스를 생성할 경우, 싱글톤일 경우 argument 없고 매번 같은 객체 반환
* `newInstance` : getInstance 와 비슷하지만, 매번 새로운 객체 생성
* `getType` : getInstance 와 비슷하지만, 반환될 객체의 클래스와 다른 클래스에 팩토리 메소드가 있는 경우 (싱글톤 일 경우 참고)
* `newType` : getType 과 비슷하지만 매번 새로운 객체 생성

이 패턴을 사용하면 뭐가 좋을까?

* 생성자와는 다르게 이름이 있으므로 가독성이 좋아진다.
* 호출할 떄마다 새로운 객체를 만들 필요가 없다.
> Immutable 객체를 캐싱해 사용하는 경우를 말한다.
> public static BigDecimal[] cache = new BigDecimal[10]; 배열에 미리 객체를 세팅해두고, 이것을 상황에 맞게 반환하는 경우를 의미

* 하위 자료형 객체를 반환할 수 있다.
* parameterized type 객체를 만들때 편하다. -> jdk7 이후로는 의미가 없는 듯 하다.
> List<String, List<String>> list = new ArrayList<String, List<String>>(); 이렇게 쓰는걸
> List<String, List<String>> list = MyArrayList.newMyList(); 이렇게.. 하지만 이제는 타입추론을 지원하므로
> List<String, List<String>> list = new ArrayList<>(); 이렇게 쓰는쓰기 때문에 필요가 없어진 것 같다.

뭐가 나쁠까?

* 정적 팩토리 메소드만 있는 클래스라면, 하위 클래스를 만들 수 없다.
* 정적 팩토리 메소드는 다른 정적 메소드와 구별하기 힘들다.
