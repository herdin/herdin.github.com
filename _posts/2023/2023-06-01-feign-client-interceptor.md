---
layout: post
title: "Feign Client Request Interceptor 설정"
date: 2023-06-01
tags: java spring
---


아래처럼 Feign 설정해서 사용할텐데, configuration 에 `RequestInterceptor` Bean 설정하면 request 조작 가능.

``` java
@FeignClient(
    name = "your-client",
    url = "\${feign.client.your.target.url}",
    fallbackFactory = YourFallbackFactory::class,
    configuration = [YourFiengConfig::class]
)
interface YourFiengInterface {
    // ...
}

class YourFiengConfig {
    @Bean
    fun requestInterceptor(): RequestInterceptor = RequestInterceptor { requestTemlate -> requestTemlate.header("User-Agent", "Your-Agent")}
}
```

