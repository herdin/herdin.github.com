---
layout: post
title: "linux yaml parser, yq 사용"
date: 2021-09-23
tags: linux yaml software
---

`yaml` 을 command 에서 이쁘게 볼 수 있는 방법이 뭘까 찾다가 발견.

바로 설치.
``` shell
$ brew install yq
```

간단한 사용법
``` shell
$ yq e '.clusters' <(cat ~/.kube/config)
```

> pipeline 으로 사용가능한 `jq` 가 더 편한것같지만...

참고
- [yq](https://mikefarah.gitbook.io/yq/)