---
layout: post
title: "github ssh key 사용하기"
date: 2022-05-20
tags: ssh github
---

``` shell
# 이렇게 하면 spring config server 에서 사용할 수 없는듯
# $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com" 

# email 을 변경해서 키생성을 한다
$ ssh-keygen -m PEM -t rsa -b 4096 -C "your_email@example.com"
# 아래와 같이 나오는데 그냥 엔터치면 기본위치에 개인키와 공개키가 쌍으로 저장된다
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/user/.ssh/id_rsa): 
# 비밀번호는 쳐도되고 안쳐도된다
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
# id_rsa, id_rsa.pub 으로 쌍으로 생성된것을 확인
$ ls /Users/user/.ssh
```

* 생성된 공개키(.pub) 파일을 github > setting > add ssh key 에다가 등록한다
* 그리고 개인키를 사용하여 접근하면 된다.