---
layout: post
title: "IntelliJ tomcat console decode"
date: 2019-07-28 19:17:00
tags: ide intelli-j decode
---
그냥 생각없이 tomcat 돌리면 아래처럼 꼹쟆이 난다.

{% highlight %}
30-Jun-2019 13:41:25.517 �젙蹂� [main] org.apache.catalina.startup.VersionLoggerListener.log �꽌踰� 踰꾩쟾:        Apache Tomcat/9.0.14
30-Jun-2019 13:41:25.522 �젙蹂� [main] org.apache.catalina.startup.VersionLoggerListener.log Server 鍮뚮뱶 �떆媛�:          Dec 6 2018 21:13:53 UTC
30-Jun-2019 13:41:25.522 �젙蹂� [main] org.apache.catalina.startup.VersionLoggerListener.log Server 踰꾩쟾 踰덊샇:         9.0.14.0
30-Jun-2019 13:41:25.522 �젙蹂� [main] org.apache.catalina.startup.VersionLoggerListener.log OS Name:               Windows 10
30-Jun-2019 13:41:25.522 �젙蹂� [main] org.apache.catalina.startup.VersionLoggerListener.log �슫�쁺泥댁젣 踰꾩쟾:            10.0
{% endhighlight %}

idea64.exe.vmoptions 파일 마지막에 -Dfile.encoding=UTF-8 를 추가하고
intelliJ run configuration 에도  같은걸 넣어주자. 그러면..

{% highlight %}
30-Jun-2019 14:10:47.596 정보 [main] org.apache.catalina.startup.VersionLoggerListener.log 서버 버전:        Apache Tomcat/9.0.14
30-Jun-2019 14:10:47.599 정보 [main] org.apache.catalina.startup.VersionLoggerListener.log Server 빌드 시각:          Dec 6 2018 21:13:53 UTC
30-Jun-2019 14:10:47.599 정보 [main] org.apache.catalina.startup.VersionLoggerListener.log Server 버전 번호:         9.0.14.0
30-Jun-2019 14:10:47.599 정보 [main] org.apache.catalina.startup.VersionLoggerListener.log OS Name:               Windows 10
30-Jun-2019 14:10:47.599 정보 [main] org.apache.catalina.startup.VersionLoggerListener.log 운영체제 버전:            10.0
{% endhighlight %}

암이 나았습니다.
