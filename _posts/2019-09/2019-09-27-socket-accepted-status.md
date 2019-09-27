---
layout: post
title: "TCP TIME_WAIT 에 대해서"
date: 2019-09-26
tags: network tcp
---

[정리 대상 블로그](http://blog.daum.net/_blog/BlogTypeView.do?blogid=0RxIq&articleno=268&_bloghome_menu=recenttext)

접속시작할때, 3-way Handshake
![image](/assets/images/posts/2019-09-26-tcp-time-wait-01.gif)

접속종료할때, 4-way Handshake
![image](/assets/images/posts/2019-09-26-tcp-time-wait-02.gif)

접속을 종료할때,  
Client 에서 FIN 을 보내고 Server 의 Ack 를 받은 다음,
Server 에서 FIN 을 보내고 Client 의 Ack 를 받으면 Client 와 Server 는 소켓을 닫기전에 서로 정리해야될 일들이 끝난 상태이다.

Server 의 FIN 을 보내기 전에 Server 에서 보낸 패킷이 FIN 보다 늦게 Client 에 도착하게 된다면 패킷이 유실되게 된다.  
위와 같이 데이터가 유실되는 경우를 막기 위해 Server 의 FIN 을 받은 Client 의 소켓은 TIME_WAIT 상태가 되는데 기본적으로 2MSL(60초) 동안 기다리면서 유실될 수 있는(늦게도착하는) 패킷을 기다린다고 한다.

순서를 보장하지 않는 네트워크 환경 때문에 유실될 수 있는 문제를 해결하고자 만든 TIME_WAIT 는 오히려 Server 쪽에 문제를 발생 시킬 수 있는데, 그냥 기다리는 소켓이 많아지게 되면 Server 에 부하+소켓부족으로 제 기능을 못하게 될 수 가 있다.

LINGER 옵션 : OS 옵션으로 closesocket()를 호출했을 때 아직 전송되지 않은 SendBuffer 의 데이터의 처리옵션

`LINGER.l_onoff = 1, LINGER.l_linger = 0`
- closesocket() 즉시 반환
- 버퍼의 데이터 버림
- 비정상종료(Abortive Shutdown) -> TIME_WAIT 가 남지 않음

`LINGER.l_onoff = 1, LINGER.l_linger = non-zero`
- 정상적인 종료가 될 때 까지 closesocket() 반환하지 않음
- 정상적인 종료과정(Graceful Shutdown) 진행. LINGER.l_linger (초) 만큼 대기 후 정상종료가 되지 않으면 비정상종료진행(closesocket() 즉시 반환 및 버퍼의 데이터 버림).

`LINGER.l_onoff = 0`
- closesocket() 즉시 반환
- 정상적인 종료과정(Graceful Shutdown) 을 Background 로 진행.
- 언제 종료됐는지 알 수 없음.

접속을 종료를 먼저 시도(closesocket() 호출)하는 쪽에 TIME_WAIT 가 남기 때문에, Server 가 아니라 Client 에서 먼저 접속 종료를 시도를 해야 Server 에 TIME_WAIT 가 남지 않는다.
