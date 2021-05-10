---
layout: post
title: "테스트와 커버리지 관리를 위한 jacoco, coveralls 연동"
date: 2021-05-10
tags: test coverage
---

java project 에 `travis-ci`, `codecov` 를 사용하고 있었는데, `codecov` 가 jdk8 까지만 지원을 하는 것 같아서 project java 버전을 올리면서 버렷다.

그리고 coverage 를 측정하고싶긴한데 하면서 둘러보다보니 `jacoco` 로 coverage 를 측정하고, `coveralls` 에 전송하여 github 에서 뱃지형태로 볼 수 있겠다 싶어서 옮겨왔다.

#### maven plugin 추가
* maven-compiler-plugin: java 소스와 타겟의 버전설정
* maven-surefire-plugin: maven test phase 에 unit test 를 실행하도록함 -> 이게 없으면 리포트에 unit test 결과가 들어가지 않음
* jacoco-maven-plugin: coverage 측정 및 report 생성
* coveralls-maven-plugin: coveralls 에 업로드, coverall 에서 발급받은 token 을 설정해줘야한다.
``` xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <version>3.8.1</version>
  <configuration>
    <source>13</source>
    <target>13</target>
  </configuration>
</plugin>
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>2.22.0</version>
</plugin>
<plugin>
  <groupId>org.jacoco</groupId>
  <artifactId>jacoco-maven-plugin</artifactId>
  <version>0.8.4</version>
  <executions>
    <execution>
      <goals>
        <goal>prepare-agent</goal>
      </goals>
    </execution>
    <execution>
      <id>report</id>
      <phase>prepare-package</phase>
      <goals>
        <goal>report</goal>
      </goals>
    </execution>
  </executions>
</plugin>
<plugin>
  <groupId>org.eluder.coveralls</groupId>
  <artifactId>coveralls-maven-plugin</artifactId>
  <version>4.3.0</version>
  <configuration>
    <repoToken>YOUR-COVERALLS-TOKEN</repoToken>
  </configuration>
  <dependencies>
    <dependency>
      <groupId>javax.xml.bind</groupId>
      <artifactId>jaxb-api</artifactId>
      <version>2.3.1</version>
    </dependency>
  </dependencies>
</plugin>
```

#### .travis.yml
빌드 성공 후, 다시 테스트, 리포트, 업로드 하도록 한다.

``` yaml
after_success:
  - mvn clean test jacoco:report coveralls:report
```

이렇게하고 push 만하면, travis-ci 를 통해 빌드를 하고, 리포트 결과를 coveralls 에 올려서

아래와 같은 뱃지를 readme 에 달 수 있게된다 히히!

[![Coverage Status](https://coveralls.io/repos/github/herdin/SimpleJava/badge.svg?branch=master)](https://coveralls.io/github/herdin/SimpleJava?branch=master)

참고
- [coveralls maven plugin](https://github.com/trautonen/coveralls-maven-plugin)
