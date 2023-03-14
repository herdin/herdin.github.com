---
layout: post
title: "generic, 공변성(covariant), 반공변성(Contravariance)"
date: 2023-01-12
tags: generic
---

java 쓸때는 그냥 느낌으로 사용했는데, kotlin 에서는 좀 더 많은 키워드들이 보여서

이해하고 넘어가야될 필요성을 느꼇다.

공변(covariant) : A가 B의 하위 타입일 때, T <A> 가 T<B>의 하위 타입이면 T는 공변
불공변(invariant) : A가 B의 하위 타입일 때, T <A> 가 T<B>의 하위 타입이 아니면 T는 불공변

# 공변성

이런 상속구조
Integer extends Number
Long extends Number

함수 추가
public Long sum(List<Number> numbers) {
    Long sum = 0L;
    for (Number number : numbers) {
        sum += number.longValue();
    }
    return sum;
}

List<Long> longNumbers = LongStream.range(0, 10).mapToObj(Long::new).collect(Collectors.toList());
List<Integer> intNumbers = IntStream.range(0, 10).mapToObj(Integer::new).collect(Collectors.toList());
sum(intNumbers); // compile error - Required type: List<Number> | Provided: List<Integer>

public Number sum(List<? extends Number> numbers) 로 변경하면 가능.
runtime error 발생 가능성은 없음. 어떤 타입인지 정확히 모르지만 아무튼 Number 를 상속받은 녀석이다. 읽어서 Number 처럼 사용이 가능한 것.

# 반공변성

함수 추가
public void addRandomLong(List<? extends Number> numbers) {
    numbers.add(RandomUtils.nextLong()); // compile error - Required type: capture of ? extends Number | Provided: long
}

public void addRandomLong(List<? super Long> numbers) 로 변경하면 가능.
뭔지 모르겠지만, Long 의 부모타입의 데이터가 들어온다. 그럼 적어도 Long 으로 쓸수 있는것.

# 참고
* [Java 제네릭의 형 변환(covariant & contravariant)](https://sabarada.tistory.com/124)
* [제네릭과 와일드카드 타입에 대해 쉽고 완벽하게 이해하기(공변과 불공변, 상한 타입과 하한 타입)](https://mangkyu.tistory.com/241)