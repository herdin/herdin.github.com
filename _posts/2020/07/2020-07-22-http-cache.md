---
layout: post
title: "http 캐싱"
date: 2020-07-22
tags: web
---

모든 브라우저에는 캐시 기능이 포함되어 있다.

## ETag
단순하게 120초 동안 유효한 자원을 서버에서 응답을 주었다고해서, 120초가 지난 후 서버의 자원이 변경되지도 않았는데 똑같은 자원을 다운로드 받는 것은 비 효율 적이다. 따라서 ETag 헤더가 고안되었다.

서버의 자원이 변경되었는지 확인할 수 있는 체크섬 같은 유효성 검사 토큰이다.

이미 서버에서 자원을 받은 뒤, 시간이 만료되고 다시 같은 자원을 요청한다고 가정해보자.
```
GET /file
If-None-Match: x234dff
```
이전에 서버에서 받은 ETag 토큰을 헤더로 추가하여 보내고  
서버에선 자원이 변경되지 않았으면
```
304 Not Modified
Cache-Controll: max-age=120
ETag: x234dff
```
위와 같은 응답을 하게 된다.

## Cache-Control
성능 최적화 관점에서 볼떄, 최상의 요청은 서버와 통신이 필요 없는 요청이다.  

### no-cache
캐시를 사용하지 않겟다는 뜻이 아니라, 서버와 확인을 무조건 하겠다는 뜻이다. `ETag` 가 포함 되어 있고, 서버에 응답의 `ETag` 유효성 토큰이 현재 토큰과 같다면, 캐시를 사용한다.
> 이미 받은 자원에 대해 동일한 요청은 서버와 통신을 1번 하지만 `ETag` 토큰이 유효하다면 자원을 다시 다운로드 받진 않는다.

### no-store
정말로 캐시를 사용하지 않는다. 매번 자원을 다시 받는다.

### public vs private
CDN 같은 중간 캐싱의 가능 여부같은데 이해가 잘 안된다.

### max-age
캐싱된 자원의 유효한 시간 (초)

## 캐시 무효화와 업데이트
이미 캐싱된 자원에 대해서 서버에서 업데이트하길 바라는 경우는 방법이 없다.  
다만 해결하기위한 기법이 존재한다.

html + js + css 파일이 존재한다고 할때, 서버에서 css 를 개발자가 수정했다고 하자.
html 은 no-cache 정책으로 서버에서 확인을 해서 최신을 유지하고, css 파일의 주소(명칭)을 변경함으로써, 최신 자원을 유지할 수 있다.
> html 에 inclue 된 css 파일의 이름을 someCss.old.css -> someCss.new.css 이렇게 변경한다.


참고
- [HTTP 캐싱](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=ko)
