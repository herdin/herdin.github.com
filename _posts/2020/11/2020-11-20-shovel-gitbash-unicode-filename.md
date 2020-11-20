---
layout: post
title: "Gitbash 사용 시, 파일 및 경로명이 인코딩 안될때"
date: 2020-11-20
tags: gitbash shovel
---

`git log`, `git status`, `git add` 등 git 을 사용할 떄, 파일명이 한글이면 유니코드로 나올 경우가 있다.  
이렇게 되면 어떤 파일인지 식별이 안되서 아주 곤란하다...  
파일명을 영어로 변경하면 되겠지만..

### 아니 이게 무슨 소리요!!

``` shell
$ git status
Untracked files:
  (use "git add <file>..." to include in what will be committed)
  "preWorkd/\354\262\355\234\732\234\545"
  "preWorkd/\354\262\123\234\732\234\545"
  "preWorkd/\354\262\355\532\732\567\333"
```

### 간단하게 해결

``` shell
$  git config --global core.quotepath off
```

끗


참고
- [How to make Git properly display UTF-8 encoded pathnames in the console window?](https://stackoverrun.com/ko/q/6248899)
