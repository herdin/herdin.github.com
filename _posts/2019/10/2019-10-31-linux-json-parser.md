---
layout: post
title: "linux json parser, jq 사용"
date: 2019-10-18
tags: linux json
---

업무상 `Access token` 을 확인할 일이 생겨서 `curl` 로 응답을 보다보니 `json` 응답이 가독 성이 떨어져서 `parser` 를 찾게 되었다.

> 복붙에 가까운 포스팅이 의미가 있는걸까? 기록이랍시고 남기긴하는데...

`jq` 는 c 언어로 작성되었다고 한다. 설치하는 방법은 두가지가 있다.

### 1. 귀찮으니 패키지 매니져로

``` shell
#install
$ yum install jq
#install check
$ jq --version
jq-1.5
```


### 2. 원하는 배포판 다운로드/설치

``` shell
#download (32-bit system)
$ wget http://stedolan.github.io/jq/download/linux32/jq
#download (64-bit system)
$ wget http://stedolan.github.io/jq/download/linux64/jq

# 권한
$ sudo chmod +x ./jq

# 실행을 위해 이동
$ sudo cp jq /usr/bin

#install check
$ jq --version
jq-1.5
```

[공식홈페이지의 사용법](https://stedolan.github.io/jq/manual/)

### file : jsondata : 예제를 위한 데이터
``` json
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
    "user_id": "873",
    "user_id>" : "873>",
    "types" : [
      { "id": "user123", "name": "USER"},
      { "id": "admin098", "name": "ADMIN"},
      { "id": "guest567", "name": "GUEST"}
    ]
  }
}
```

### Identity `.`
input 을 바꾸지않고 output 으로 생산한다.

``` shell
$ cat jsondata | jq '.'
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
    "user_id": "873",
    "user_id>": "873>",
    "types": [
      {
        "id": "user123",
        "name": "USER"
      },
      {
        "id": "admin098",
        "name": "ADMIN"
      },
      {
        "id": "guest567",
        "name": "GUEST"
      }
    ]
  }
}
```

파싱되어 보기 편하게 된다.

여러 필터가 있는데, 간단하게 사용법만 알아봐야겠다. 공식문서를 보니 생각보다 장황하구만.

### Object Identifier-Index: `.foo`, `.foo.bar`

``` shell
$ cat jsondata | jq '.data.user_id'
"873"
```

### Generic Object Index: `.[<string>]`
키값에 특수문자가 존재할 때는 `.somekey.someotherkey>` 로 뽑을 수 없다.

``` shell
$ cat jsondata | jq '.data["user_id>"]'
"873>"
```

### Pipe: `|`

내부 파이프라인 `|` 도 지원한다

``` shell
$ cat jsondata | jq '.data | .user_id'
"873"

$ cat jsondata | jq '.data' | jq '.user_id'
"873"
```

### Array/Object Value Iterator: `.[]`

배열을 벗기고, 배열 값만큼 출력을 생성한다.

아래에 각각 보이는 배열값들 하나의 출력값처럼 보이지만 각각의 출력을 jq 가 만든 것이다.

``` shell
$ cat jsondata | jq '.data.scopes[]'
"email"
"pages_show_list"
"public_profile"

$ cat jsondata | jq '.data.types'
[
  {
    "id": "user123",
    "name": "USER"
  },
  {
    "id": "admin098",
    "name": "ADMIN"
  },
  {
    "id": "guest567",
    "name": "GUEST"
  }
]
```

각각 출력인 것을 배열로 싸면 각각 출력인 것을 확인할 수도 있다.

``` shell
$ cat jsondata | jq '.data.scopes[]' | jq '[.]'
[
  "email"
]
[
  "pages_show_list"
]
[
  "public_profile"
]
```

각각의 출력값에서 각각 필터를 적용해서 데이터를 뽑을 수도 있다.
``` shell
$ cat jsondata | jq '.data.types[].id'
"user123"
"admin098"
"guest567"
```

뽑은 데이터를 다시 배열로 합칠 수도있다.

``` shell
$ cat jsondata | jq '[.data.types[].id]'
[
  "user123",
  "admin098",
  "guest567"
]
```

합쳐진 배열은 인덱스로 접근가능하다

``` shell
$ cat jsondata | jq '[.data.types[].id][0]'
"user123"
```

`length` 라는 함수도 지원한다

``` shell
$ cat jsondata | jq '[.data.types[].id][0] | length'
7
$ cat jsondata | jq '[.data.types[].id] | length'
3
```

### Comma: `,`
`,` 를 사용하면 `,` 로 나누어진 필터들로 만든 결과들만큼 출력을 만든다.

``` shell
$ cat jsondata | jq '.data.scopes'
[
  "email",
  "pages_show_list",
  "public_profile"
]

$ cat jsondata | jq '.data.scopes' | jq '.[0], .[1], .[2], .[]'
"email"
"pages_show_list"
"public_profile"
"email"
"pages_show_list"
"public_profile"
```

파이프라인으로 배열로 감싸보면 알기 쉽다.

``` shell
$ cat jsondata | jq '.data.scopes' | jq '.[0], .[1], .[2], .[]' | jq '[.]'
[
  "email"
]
[
  "pages_show_list"
]
[
  "public_profile"
]
[
  "email"
]
[
  "pages_show_list"
]
[
  "public_profile"
]
```

나누어진 결과를 배열로 합칠 수도 있다.

``` shell
$ cat jsondata | jq '.data.scopes' | jq '[.[0], .[1], .[2], .[]]'
[
  "email",
  "pages_show_list",
  "public_profile",
  "email",
  "pages_show_list",
  "public_profile"
]
```

이것외에도 filter 로 나온 값을 변경한다던지, 값을 체크한다는 기능들이 많은데 공식문서가 잘 나와있다.

### select

이 함수는 aws cli 를 사용하면서 알게 되었는데, tag 의 key, value 가 특정 값인 id 를 뽑을 때 사용했다.
``` shell
$ jq '.Reservations[].Instances[] | select(.Tags[]?.Key == "Name" and .Tags[]?.Value == "ec2-docker-postgresql") | .InstanceId'
```

출처
- [jq Manual (development version)](https://stedolan.github.io/jq/manual/)
- [커맨드라인 JSON 프로세서 jq](https://www.44bits.io/ko/post/cli_json_processor_jq_basic_syntax)
