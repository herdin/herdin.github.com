---
layout: post
title: "Spring MVC Exception handle"
date: 2022-01-05
tags: spring-mvc exception
---

* filter 와 interceptor 는 실행시점이 다르기 때문에, 예외처리 방식또한 다른다.
* filter 는 Web Application 에서 예외처리를 해야한다. error-page 설정이나, filter 내에서 예외를 잡아 request.getRequestDispatcher(String) 넘겨야한다.
* interceptor 는 Spring context 에서 예외가 발생하는 것이기 때문에 `@ControllerAdvice`, `@ExceptionHandler` 가 사용가능하다.
* interceptor 의 세가지 method
	* preHandle
	* postHandle
	* afterCompletion (after view rendering)

참고
- [(Spring)Filter와 Interceptor의 차이](https://meetup.toast.com/posts/151)
- [Exception Handling in Spring MVC](https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc)