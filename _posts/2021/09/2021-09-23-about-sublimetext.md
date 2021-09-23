---
layout: post
title: "sublimetext 사용법"
date: 2021-09-23
tags: texteditor
---

* command + O : 폴더를 프로젝트처럼 열기
* command + P : 파일 찾기
* ctrl + 0(zero) : 현재 열려있는 파일을 왼쪽 프로젝트뷰에서 찾기
* command + shift + p : control plane (이것저것할 수 있음)
	- package control 을 설치하고, package control 을 통해 plug-in 을 설치할 수 있다.
	- package control 을 설치하고, markdownpreview 를 검색해 설치해보자
	- preferences:key binding 으로 에디터를 연다음에 오른쪽 에 아래것을 입력
``` javascript
[
	{ "keys": ["alt+m"], "command": "markdown_preview", "args": {"target": "browser", "parser":"markdown"} },
]
```
	- 이후로는 alt + m 으로 렌더링된 html 을 브라우져로 볼 수 있다. `쩐다!!`
	- markdown 내용이 변경되더라도 새로고침만 하면된다. `쩐다!!`
