---
layout: post
title: "REST API 설계 시 참고"
date: 2019-11-18
tags: web
---

[출처](https://meetup.toast.com/posts/92)

## REST(Representational State Transfer) 의 3요소
- 자원(RESOURCE) - URI
- 행위(Verb) - HTTP METHOD
- 표현(Representations)

## REST 의 특징
- Uniform Interface
> Uniform Interface는 URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일을 말합니다

- Stateless (무상태성)
- Cacheable (캐시 가능)
- Self-descriptiveness (자체 표현 구조)
> API 메세지만 보고도 직관적으로 알 수 있는 구조

- Client - Server 구조
- 계층형 구조

## REST Design 가이드

#### 설계시 주의점.

URI 에 행위에 대한 표현이 들어가면 안된다. 행위는 HTTP METHOD 로 표현하자.

```
GET /user/1/delete (x)
DELETE /user/1     (o)
```
> - POST : 자원 생성(C)
> - GET : 자원 조회(R)
> - PUT : 자원 수정(U)
> - DELETE : 자원 삭제(D)

- `/` 는 계층관계를 나타내는데 사용하자.
- URI 의 마지막에는 `/` 를 사용하지 말자.
- `_` 는 헷갈리니까 `-` 를 사용하자
- URI 에는 소문자만 사용하자
- 파일확장자는 URI 에 넣지 말자

#### 자원간 관계 표현

user 1 이 가진 모든 device 들
```
GET /user/1/devices
GET /user/1/has/devices
```

관계가 복잡하다면 명시적 표현 하자

user 1 이 좋아하는 모든 device 들

```
GET /user/1/like/devices
```

#### Document 와 Collection 구분

단/복수로 Document 와 Collection 을 구분한다.
> 단/복수를 사용할 경우 가시성이 떨어질 수도 있는데 음. 아무튼 그렇다고 한다.

player 들 중 id 가  1 인 player 가 갖고 있는 skill 들 중 id 가 1003 인 skill
```
/GET /players/1/skills/1003
```

#### 의미 있는 HTTP 응답 코드를 사용하자.

자원 생성이 성공한건지, 조회 요청이 성공한건지 명시적으로 HTTP 응답코드를 사용하여 표현하자.

끝.
