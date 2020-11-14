---
layout: post
title: "Spock with Spring, Exception, NoClassDefFoundError, ContextConfiguration"
date: 2020-11-13
tags: shovel spring test spock
---

`groovy` 로 써진 `Spock` 이라는 테스트 프레임워크를 사용하게 되면, JUnit 으로도 테스트를 잘 하고 있었지만, 그것보다 더 명시적으로 테스트를 할 수 있다고 과거에서 소식을 들었다.

> ㅠㅠ 병신 ㅠㅠ

아무튼 아래의 참고 글들을 보며 `오 나도 따라해서 힙한 개발자가 된 기분을 느껴야징` 이라 생각했지만, 글 작성일이 2013, 2017, 2018 ...

> ㅠㅠ 병신 ㅠㅠ

아무튼, 저기에 글자 그대로 써져있는대로만 하면 안된다. 똑똑하신 분들은 그렇지 않겠지만..


## 어? 이게 왜 안되지?

써져있는데로 했는데? 아래와 같은 오류를 마주쳤다.
```
Exception in thread "main" java.lang.NoClassDefFoundError: org/springframework/test/context/ContextConfiguration
	at org.spockframework.spring.SpringExtension.isSpringSpec(SpringExtension.java:83)
	at org.spockframework.spring.SpringExtension.visitSpec(SpringExtension.java:59)
	at org.spockframework.runtime.ExtensionRunner.runGlobalExtensions(ExtensionRunner.java:46)
	at org.spockframework.runtime.ExtensionRunner.run(ExtensionRunner.java:40)
	at org.spockframework.runtime.Sputnik.runExtensionsIfNecessary(Sputnik.java:88)
	at org.spockframework.runtime.Sputnik.getDescription(Sputnik.java:55)
	at com.intellij.junit4.JUnit4IdeaTestRunner.getDescription(JUnit4IdeaTestRunner.java:78)
	at com.intellij.junit4.JUnit4IdeaTestRunner.startRunnerWithArgs(JUnit4IdeaTestRunner.java:50)
	at com.intellij.rt.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:33)
	at com.intellij.rt.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:230)
	at com.intellij.rt.junit.JUnitStarter.main(JUnitStarter.java:58)
Caused by: java.lang.ClassNotFoundException: org.springframework.test.context.ContextConfiguration
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:602)
	at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:178)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:521)
	... 11 more

Process finished with exit code 1
```

결론부터 말하자면, Spring Boot 환경이어야 한다.  
여기서 Spring Boot 환경이라는 것은, 테스트 환경에 spring-boot-starter-test 가 포함되어야 한다는 것이다.

```groovy
testImplementation('org.springframework.boot:spring-boot-starter-test')
```

끝.


참고
- [SpringBoot, Spock 이용해 테스트코드 작성하기](https://lemontia.tistory.com/723)
