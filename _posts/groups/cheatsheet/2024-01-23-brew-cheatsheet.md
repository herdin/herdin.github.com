---
layout: post
title: "brew cheatsheet"
date: 2024-01-23
tags: brew cheatsheet
---

``` shell
# 설치되어있는 항목 확인
# 둘의 차이는 몰?루
$ brew list
$ brew ls

# brief statistics for your Homebrew installatio
$ brew info {target} [--formula, --formulae, --cask, --casks]
$ brew info ktlint --formula

$ brew search [--formula, --formulae, --cask, --casks] {target}
$ brew search --formula ktlint

# homebrew 를 최신버전으로 update
# tab 되어있는 저장소 업데이트
$ brew update

# update 가 되어 upgrade 할 수 있는 항목을 upgrade 한다
$ brew upgrade
```

tab 과 formula 가 뭐지?

# 참고
* [brew 명령어 모음집](https://sukvvon.tistory.com/7)
