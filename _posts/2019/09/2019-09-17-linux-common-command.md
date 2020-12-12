---
layout: post
title: "Common Command on Linux(CentOS)"
date: 2019-09-17
tags: linux command centos
---

## 시스템 관련

``` shell
echo $USER #echo currernt user

uname -a #os info
uname -m #os bit 1
getconf LONG_BIT #os bit 2
arch #os bit 3

lscpu #cpu info
pwd #echo current path
date #echo current date

df #disk free
df -h #--human-readable
df -i #--inodes
df -k #--block-size=1K

history #사용한 명령어 히스토리
![line number] #히스토리의 해당 라인을 재실행

file -bi [CHECK_FILE_NAME] #파일의 캐릭터셋을 확인한다
#-b --brief                do not prepend filenames to output lines
#-i, --mime                 output MIME type strings (--mime-type and --mime-encoding)

ls #디렉토리 내용 확인
```

## systemctl

``` shell
systemctl start SERVICE_NAME.service
systemctl restart SERVICE_NAME.service
systemctl stop SERVICE_NAME.service
systemctl try-restart SERVICE_NAME.service #restart service when service is active
systemctl reload SERVICE_NAME.service
systemctl status SERVICE_NAME.service
systemctl cat SERVICE_NAME.service #check script?
```

## User

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

## 압축

``` shell
tar -cvzf [COMPRESSED NAME].tar.gz [COMPRESSING TARGET]
tar -xvzf [UNCOMPRESSING TARGET]
#v : 묶음/해제 과정을 화면에 표시
#c : 파일을 묶음
#x : 묶음을 해제
#z : gunzip을 사용
#f : 파일 이름을 지정
#p : 권한(permission)을 원본과 동일하게 유지

ln -s [SYMBOLIC LINK TARGET] [SYMBOLIC LINK NAME]

# 디렉토리와 하위 디렉토리 사이즈
du -h --apparent-size [TARGET LOCATION:DEFAULT .]
```
### 자주쓰는 alias

> alias 설정을 위해 `.bashrc` 수정

``` shell
vi ~/.bashrc #modify .bashrc file
```
> alias 내용

``` shell
alias cp='cp -i'
alias mv='mv -i'

alias compress='tar -cvzf'
alias uncompress='tar -xvzf'

alias start='systemctl start'
alias stop='systemctl stop'
alias status='systemctl status'
alias restart='systemctl restart'
alias reload='systemctl reload'

#for docker
alias dps='docker ps'
alias dimg='docker images'

#for public web server
alias connect_private_server='ssh -i /root/herdin-aws-study-copy.pem'
alias vim_nginx_conf='vim /etc/nginx/nginx.conf'
alias cd_nginx_conf='cd /etc/nginx'
alias cd_nginx_home='cd /usr/share/nginx/html'

#for private was server
alias cd_tomcat_home='cd /usr/share/tomcat'
```

> alias 설정 적용

``` shell
source ~/.bashrc #modified .bashrc file apply
```

### 명령어의 결과를 명령어안에 넣기

백팃 이나 `"$()"` 를 사용하면된다
``` shell
$ echo `cat ~/deleteme/test.conf`
hello, config
$ echo "$(cat ~/deleteme/test.conf)"
hello, config
```

## Process.

``` shell
ps #process show
#-e : show all
#-f : full format
#-l : long format
#-p : specific process
#-u : specific user process

kill #process kill
#-l : show SIGNAL list
1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
#ex)
kill -SIGNAL PROCESS_ID
kill -2 123
kill -INT 123 #SIGINT - SIG
```

kill -9 ${PID} 를 사용하면 안되는 이유.

개발자가 시그널핸들러를 작성했는데도 불구하고 `SIGKILL`(9), `SIGSTOP`(19) 은 핸들러를 등록할 수 없는 시그널이기 때문에 사용을 지양해야 한다.

시그널 핸들러가 등록되지 않았을 때의 커널에 정의된 기본 행동 [출처](https://www.lesstif.com/pages/viewpage.action?pageId=12943674)

<div id="pureTableHere"></div>
<script>
require(['util'], (util) => {
  util.genPureTable(
    'pureTableHere',
    ['SIGNAL', '기본 행동'],
    [
      ['TERM', '시그널을 수신한 프로세스 종료'],
      ['IGN', '시그널 무시'],
      ['CORE', '시그널을 수신한 프로세스를 종료하면서 코어 덤프(core dump) 파일 생성'],
      ['STOP', '시그널을 수신한 프로세스 정지'],
      ['CONT', '중지된 프로세스 재시작'],
    ]
  );
});
</script>

## SELinux

[SELinux 란?]({{ site.url }}/2019/08/27/selinux)

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

### shellscript while

docker stack deploy 이후, service 가 뜨는지 확인하기 위해 계속 치는게 귀찮아서 사용했다.
``` shell
$ while true
$ do
$ docker service ls
$ sleep 2
$ done
```

### Bash PS1 gen

[Bash Prompt gen](http://ezprompt.net/)
