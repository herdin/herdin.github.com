---
layout: post
title: "git cheatsheet"
date: 2021-09-07
tags: git cheatsheet
---

# git commit 상대참조 - ^, ~1, ...

HEAD^, HEAD~1 이런식으로 많이 사용된다.

HEAD^ : HEAD 전 커밋
HEAD^^ : HEAD 의 전전 커밋
HEAD~N : HEAD 를 포함한 n 개의 커밋

# merge conflict 가 났는데..

* 너무 많이 달라서 merge 가 힘들다. 내 코드는 잘 안다. 
* 그럼 그냥 상대방것으로 엎어치고 (override update (svn)) 그상태에서 수정을 하자
* 여기서 중요한건 merge, rebase 할때 ours, theirs 의 의미가 달라진다.
    * 현재 branch 가 HEAD 상태이고, master 를 대상으로 한다고 가정
    * 어떤 것이든 HEAD 가 가리키는 것이 ours 라고한다.
    * merge
        * `checkout --ours` : branch 것을 사용
        * `checkout --theirs` : master 것을 사용
    * rebase
        * `checkout --ours` : master 것을 사용
        * `checkout --theirs` : branch 것을 사용

``` shell
# master 최신화
$ git checkout master
$ git pull
# my-feature-1 로 branch 변경
$ git checkout my-feature-1
# 여기서 문제 발생
$ git rebase master

# 1. 근데 머지 귀찮을때 아래와 같이 해결
$ git checkout --ours <conflict-file-name>
$ git checkout --theirs <conflict-file-name>

# 2. 직접 conflict 를 해결하고 
$ git add/rm <conflict-file-name>
$ git rebase --continue

```

## example

``` shell
# 1. merge 할때
# 2. rebase 할때
$ git branch
  master
  test/checkout-ours-theirs-base # 이 브랜치와
* test/checkout-ours-theirs-branch # 이 브랜치를 이용해서 테스트

# base 브랜치의 code01
$ git checkout test/checkout-ours-theirs-base
$ cat code01
development done!
conflict target from base # 이 부분이 conflict 대상, 미리 커밋해놓았음

# branch 브랜치의 code01
$ git checkout test/checkout-ours-theirs-branch
$ cat code01
development done!
conflict target from feature # 이 부분이 conflict 대상, 미리 커밋해놓았음

# 1. branch 에서 base 를 머지
$ git checkout test/checkout-ours-theirs-branch
$ git merge test/checkout-ours-theirs-base
Auto-merging code01
CONFLICT (content): Merge conflict in code01
Automatic merge failed; fix conflicts and then commit the result.

# 당연히 conflict 발생
$ cat code01
development done!
<<<<<<< HEAD
conflict target from feature
=======
conflict target from base
>>>>>>> test/checkout-ours-theirs-base

# --ours 를 쓰면 (현재 branch)
$ git checkout --ours code01
Updated 1 path from the index

$ cat code01
development done!
conflict target from feature # --ours = branch

# --theirs 를 쓰면 (현재 branch)
$ git checkout --theirs code01
Updated 1 path from the index

$ cat code01                  
development done!
conflict target from base # --theirs = base

# merge 할때의 --ours, --theirs 는 생각대로다.
# 초기화
$ git reset --hard

# 2. branch 에서 base 로 rebase
$ git rebase test/checkout-ours-theirs-base
Auto-merging code01
CONFLICT (content): Merge conflict in code01
error: could not apply eb10cf0... mod code01 from feature
Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
Could not apply eb10cf0... mod code01 from feature

# 당연히 conflict 발생
$ cat code01 
development done!
<<<<<<< HEAD
conflict target from base
=======
conflict target from feature
>>>>>>> eb10cf0 (mod code01 from feature)

# --ours 를 쓰면 (현재 branch)
git checkout --ours code01
Updated 1 path from the index

$ cat code01
development done!
conflict target from base # --ours = base merge 할때와 반대다!!!

# --theirs 를 쓰면 (현재 branch)
$ git checkout --theirs code01
Updated 1 path from the index

$ cat code01
development done!
conflict target from feature # --theirs = branch
```

# git stash

a branch 에서 작업 중(commit 안침)인데, b branch 에서 다른 작업을 해야한다.
stash 에 untracked  까지 저장할 수 있다.

``` shell
# -u|--include-untracked : untracked 한 파일까지포함. branch 를 바꿀땐 안해도된다.
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



## stash show 를 할때는..

`-u|--include-untracked` 옵션을 사용했을때는 볼떄도 까먹지말고 사용해주자..

``` shell
# 이것과
$ git stash show stash@{0}

# 이것은 다르다.. -u|--include-untracked 옵션을 빼먹어서 untracked 파일을 못보고 날릴뻔했다 ㅠ,ㅠ
$ git stash show -u stash@{0}

# 이렇게 하면 diff 처럼 파일 내용을 보여준다
$ git stash show -p stash@{0}
```

# commit

## commit 을 했는데, user/email 이 잘못되어있다.

혹시 push 까지 했으면, 아래 방법은 rebase 를 사용하는 방법이므로, git push -f 로 강제 push 를 해야한다.

``` shell
# 먼저 다음 커밋을 위해 config 부터 설정해준다. 
# 모든 레포지토리에 설정하려면 --global 옵션을 넣어주자
git config user.name "my-name"
git config user.email my-email@domain.com

# 방금전 커밋을 고치려면 1개니까, 1개만 고친다.
# rebase 로 들어가서 고칠 커밋을 pick -> edit 으로 변경 하고 :wq 로 저장종료
git rebase -i HEAD~1

# 그상태에서 커밋 author 를 고친다.
git commit --amend --author="my-name <my-email@domain.com>"
# 이렇게하면 메세지를 고친다
git commit --amend -m "update what what what"


# rebase continue 하면 끝
git rebase --continue
```

## commit 을 했는데 comment 를 고치고 싶다

``` shell
git commit --amend
```

# cherry-pick : 다른 브랜치의 특정 커밋만 가져오고싶다.

``` shell
git cherry-pick <commit-hash>
```




# branch 가 시작된 commit 을 확인하고 싶다
``` shell
$ git show --summary `git merge-base <check branch> <parant branch of check branch>`
```

# 현재 branch 와 다른 branch 와 달라진 파일목록만 보고싶다
``` shell
$ git diff --name-status <DIFF-TARGET-BRANCH>
```



# forked repository 를 origin repository 와 sync 를 맞추고 싶다
``` shell
# remote repository 확인
$ git remote -v
# origin remote respotiroy 을 upstream 이란 이름으로 추가
$ git remote add upstream <REMOTE GIT REPOSITORY WEB URL | https://git..///.git>
# upstream 으로부터 fetch 받는다
$ git fetch upstream
# 받아온 branch 들을 확인해본다. remotes/upstream/... 가 보인다
$ git branch -a
# master 를 upstream/master 와 맞춘다
$ git checkout master
$ git merge upstream/master
# focked remote repository 로 push 한다. 끝.
$ git push oirgin master
```

# checkout 

## remote branch 를 checkout 받기
``` shell
$ git checkout -b <your-local-branch-name> origin/<remote-branch-name>
```


## tag 로 checkout 받기
``` shell
# local tag
$ git checkout <TAG NAME>

# remote tag
## fetch all remote tag
$ git fetch origin --tags
## fetch specific remote tag
$ git fetch origin refs/tags/<specific-tag>
## then checkout tag
$ git checkout tags/<specific-tag>
## or checkout as branch
$ git checkout tags/<specific-tag> -b <specific-branch>

```

## commit 으로 checkout, branch 따기
``` shell
# commit 을 확인하여 이동
$ git checkout <commit-no>
# branch 생성 및 이동
$ git branch <your-branch-name>
$ git checkout <your-branch-name>
# 또는 한방에 
$ git branch -b <your-branch-name>
```



# 이미 commit 한 파일을 파일은 지우지말고 ignore 처리하고 싶다
``` shell
$ git rm --cached filename
```


# remote branch

## origin 을 변경하고싶다
``` shell
git remote remove origin
git remote add origin <new repository git url>
```

## 삭제된 remote branch 가 로컬에서 보일때

로컬의 remote branch 는 실제 remote branch 가 아니라 그저 레퍼런스일 뿐이므로 정리해주면된다.

``` shell
$ git remote prune origin
```

# 방금 전 commit 만 취소하고 싶다.
``` shell
# 방금 commit 이 취소되고 staging 상태로 남아있는다
$ git reset --soft HEAD~1
# 방금 commit 이 취소되고 working? 상태로 간다 --mixed 가 기본 옵션
$ git reset --mixed HEAD~1
```
# 방금 전 commit 메세지만 수정하고 싶다.

``` shell
$ git commit --amend
```

# 여러개 commit 을 revert 하고 싶다.
``` shell
$ git revert [되돌리고싶은 commit(revert 에 포함되지 않음)]..[되돌리고싶은 마지막(최신) commit(revert 에 포함)]
```


# master merge 했는데 (merge commit 있음) revert 하고싶다.

``` shell
# 상황설명
# git log 를 통해 merge commit 을 확인하면 아래와 같은 모습이다.
commit 6d3494eaf33fdcef67ea4a8ee751080e3ab28dd9
Merge: 9c77d97 232f601
Author: epu baal
Date:   Thu Apr 25 18:48:18 2024 +0900

    Merge pull request #296 from feature/bbb
    
    add feature bbb

# git log --oneline --graph 의 모습
*   6d3494e Merge pull request #296 from feature/bbb
|\  
| * 232f601 fix typo
| * e3b00e0 fix lint
| * a509245 add feature bbb
|/  
*   9c77d97 (feature/aaa) Merge pull request #295 from other/feature/aaa

# merge commit = 6d3494e
# graph 상의 두개의 라인이 merge commit 의 git log 에 있는 merge 내용이다.
# merge commit 을 옵션 없이 revert 할때는 -m 옵션을 주라는 오류가 나온다.
# -m 옵션에 들어갈 commit 이 9c77d97 232f601 두개의 라인중 하나를 고르라는 뜻임
# -m parent-number
# --mainline parent-number
# feature/aaa 의 내용을 전부 revert 하고 싶으므로 9c77d97 라인을 인 1번을 고르면된다.
# 번호의 순서는 commit 의 merge 의 순서대로인듯하다
$ git revert 6d3494e -m 1
```

# commit 에서부터 branch 를 따고싶다.
``` shell
$ git checkout -b <NEW-BRANCH-NAME> <TARGET-COMMIT-HASH>
```