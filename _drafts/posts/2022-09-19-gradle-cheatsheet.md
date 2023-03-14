---
layout: post
title: "gradle cheatsheet"
date: 2022-09-19
tags: gradle
---

``` shell
# multimodule build
./gradlew :{MODULE_NAME}:{TASK_NAME}
./gradlew :herdin-api:bootBuildImage

# -P 로 gradle 안에 프로퍼티를 줄 수 도 있다.
./gradlew :herdin-api:bootBuildImage -PdockerId=hehe -PdockerPwd=hehe123

# dependency tree 를 볼 수 있다. intellij 로 보다가 어디서 왔는지 모르겠는 의존성 찾을 때 좋았다.
./gradlew :{MODULE_NAME}:dependencies
./gradlew :herdin-api:dependencies
```




