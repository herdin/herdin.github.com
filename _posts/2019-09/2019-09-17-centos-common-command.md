---
layout: post
title: "Common Command on CentOS"
date: 2019-09-17
tags: linux centos
---

### common command
``` shell
echo $USER #echo currernt user

uname -a #os info
lscpu #cpu info
pwd #echo current path
date #echo current date
df #disk free
df -h #--human-readable
df -i #--inodes

history #사용한 명령어 히스토리
![line number] #히스토리의 해당 라인을 재실행

tar -cvzf [COMPRESSED NAME].tar.gz [COMPRESSING TARGET]
tar -xvzf [UNCOMPRESSING TARGET]
#v : 묶음/해제 과정을 화면에 표시
#c : 파일을 묶음
#x : 묶음을 해제
#z : gunzip을 사용
#f : 파일 이름을 지정
#p : 권한(permission)을 원본과 동일하게 유지

ln -s [SYMBOLIC LINK TARGET] [SYMBOLIC LINK NAME]
```

### systemctl

``` shell
systemctl start SERVICE_NAME.service
systemctl restart SERVICE_NAME.service
systemctl stop SERVICE_NAME.service
systemctl try-restart SERVICE_NAME.service #restart service when service is active
systemctl reload SERVICE_NAME.service
systemctl status SERVICE_NAME.service
systemctl cat SERVICE_NAME.service #check script?
```

### user management

``` shell
cat /etc/passwd #check user
cat /etc/shadow #check user password
cat /etc/group #check group

su - [USER ID] #change user

useradd [OPTION] [USER ID]
#-m : make home dir
#-g : set group
passwd [USER ID] #set password
usermod [OPTION] [USER ID]
#-c [COMMENT] : add comment
#-g [GROUP NAME]: change primary group for user
#-G [GROUP NAME] : supplementary


groups [USER ID] #check user group
groupadd [GROUP NAME] #add group
groupdel [GROUP NAME] #delete group

gpasswd [GROUP NAME] #set group password
gpasswd -r [GROUP NAME] #remove group password
gpasswd -a [USER ID] [GROUP NAME] #add user to group

chown [OPTION] [OWNER:GROUP] [FILE]
chmod [OPTION] [PERMISSION] [FILE]
#-c : show change file
#-R : recursive work
```


### SELinux

[SELinux 란?]({{ site.baseurl }}/selinux/)

``` shell
sestatus #selinux status
getenforce #selinux mode check
setenforce 0 #selinux mode set Permissive=0 [로그만남김], Enforcing=1 [selinux 적용]
tail -f /var/log/audit/audit.log #log

matchpathcon [FILE PATH] #check security context
chcon [OPTION] [CONTEXT FILE] #change context
#-t : type
#-R : recursive
```


### Bash PS1 gen

[Bash Prompt gen](http://ezprompt.net/)
