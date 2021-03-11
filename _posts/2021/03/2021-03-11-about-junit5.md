---
layout: post
title: "JUnit4 에서 JUnit5 로 옮겨가기"
date: 2021-03-11
tags: test junit spring-boot
---

Spring Boot 2.2.x 이후로는 JUnit5 가 기본으로 포함되어 있다.
> JUnit4 에 대한 호환성 제거시 exclude - org.junit.vintage:junit-vintage-engine  
> 하지만 굳이 이걸 제거해야될까?  
> JUnit5 의 기능을 온전히 사용하기 위해선 제거해야겠다.

### 설정

`org.springframework.boot:spring-boot-starter-test` 에는 JUnit4 에 대한 의존성이 있으므로 제거해주자

``` groovy
testImplementation('org.springframework.boot:spring-boot-starter-test') {
    exclude module: 'junit'
}
```

그리고 JUnit5 를 추가하자

``` groovy
testImplementation('org.junit.jupiter:junit-jupiter-api:5.2.0')
testCompile('org.junit.jupiter:junit-jupiter-params:5.2.0')
testRuntime('org.junit.jupiter:junit-jupiter-engine:5.2.0')
```

참고한 블로그에선 아래 설정을 하라는데 안해도 되는데? test platform 을 gradle 을 써야할때는 설정을 해야될지도 모르겠다.
gralde test task 실행 시 JUnit5 platform 임을 알려준다는데..

querydsl 설정 때문에 test/build platform 을 IDE 로 사용하지 않으면 빌드 시 오류가 나서 바꿔놨기 때문에 잘 모르겠다.
그냥 참고

``` groovy
@Incubating
public void useJUnitPlatform() {
    useJUnitPlatform(Actions.<JUnitPlatformOptions>doNothing());
}
```

### 테스트 케이스

아래로 변경된것 말고는 아직 모르겠다 아래서 정리해야지

* `@Runwith` -> `@ExtendWith`
* `SpringRunner.class` -> `SpringExtension.class`

``` java
@ExtendWith(SpringExtension.class)
@SpringBootTest
class AccountServiceTest {
    @Autowired
    AccountService accountService;

    @Test
    void save() {}
}
```

### 변경된 것

- JUnit4 는 단일 jar 였지만, JUnit5 는 JUnit Platform, JUnit Jupiter, JUnit Vintage 모듈로 나뉘어져있다.
- 테스트 작성을 위한 API 와 테스트 실행을 위한 API 가 분리되어있다.
  - JUnit Jupiter는 테스트 코드 작성에 필요한 junit-jupiter-api 모듈과 테스트 실행을 위한 junit-jupiter-engine 모듈로 분리
- JUnit4 로 작성한 코드는 vintage-engine 으로, JUnit5 로 작성한 코드는 jupiter-engine, jupiter-api 로 구동된다.
- lambda 기반의 assertion 을 지원하기 때문에, assertJ 를 사용하던 불편함이 없어졌다고한다. (안써봐서 모름)

#### 라이프사이클
* `@Runwith(SpringRunner.class)` -> `@ExtendWith(SpringExtension.class)`
* `@BeforeClass` -> `@BeforeAll`
* `@Before` -> `@BeforeEach`
* `@After` -> `@AfterAll`
* `@AfterClass` -> `@AfterEach`
- `@Ignore` -> `@Disabled`

### 추가된 것

#### `@DisplayName`
테스트를 실행할 경우, 메소드명이 테스트 결과에 나오기 때문에 어떤 테스트인지 알아보기 쉽게하기위한 노력이 있었는데(한글로_열심히_설명한다던지), `@DisplayName` 으로 표시될 테스트 명칭을 자유롭게 String 으로 적을 수 있게 되었다.
> 만약 표시가 안되면, Preferences -> Build, Execution, Displayment -> Build Tools -> Gradle -> Run tests using -> Intellij IDEA

### Life cycle
BeforeAll -> BeforeEach -> Test -> AfterEach -> AfterAll

참고
- [Junit5, Junit4에서 Junit5으로](https://sabarada.tistory.com/79)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [JUnit 5 vs JUnit 4](https://howtoprogram.xyz/2016/08/10/junit-5-vs-junit-4/)
