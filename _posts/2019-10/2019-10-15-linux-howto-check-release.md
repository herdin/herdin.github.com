---
layout: post
title: "Linux 배포버전 확인하기"
date: 2019-10-15
tags: linux command
---

> 역시나 내가 만든 자료는 거이 없기 떄문에 출처를 명시한다.
[출처](https://zetawiki.com/wiki/리눅스_종류_확인,_리눅스_버전_확인)


### 1. `grep . /etc/*-release`

``` shell
[herdin86@instance-1 ~]$ grep . /etc/*-release
/etc/centos-release:CentOS Linux release 8.0.1905 (Core)
/etc/os-release:NAME="CentOS Linux"
/etc/os-release:VERSION="8 (Core)"
/etc/os-release:ID="centos"
/etc/os-release:ID_LIKE="rhel fedora"
/etc/os-release:VERSION_ID="8"
/etc/os-release:PLATFORM_ID="platform:el8"
/etc/os-release:PRETTY_NAME="CentOS Linux 8 (Core)"
/etc/os-release:ANSI_COLOR="0;31"
/etc/os-release:CPE_NAME="cpe:/o:centos:centos:8"
/etc/os-release:HOME_URL="https://www.centos.org/"
/etc/os-release:BUG_REPORT_URL="https://bugs.centos.org/"
/etc/os-release:CENTOS_MANTISBT_PROJECT="CentOS-8"
/etc/os-release:CENTOS_MANTISBT_PROJECT_VERSION="8"
/etc/os-release:REDHAT_SUPPORT_PRODUCT="centos"
/etc/os-release:REDHAT_SUPPORT_PRODUCT_VERSION="8"
/etc/redhat-release:CentOS Linux release 8.0.1905 (Core)
/etc/system-release:CentOS Linux release 8.0.1905 (Core)
```

### 2. `cat /etc/*-release | uniq`

``` shell
[herdin86@instance-1 ~]$ cat /etc/*-release | uniq
CentOS Linux release 8.0.1905 (Core)
NAME="CentOS Linux"
VERSION="8 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="8"
PLATFORM_ID="platform:el8"
PRETTY_NAME="CentOS Linux 8 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-8"
CENTOS_MANTISBT_PROJECT_VERSION="8"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="8"

CentOS Linux release 8.0.1905 (Core)
```

### 3. `grep . /etc/issue*`

> 이건 centos 랑 안맞나?

``` shell
[herdin86@instance-1 ~]$ grep . /etc/issue*
/etc/issue:\S
/etc/issue:Kernel \r on an \m
/etc/issue.net:\S
/etc/issue.net:Kernel \r on an \m
```

### `rpm -qa *-release`

``` shell
[herdin86@instance-1 ~]$ rpm -qa *-release
centos-release-8.0-0.1905.0.9.el8.x86_64
```
