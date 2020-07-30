---
layout: post
title: "Git Stash"
date: 2019-07-25
tags: git
---

# `stash`
현재 작업하던 것을 잠깐 저장해놓고, 워킹 디렉토리를 HEAD 상태로 바꾼다.

현재 상태, branch `stash-test` 에 `code01`, `code02`, `code03` 파일이 있다. 워킹 디렉토리는 깔끔한 상태.

``` shell
$ git status
On branch stash-test
nothing to commit, working tree clean

$ ls
code01  code02  code03
```

여기에서 작업중인 파일을 하나 만들고, add 해서 stage area 로 보낸다.
``` shell
$ vim code04-working
$ git add .
$ git status
On branch stash-test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   code04-working
```

## 어? 그런데..
작업 중인 내용을 commit 하면 안되거나, 하기 싫은 상황에서, 최신버전의 코드를 수정해야될 일이 생겼다.
* 배포하고 개발하던 중, 배포된 소스에 문제가 생겨서 배포된 소스 이후부터 수정을 해야한다거나
> 브랜치를 따면 되지만 아무튼..

* 개발하고 있는데, 누군가 최신소스 체크좀 해달라고 하거나..

그럼 현재 작업 중인 내용을 잠깐 어디에(stash) 넣어두면된다.

## `git stash (save <STASH-NAME>)`
``` shell
$ git stash
Saved working directory and index state WIP on stash-test: 49bf8b2 03 mod mod, add 02 03

$ git status
On branch stash-test
nothing to commit, working tree clean
```

이름을 붙여서 넣어둘 수도 있다.
``` shell
$ git stash save my-first-stash
Saved working directory and index state On stash-test: my-first-stash

$ git status
On branch stash-test
nothing to commit, working tree clean
```

넣어 둔 것을 확인해보자

## `git stash list`

``` shell
lg@HARM-LAPTOP MINGW64 /c/noneedinstall/PortableGit/localRepo/gitStudy (stash-test)
$ git stash list
stash@{0}: On stash-test: my-first-stash
```

넣어 둔 것을 꺼내보자
## `git stash pop`
마지막 stash 를 꺼내오고, stash list 에서 삭제한다.

``` shell
$ git stash pop
On branch stash-test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   code04-working

Dropped refs/stash@{0} (093952fa06cbc9d3b71486c7acd7bffa5bca9bbc)
```

## `git stash apply`
git stash pop 과 비슷하지만, stash list 에서 삭제하진 않는다.  
가져오기만 한다.

``` shell
$ git stash apply stash@{0}
On branch stash-test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   code04-working
```

## `git stash drop (stash@{index})`
stash list 에서 저장내역을 삭제한다. 인자를 주면 인자에 해당하는 저장내역을 삭제하고,  
인자가 없으면 stack 의 맨 위에 있는 저장내역을 삭제한다.

## `git stash clear`
모든 stash
