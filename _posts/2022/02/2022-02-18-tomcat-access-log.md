---
layout: post
title: "tomcat access log 남기기"
date: 2022-02-18
tags: tomcat
---

아래와 같은 설정을 보고, pattern 에 사용된 것들이 어떻게 세팅될지 궁금해하고있었는데...
``` xml
	<Host name="localhost" ...>
		<Valve
			className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log" suffix=".txt"
			pattern='%{X-MY-NAME}i %t "%A" "%{PARAM-YOUR-NAME}r" "%r" "%s" "%T" %b "%{User-Agent}i" "%{Referer}i"' />
	</Host>
```

이렇게 쉬운거였다니..

* %a - Remote IP address
* %A - Local IP address
* %b - Bytes sent, excluding HTTP headers, or '-' if zero
* %B - Bytes sent, excluding HTTP headers
* %h - Remote host name (or IP address if enableLookups for the connector is false)
* %H - Request protocol
* %l - Remote logical username from identd (always returns '-')
* %m - Request method (GET, POST, etc.)
* %p - Local port on which this request was received. See also %{xxx}p below.
* %q - Query string (prepended with a '?' if it exists)
* %r - First line of the request (method and request URI)
* %s - HTTP status code of the response
* %S - User session ID
* %t - Date and time, in Common Log Format
* %u - Remote user that was authenticated (if any), else '-'
* %U - Requested URL path
* %v - Local server name
* %D - Time taken to process the request in millis. Note: In httpd %D is microseconds. Behaviour will be aligned to httpd in Tomcat 10 onwards.
* %T - Time taken to process the request, in seconds. Note: This value has millisecond resolution whereas in httpd it has second resolution. Behaviour * will be align to httpd in Tomcat 10 onwards.
* %F - Time taken to commit the response, in millis
* %I - Current request thread name (can compare later with stacktraces)

* %{xxx}i write value of incoming header with name xxx
* %{xxx}o write value of outgoing header with name xxx
* %{xxx}c write value of cookie with name xxx
* %{xxx}r write value of ServletRequest attribute with name xxx
* %{xxx}s write value of HttpSession attribute with name xxx
* %{xxx}p write local (server) port (xxx==local) or remote (client) port (xxx=remote)
* %{xxx}t write timestamp at the end of the request formatted using the enhanced SimpleDateFormat pattern xxx


#### 참고
- [Apache Tomcat access log 설정](https://gyrfalcon.tistory.com/entry/Apache-Tomcat-access-log-%EC%84%A4%EC%A0%95)
- [Apache Tomcat Access Log Valve](https://tomcat.apache.org/tomcat-7.0-doc/config/valve.html#Access_Log_Valve)