---
layout: post
title: "Facebook API 사용법"
date: 2019-10-18
tags: open-api writing
---
# OAuth2.0 Flow 를 따르면 되는거 아닌가?

이유는 모르겠지만, 언젠가서부터 페이스북에서 `user-access-token` 과 `page-access-token` 을 나누었다.
`OAuth2.0 Flow` 를 마치면 `user-access-token` 을 받게 되는데 그걸로 `page-access-token` 을 발급 받으면 된다.

# How to get page-access-token via user-access-token

``` shell
curl -X GET "https://graph.facebook.com/{your-page-id}?fields=access_token={your-user-access-token}"
```

# Reading Your Page Information

``` shell
curl -F 'method=get' \
  	 -F 'fields=about,attire,bio,location,parking,hours,emails,website' \
	 	 -F 'access_token={your-page-access-token}' \
	  	https://graph.facebook.com/{your-page-id}
```

# Getting Page Posts

``` shell
curl -i -X GET \
 "https://graph.facebook.com/{your-page-id}/feed?access_token={your-page-access-token}"
```
