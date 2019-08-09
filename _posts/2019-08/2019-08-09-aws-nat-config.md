---
layout: post
title: "AWS RDS mariadb config"
date: 2019-08-09
tags: aws
---

> prod 환경에서 web-was 구성에서  non-dmz 존에 있는 was/db 를 개발/운영자가 접근 할 수 있도록하는 방법을 설명한다.
> 보통이렇게 한다는데.. 정말?
> `gitbook` 에서 옮기는 중인데, 이거 적을때 막 `yaml` 을 접해서 `yaml` 로 적었나보다.

### 기본적인 WEB-WAS 구성에서의 AWS 구성

``` yaml
SUBNET:
  vpc:
    az: null
    subnet: 172.31.00.0/16
  default1:
    az: 2a
    subnet: 172.31.00.0/20
  default2:
    az: 2c
    subnet: 172.31.16.0/20
  publicA:
    az: 2a
    subnet: 172.31.32.0/20
  publicC:
    az: 2c
   subnet: 172.31.48.0/20
  privateA:
    az: 2a
    subnet: 172.31.64.0/20
  privateC:
    az: 2c
    subnet: 172.31.80.0/20

ROUTE-TABLE:
  public-route:
    routes:
      - destination:172.31.0.0/16, target:local
      - destination:0.0.0.0/0,     target:INTERNET-GATEWAY
    subnet-associations:
      - publicA
      - publicC
  private-route:
    routes:
      - destination:172.31.0.0/16, target:local
      - destination:0.0.0.0/0,     target:NAT-INSTANCE
    subnet-associations:
      - privateA
      - privateC

SECURITY-GROUP:
  secure-web:
    inbound:
      - tcp 80 from 0.0.0.0/0
      - tcp 80 from ::/0
      - tcp 22 from 0.0.0.0/0 #for ssh
      - tcp 22 from ::/0      #for ssh
    outbound:
      - all 0-65535 from 0.0.0.0/0
  secure-was:
    inbound:
      - tcp 8080 from 0.0.0.0/0 #for was, better from SUBNET publicA, publicC
      - tcp 8080 from ::/0      #for was, better from SUBNET publicA, publicC
      - tcp 22 from 0.0.0.0/0   #for ssh, better from SUBNET publicA, publicC
      - tcp 22 from ::/0        #for ssh, better from SUBNET publicA, publicC
    outbound:
      - all 0-65535 from 0.0.0.0/0
  secure-nat:
    inbound:
      - all 0-65535 from 172.31.64.0/20 #SUBNET privateA
      - all 0-65535 from 172.31.80.0/20 #SUBNET privateC
      - tcp 22 from 0.0.0.0/0
      - tcp 22 from ::/0
    outbound:
      - * 0-65535 from 0.0.0.0/0

EC2:
  web1-2a:
    subnet:
      - publicA
    security-group:
      - secure-web
    disable-source/destination-check: false
  was1-2a:
    subnet:
      - privateA
    security-group:
      - secure-was
    disable-source/destination-check: false
  nat:
    subnet:
      - publicA
    security-group:
      - secure-nat
    disable-source/destination-check: true
```

사실 이런걸 해주는 AWS 서비스가 (NAT Gateway) 있는데, 돈을 내야한다.
그러니까 EC2를 하나 더 만들어서 마스커레이딩을 해줘야한다.

> 마스커레이딩이란 로컬네트워크에 있는 컴퓨터가 방화벽 기능을 하는 리눅스 서버(또는 게이트웨이/프록시)를 통해서 외부로 데이터 등을 보내려고 할 때, 리눅스 서버가 그 컴퓨터를 '마스커레이딩'한다고 말한다.
> [고마워요!](http://egloos.zum.com/gunsystems/v/6784997)

먼저 위에서 설정한 `EC2-nat instance` 에 접속해서 아래 파일을 수정한다.

``` shell
vi /etc/sysctl.d/nat.conf
```

아래와 같이 적어준다.
> 뭔진 모른다.

```
net.ipv4.ip_forward = 1
net.ipv4.conf.eth0.send_redirects = 0
```

그리고 위에서 수정한 설정을 아래와 같이 적용해준다.

``` shell
sysctl -p /etc/sysctl.d/nat.conf
```

아직 안 끝났다. 아래의 파일을 하나 더 열어서..

``` shell
vi /etc/iptables.rules
```

아래와 같이 적어 준다..
> 역시 뭔지 모른다.

```
*nat
:PREROUTING ACCEPT [0:0]
:INPUT ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
:POSTROUTING ACCEPT [0:0]
-A POSTROUTING -o eth0 -j MASQUERADE
COMMIT
```

그리고 또 적용해준다.. ㅠ

``` shell
/sbin/iptables-restore < /etc/iptables.rules
```

이제 `NONE-DMZ` zone 의 web/db 서버에서 yum install/update 같은 외부 접속이 되는걸 확인한다.

> 참고로 `NONE-DMZ` zone 의 web/db 서버에 접속은 `DMZ` zone 의 서버에 들어가서 다시 접속을 했다. 이건...또 뭔 서버를 만들면 된다는데 귀찮아...
