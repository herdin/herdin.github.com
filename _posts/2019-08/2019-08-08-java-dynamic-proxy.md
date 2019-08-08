---
layout: post
title: "java Dynamic Proxy"
date: 2019-08-08
tags: design-pattern writing
---
Proxy 대상이 되는 class 를 그대로 둔 채로 dynamic 하게 Proxy 가 적용된 instance 를 받아서 사용하는 방식. Java Reflection 을 사용한다.  
> `Java Relection` 이란, 구체적인 class type 을 모르더라도 해당 class 의 metohd/type/variable 등에 접근할 수 있게 해주는 api.  
> ex) 구체적인 class type 을 모르는데 접근하는 경우

```java
Object obj = new Event();
obj.getId(); // compile error
//class 파일은 byte code 로 compile 되어 static 영역에 위치하기 때문에,
//class 의 이름만 안다면 이를 이용해 위의 정보들을 가져올 수 있음.
```
[참고자료1](https://gyrfalcon.tistory.com/entry/Java-Reflection)


> 프록시 타겟 인터페이스

```java
package com.harm.unit.proxy;

public interface ProxyTarget {
	public String targetAction() throws Exception;
}//END OF CLASS
```

> 실제 프록시의 타겟이 될 구현체

```java
package com.harm.unit.proxy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProxyTargetImpl implements ProxyTarget {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public String targetAction() throws Exception {
		logger.debug("PROXY TARGET START");
		try {
			logger.debug("PROXY TARGET DO SOMETHING");
			return "TARGET_RETURN_DATA";
		} catch (Exception e) {
			throw e;
		} finally {
			logger.debug("PROXY TARGET END");
		}
	}//END OF FUNCTION

}//END OF CLASS
```

> 실제 프록시

```java
package com.harm.unit.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingHandler implements InvocationHandler {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	private ProxyTarget pt;

	public LoggingHandler(ProxyTarget pt) {
		this.pt = pt;
	}//END OF FUNCTIOIN

	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		this.logger.debug("LOGGING HANDLER START");
		try {
			this.logger.debug("LOGGING HANDLER ENTER TRY");
			return method.invoke(pt, args);
		} catch (Exception e) {
			throw e;
		} finally {
			this.logger.debug("LOGGING HANDLER ENTER END");
		}
	}//END OF FUNCTIOIN

}//END OF CLASS
```

> 메인에서 사용하는 방법

```java
LoggingHandler lh = new LoggingHandler(new ProxyTargetImpl());
ProxyTarget pt = (ProxyTarget) Proxy.newProxyInstance(lh.getClass().getClassLoader(), new Class[] { ProxyTarget.class}, lh);
System.out.println(pt.targetAction());
```
