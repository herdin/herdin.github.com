---
layout: post
title: "GCP tomcat to AWS rds"
date: 2019-08-09
tags: cloud gcp aws shovel-knight
---

``` shell
#aws rds : mariadb
#error log
### Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: Could not get JDBC Connection; nested exception is org.apache.commons.dbcp.SQLNestedException: Cannot create PoolableConnectionFactory (Could not connect to {aws_mariadb_ip_number}:{port} : Permission denied (connect failed))

#add jvm option to
#/usr/share/tomcat/conf/tomcat.conf
JAVA_OPTS="-Djava.net.preferIPv4Stack=true"
#and catalina log for check jvm option
#/var/log/tomcat/catalina.2019-04-10.log
Apr 10, 2019 1:24:55 PM org.apache.catalina.startup.VersionLoggerListener log
INFO: Command line argument: -Djava.net.preferIPv4Stack=true

#driver class name change to default (origin ip number)
jdbc:mariadb://{aws_mariadb_endpoint}:{port}/{database_name}

#mvn test
2019-04-10 13:49:48.606 DEBUG --- [ main ] o.m.s.t.SpringManagedTransaction : JDBC Connection [jdbc:mysql://{aws_mariadb_endpoint}:{port}/{database_name}, UserName={user_name}, mariadb-jdbc] will not be managed by Spring
2019-04-10 13:49:48.607 DEBUG --- [ main ] sql.list.selectList : ooo Using Connection [jdbc:mysql://{aws_mariadb_endpoint}:{port}/{database_name}, UserName={user_name}, mariadb-jdbc]
2019-04-10 13:49:48.629 DEBUG --- [ main ] sql.list.selectList : ==>  Preparing: SELECT id ,header ,description ,imgUrl FROM LIST WHERE 1=1
2019-04-10 13:49:48.684 DEBUG --- [ main ] sql.list.selectList : ==> Parameters:
2019-04-10 13:49:48.876 DEBUG --- [ main ] o.m.s.SqlSessionUtils : Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@609e8838]
2019-04-10 13:49:48.877 DEBUG --- [ main ] o.s.j.d.DataSourceUtils : Returning JDBC Connection to DataSource
#mvn package
#/usr/share/tomcat -> /var/lib/tomcat ?
#/var/log/tomcat/
Caused by: java.net.SocketException: Permission denied (connect failed)
        at java.net.PlainSocketImpl.socketConnect(Native Method)
        at java.net.AbstractPlainSocketImpl.doConnect(AbstractPlainSocketImpl.java:350)
        at java.net.AbstractPlainSocketImpl.connectToAddress(AbstractPlainSocketImpl.java:206)
        at java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:188)
        at java.net.SocksSocketImpl.connect(SocksSocketImpl.java:392)
        at java.net.Socket.connect(Socket.java:589)
        at java.net.Socket.connect(Socket.java:538)
        at org.mariadb.jdbc.internal.mysql.MySQLProtocol.connect(MySQLProtocol.java:372)
        at org.mariadb.jdbc.internal.mysql.MySQLProtocol.connect(MySQLProtocol.java:673)
#so modify /usr/share/tomcat/conf/catalina.policy
grant codeBase "jar:file:${catalina.base}/webapps/SimpleSpring/WEB-INF/lib/mariadb-java-client-1.1.7.jar!/-" {
     permission java.net.SocketPermission "{aws_mariadb_endpoint}:{port}", "connect";
};
#but fail..
```

> 생각 없이 yum install tomcat 해서 깔린 tomcat 을 사용하니까 자꾸  
> java.net.SocketException: Permission denied 에러가 나서  
> catalina.policy 도 건드렸는데 안되고..  
> nodejs 설치해서 올려보면 db connection 잘 되고..  
> 한 3-4일 삽질한듯..  
> docker 공식 tomcat 이미지에 올려보니 잘된다. 뭔가 그냥 yum install tomcat 하면 설정이 다른가본데...  
> 잘모르겠다 아무튼 해결..
