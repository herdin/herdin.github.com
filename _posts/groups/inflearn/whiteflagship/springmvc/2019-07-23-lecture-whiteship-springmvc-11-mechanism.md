---
layout: post
title: "Whiteship Spring MVC 11 Mechanism"
date: 2019-07-24
tags: web spring spring-boot
---
jsp 로 시작해서 Servlet, DispatcherServlet 그리고 마지막엔
Spring Boot 로 구동하는 것을 보고 어떻게 구동되는지 설명하는 강좌.

기억나는 방법들은
1. `javax.servlet.http.HttpServlet` 상속받아 `web.xml` 에 등록하는 방법.
2. `org.springframework.web.servlet.DispatcherServlet` 을 `web.xml` 에 등록하고 `Handler` 를 등록하는 방법.
  - `DispatcherServlet` 은 특정 타입에 해당하는 빈을 찾는다.
  - 없다면 기본전략을 사용한다. (DispatcherServlet.properties)
3. `web.xml` 이 없어도 `org.springframework.web.WebApplicationInitializer` 를 구현한 클래스에서 `servlet` 을 등록해주면 사용할 수 있다. (스프링3.1+, 서블릿3.0+ 라는데..)

{% highlight java linenos %}
public class WebInitialize implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(WebConfig.class);
        context.refresh();

        DispatcherServlet servlet = new DispatcherServlet(context);
        ServletRegistration.Dynamic app = servletContext.addServlet("home", servlet);
        app.addMapping("/home/*");
    }
}
{% endhighlight %}

> 이렇게 등록한다면 된다매!! 흑흑
>
> 으 겨우 강의 10분들은것같은데 벌써 괴롭다
