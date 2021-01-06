---
layout: post
title: "Whiteship Spring MVC 3/4 Configuration - Interceptor"
date: 2019-09-11  
tags: web spring
---

## 핸들러 인터셉터
## 핸들러 인터셉터 구현

`org.springframework.web.servlet.HandlerInterceptor` 을 구현하고, `WebMvcConfigurer` interface 의 `public void addInterceptors(InterceptorRegistry registry)` 를 구현해서 추가 하면 된다.

순서와 어떤 request path 에 적용할지도 정할 수 있다. 정하지 않으면 모든 path 에 적용 된다.


먼저 인터셉터를 정의하고,

``` java
package com.harm.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FristInterceptor implements HandlerInterceptor {

    private Logger logger = LoggerFactory.getLogger(FristInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("pre 1");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        logger.info("post 1");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        logger.info("after 1");
    }
}
```

인터셉터를 등록한다.

``` java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new FristInterceptor()).order(0);
    registry.addInterceptor(new SecondInterceptor()).order(-1).addPathPatterns("/hello2/**");
}
```
