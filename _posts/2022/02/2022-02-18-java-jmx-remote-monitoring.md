---
layout: post
title: "java process remote monitoring with jconsole"
date: 2022-02-18
tags: java monitoring
---

# jconsole 로 java process 원격 모니터링

* 먼저 monitoring 할 java process 에 기동 옵션으로 아래와 같은 옵션이 필요하다.

```-Dcom.sun.management.jmxremote \
-Dcom.sun.management.jmxremote.port=[jmx remote port] \
-Dcom.sun.management.jmxremote.ssl=false \
-Dcom.sun.management.jmxremote.authenticate=false \
-Djava.rmi.server.hostname=[hostname or ip]
```

* class path 가 잡혀있다면 그냥 console 에서 `jconsole` 라고치면 실행된다.
* remote monitoring 할거니까 ip:port 를 입력
* 끝. 너무쉽당.


#### 참고
- [JMX(Java Management eXtension)](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pcmola&logNo=222061574743)
