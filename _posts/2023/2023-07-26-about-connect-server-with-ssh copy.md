---
layout: post
title: "ssh 로 서버 접속에 대해서"
date: 2023-07-26
tags: ssh
---

공개키(public key)와 비밀키(private key) 가 필요하다.
> pem (Privacy Enhanced Mail) : Base64의 인코딩으로 이루어진 인증서 파일, 보통 이걸 사용한다
> ppk (PuTTY Private Key file) : putty 에서 사용하기 위한 포멧

# 여태까지 이해한것
* 클라이언트와 서버는 각자의 공개키/비밀키를 가지고 있어야한다.
* 클라이언트의 공개키는 접속하기전에 미리 서버에 등록되어 있어야한다. (서버에서의 등록위치: ~/.ssh/authorized_keys)
* 서버의 공개키는 클라이언트가 접속을 시도할때 클라이언트에게 전달한다. (클라이언트에서의 등록위치: ~/.ssh/known_hosts)

``` shell
# id/password
$ ssh <ID>@<IP or HOST>
$ ssh hello@123.45.67.89

# private key
$ ssh -i <PUBLIC_KEY_FILE> <ID>@<IP or HOST>
$ ssh -i id_rsa hello@123.45.67.89
```

# 오류
``` shell
# 요딴 오류가 나면, 서버에 클라이언트 측의 public key 가 등록이 안되어있는것
Permission denied (publickey).
```


# 참고
* [SSH 공개키 인증을 사용하여 접속하기](https://velog.io/@lehdqlsl/SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EC%95%94%ED%98%B8%ED%99%94-%EB%B0%A9%EC%8B%9D-%EC%A0%91%EC%86%8D-%EC%9B%90%EB%A6%AC-i7rrv4de)
* [SSH Permission denied(public key) 원인 및 해결](https://ingnoh.tistory.com/38)