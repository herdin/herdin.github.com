---
layout: post
title: "Git Rebase"
date: 2019-07-25
tags: git
---

# `rebase`
이미 커밋한 히스토리를 수정할 떄 사용한다.

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
