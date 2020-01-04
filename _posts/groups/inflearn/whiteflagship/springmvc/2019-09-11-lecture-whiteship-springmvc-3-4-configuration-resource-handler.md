---
layout: post
title: "Whiteship Spring MVC 3/4 Configuration - Resource Handler"
date: 2020-01-05
tags: web spring
---

## 리소스 핸들러

정적 리소스를 웹컨테이너의 기본서블릿에 위임하는 핸들러이다. `WebMvcConfigurer` interface 를 구현해서 추가해 주면 된다. 캐시옵션을 사용하면 `Cache-Control` 헤더가 들어가게 된다.


``` java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/mobile/**")
        .addResourceLocations("classpath:/mobile/")
        .setCacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES))
        .resourceChain(true)

        ;
//            .resourceChain(true) //캐시를 사용할지 말지?
//            .addTransformer() //응답으로 보낼 리소스를 수정
//            .addResolver() //요청에 해당하는 리소스를 찾는 전략

}
```
