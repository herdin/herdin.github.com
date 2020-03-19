---
layout: post
title: "Spring, Request Handler.."
date: 2020-03-07
tags: spring
---

# HandlerMapping

http 의 요청정보를 이용해 핸들러를 찾아준다.

`org.springframework.web.servlet.HandlerMapping` 인터페이스의 구현해야한다.

``` java
public interface HandlerMapping {
    String BEST_MATCHING_HANDLER_ATTRIBUTE = HandlerMapping.class.getName() + ".bestMatchingHandler";
    String PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE = HandlerMapping.class.getName() + ".pathWithinHandlerMapping";
    String BEST_MATCHING_PATTERN_ATTRIBUTE = HandlerMapping.class.getName() + ".bestMatchingPattern";
    String INTROSPECT_TYPE_LEVEL_MAPPING = HandlerMapping.class.getName() + ".introspectTypeLevelMapping";
    String URI_TEMPLATE_VARIABLES_ATTRIBUTE = HandlerMapping.class.getName() + ".uriTemplateVariables";
    String MATRIX_VARIABLES_ATTRIBUTE = HandlerMapping.class.getName() + ".matrixVariables";
    String PRODUCIBLE_MEDIA_TYPES_ATTRIBUTE = HandlerMapping.class.getName() + ".producibleMediaTypes";

    @Nullable
    HandlerExecutionChain getHandler(HttpServletRequest var1) throws Exception;
}
```

## Spring 에서 제공하는 handler mapping

### BeanNameUrlHandlerMapping
``` xml
<bean name="/someurl/*" class="SomeController" />
<bean name="/otherurl/**/suburl" class="OtherController" />
```

### ControllerBeanNameHandlerMapping

`BeanNameUrlHandlerMapping` 와 유사하지만 bean 이름 앞에 `/` 를 붙여준다.

### ControllerClassNameHandlerMapping

bean 의 클래스 명에서 Controller 를 제외하고 url 매핑을 해준다.

`SomeController` -> `some` 에 매핑

### SimpleUrlHandlerMapping

url 과 매핑되는 controller 를 직접 매핑시켜줄 수 있다.

### DefaultAnnotationHandlerMapping

`@RequestMapping` 를 사용하는 전략이다.

# HandlerAdapter

HandlerMapping 으로 찾은 handler 를 실행시켜주는 기능을 한다.

`org.springframework.web.servlet.HandlerAdapter` 인터페이스의 구현해야한다.

``` java
public interface HandlerAdapter {
    boolean supports(Object var1);

    @Nullable
    ModelAndView handle(HttpServletRequest var1, HttpServletResponse var2, Object var3) throws Exception;

    long getLastModified(HttpServletRequest var1, Object var2);
}
```

## SimpleServletHandlerAdapter

`javax.servlet.Servlet` 의 구현체를 컨트롤러로 사용할때 사용되는 어뎁터이다. 기존 Servlet 을 spring 으로 이관할 때 사용한다.

``` java
public class SimpleServletHandlerAdapter implements HandlerAdapter {
    public SimpleServletHandlerAdapter() {
    }

    public boolean supports(Object handler) {
        return handler instanceof Servlet;
    }

    @Nullable
    public ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        ((Servlet)handler).service(request, response);
        return null;
    }

    public long getLastModified(HttpServletRequest request, Object handler) {
        return -1L;
    }
}
```
## HttpRequestHandlerAdapter

`org.springframework.web.HttpRequestHandler` 의 구현체의 어뎁터이다.

## SimpleControllerHandlerAdapter

`org.springframework.web.servlet.mvc.Controller` 의 구현체의 어뎁터이다. 직접 구현하지말고 `AbstractController` 를 상속받아 사용하는 것이 권장된다.

## AnnotationMethodHandlerAdapter

따로 타입이 정해져있지않다. `DefaultAnnotationHandlerMapping` 와 함께 쓴다. (같은 어노테이션 기반)

# HandlerInterceptor

HandlerMapping 단위로 Intercepter 를 등록해 Controller 호출 전/후 작업을 지원한느 interface 이다.

`org.springframework.web.servlet.HandlerInterceptor` 의 구현해야한다.

HandlerMapping 단위기 때문에 Servlet Filter 와는 다르다.
