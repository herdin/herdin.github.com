---
layout: post
title: "Accepted Socket 의 상태가...?"
date: 2019-09-26
tags: network
---

이 [포스트]({{ site.url }}/tcp-time-wait/)를 정리하다가 나만 모르는 놀라운 정보를 알게 되었다.
`ServerSocket` 에서 `accept()` 시 반환 되는 server socket(client socket 과 연동 된) 의 포트가 서버의 listening socket 포트와 같다는 것...

``` java
...
ServerSocket serverSocket = new ServerSocket(3000);
...
Socket socket = serverSocket.accept();
...
```

> 위의 코드에서 `accept()` 반환받는 Socket 객체에 바인딩 된 포트는 내 상식으로는 3000 이 커널에서 선택한 유휴포트로 알고 있었다.
그런데 그게 이제 아닌가보다..... 이상하다 학부때는 분명 그렇게 배운 것 같았는데............ 언제부터 바뀐건지 원래 잘못 알고있었던건지 알 수 가 없다...

이 [포스트](http://docs.likejazz.com/time-wait/) 에 따르면,  서버에서 사용할 수 있는 포트의 갯수는 3 ~ 6 만개 이다.
``` shell
$ sysctl net.ipv4.ip_local_port_range
net.ipv4.ip_local_port_range = 32768    60999
```

파일디스크립터의 갯수는 가변적이지만,
``` shell
$ sysctl fs.file-max
fs.file-max = 57545
```
늘릴 수 있다고한다. 26만개 이상?

그런데 위의 포스트에선 TIME_WAIT 상태인 소켓을 9만개인 것을 확인 했단다..
> 아니 이게 무슨말이오

소켓 하나에 서버의 로컬포트가 1개 씩 바인딩 된다고 하면 저건 말이 안된다.

그래서 나도 간단하게 확인만 해보았다..

[서버 소스](https://github.com/herdin/SimpleJava/blob/master/src/main/java/com/harm/unit/io/network/SocketStudy0101.java), [클라이언트 소스](https://github.com/herdin/SimpleJava/blob/master/src/main/java/com/harm/unit/io/network/SocketStudy0102.java)  

서버는 단순한 에코 서버이고 클라이언트를 여러개 상대한다..

### 서버측 로그

``` shell
2019-09-27 17:19:29.505 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : ----------------------------------------
2019-09-27 17:19:29.509 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : | START TIME : 20190927171929
2019-09-27 17:19:29.522 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : | SocketStudy0101 STARTED
2019-09-27 17:19:29.525 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : ........................................
2019-09-27 17:19:29.529 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0101 : SERVER SOCKER CREATION.
2019-09-27 17:19:56.385 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0101 : ACCEPT LOCAL /127.0.0.1:3000 REMOTE /127.0.0.1:54133
2019-09-27 17:19:56.388 DEBUG --- [ Thread-0 ] c.h.u.i.n.SocketStudy0101$1Worker : WORKER0 THREAD START LOCAL /127.0.0.1:3000 REMOTE /127.0.0.1:54133
2019-09-27 17:19:59.362 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0101 : ACCEPT LOCAL /127.0.0.1:3000 REMOTE /127.0.0.1:54139
2019-09-27 17:19:59.363 DEBUG --- [ Thread-1 ] c.h.u.i.n.SocketStudy0101$1Worker : WORKER1 THREAD START LOCAL /127.0.0.1:3000 REMOTE /127.0.0.1:54139
2019-09-27 17:20:29.659 DEBUG --- [ Thread-0 ] c.h.u.i.n.SocketStudy0101$1Worker : RECV 첫번째 클라이언트에서 보낸 메세지
2019-09-27 17:20:46.056 DEBUG --- [ Thread-1 ] c.h.u.i.n.SocketStudy0101$1Worker : RECV 두번째 클라이언트에서 보낸 메세지
```

### 첫번째 클라이언트 로그

``` shell
2019-09-27 17:19:56.377 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : ----------------------------------------
2019-09-27 17:19:56.382 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : | START TIME : 20190927171956
2019-09-27 17:19:56.384 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : | SocketStudy0102 STARTED
2019-09-27 17:19:56.384 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : ........................................
2019-09-27 17:19:56.385 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : CLIENT SOCKET CREATION
2019-09-27 17:19:56.387 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : TYPE MESSAGE :
첫번째 클라이언트에서 보낸 메세지
2019-09-27 17:20:29.660 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : RECV WORKER0[첫번째 클라이언트에서 보낸 메세지]
2019-09-27 17:20:29.660 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : TYPE MESSAGE :
```

### 두번째 클라이언트 로그

``` shell
2019-09-27 17:19:59.354 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : ----------------------------------------
2019-09-27 17:19:59.359 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : | START TIME : 20190927171959
2019-09-27 17:19:59.361 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : | SocketStudy0102 STARTED
2019-09-27 17:19:59.361 DEBUG --- [ main ] c.h.u.DefaultUnitHandler : ........................................
2019-09-27 17:19:59.362 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : CLIENT SOCKET CREATION
2019-09-27 17:19:59.363 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : TYPE MESSAGE :
두번째 클라이언트에서 보낸 메세지
2019-09-27 17:20:46.058 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : RECV WORKER1[두번째 클라이언트에서 보낸 메세지]
2019-09-27 17:20:46.059 DEBUG --- [ main ] c.h.u.i.n.SocketStudy0102 : TYPE MESSAGE :
```

아니.. 리모트는 다른데 로컬포트가 같애 이게 어떻게된거지..

### 결론

소켓은 <protocol>, <src addr>, <src port>, <dest addr>, <dest port> 이 5개 값이 유니크하게 구성된다. 따라서 서버 포트가 추가되거나 클라이언트의 IP가 추가될 경우 그 만큼의 새로운 쌍을 생성할 수 있어 TIME_WAIT가 많이 남아 있어도 별 문제가 없다.

라고 한다.. 대체 언제부터 바뀐걸까.. 내가 잘못알고 있었던걸까.. 흑흑..
