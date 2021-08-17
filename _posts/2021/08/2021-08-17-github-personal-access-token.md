---
layout: post
title: "github push 실패, please use a personal access token instead"
date: 2021-08-17
tags: github
---

너무 오랜만에 push 를 날려서 바뀐지도 몰랐다.


``` shell
$ git push origin master
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
fatal: unable to access 'https://github.com/herdin/herdin.github.com.git/': The requested URL returned error: 403
```

비밀번호대신 personal access token 을 사용하란다.


* Github > Settings > Developer settings > Personal access tokens > Generate new token
* Note : 알아서
* Expiration : 알아서
* Select scopes : repo

이렇게 만들어진 token 을 비밀번호 대신 사용하면되는데, 비밀번호 저장이 되어있다면 어디서 초기화 시켜야하는지 당황스러울 것이다.

mac 기준
* Spotlite 검색 > Keychain Access 검색 > github 저장된 암호를 변경해주자.

``` shell
$ git push origin master
오브젝트 나열하는 중: 11, 완료.
오브젝트 개수 세는 중: 100% (11/11), 완료.
Delta compression using up to 12 threads
오브젝트 압축하는 중: 100% (6/6), 완료.
오브젝트 쓰는 중: 100% (6/6), 487 bytes | 487.00 KiB/s, 완료.
Total 6 (delta 5), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (5/5), completed with 5 local objects.
To https://github.com/herdin/herdin.github.com.git
   b571839..2c6acba  master -> master
```

끝!