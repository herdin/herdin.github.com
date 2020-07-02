---
layout: post
title: "콘텐츠 보안정책(Content Security Policy), SOP, CORS..."
date: 2020-04-22
tags: web security
---

> 해당 내용은 아래 출처의 내용을 내가 알아보기 쉽게 정리한 내용입니다.

## 동일 출처 정책, SOP (Same Origin Policy)

**웹클라이언트(브라우저)에서 다른 출처의 리소스간 상호작용을 방지하는 정책. 여기서 출처란 Scheme(프로토콜), Host, Port 세개를 말한다.**

예를 들면, `www.naver.com` 에서 `www.daum.net` 에게 XmlHttpRequest(Ajax) 요청을 브라우저 차원에서 제한하는것이다.

다만, 교차 출처에 대한 접근은 세가지 유형이 있는데,

* 쓰기 - 링크, 리다이렉트, 양식 제출 은 보통 허용
* 삽입 - `<script scr=..>`, `<link href=...>`, `<img/video/object/iframe src=..>` 등 문서에 포함되는 리소스, 보통 허용
* 읽기 - 보통 허용하지 않는다.

**어? 근데, 난 다른 도메인에 있는 리소스를 사용해야겠는데?**
* `jsonp` 방식을 사용한다. >> 우회하는 방식
* 브라우저를 기동할때 특정 옵션을 주거나, 설정을 한다. >> 서비스 운영 관점에서는 불가능
* 리소스를 요청할 서버에서 CORS 설정을 한다. >> 아래에서 계속

## CORS (Cross-Origin Resource Sharing)

다른 도메인의 리소스를 접근하기 위한 정식 방법이다. 두 가지 방식이 있다.

* Simple Request, 단순 요청
* Preflight Request, 실행 전 요청

아래의 조건 중 하나라도 해당된다면, Preflight Request 으로 요청하게 된다.

* `GET`, `HEAD`, `POST` 외의 메서드 사용.
* `POST` 메서드를 `text/plain`, `application/x-www-form-urlencoded`, `multipart/form-data` 가 아닌 Content-Type과 함께 사용.
* 커스텀 헤더를 설정.

> `GET` 으로 날리면 브라우저 network console 에 요청이 하나만 가는데, `PUT` 으로 날리면 preflight 요청인 `OPTION` 이 먼저 나간다음 `200` 이 떨어지고 `PUT` 요청이 실패한다.

단순 요청시,  
* 브라우저는 request header 에 `Origin: 출처` 를 표기해 요청을 보낸다.
* 서버는 미리 설정한 정책에 따른 CORS 구성을 확인하고 이상이 없다면,   response header 에 `Access-Control-Allow-Origin: 요청출처` 를 포함하여 응답을 한다.
* 다시 브라우저는 response header 의 `Access-Control-Allow-Origin` 값과 원래 요청 시 보낸 출처와 일치하는지 확인한다.

실행 전 요청 시,
* 브라우저는 기본 요청의 `Requested Method` 및 `Requested Headers` 를 포함하는 OPTIONS 요청을 보낸다.
* 서버는 대상 리소스에서 허용하는 method 및 header 들을 반환한다.
* 브라우저는 허용 method 및 header 에 있다면, 단순 요청과 동일한 기본 요청을 보낸다.

## XSS (Cross Site Scripting)

스크립트를 주입하여 공격하는 방식.

* Stored - DB 에 저장되어 다른 사용자에게 보여지는 방식
> * 공개 게시판에 악의적인 스크립트를 포함하여 게시글 작성
> * 게시글이 DB 에 저장
> * 다른 사용자가 해당 게시글 클릭
> * 저장된 악의적인 스크립트가 브라우저에 노출

* Reflected - 악의적인 스크립트를 URL 파라미터로 넘겨 바로 실행되도록 하는 방식
> * 공격자가 URL 파라미터를 받아서 html 에 그대로 주입하는 방식의 페이지(이왕이면 다른 사용자가 신뢰할 수 있는)를 찾는다.
> * 찾은 페이지의 URL 파라미터에 악의적인 스크립트를 추가해 URL 을 만든다.
> * 위의 스크립트가 포함된 URL 을 그대로 또는 짧게 만들어서 공격 대상이 클릭하도록 유도하거나 인터넷상에 퍼뜨린다.
> * URL 의 도메인만 확인하고 URL 을 신뢰한(또는 확인하지못한) 다른 사용자가 URL 에 접속한다.
> * 악의적인 스크립트 작동  

* DOM based - Reflected 와 동일하게 URL 을 조작하여 공격 대상에게 클릭하도록 유도하는 것이 같지만, Reflected 는 악의적인 스크립트를 담은 파라미터가 서버를 거치는 것이고 DOM based 는 서버를 거치지 않는 점이 다른 것 같다.



## CSRF/XSRF (Cross Site Request Forgery)

별 다른 옵션을 넣지 않은 cookie 는 같은 도메인에 요청을 보낼때 자동으로 보내진다.
> cookie 의 secure, samesite 참고

이런 특징을 이용하여, 악의적인 싸이트에서의 요청을 정당한 것처럼 위조하는 공격을 의미한다.
* 공격자가 `bank.com` 이라는 서비스에서 `bank.com/pay/{from}/{to}` end point 가 있는 것을 확인한다.
* `bank.com/pay/{victim}/{attacker}` 로 요청을 보내는 악의적인 페이지를 만든다.
* 위에서 만든 악의적인 페이지를 `bank.com` 에 로그인 한 사용자가 클릭하도록 유도한다.

#### Set-Cookie - httpOnly

서버가 응답의 헤더에 `Set-Cookie` 로 cookie 를 지정할 때, 위의 `httpOnly` 옵션을 사용하면, 클라이언트 자바스크립트가 `document.cookie` 등을 통해 쿠키에 접근할 수 없도록 한다.

## 콘텐츠 보안 정책, CSP (Content Security Policy)
#### 소스 허용 목록
동일 출처 정책(SOP, Same-origin policy)을 우회하는 공격법 들이 생겨나서 최신 브라우저에는 방어책들이 몇가지 있다.

`Content-Security-Policy` HTTP 헤더를 정의하고 브라우저에는 이런 소스에서 받은 리소스만 실행하거나 렌더링할 것을 지시한다.

`apis.google.com` 이 신뢰할만한 주소라면,

```
Content-Security-Policy: script-src 'self' https://apis.google.com
```

`script-src` 스크립트의 출처가 `self`(현재 위치) 또는 `https://apis.google.com` 일 경우에만, 스크립트 실행을 허용한다.

여기서 `script-src` 는 리소스 지시문으로 어떤 리소스에 대한 제한 정책인지를 의미한다.
* 다양한 리소스 지시문
  - `font-src` 웹 폰트의 출처
  - `img-src` 이미지의 출처
  - `connect-src` 연결할 수 있는 출처(xhr, web socket, event source)
  - ...

#### 인라인 코드는 유해한 것으로 간주됨 + eval 포함

소스 허용 목록으로는 인라인 코드(html 파일에 <scirpt> 태그로 감싸진 코드)와 주입된 악의적인 코드를 구분할 수 없다. 때문에 소스 허용 목록으로는 인라인 스크립트를 완전히 금지하고 `js` 파일을 따로 나누도록 권고한다.

##### 꼭 인라인 코드를 사용해야된다면..

암호화 난스를 사용하면 된다.
``` html
<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
  //Some inline code I cant remove yet, but need to asap.
</script>
```

```
Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'
```

> 브라우저에 관한 콘텐츠 보안 정책인데,  
> 브라우저가 안지키는 브라우저면 결국 보안취약점이 있는 것 아닌가?

출처
- [쿠키와 document.cookie](https://ko.javascript.info/cookie)
- [콘텐츠 보안 정책](https://developers.google.com/web/fundamentals/security/csp?hl=ko#%EC%86%8C%EC%8A%A4_%ED%97%88%EC%9A%A9_%EB%AA%A9%EB%A1%9D)
- [Spring API 서버에서 PUT, DELETE 요청 시 CORS 설정이 적용 안되는 경우](https://velog.io/@hellozin/Spring-API-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-PUT-DELETE-%EC%9A%94%EC%B2%AD-%EC%8B%9C-CORS-%EC%84%A4%EC%A0%95%EC%9D%B4-%EC%A0%81%EC%9A%A9-%EC%95%88%EB%90%98%EB%8A%94-%EA%B2%BD%EC%9A%B0)
