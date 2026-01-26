---
layout: post
title: "about http headers"
date: 2025-04-14
tags: http
---

# Cache-Control
* 단방향
* 대소문자 구별하지 않음

```
# request
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: only-if-cached

# response
Cache-control: must-revalidate
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: public
Cache-control: private
Cache-control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-control: s-maxage=<seconds>
```



# 참고
* [Cache-Control](https://developer.mozilla.org/ko/docs/Web/HTTP/Reference/Headers/Cache-Control)