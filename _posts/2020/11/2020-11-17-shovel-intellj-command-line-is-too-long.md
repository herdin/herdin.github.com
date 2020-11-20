---
layout: post
title: "intellj, Command line is too long"
date: 2020-11-17
tags: shovel intellj ide
---

Spring Boot, Jpa, MariaDB, Eureka, ... 가 들어간 프로젝트를 만들고, DB 연결확인하려고 RepositoryTest 를 만들어서 @Autowired 받아서 로그만 찍는 테스트를 만들었는데...

```
오후 13:07	Error running 'AccountRepositoryTest.initTest': Command line is too long. Shorten command line for AccountRepositoryTest.initTest or also for JUnit default configuration.
```

갓텔리제이가 저런 오류를 뱉으면서 실행도 안한다.

이럴때는

`.idea/workspace.xml` 파일을 열어서 아래 추가한 설정을 넣으면 해결된다.

```
<component name="PropertiesComponent">
  ...
  <property name="project.structure.side.proportion" value="0.0" />
  <property name="settings.editor.selected.configurable" value="reference.settingsdialog.project.gradle" />
  <property name="vue.rearranger.settings.migration" value="true" />
  <property name="dynamic.classpath" value="true" /> <!-- 이 설정을 넣는다 -->
```

이유도 모르고 이렇게 해결하는 것이 참 마음에 안들지만... ㅠㅠ
