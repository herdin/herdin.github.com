Idempotent---
layout: post
title: "Idempotent in web method, 멱등성"
date: 2020-01-12
tags: web
---

백기선님의 강의를 듣다가 멱등성(idempotent)에 대한 언급이 있어 알아보았다.

web method 에 있어서 멱등성(idempotent)이란, 같은 요청이 여러번 서버에 도달하더라도 결과가 같음을 의미한다.

대표적으로 아래 메소드들이 멱등성을 띈다.

- GET: 특정 자원 요청(READ), 동시에 여러번 같은 자원을 요청해도 항상 결과는 같아야 한다.
- HEAD: GET 요청을 하게 된다면 어떤 헤더가 오는지 확인 요청.
- PUT: 특정 자원의 식별자를 통해 새로운 자원을 생성(INSERT/UPDATE), 해당 식별자의 자원을 교체하는 요청. POST 와의 차이가 있는데, PUT 은 식별자를 알고있어야하고 해당 식별자에 대한 자원을 생성, 또는 이미 있다면 교체하는 요청이다. 하지만 POST 은 식별자가 아니라 자원의 내용을 넘겨주고 해당 자원을 생성하는 요청이므로 여러번 POST 요청을 할 경우, 여러 자원이 생성될 수 있다.
- DELETE: 특정 자원 삭제(DELETE)

> 좀 헷갈리는데, GET 같은 경우는 동시에 여러번 요청을 날렸을 떼, 그 중간에 PUT 이나 POST 같은 메소드의 영향으로 자원 바뀌어 다른 응답이 갈 수도 있는데 그런 경우는 생각하지 않는 것인지..

출처
- [Idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent)
