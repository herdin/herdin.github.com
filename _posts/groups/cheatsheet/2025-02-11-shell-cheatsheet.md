---
layout: post
title: "shell cheatsheet"
date: 2025-02-11
tags: shell cheatsheet
---

# standard input 으로 file 에 쓰기

``` shell
$ cat <<EOF > test.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "1m",
    "max-file": "3"
  }
}
EOF
```
# 빈 줄을 지우고 싶을때

``` shell
$ cat <<EOF > test.json

{
  "log-driver": "json-file",
}

EOF

cat daemon.json | sed '/^$/d'
``` 

# awk 사용하기

``` shell
$ cat <<EOF > test.log
name:herdin1 age:22 desc:hehe1
name:herdin2 age:23 desc:hehe2
name:herdin3 age:24 desc:hehe3
name:herdin4 age:25 desc:hehe4
EOF
cat test.log | awk '{print $1}'
cat test.log | awk '{print $1":::"$2}'
```