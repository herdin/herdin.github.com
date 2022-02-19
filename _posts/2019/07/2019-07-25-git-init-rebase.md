---
layout: post
title: "Git Rebase"
date: 2019-07-25
tags: git
---


# 빠른사용

자세한 설명은 아래쪽에..

## 1. 커밋을 합치고 싶다.

현재 상황 develop-temp branch 에서 작업중인데, 작업했던 것을 다 합치고 싶다.

``` shell
$ git log --oneline -5
13e4685 (HEAD -> develop-temp) add 1, 1, 2, 3
99285be add c
935b826 done code01
0222a9e (origin/develop, test, develop) done code01
fa30853 code01 dev..
```

`-i` interactive 모드 와 `HEAD~3`  HEAD 를 포함한 3개까지의 commit 을 합친다.
``` shell
$ git rebase -i HEAD~3
```

그럼 편집기가 열리면서 요딴식으로 나오는데..
``` shell
pick 935b826 done code01
pick 99285be add c
pick 13e4685 add 1, 1, 2, 3

```

그걸 아래와 같이 고친다. squash 는 이전 commit 에 이후 commit 을 녹이는 작업이다. 그래서 이전 commit 이 없으면 안된다.  
pick -> s 로 고침. s 는 squash 를 의미. 저렇게 고치고나서 `:wq` 로 저장 후 나가면..

> squash <commit> = use commit, but meld into previous commit

``` # 커밋 3개가 섞인 결과입니다.
# 1번째 커밋 메시지입니다:

done code01, add c, d, 1, 1, 2, 3

# 커밋 메시지 #2번입니다:



# 커밋 메시지 #3번입니다:


shell
pick 935b826 done code01
s 99285be add c
s 13e4685 add 1, 1, 2, 3
```

로그를 어떻게 수정할 건지 물어보는 편집기가 또 열린다.

``` shell
# 커밋 3개가 섞인 결과입니다.
# 1번째 커밋 메시지입니다:

done code01

1

2

# 커밋 메시지 #2번입니다:

add c

add d

# 커밋 메시지 #3번입니다:

add 1, 1, 2, 3


```

잘고쳐준 뒤, 마찬가지로 `:wq` 로 저장 후 종료하면..

``` shell
# 커밋 3개가 섞인 결과입니다.
# 1번째 커밋 메시지입니다:

done code01, add c, d, 1, 1, 2, 3

# 커밋 메시지 #2번입니다:



# 커밋 메시지 #3번입니다:



```

합쳐진것을 확인할 수 있다.

``` shell
git log --oneline -5
0032bd9 (HEAD -> develop-temp) done code01, add c, d, 1, 1, 2, 3
0222a9e (origin/develop, test, develop) done code01
fa30853 code01 dev..
```

## 2. 커밋 메세지를 수정하고 싶다.

현재 상황.. done code01, add c, d, 1, 1, 2, 3 -> 이 커밋 내용을 심플하게 done! 으로 바꾸고싶다.

``` shell
$ git log --oneline -5
0032bd9 (HEAD -> develop-temp) done code01, add c, d, 1, 1, 2, 3
0222a9e (origin/develop, test, develop) done code01
fa30853 code01 dev..
```

커밋 메세지만 수정할거니까.. `-i` interactive 모드 와 `HEAD~1`  HEAD 를 포함한 1개의 commit 을 수정한다.

``` shell
$ git rebase -i HEAD~1
```

그럼 아래와 같이 편집기가 열린다.

``` shell
pick 0032bd9 done code01, add c, d, 1, 1, 2, 3
```

`r` reword 로 마킹하고 `:wq` 로 저장 후 종료하면..

``` shell
r 0032bd9 done code01, add c, d, 1, 1, 2, 3
```

마찬가지로 커밋 메세지를 수정할 수 있는 편집기가 열린다.
``` shell
done code01, add c, d, 1, 1, 2, 3 
```

done! 으로 수정한 뒤, `:wq` 저장 후 종료한뒤, 확인해보자.

``` shell
$ git log --oneline -5
d34433f (HEAD -> develop-temp) done!
0222a9e (origin/develop, test, develop) done code01
fa30853 code01 dev..
```


# `rebase`
~~이미 커밋한 히스토리를 수정할 떄 사용한다.~~ 완전 잘못 이해했었음.

branch 의 parent 를 변경할 떄 사용.

히스토리를 수정하거나 커밋을 합치는것은 부가적인 기능이다.

``` shell
$ git checkout -b feature-a
$ .... working....
# feature-a branch 의 부모를 master 로 변경한다. 
$ git rebase master
```

## `-i`, `--interactive`
대화형으로 rebase 실행한다.

대화형으로 커밋을 수정할때, 아래와 같은 방법들이 있다.

### pick, p
커밋 순서를 변경한다.

현재 커밋상태

``` shell
$ git log --oneline
ab1b2e7 (HEAD -> feature-03) feature33
61840bc feature32
4b6dff3 feature31
b71edbe feature03
511a2a0 feature03
a165c9b feature3
07cfb82 fix bug3
dd2c2a5 Merge branch 'master' into develop
53299fd (master) hotfix1-1,1-2,1-3,1,1-2
888c443 fix bug1
b053989 fix bug02
2ca8e8b fix bug01
c12791f (origin/master) add main
```

commit feature32 와 feature33 의 커밋 순서를 바꿔본다.  
에디팅 모드에서 단순하게 커밋위치를 변경하면된다.

``` shell
$ git rebase -i HEAD~4

pick b71edbe feature03
pick 4b6dff3 feature31
pick ab1b2e7 feature33
pick 61840bc feature32
```

확인해보면,

``` shell
$ git log --oneline
92efb5b (HEAD -> feature-03) feature32
03b4863 feature33
4b6dff3 feature31
b71edbe feature03
511a2a0 feature03
a165c9b feature3
07cfb82 fix bug3
dd2c2a5 Merge branch 'master' into develop
53299fd (master) hotfix1-1,1-2,1-3,1,1-2
888c443 fix bug1
b053989 fix bug02
2ca8e8b fix bug01
c12791f (origin/master) add main
```

### reword, r
커밋 메세지를 변경한다.

현재 커밋상태

``` shell
$ git log --oneline --graph
* e810ee0 (HEAD -> master) hotfix1-3
* f1e5097 hotfix1-2
* 050139b hotfix1-1
* c12791f (origin/master) add main
```

그냥 `git rebase` 를 입력하면 커밋을 순서대로 보여준다.

``` shell
$ git rebase
First, rewinding head to replay your work on top of it...
Applying: hotfix1-1
Applying: hotfix1-2
Applying: hotfix1-3
```

`git rebase -i` 옵션으로 실행하면 에디터 창이 뜬다.
`git rebase -i HEAD~2` HEAD 포함하여 2개의 커밋을 대상으로 한다.

``` shell
$ git rebase -i

pick 050139b hotfix1-1
pick f1e5097 hotfix1-2
pick e810ee0 hotfix1-3

# Rebase c12791f..e810ee0 onto c12791f (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

기본적으로 `pick` 커맨드가 적용이 되어있다. 따라서 그냥 `:wq`  하면 아무런 변경사항 없이 종료된다.

``` shell
pick 050139b hotfix1-1
reword f1e5097 hotfix1-2
pick e810ee0 hotfix1-3
```

`r` 또는 `reword` 커맨드를 사용하면(에디팅 모드에서 pick 으로 되어있는 것을 지우고, r 또는 reword 를 입력하고, :wq 로 저장하고 나가면) 커밋 메세지를 수정할 수 있는 에디터가 열린다.

``` shell
hotfix1-2-mod-from-rebase

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Tue Jul 9 20:50:06 2019 +0900
#
# interactive rebase in progress; onto c12791f
# Last commands done (2 commands done):
#    pick 050139b hotfix1-1
#    reword f1e5097 hotfix1-2
# Next command to do (1 remaining command):
#    pick e810ee0 hotfix1-3
# You are currently editing a commit while rebasing branch 'master' on 'c12791f'.
#
# Changes to be committed:
#       modified:   hotfix-01
```

수정한뒤, `hotfix1-2` -> `hotfix1-2-mod-from-rebase` `:wq` 로 저장후 종료하면

``` shell
$ git log --oneline --graph
* 91db62d (HEAD -> master) hotfix1-3
* 1159e30 hotfix1-2-mod-from-rebase
* 050139b hotfix1-1
* c12791f (origin/master) add main
```

커밋 메세지가 변경된다.

# squash
커밋을 합친다.

현재 커밋 상태.

`hotfix-1` 에서 수정을 여러번 했고 그게 그대로 `master` 에 편입되어 메세지가 더러운 상태다.

> master 에서 hotfix-1 hotfix-2 hotfix-3 중에서 hotfix-1 이 merge 되었고,
> rebase 로 커밋메세지를 변경한다음 hotfix-1 에서 추가 수정을 한 뒤,
> 또 merge 하니까 이런 모양새가 되었다.

``` shell
$ git log --oneline --graph
*   8386aa9 (HEAD -> master, hotfix-3, hotfix-2) Merge branch 'hotfix-1'
|\
| * 2794231 hotfix1-2
| * ba77a63 hotfix1
| * fc03e1e hotfix1
| * acd1ed5 hotfix1
* | 91db62d hotfix1-3
* | 1159e30 hotfix1-2-mod-from-rebase
* | 050139b hotfix1-1
|/
* c12791f (origin/master) add main
```

쫙 다 합쳐보겠다.

``` shell
$ git rebase -i

p 050139b hotfix1-1
squash 1159e30 hotfix1-2-mod-from-rebase
s 91db62d hotfix1-3
s acd1ed5 hotfix1
s fc03e1e hotfix1
s ba77a63 hotfix1
s 2794231 hotfix1-2
```

``` shell
$ git log --oneline --graph
* 53299fd (HEAD -> master) hotfix1-1,1-2,1-3,1,1-2
* c12791f (origin/master) add main
```

# \-\-abort
현재 rebase 상태를 취소한다.


참고
- [3.6 Git 브랜치 - Rebase 하기](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0)