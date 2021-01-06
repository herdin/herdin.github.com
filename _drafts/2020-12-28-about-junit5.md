---
layout: post
title: "JUnit4 에서 JUnit5 로 옮겨가기"
date: 2020-12-28
tags: test junit spring-boot
---

Spring Boot 2.2.x 이후로는 JUnit5 가 기본으로 포함되어 있다.
> JUnit4 에 대한 호환성 제거시 exclude - org.junit.vintage:junit-vintage-engine  
> 하지만 굳이 이걸 제거해야될까?

##### 변경점

- JUnit 테스트에 표시되는 테스트 식별자, 메소드명 ->  `@DisplayName("Junit5, someService.doService() 테스트")`
> 만약 표시가 안되면, Preferences -> Build, Execution, Displayment -> Build Tools -> Gradle -> Run tests using -> Intellij IDEA

- `@RunWith(SpringRunner.class)` -> `@ExtendWith(SpringExtension.class)`
- `@BeforeClass` -> `@BeforeAll`
- `@AfterClass` -> `@AfterAll`
- `@Before` -> `@BeforeEach`
- `@After` -> `@AfterEach`
- `@Ignore` -> `@Disabled`

##### Life cycle
BeforeAll -> BeforeEach -> Test -> AfterEach -> AfterAll

참고
- [Junit5, Junit4에서 Junit5으로](https://sabarada.tistory.com/79)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
