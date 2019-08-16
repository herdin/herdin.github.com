---
layout: post
title: "URI, URL, URN ???"
date: 2019-08-13
tags: web writing
---

### URI? URL? URN? 뭐가 다른거지?
[URI](https://tools.ietf.org/html/rfc3986) : `Uniform Resource Identifier`  

URL : `Uniform Resource Locator`  
[URN](https://tools.ietf.org/html/rfc8141) : `Uniform Resource Name`  

일단 `URL` 과 `URN` 은 `URI` 의 Subset 이다.  

`URL` 은 흔히 쓰는 웹상의 주소이고, 아래의 예제와 같이 어떤 자원의 위치를 알려주는 식별자이다.
- https://www.google.com
- https://herdin.github.io/assets/temp/house/20190729_Offer_Notice_Doc____%EB%91%90%EC%82%B0%EC%9C%84%EB%B8%8C.pdf

`URN` 은 잘 사용하지 않는데, 자원의 이름을 의미한다. 하지만 자원이 어디에 위치해 있는지 알려줄 필요는 없다. 보통 `urn` 으로 시작하며 아래와 같은 모양새를 하고 있다. [from StackOverflow](https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn)
- `urn:isbn:0451450523`
- `urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66`
- `urn:publishing:book`

### 문법이 있어?

`URI` 는 `scheme`, `authority`, `path`, `query`, `fragment` 로 이루어져있다.  
```
#Syntax Components of URI
scheme ":" hier-part [ "?" query ] [ "#" fragment ]
```

`URL` 을 보면 쉽게 이해가 가는데, google 에서 something 을 검색하면 나오는 `URL` 을 보면 다음과 같다.

https://www.google.com/search?q=something&oq=something&aqs=chrome..69i57j0l4j69i65.3487j0j7&sourceid=chrome&ie=UTF-8

``` yaml
scheme: https
authority: www.google.com
path: search
query: q=something&oq=something&aqs=chrome..69i57j0l4j69i65.3487j0j7&sourceid=chrome&ie=UTF-8
fragment:
```

아래는 `RFC` 에 나온 `URL` 과 `URN` 의 구성
```
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme     authority       path        query   fragment
 |   _____________________|__
/ \ /                        \
urn:example:animal:ferret:nose
```
