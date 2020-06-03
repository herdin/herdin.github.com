---
layout: post
title: "axios 액시오스 기초"
date: 2020-06-03
tags: javascript
---

개인 프로젝트에서 `Vue.js` 를 사용하게 되었는데, `Vue.js` 에서 권고하는 http 통신 라이브러리가 `axios` 라서 마찬가지로 사용하게 되었다.
> 나는 자유의지를 가진 인간이다.


## 설치
다운받아서 어쩌고 하기 귀찮으니 CDN 사용

``` html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 사용
기초기 떄문에 그냥 바로 예제로 넘어간다.

``` javascript
axios({
    method: 'get',
    url: 'https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=' + accessToken,
    data: {}
})
.then(function(response){
    console.log('then response -> ');
    console.log(response);
    response.data.data.forEach(media => self.mediaList.push(media));
    self.paging = response.data.paging;
})
.catch(function(response) {
    console.log('catch response -> ');
    console.log(response);
})
;
```

> 끝
