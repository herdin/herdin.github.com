---
layout: post
title: "linux, shell script"
date: 2021-10-14
tags: linux
---

## `$` 가 붙은 녀석들..

- `$0` : 실행한 프로그램
- `$1`, `$2`, ... : 프로그램 인자 순서대로
- `$@` : 들어온 인자를 배열로
- `$*` : 들어온 인자를 하나의 string 으로
- `$#` : 들어온 인자의 갯수

``` shell
#!/bin/sh

echo `dirname $0`
echo "\$0 : $0"
echo "\$1 : $1"

echo "================="
echo "\$@ section"
echo "================="
for param in "$@"
do
	echo $param,
done

echo "================="
echo "\$* section"
echo "================="
for param in "$*"
do
	echo $param,
done
```
위의 스크립트를 실행

``` shell
$ ./shell-test.sh 1 2 3 
.
$0 : ./shell-test.sh
$1 : 1
=================
$@ section
=================
1,
2,
3,
=================
$* section
=================
1 2 3,

```

## string 을 delimiter 로 잘라서 저장하고싶다.

``` shell
#!/bin/bash

IN=$1

USERNAMES=$(echo $IN | tr "," "\n")
for USERNAME in $USERNAMES
do
  echo "USERNAME : $USERNAME"
done
```

참고
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/comparison-ops.html)