---
layout: post
title: "Linux, more 명령어 사용"
date: 2020-12-12
tags: linux command
---

로그를 보다보면 `more` 명령어를 사용할 경우가 많은데, 간단한 사용법을 매번찾는게 귀찮아서 기록한다

``` shell
$ more 파일명
```
- 화면 가득히 파일내용을 출력해준다
- `space bar` 를 누르면 파일에서 한줄씩 내려간다.
- `enter` 를 누르면 화면에서 한줄씩 내려간다.
- 현재보이는 내용이 전체 파일에서 몇 % 를 차지하는지 알려준다.
- `f` 를 누르면 forward 1페이지만큼 다음으로 간다
- 'b' 를 누르면 backward 1페이지만큼 이전으로 간다

<img src="#" post-src="2020-12-12-linux-command-more-1.PNG" />

- `/찾을문자열` 을 입력 하면 찾은 문자열이 있는 페이지로 간다.

<img src="#" post-src="2020-12-12-linux-command-more-2.PNG" />
