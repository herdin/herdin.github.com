---
layout: post
title: "Spock 이 뭐지?"
date: 2020-11-13
tags: test spock
---


<img src="#" post-src="2020-11-13-about-spock.jpg">

> 응 아냐

Spock 이란 BDD(Behaviour-Driven Development) 프레임워크이다.
TDD(Test-driven Development) 프레임워크인 JUnit 보다 기대하는 동작과 테스트의 의도를 더 잘 드러내 준다고 한다.

뿐만 아니라 설정과 사용법도 쉽다!

> 어차피 블로그에서 짜집기 하는거 요점만 써야겠다.

JUnit 도 잘 모르지만 JUnit 과의 차이를 들어서 어떤 점에서 테스트의 의도가 더 잘 보이는지 알아보자.

여러 글에서도 다설명하고 있지만, 나도 똑같이 쓴다.

## 설정

#### build.gradle

의존성을 넣어준다.

``` groovy
plugins {
    id 'org.springframework.boot' version '2.2.4.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
    id 'groovy' // groovy 지원
}

group 'org.example'
version '1.0-SNAPSHOT'

sourceCompatibility = 13

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.spockframework:spock-core:1.1-groovy-2.4'
    testImplementation 'org.spockframework:spock-spring:1.1-groovy-2.4'
}
```

#### Test 코드 작성

JUnit 과 동일하게 Test 코드로 잡아준 경로에 `.groovy` 파일을 만들어준다.
> 어? 난 그루비 모르는데? -> 괜찮다.

아래와 같이 class 를 만들어 준다. `spock.lang.Specification` class 를 상속 받는것이 중요하다.

``` groovy
import spock.lang.Specification

class SpockTest extends Specification {
}
```

#### 테스트를 위한 더미 비지니스

간단하게 `enum` 하나만 만들었다.

가격을 지불하는 대상의 등급에 따라 지불 가격을 계산해주는 `enum`

``` java
public enum FeeCalculateType {
    /*일반 등급은 가격을 깍지 않음 */
    NORMAL("NORMAL", (amount) -> {
        validateAmount(amount); //공통 금액 체크
        return calculate(amount, 0);
    }),
    /* VIP 등급은 100원 깍아줌 */
    VIP("VIP", (amount) -> {
        validateAmount(amount); //공통 금액 체크
        return calculate(amount, -100);
    })
    ;
    String desc;
    Function<Long, Long> expression;
    FeeCalculateType(String desc, Function<Long, Long> expression) {
        this.desc = desc;
        this.expression = expression;
    }
    static boolean validateAmount(long amount) {
        if(amount < 0)
            throw new IllegalArgumentException("not accept negative amount -> " + amount);
        return true;
    }
    static long calculate(long amount, long addr) {
        if(amount+addr <= 0) return 0;
        else return amount + addr;
    }
    public long calculate(long amount) { return expression.apply(amount); }
}
```

## 다됐다. 이제 테스트 함수를 만들어서 비교해보자.

#### 일반등급 테스트 1 - 단순

먼저 JUnit 으로 짠 테스트 코드
``` java
@Test
public void 일반인은_안깍아준다() {
    //given
    Long 지불금액 = -1L;
    Long 계산금액 = -1L;
    지불금액 = 1000L;

    //when
    계산금액 = FeeCalculateType.NORMAL.calculate(지불금액);

    //expect
    assertEquals(지불금액, 계산금액);
}
```

그리고 Spock 테스트 코드

``` groovy
def "일반인은 안깍아준다"() {
    given:
    Long 지불금액 = 1000

    when:
    Long 계산금액 = FeeCalculateType.NORMAL.calculate(지불금액)

    then:
    지불금액 == 계산금액
}
```

그렇다. `groovy` 에서는 함수 정의(정확히는 동적 타입 선언)를 `def` 요딴식으로 한다. 그리고 함수명으로 String 을 받기 때문에 JUnit Test 메소드의 java 함수명의 제약에서 벗어날 수 있다.

한 케이스만 봤을 때는 뭐가 더 좋은지 느낌이 안 올 수도 있다.

#### 일반등급 테스트 2 - 복수의 파라미터

##### Junit
``` java
@Test
public void 일반인은_아무리_많이써도_안돼() {
    Long 지불금액 = -1L;
    Long 계산금액 = -1L;

    지불금액 = 1000L;
    계산금액 = FeeCalculateType.NORMAL.calculate(지불금액);
    assertEquals(지불금액, 계산금액);

    지불금액 = 5000L;
    계산금액 = FeeCalculateType.NORMAL.calculate(지불금액);
    assertEquals(지불금액, 계산금액);

    지불금액 = 10000L;
    계산금액 = FeeCalculateType.NORMAL.calculate(지불금액);
    assertEquals(지불금액, 계산금액);

    지불금액 = 50000L;
    계산금액 = FeeCalculateType.NORMAL.calculate(지불금액);
    assertEquals(지불금액, 계산금액);

    지불금액 = 100000L;
    계산금액 = FeeCalculateType.NORMAL.calculate(지불금액);
    assertEquals(지불금액, 계산금액);
}
```

##### Spock
``` groovy
def "일반인은 아무리 많이써도 안돼"() {
    expect:
    계산금액 == FeeCalculateType.NORMAL.calculate(지불금액)

    where:
    지불금액 | 계산금액
    1000     |   1000
    5000     |   5000
    10000    |  10000
    50000    |  50000
    100000   | 100000
    100000   | 100000
}
```

아 이것만봐도 느낌이 온다. 테스트 조건과 행위를 나눌 수 있다.

일반 등급외에 VIP 등급 테스트 또한 마찬가지기 때문에 자세한 코드는 생략한다.

#### 메소드의 호출횟수 체크

> 이런것도 할 수 있어?

#### 테스트를 위한 억지 비지니스

억지 알람 컨트롤러
``` java
public class DummyController {
    private DummyService dummyService;
    public DummyController(DummyService dummyService) {
        this.dummyService = dummyService;
    }
    public void sendMessage(String message, int sendCount) {
        for(int i=0; i<sendCount; i++) {
            dummyService.sendToSms(message);
            dummyService.sendToKaKao(message);
        }
    }
}
```

억지 알람 서비스
``` java
public class DummyService {
    public void sendToKaKao(String message) { System.out.println("send to kakao -> " + message); }
    public void sendToSms(String message)   { System.out.println("send to sms -> " + message); }
}
```

#### 호출횟수를 테스트해보자

``` groovy
class ServiceSpockTest extends Specification {
    def "호출 횟수 확인"() {
        given:
        def mockDummyService = Mock(DummyService)
        DummyController dummyController = new DummyController(mockDummyService)
        String message = "알람받아라~"
        int sendCount = 12;

        when:
        dummyController.sendMessage(message, sendCount)

        then:
        (12.._) * mockDummyService.sendToKaKao(message)
    }
}
```

`then: (12..)` 는 호출 횟수가 12번 이상인지를 체크하는 문법이다.
직관적이고 짱 쉬운 것 같다.

끝.


참고
- [창천향로 - Spock 소개 및 튜토리얼](https://jojoldu.tistory.com/228)
- [우형기술블로그 - Spock으로 테스트코드를 짜보자](https://woowabros.github.io/study/2018/03/01/spock-test.html)
- [NaverD2 - Spock으로 테스트하기](https://d2.naver.com/helloworld/568425)
- [Spock Primer 공식문서](http://spockframework.org/spock/docs/1.0/spock_primer.html)
