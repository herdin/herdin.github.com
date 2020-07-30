---
layout: post
title: "Git Reset"
date: 2019-07-25
tags: git
---

# `reset`
`commit` 을 되돌린다. 옵션에 따라 되돌리는 정도가 달라진다.
* HEAD가 가리키는 브랜치를 옮긴다. (--soft)
* Index를 HEAD가 가리키는 상태로 만든다. (--hard 옵션이 붙지 않았으면 여기까지)
* 워킹 디렉토리를 Index의 상태로 만든다. (--hard)

## `--soft <COMMIT>`
`index` 와 `working directory` 를 되돌리지 않고, 현재 `branch` 가 가리키는 `commit` 만 `<COMMIT>` 으로 변경한다.
> `commit` 만 되돌린다. 수정사항이 add 되어 `staging area` 에 들어가 있다. `commit` 만 다시 하면 되는 상황.  
> `git commit --amend` 명령과 동일하다

현재 로그
``` shell
* a777c69 (HEAD -> master) 2
* b6f3a87 reset study 2
* 876933d reset study 1
* 9de2bfa (origin/master, origin/HEAD) start again
*   15ac3cf merge conflit
|\
| * 237da11 mod text
* | 241c8af mod text2
|/
* 942209d (tag: v1.0) add line
* 2936c11 init commit
```

``` shell
$ git reset --soft HEAD~
$ git log --oneline --graph
* b6f3a87 (HEAD -> master) reset study 2
* 876933d reset study 1
* 9de2bfa (origin/master, origin/HEAD) start again
*   15ac3cf merge conflit
|\
| * 237da11 mod text
* | 241c8af mod text2
|/
* 942209d (tag: v1.0) add line
* 2936c11 init commit
```

## `--mixed <COMMIT>`
`reset --soft <COMMIT>` 상태에서 `staging area` 비운다.
> `commit` 과 `add` 를 되돌린다. 다시 `add` 한 다음, `commit` 해야한다.

## `--hard <COMMIT>`
`reset --mixed <COMMIT>` 상태에서 `working directory` 도 변경한다.

## 합치기(Squash)
커밋을 합치는 명령어가 있지만, reset 을 사용해서 더 간단하게 할 수도 있다.

`reset --soft` 로 HEAD 만 이동한뒤, commit 을 하면 된다.
``` shell
$ git log --oneline
d22f009 (HEAD -> master) add 02 03
a23d46f 03 mod mod
1bf2e15 02
299211c (origin/master) add code01

$ git reset --soft HEAD~2

$ git commit -m "03 mod mod, add 02 03"

$ git log --oneline
49bf8b2 (HEAD -> master) 03 mod mod, add 02 03
1bf2e15 02
299211c (origin/master) add code01
```

## `reset` 과 `checkout` 의 차이?
`git checkout [branch]` 와 `git reset --hard [branch]` 는 비슷해 보인다.
실제 결과도 비슷하다. 하지만, 중요한 차이점이 있다.

1. `checkout` 은 워킹 디렉토리를 안전하게 다룬다. `reset` 처럼 변경사항을 무시하지 않는다. 아직 commit 되지 않은 변경사항이 있으면 checkout 으로 branch 를 변경하지 못하게 막는다.  그에 반해 `reset` 은 확인하지않고 바꿔버린다.
2. checkout 은 HEAD 자체를 다른 branch 로 옮기지만, reset 은 HEAD 가 가르키는 branch 를 움직인다. (다른 commit 을 가르키도록)

## 하나 더
`git reflog` 를 실행하면, git 으로 명령 내린 것들이 로그처럼 나온다.
`git reset HEAD@{index}` 를 사용해 이전으로 돌아갈 수 있다.

참고
- [7.7 Git 도구 - Reset 명확히 알고 가기](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0)
