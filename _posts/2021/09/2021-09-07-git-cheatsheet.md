---
layout: post
title: "git cheatsheet"
date: 2021-09-07
tags: git cheatsheet
---

#### merge conflict 가 났는데..

* 너무 많이 달라서 merge 가 힘들다. 내 코드는 잘 안다. 
* 그럼 그냥 상대방것으로 엎어치고 (override update (svn)) 그상태에서 수정을 하자
``` shell
$ git checkout --theirs <conflict-file-name>
```

#### a branch 에서 작업 중(commit 안침)인데, b branch 에서 다른 작업을 해야한다.

stash 에 untracked  까지 저장할 수 있다.
``` shell
# -u|--include-untracked
# -m|--message

$ git stash push -u -m "식별 가능한 메세지"

# stash 에 저장하고 나면 깨끗해진다.

$ git status
현재 브랜치 feature-a
커밋할 사항 없음, 작업 폴더 깨끗함
```

작업이 끝나서 다시 a branch 로 와서 작업했던 내용을 꺼내고싶다면..
``` shell
# list 로 조회한다음에 code-test stash 를 되돌리고 싶다.

$ git stash list
stash@{0}: On feature-a: c
stash@{1}: On feature-a: code-test
stash@{2}: On feature-a: code01 advance

$ git stash apply stash@{1}

# apply 는 pop 과 달리 stash list 를 비우지않는다.
# pop 은 stash@{0} (맨위쪽) stash 를 적용(apply)하고 삭제(drop)한다
# 개인적으로는 apply 후 직접 drop 하는 걸 선호한다.
```

#### stash show 를 할때는..

`-u|--include-untracked` 옵션을 까먹지말자..

``` shell
# 이것과
$ git stash show stash@{0}

# 이것은 다르다.. -u|--include-untracked 옵션을 빼먹어서 untracked 파일을 못보고 날릴뻔했다 ㅠ,ㅠ
$ git stash show -u stash@{0}
```

#### branch 가 시작된 commit 을 확인하고 싶다
``` shell
$ git show --summary `git merge-base <check branch> <parant branch of check branch>`
```

#### 현재 branch 와 다른 branch 와 달라진 파일목록만 보고싶다
``` shell
$ git diff --name-status <DIFF-TARGET-BRANCH>
```