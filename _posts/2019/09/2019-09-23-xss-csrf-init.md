---
layout: post
title: "XSS, CSRF/XSRF, Same-Origin policy, CORS"
date: 2019-09-23
tags: web security writing
---

웹취약점이라고 자주 듣는 단어들이 있는데, 듣기만 자주 듣고 뭔지 정확히 모르니 짜증나서 정리한다

## XSS (Cross-Site Scripting)

[위키](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85)

> 사이트 간 스크립팅(또는 크로스 사이트 스크립팅, 영문 명칭 cross-site scripting, 영문 약어 XSS)은 웹 애플리케이션에서 많이 나타나는 취약점의 하나로 **웹사이트 관리자가 아닌 이가 웹 페이지에 악성 스크립트를 삽입할 수 있는 취약점이다. 주로 여러 사용자가 보게 되는 전자 게시판에 악성 스크립트가 담긴 글을 올리는 형태로 이루어진다.** 이 취약점은 웹 애플리케이션이 사용자로부터 입력 받은 값을 제대로 검사하지 않고 사용할 경우 나타난다. 이 취약점으로 해커가 사용자의 정보(쿠키, 세션 등)를 탈취하거나, 자동으로 비정상적인 기능을 수행하게 할 수 있다. 주로 다른 웹사이트와 정보를 교환하는 식으로 작동하므로 사이트 간 스크립팅이라고 한다.

게시판 등 자료를 올릴 수 있는 페이지에 악성 스크립트를 심는 경우이다.

보통 필터에서 스크립트 패턴등을 제거함으로써 방지할 수 있다.

## CSRF/XSRF (Cross-Site Request Forgery)

[위키](https://ko.wikipedia.org/wiki/사이트_간_요청_위조)

> 사이트 간 요청 위조(또는 크로스 사이트 요청 위조, 영어: Cross-site request forgery, CSRF, XSRF)는 웹사이트 취약점 공격의 하나로, 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 하는 공격을 말한다.
>
> 유명 경매 사이트인 옥션에서 발생한 개인정보 유출 사건에서 사용된 공격 방식 중 하나다.
>
> 사이트 간 스크립팅(XSS)을 이용한 공격이 사용자가 특정 웹사이트를 신용하는 점을 노린 것이라면, 사이트간 요청 위조는 특정 웹사이트가 사용자의 웹 브라우저를 신용하는 상태를 노린 것이다. 일단 사용자가 웹사이트에 로그인한 상태에서 사이트간 요청 위조 공격 코드가 삽입된 페이지를 열면, 공격 대상이 되는 웹사이트는 위조된 공격 명령이 믿을 수 있는 사용자로부터 발송된 것으로 판단하게 되어 공격에 노출된다.

**정상적인 사용자가 로그인 한 뒤**, 악의적인 사용자로 부터 전달 받은

``` html
<img src= "https://travel.service.com/travel_update?.src=Korea&.dst=Hell">
```

태그가 있는 페이지를 열게 되면 악의적인 사용자의 요청을 서버는 정상적인 사용자의 요청으로 판단하게 됨.

`Referrer` 검증과 `Security Token` 사용으로 방지할 수 있다.

# Same-Origin Policy

`javascript` 는 다른 페이지로 접근할때 Same-Origin 의 페이지만 접근이 가능했다. (다른 도메인 서버에 ajax 요청을 보내지 못함)  
이를 우회하거나
- `jsonp` 방식
- browser 기동 옵션
- browser 플러그인 설치

표준스펙에 맞춰서 접근을 할 수 있다.
- CORS (아래)

# Cross-Origin Resource Sharing (CORS)

Cross-Site Request 를 가능하게 한다.
- Simple Request
- Preflight Request
- Credential Request
- Non-Credential Request
