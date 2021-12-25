---
layout: post
title: "apache httpd.conf"
date: 2020-12-03
tags: httpd
---
# init
* https://webdir.tistory.com/178

# virtual host
* https://httpd.apache.org/docs/2.4/ko/vhosts/

# rewrite module
* https://www.linux.co.kr/apache/rewrite_Module/Apache_rewrite_Module.htm

# log format
* https://araikuma.tistory.com/801
* https://sarc.io/index.php/httpd/1094-apache-http-server-log-format
* https://httpd.apache.org/docs/2.4/ko/logs.html

%a	액세스한 IP 주소
%u	인증 사용자명
%t	시간
%r	요청의 첫 번째 행의 값
%>S	마지막 응답의 상태
%b전송된 바이트 수 (헤더는 제외), 0바이트인 경우는 '-'이 표시된다.
%T	처리하는데 걸린 시간
%{헤더명}i	요청에 포함된 헤더명의 값
%v	요청에 대한 가상 호스트 이름
%p	요청을서비스하는서버의정규포트