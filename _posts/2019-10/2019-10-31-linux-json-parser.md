---
layout: post
title: "linux json parser"
date: 2019-10-18
tags: linux json
---

업무상 `Access token` 을 확인할 일이 생겨서 `curl` 로 응답을 보다보니 `json` 응답이 가독 성이 떨어져서 `parser` 를 찾게 되었다.

> 복붙에 가까운 포스팅이 의미가 있는걸까? 기록이랍시고 남기긴하는데...

```

# 다운로드
(32-bit system)
$ wget http://stedolan.github.io/jq/download/linux32/jq
(64-bit system)
$ wget http://stedolan.github.io/jq/download/linux64/jq

# 권한
$ sudo chmod +x ./jq

# 실행을 위해 이동
$ sudo cp jq /usr/bin
```

[공식홈페이지의 사용법](https://stedolan.github.io/jq/manual/)

``` shell
$ curl <facebook graph api token debug end point> | jq '.'

{
  "data": {
    "app_id": "123",
    "type": "USER",
    "application": "ddd",
    "data_access_expires_at": 1578986473,
    "expires_at": 0,
    "is_valid": true,
    "issued_at": 567,
    "scopes": [
      "email",
      "pages_show_list",
      "public_profile"
    ],
    "granular_scopes": [
      {
        "scope": "pages_show_list"
      }
    ],
    "user_id": "873"
  }
}

```

파싱되어 보기 편하게 된다. 끝.
