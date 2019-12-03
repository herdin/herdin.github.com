---
layout: post
title: "Java JDBC 와 JNDI"
date: 2019-11-19
tags: java writing
---

# WAS 에 Datasource 를 설정하는 이유 (JNDI)

[출처](https://soul0.tistory.com/286)

- WAS:App = 1:N 인 경우가 많기 때문에, 각 App 마다 DB pool 을 갖고 있게 되면 관리가 어렵고, 자원을 낭비하게됨.
- Datasource 의 Load balancing 기능이 WAS 에 구현되어 있음. (failover)

# Common DBCP

[출처](https://d2.naver.com/helloworld/5102792)

오픈소스 라이브러리로 Apache의 Commons DBCP와 Tomcat-JDBC, BoneCP, HikariCP

> [DBCP 1.4.1의 메모리 누수 버그](https://issues.apache.org/jira/browse/DBCP-330)

커넥션 생성은 Commons DBCP에서 이루어진다. Commons DBCP는 PoolableConnection 타입의 커넥션을 생성하고 생성한 커넥션에 ConnectionEventListener를 등록한다. ConnectionEventListener에는 애플리케이션이 사용한 커넥션을 풀로 반환하기 위해 JDBC 드라이버가 호출할 수 있는 콜백 메서드가 있다. 이렇게 생성된 커넥션은 commons-pool의 addObject() 메서드로 커넥션 풀에 추가된다. 이때 commons-pool은 내부적으로 현재 시간을 담고 있는 타임스탬프와 추가된 커넥션의 레퍼런스를 한 쌍으로 하는 ObjectTimestampPair라는 자료구조를 생성한다. 그리고 이들을 LIFO(last in first out) 형태의 CursorableLinkedList로 관리한다.

> BasicDataSource 클래스의 커넥션 개수 지정 속성

<table class="pure-table">
<thead>
  <tr>
    <th>속성</th>
    <th>설명</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>initialSize</td>
    <td>BasicDataSource 클래스 생성 후 최초로 getConnection() 메서드를 호출할 때 커넥션 풀에 채워 넣을 커넥션 개수</td>
  </tr>
  <tr>
    <td>maxActive</td>
    <td>동시에 사용할 수 있는 최대 커넥션 개수(기본값: 8)</td>
  </tr>
  <tr>
    <td>maxIdle</td>
    <td>커넥션 풀에 반납할 때 최대로 유지될 수 있는 커넥션 개수(기본값: 8)</td>
  </tr>
  <tr>
    <td>minIdle</td>
    <td>최소한으로 유지할 커넥션 개수(기본값: 0)</td>
  </tr>
</tbody>
</table>

maxActive 값과 maxIdle 값이 같은 것이 바람직하다. maxActive = 10이고 maxIdle = 5라고 가정해 보자. 항상 커넥션을 동시에 5개는 사용하고 있는 상황에서 1개의 커넥션이 추가로 요청된다면 maxActive = 10이므로 1개의 추가 커넥션을 데이터베이스에 연결한 후 풀은 비즈니스 로직으로 커넥션을 전달한다. 이후 비즈니스 로직이 커넥션을 사용 후 풀에 반납할 경우, maxIdle=5에 영향을 받아 커넥션을 실제로 닫아버리므로, 일부 커넥션을 매번 생성했다 닫는 비용이 발생할 수 있다.

Commons DBCP에서는 DBMS에 로그인을 시도하고 있는 커넥션도 사용 중인 것으로 간주한다.

아래와 같은 가정을 했을 때,
- 1개의 요청이 처리되는데 10개의 쿼리가 돌아야한다.
- 1개의 쿼리는 50ms 가 걸린다
- maxActive = 5
해당 시스템의 TPS 는 5Request/10Query*50ms = 10TPS 이다.

적정한 maxActive 값을 구하기 위해선 Commons DBCP 외에 Tomcat의 동작 방식도 고려해야한다. Tomcat 도 내부적으로 요청을 처리하는 스레드풀을 갖고 있기 때문이다. Tomcat에서 사용자의 연결을 처리하는 최대의 스레드 개수는 server.xml 파일에서 maxThread 속성으로 지정한다.

모자란 커넥션 때문에 Tomcat 의 스레드가 대기하고 maxWait 의 시간 만큼 대기 후 커넥션을 얻어와 처리 했다 하더라도,  maxWait 시간이 길다면 사용자가 이미 떠났을 가능성이 높다. 사용자가 인내할 수 있는 시간을 넘어서는 maxWait 값은 아무런 의미가 없다.

만약 갑작스럽게 사용자가 증가해 maxWait 값 안에 커넥션을 얻지 못하는 빈도가 늘어난다면 maxWait 값을 더 줄여서 시스템에서 사용하는 스레드가 한도에 도달하지 않도록 방어할 수 있다. 전체 시스템 장해는 피하고 '간헐적 오류'가 발생하는 정도로 장애의 영향을 줄이는 것이다. 이런 상황이 자주 있다면 Commons DBCP의 maxActive 값과 Tomcat의 maxThread 값을 동시에 늘이는 것을 고려한다. 그러나 시스템 자원의 한도를 많이 넘는 요청이 있다면 설정을 어떻게 변해도 장애를 피할 수 없다. 애플리케이션 서버의 자원이 설정 변경을 수용할 만큼 충분하지 않다면 시스템을 확충해야 할 것이다.

검증에 지나치게 자원을 소모하지 않게 testOnBorrow 옵션과 testOnReturn 옵션은 false로 설정하고, 오랫동안 대기 상태였던 커넥션이 끊어지는 현상을 막게 testWhileIdle 옵션은 true로 설정하는 것을 추천한다.
