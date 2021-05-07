---
layout: post
title: "커리어 빌딩, web"
date: 2021-04-26
tags: job web
---

## WEB
- OAuth2.0 flow
- jwt
- https
  - method, header
  - ssl, 인증서
  - DH 알고리즘 (키교환)
- 웹 취약점
  - XSS, CSRF <-> SOP, CORS
  - CORS flow
- RESTFul API 설계방식
- sticky session
-

## javascript
- hoisting
- throttle, debounce
- currying
- thenable
- prototype
- arrow function
- closure
- destructuring
- class
- tail recursion
- scope
  - lexical, dynamic
  - global, local(function)
- es6
  - [ECMAScript6 / ES6 아름다운 JavaScript를 위한 ES6](https://sanghaklee.tistory.com/54)

### WEB
#### http method 의 종류
- GET(idempotent), POST, PUT(idempotent), DELETE
- HEAD, OPTION
- CONNECT, TRACE, PATCH

PUT, DELETE 가 보안상 이유로 사용하지 않는다고 알려져 있지만, 이는 WebDAV 서비스에 한해서 생기는 문제이다. 해당 서비스의 권한 할당 오류로 인해 인증절차 없이 서버의 파일을 생성/삭제 할 수 있다.

#### redirect vs foward 차이
- redirect
  - 서버에서 302 응답을 주면서 어떤 위치로 이동하라는지 응답 Header 의 Location 값으로 브라우저에게 알려준다.
  - 브라우저에서 서버로 요청이 2번
- foward
  - 서버에서 요청을 처리 후, 추가 처리를 위해 서버내의 서블릿에게 위임하는 것.
  - 브라우저에서 서버로 요청이 1번

#### 응답코드
100 정보 제공
200 정상
300
400 클라이언트 에러
500 서버 에러

#### RESTFul 에 대해서

Martin Fowler라는 사람이 2010년 제안한 Richardson Maturity Model (Richardson 성숙도 모델) 에 의하면 총 4단계로 REST API의 요소를 구성하고 있습니다.
level0 - the swamp of POX
level1 - resource
level2 - http method
level3 - hypermedia control

RESTful API를 사용하는 클라이언트가 전적으로 서버와 동적인 상호작용이 가능하도록 하는 것을 HATEOAS 라고 부른다.
모든 동작을 URI를 이용하여 동적으로 알려준다

#### cookie, session, local storage, indexed db 차이점

#### SOP, XSS 등
