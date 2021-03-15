---
layout: post
title: "JUnit3 에서 JUnit4 로 옮겨가기"
date: 2021-03-15
tags: test junit
---

> 구닥다리 프로젝트 환경에 Test Framework 가  
> JUnit framework 의 TestCase interface 를 구현하고 있었고  
> 개인 프로젝트 JUnit 처럼 `@Test` 붙여서 테스트 만들고 싶은데  
> 왜 테스트 메소드 명을 프리픽스로 test 라고 붙여야되는지도 몰랐고  
> `@Before`, `@After` 는 안먹는지도 몰라서 불편했는데,  
> 알고보니 JUnit3 기반이었다...

### 설정
``` xml
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.8.1</version>
  <scope>test</scope>
</dependency>
```

### 변경된 것

* TestCase 를 상속 받아서 테스트 클래스를 만들어야 함.
  * TestCase 와의 의존성이 사라짐
* 테스트 메소드명은 test 로 시작해야 함.
  * JUnit4 에선 테스트 메소드명의 제약이 없어지고 `@Test` 로 마킹하여 구분함
  * `@Test` 어노테이션에 expected, timeout 과 같은 설정이 가능해짐.
* 각 테스트 전/후에 실행할 메소드는 `setUp`/`tearDown` 을 `@Override` 하여 구현.
  * `@Before`/`@BeforeClass`/`@After`/`@AfterClass` 등의 annotation 기반으로 변경.

### 추가된 것
* 테스트 클래스에 `@RunWith(OtherRunner.class)` 를 사용하여, JUnit Runner 말고 다른 클래스로 테스트 진행 가능

참고
- [테스트, 그리고 JUnit에 대한 간단한 요약](https://eminentstar.github.io/2017/07/23/about-junit-and-test.html)
- [JUnit 3 VS JUnit 4](https://m.blog.naver.com/kkpa1002/20110145727)
