---
layout: post
title: "커리어 빌딩, java"
date: 2021-04-25
tags: job java
---

# 공통
#### 유니코드에 대해서 설명해보세요.
1바이트를 사용하는 아스키만으로는 전세계의 문자를 표현할 수 없어서 나온 코드표. 여러 코드표가 존재하며 널리 사용되는 UTF-8 은 1-4바이트 가변이다.

# java

- jdk 버전 별 차이
  - jdk 1.3
    - dynamic proxy?
  - jdk 1.4
    - nio
  - **jdk 1.5**
    - auto boxing/unboxing
    - annotation
    - generic
    - enum
    - concurrency
    - static import
  - jdk 1.7
    - nio - file
    - switch string
    - **auto closable**
  - **jdk 1.8**
    - 32bit support last version
    - lambda
    - stream
      - [Java 스트림 Stream (1) 총정리](https://futurecreator.github.io/2018/08/26/java-8-streams/)
    - local date time - joda time
    - interface default
  - jdk 9
    - **immutable collection**
    - private interface method
  - jdk 10
    - var keyward
  - jdk 11
  - jdk 12
    - switch ->
    - performance (+gabage collection)
  - jdk 13
    - switch yield

- lambda

#### collection 에 대해서 설명해보세요.
- Collection interface, 순서나 집합
  - Queue
  - List interface, 순서O 중복O
    - Linked List
    - Vector, ArrayList + ThreadSafe
      - Stack(Vector)
    - ArrayList
  - Set interface, 순서X 중복X
    - HashSet
    - SortedSet interface, 순서O
      - TreeSet
- Map interface, 키-값, 순서X 키중복X 값중복O
  - HashTable, ThreadSafe
  - HashMap
  - SortedMap interface, 순서O
    - TreeMap

* HashMap, HashTable 모두 Map 을 구현하고 있으나, HashMap 은 보조해시함수가 있어서 충돌이 상대적으로 적다.

- junit
  - 3, 4, 5 life cycle
  - 3
    - TestCase 상속
    - method prefix = test
    - setUp, tearDown 등 함수로 테스트 이전 이후 설정
  - 4
    - jdk5+
    - 독립 클래스(TestCase 상속x)
    - method prefix 삭제, annotation @Test 로 테스트 마킹
      - @Test(exception=ExpectedException.class)
      - @Test(timeout=ExpectedTimeOutMilliseconds)
      - @Ignore 로 테스트 제외
    - setUp -> @Before, tearDown -> @After, @BeforeClass, @AfterClass 추가
    - class level @RunWith, JUnit 의 TestRunner 대신 지정된 클래스로 테스트 진행
    - class level @SuiteClasses({TestClass01.class, ...}), 여러 테스트 유닛을 함께 돌림
  - 5
    - jdk8+
    - 의존성이 나눠짐. JUnit platform + JUnit jupiter + JUnit Vintage
    - JUnit platform, JVM 환경에서 테스트 프레임웍을 실행
    - JUnit jupiter, annotation, assert, ...
    - JUnit vintage, JUnit3, 4 지원
    - method level, @DisplayName 으로 테스트 명 스트링으로 지정가능
    - assert 함수의 파라미터 순서 변경, 좀 더 알아보기 쉽게
      - assertEquals("message", "expect", "actual") -> assertEquals("expect", "actual", "message")
    - @Test(exception) 으로 사용하면 예외 발생을 맨위에서 확인하므로 가독성에 문제가 생김
      - assertThrow(() => { throws new ExpectedException() }); 형식으로 lambda 를 사용하면서 가독성도 해결
    - @Ignore -> @Disabled
    - @Test(timeout) -> @Timeout
    - @Before -> @BeforeEach (after 도 마찬가지)
    - @BeforeClass -> @BeforeAll (after 도 마찬가지)
  - [공식문서](https://junit.org/junit5/docs/current/user-guide/#overview)
- String 의 encoding 방식

#### OOP, 객체 지향 프로그래밍에 대해서 설명해보세요.
- Encapsulation, 캡슐화
  - 객체의 속성과 행위(메소드)를 하나로 묶고, 실제 구현의 일부를 외부로부터 감춘다.
  - 사용자의 객체 접근 영역을 제한하여, 오용을 막는다
  - 객체간 결합도가 낮아진다
- Inheritance, 상속
  - 자식 클래스가 부모 클래스의 특성과 기능을 물려 받는 것.
  - 캡슐화를 유지하면서 클래스의 재사용을 용이하도록 만듬
- Polymorphism, 다형성
  - 인터페이스를 통해 상위 클래스의 참조변수가 어떤 하위 클래스를 가리키느냐에 따라 호출되는 메소드가 달라지는 것

#### 객체지향 5원칙에 대해서 설명해보세요.
- Single Responsibility Principle, 단일 책임 원칙
  구조를 깔끔하게 유지할 수 있고, 불필요한 수정을 예방하며, 기능을 명확하게 분리할 수 있다.
- Open-Closed Principle, 개방-폐쇄 원칙
  확장에는 열려있고 수정에는 닫혀있다.
- Liskov Substitution Principle, 리스코프 치환 원칙
  자식 클래스는 언제나 부모 클래스를 대체할 수 있다. 이를 지키지 못하면 다형성을 지킬 수 없게 된다.
- Interface Segregation Principle, 인터페이스 분리 원칙
  클라이언트에서 사용하지 않는 메소드는 만들지말고 인터페이스를 작게 나누어서 만든다. 인터페이스의 단일 책임 원칙.
- Dependency Inversion Principle, 의존성 역전 원칙
  추상성이 높은 고수준의 클래스는 구체적이고 불안정한 저수준 클래스에 의존하면 안된다. IoC 와는 다름.

#### class member 초기화 순서
- static 선언부, class 가 load 될때 초기화 된다. 기본값 -> 초기화 -> 블럭 순서
- 필드 선언부, 객체 생성시, 생성자보다 먼저 초기화 된다. 기본값 -> 초기화 -> 초기화 블럭 -> 생성자 순서
- 생성자 함수, jvm 내부적으로 thread-safe, 필드 변수 중 final 부분의 공개시점은 생성자 함수가 끝난 뒤

#### interface 를 사용하는 이유?
- class 가 구현해야하는 동작을 지정하는 추상자료형.
고 수준의 추상화가 이루어진 클래스에서 저수준 추상화의 구체적 클래스의 구현에 구애받지 않기 위해?

#### Generic 에 대해서 설명해보세요.
데이터 타입을 파라미터화 한 것으로, 사용할 데이터 타입을 컴파일 타임에 지정하는 것을 의미한다.
- *Type-Safe* 하게 데이터 형식을 일반화 할 수 있다.
- 타입 캐스팅에 자유로워진다.

#### Reflection 에 대해서 설명해보세요.
클래스 구조를 runtime 에 확인할 수 있도록 하는 기술. 정적언어의 한계를 넘게 해준다. (java 는 정적언어, javascript/python/ruby 는 동적언어)

#### serialVersionUID 의 사용 이유
Serializable interface 를 구현하여, Object Serialize 를 이용할 경우, (역)직렬화를 이용할 때, 검증하는 부분(일종의 체크섬이랄까?)
컴파일러마다 다른 값을 부여할 수 있기 때문에, 다른 컴파일러를 사용하는 기기일경우 (역)직렬화가 실패할 수 있다.

#### extends vs implements, 상속과 구현의 차이, 상속과 interface 의 차이
is-a 관계에서는 상속, can-do 관계에서는 구현
상속관계가 깊어지면 상위 클래스의 변경점에 대한 하위클래스의 사이드이펙트를 예측하기 힘들다.

#### JVM 메모리 영역에 대해서 설명해보세요.
JVM 의 구조
- Garbage Collector
- Class loader
- Excution Engine
- Runtime Data Area
  - Heap
    - Young
    - Old
  - NoneHeap - Metaspace(permanent)
  - Stack
  - PC Register, 현재 실행 중인 주소
  - Native Method Stack
  - Method Area, 인스턴스생성에 필요한 정보, 필드/메소드/생성자 등
    - Constant Pool, 상수/필드, 메소드의 레퍼런스값

#### GC 에 대해서 설명해 보세요.
weak generational hypothesis 가설에 의해 설계됨
- 대부분의 객체는 금방 접근 불가능 상태(unreachable)가 된다.
- 오래된 객체에서 젊은 객체로의 참조는 아주 적게 존재한다.
이를 위해 Young/Old 영역으로 물리적 공간을 나눔. 새로 만들어진 객체는 Yong Generation -> 오래되면 Old Generation(Young < Old),

* Permanent 영역은 메소드공간
* Young 영역의 GC 는 minor GC, Old 영역의 GC 는 Major/Full GC 그리고 stop-the-world 가 일어남.
  - Young 영역은 Eden 과 두개의 Survivor 영역, Eden -> Survivor1 <-> Survivor2 -> Old
* Old 영역의 객체가 Young 영역의 객체를 참조하는 것을 확인하기위해 Card Table 이 존재

HotSpot VM 에서는 빠른 메모리 할당을 위해 두가지 기술을 사용
- bump-the-pointer(Eden 영역에 할당된 마지막 객체를 추적하여 모든 크기 측정을 하지 않아도됨)
- TLABs(Thread-Local Allocation Buffers, 스레드 별 다른 Eden 영역 할당으로 Thread-safe) 라는 기술을 사용.

Old 영역의 GC 는 jdk7 기준 5가지,
- Serial GC -> 코어가 하나일때 만들어진 방식. 서버에서 사용금지, Mark(Old 영역의 살아있는 객체 식별)->Sweep(heap 의 앞부분부터 살아있는 것만 남김)->Compaction(순서대로 정리)
- Parallel GC/Throughput GC -> Serial GC 의 병렬 버전
- Parallel Old GC(Parallel Compacting GC) -> Mark-Summary-Compaction, Sweep 부분이 좀 다름
- Concurrent Mark & Sweep GC(이하 CMS/Low Latency GC) -> 복잡함
  - Initial Mark(클래스로더에서 가장 가까운 객체 중 살아있는 것 식별, stop-the-world)
  - Concurrent Mark(위의 식별된 객체가 참조하는 객체를 따라가며 식별, 스레드 별 수행. 전체가 멈추지 않음)
  - Remark(위의 객체 중 추가되거나 삭제된 것 식별)
  - Concurrent Sweep(식별된 객체 정리)
  - 응답시간이 제일 빠른 GC 이면서, CPU 를 가장 많이 사용하고 Compaction 단계가 없다. 그래서 Full GC 시간이 길어진다.
  - jdk 8 이전까지 기본
- G1(Garbage First) GC
  - jdk 9 부터 기본, 큰메모리를 가진 멀티 프로레서를 위해 개발.
  - Old 와 Young 영역 방식이 아님. 바둑판처럼 생긴 영역에 객체를 할당하고 GC 를 수행한다.
  - Eden -> Old 는 맞지만,
  - stop-the-world 를 최소화 하기위해 설계
  - Full GC 단계
    - Initial Mark - Old Region에 존재하는 객체들이 참조하는 Survivor Region을 찾는다. 이 과정에서 Stop-The-World가 발생하게 된다.
    - Root Region Scan - Initial Mark 에서 찾은 Survivor Region에서 GC 대상 객체를 탐색한다.
    - Concurrent Mark - 전체 Region에 대해 스캔하여, GC 대상 객체가 존재하지 않는 Region은 이후 단계에서 제외된다.
    - Remark - Stop-The-World 후, GC 대상에서 제외할 객체를 식별한다.
    - Cleanup - Stop-The-World 후, 살아있는 객체가 가장 적은 Region에 대해서 참조되지 않는 객체를 제거한다. Stop-The-World 끝내고 완전히 비워진 Region을 Freelist에 추가하여 재사용한다.
    - Copy - Root Region Scan 단계에서 찾은 GC 대상 Region이었지만 Cleanup 단계에서 살아남은 객체들을 Available/Unused Region에 복사하여 Compaction 작업을 수행한다.

#### Stream 의 장점/단점
- 외부 반복을 내부 반복으로 변경하여 동작에 집중할 수 있다.
- 고수준 추상화 덕분에 병렬처리에 신경쓰지 않아도 된다.
- 파이프라이닝으로 처리하기 때문에, 이론상

laziness(요청할때 계산), short-circuiting(allMatch, noneMatch, findFirst, findAny, 전체를 계산하지 않아도 결과를 낼 수 있음) 같은 최적화를 할 수 있다.

- 개발자가 해야될 것이 추상화되어 숨겨져있기 때문에 대체적으로 성능이 떨어진다.
- 성능 이야기를 좀 더 해보자면, 공유 thread pool 을 사용하기 때문에, 병렬수행 시 성능이 매우 떨어질 수 있다.
- 마찬가지로 오류가 생겼을때, 디버깅하기가 쉽지않다.
- 함수형 프로그래밍을 한다고해서 항상 가독성이 좋은 것도 아니다.

#### singleton 을 사용할 때 생기는 문제와 해결 방안에 대해서 말해보세요.
singleton 변수가 초기화 되지 않은 상태에서 다중 스레드가 동시에 인스턴스 요청을 할때, 흔히 일어나는 double check locking 문제가 있음.

해결방안
1. Eager Initialization, 이른 초기화
내부 static 변수에서 미리 만들어 놓는다. -> 필요 시점이 아니라 class load 시점에 singleton 변수가 초기화 된다. 간단함
2. Initialization-on-demand Holder Idiom - Static Holder 사용
내부 static 변수에서 미리 만들어 놓는건 마찬가지지만 lazy load 를 위해 private static class 로 static 변수를 담을 static holder class 를 둔다.
이렇게 하면, 내부 static class 기 때문에, 외부 class load 시점이 아니라 내부 class 가 load 되는 시점에 static 변수가 초기화 되어 lazy load 효과를 줄 수 있다.

singleton 객체에 너무 많은 책임을 주게되면 객체지향설계원칙을 어기게되어 (단일책임원칙 오픈클로즈) 유지보수가 어렵게 된다.
