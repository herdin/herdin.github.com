---
layout: post
title: "Spring Boot 이것저것"
date: 2019-07-28 19:17:00
tags: web spring spring-boot
---
# Spring Boot 에서 Logback 의존성
`Spring Boot` 에서 `Logback` 을 사용하기 위해서는

{% highlight xml %}
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-logging</artifactId>
{% endhighlight %}

이놈이 필요한데 따로 써줄필요 없이

{% highlight xml %}
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-web</artifactId>
{% endhighlight %}

내부의

{% highlight xml %}
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter</artifactId>
{% endhighlight %}

에 들어가있다.
