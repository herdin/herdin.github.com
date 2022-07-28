---
layout: post
title: "Git Stash"
date: 2019-07-25
tags: git
---

# cheat sheet

``` shell
$ git stash list
$ git push -m "your stash message"

# stash 일부 삭제
$ git stash drop ${stash@{index} | message}
# stash 전부 삭제
$ git stash clear
```

# `git stash`
현재 작업하던 것을 잠깐 저장해놓고, 워킹 디렉토리를 HEAD 상태로 바꾼다.

## `git push`

깨끗한 상황에서
```shell
$ git status
현재 브랜치 feature-temp
커밋할 사항 없음, 작업 폴더 깨끗함
```

## `git stash (save <STASH-NAME>)` -> 는 이제 `Deprecated`, `push` 를 사용하자.
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

## `git stash push`

* `-u|--include-untracked` : 추적하지 않는 파일도 stash 에 저장
* `-m|--message <message>` : stash 메세지 작성

아래와 같이 experimental-work 는 추적중인데 수정한거, private-work 는 추적중이지 않는 파일일 때 그냥 다 stash 에 넣고 싶다. 그러면..

``` shell
$ git status
현재 브랜치 develop-temp
브랜치가 'origin/develop'보다 2개 커밋만큼 앞에 있습니다.
  (로컬에 있는 커밋을 제출하려면 "git push"를 사용하십시오)

커밋하도록 정하지 않은 변경 사항:
  (무엇을 커밋할지 바꾸려면 "git add <파일>..."을 사용하십시오)
  (use "git restore <file>..." to discard changes in working directory)
	수정함:        experimental-work

추적하지 않는 파일:
  (커밋할 사항에 포함하려면 "git add <파일>..."을 사용하십시오)
	private-work

커밋할 변경 사항을 추가하지 않았습니다 ("git add" 및/또는 "git commit -a"를
사용하십시오)

```

``` shell
$ git stash push -u -m "my-first-stash"
```

## `git stash list`

stash list 를 확인한다

``` shell
lg@HARM-LAPTOP MINGW64 /c/noneedinstall/PortableGit/localRepo/gitStudy (stash-test)
$ git stash list
stash@{0}: On stash-test: my-first-stash2
stash@{1}: On stash-test: my-first-stash1
stash@{2}: On stash-test: my-first-stash0
```

## `git stash show`

stash 하나를 확인한다

``` shell
git stash show stash@{0}
 .../a/a.java     | 14 +-------------
 .../b/b.java   | 14 +-------------
 .../r/r.xml    |  6 ++++++
 3 files changed, 8 insertions(+), 26 deletions(-)
```

뭐가 변경되었는지 확인하고 싶다면 `-p` 옵션을 사용한다. diff 처럼 나온다.

``` shell
git stash show -p stash@{0}
```

## `git stash pop`
맨 위쪽의 stash 를 꺼내오고(stack 으로 쌓여있다), stash list 에서 삭제한다.

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


참고
- [7.3 Git 도구 - Stashing과 Cleaning](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Stashing%EA%B3%BC-Cleaning)