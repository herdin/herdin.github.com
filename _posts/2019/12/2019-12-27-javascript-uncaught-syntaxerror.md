---
layout: post
title: "Uncaught SyntaxError: Unexpected token '&lt;'"
date: 2019-12-27
tags: javascript
---

자꾸 블로그에 특정 페이지에서

```
Uncaught SyntaxError: Unexpected token '&lt;'
```

이런 오류가 나서 확인해보니, `interpreter` 가 javascript 나 json 을 원하는데 html 를 줄 때, 저런 오류가 난다고 한다.

gitpage repository 전체에서 src 로 검색해보니 예제 중에 잘못 써진곳을 발견해서 삭제 했다.

```
<script src="/"></script>
```

끝.

출처
- [Uncaught SyntaxError: Unexpected token '<'](https://idiallo.com/javascript/uncaught-syntaxerror-unexpected-token#n)
