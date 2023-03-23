---
layout: post
title: "Common Command on Linux(CentOS)"
date: 2019-09-17
tags: linux command centos
---

## 시스템 관련

``` shell
echo $USER #echo currernt user

#os info
uname -a

#os bit 1
uname -m

#os bit 2
getconf LONG_BIT

#os bit 3
arch

#cpu info
lscpu

#cpu count
nproc

#memory info
free

#--human-readable
free -h

#disk free
df

#--human-readable
df -h

#--inodes
df -i

#--block-size=1K
df -k

#echo current path
pwd

#echo current date
date

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

## process

``` shell
$ ps -ef | grep nginx
```

## port

### netstat

* options
  * `-t, --tcp`
  * `-u, --udp`
  * `-n, --numeric`
  * `-l, --listening`
  * `-p, --programs` display PID/Program name for sockets
  
``` shell
# 열린 포트 확인
$ netstat -tnlp
```

mac os 에서는 좀 다르다

``` shell
# 열린 포트 확인
$ sudo lsof -PiTCP -sTCP:LISTEN

# 열린 포트의 PID 확인
$ sudo lsof -i :3000
```

### firewall 방화벽

* centos6 이하에서는 `iptables` 사용
* centos7 에서는 `firewall-cmd` 사용

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

> alias 해제

``` shell
unalias vim_nginx_conf
```

### 명령어의 결과를 명령어안에 넣기

백팃 이나 `"$()"` 를 사용하면된다
``` shell
$ echo `cat ~/deleteme/test.conf`
hello, config
$ echo "$(cat ~/deleteme/test.conf)"
hello, config
```

## set

* -o pipefail 파이프 사용시 오류 코드(non-zero exit code) 승계
* -e 오류가 발생하면 중단
* -u 설정되지 않은 변수를 사용하려고 하면 종료
* -x 실행되는 명령어와 인수들을 출력

### set -o pipefail

exit code 승계

``` shell
# 아래와 같은 test1.sh 을 실행한다고 하면,
# /non/exsitent/file 가 없기 때문에 exit code 가 0 이 아니게되지만, 파이프 연산자에 의해 wc 가 정상 수행되면서 echo $? 에서 0 이 출력된다.
cat /non/exsitent/file | wc
echo $?

# 하지만 아래와 같이 set -o pipefail 를 넣으면, exit code 가 승계되어 echo $? 에서 1 이 출력된다.
set -o pipefail
cat /non/exsitent/file | wc
echo $?
```

### set -e

오류가 발생하면 중단

``` shell
# 아래와 같은 test1.sh 를 실행하게되면, 중간에 오류가 나지만 hello, world 가 모두 출력 실행된다.
echo hello
cat asdfasdfasdf
echo world

# 하지만, set -e 를 함께 실행하면, hello 이후 오류가 나서 실행을 멈춘다.
set -e
echo hello
cat asdfasdfasdf
echo world
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
  util().genPureTable(
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
</script>

## ls
디렉토리 목록 출력

``` shell
$ ls -trl 
$ ls -trlh
```

## du
disk usage

``` shell
$ du -sh *
$ du --summarize --human-readable *
```

## ln

``` shell
$ ln -sf

```

- [temp](https://jhnyang.tistory.com/269)

## grep
``` shell
$ grep [옵션][패턴][파일명]
```
## [find](https://recipes4dev.tistory.com/156)
``` shell
# 파일명으로 찾을 경우
# find ${find-location} -name "${target-file-name}"
$ find / -name hello
```

## wc - word count?
``` shell
# -l : lines
# -c : bytes
# -m : characters
# -w : word
$ wc -l
$ echo "hello" | wc -m
6
```

## cut
문자열 자를때 사용
``` shell
# -b : byte
# -c : character
# -f : field
# -d : delimeter (default tab)
$ echo "hello" | cut -c1-4
$ echo "hello\tworld" | cut -f 1
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

## base64

* `-d, --decode`
* `-i, --input` (default)

``` shell
# encode 했다가 decode 하기
$ echo "hello world, epubaal" | base64 | base64 -d
hello world, epubaal

# 파일을 사용하기
$ echo "hello world, epubaal, in file" > test.txt
# 파일 내용 확인
$ cat test.txt                                   
hello world, epubaal, in file

# 파일내용 encode 해서 다른 파일에 넣기
$ base64 test.txt > test-encode.txt
# 파일 내용 확인
$ cat test-encode.txt 
aGVsbG8gd29ybGQsIGVwdWJhYWwsIGluIGZpbGUK

# 파일내용 decode 해서 다른 파일에 넣기
$ base64 -d test-encode.txt > test-decode.txt
# 파일 내용 확인
$ cat test-decode.txt
hello world, epubaal, in file
```

## more

``` shell
$ more <FILE_NAME>
```

- 화면 가득히 파일내용을 출력해준다
- `space bar` 를 누르면 파일에서 한줄씩 내려간다.
- `enter` 를 누르면 화면에서 한줄씩 내려간다.
- 현재보이는 내용이 전체 파일에서 몇 % 를 차지하는지 알려준다.
- `f` 를 누르면 forward 1페이지만큼 다음으로 간다
- `b` 를 누르면 backward 1페이지만큼 이전으로 간다


## less

`more` 같은데 페이지단위로 볼 수 있고, 끝에서부터도 볼 수 있다.

``` shell
$ less <FILE_NAME>
$ less -N <FILE_NAME> # show line number
```

- 화살표키 위아래로 한줄씩이동
- `space`, `f` 로 한페이지 아래로 이동
- b 으로 한페이지 위로 이동
- `G` 로 끝으로 이동
- more 와 유사하게 `/` 로 검색
- `q` 로 종료

## tr
* 입력받은문자에서 특정문자를 자르거나 변경할때

## sort
* 입력받은 라인을 정렬

## uniq
* 입력받은 라인에서 중복을 제거
* 곁에있는 라인에서 중복을 제거하므로, sort 다음에 쓰인다.

## comm
두 파일을 비교한다

``` shell
$ comm [option] [file1] [file2]
# [option]
# -1 두개를 비교하여 파일 1에만 있는 것은 출력하지 않음
# -2 두개를 비교하여 파일 2에만 있는 것은 출력하지 않음
# -3 두개를 비교하여 파일 1과 파일 2에 모두 존재하는 라인은 출력하지 않음
````


## scp
ssh 기반의 secure copy 를 수행. 원격파일카피.

``` shell
# r option for directory
scp -r <local-file-location> <remote-id>@<remote-host>:<remote-file-location>
scp -r <remote-id>@<remote-host>:<remote-file-location> <local-file-location>
scp -r epu@file.anmani.link:/home/remote-epu/tmp /Users/user/Downloads/tmp
```




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

## yum
레드햇 계열의 리눅스 배포판에서 사용하는 프로그램(패키지) 설치 관리 도구

### yum repository 활성화/비활성화

``` shell
# base repository 의 상태를 확인
$ yum repolist base -v

# repo list 의 상태가 저장된 파일들이 있는곳
$ cd /etc/yum.repos.d

# 안에서 설정파일들의 enabled=0 를 변경한다. (0 비활성화, 1 활성화)
```

## traceroute
``` shell
$ traceroute www.naver.com
traceroute: Warning: www.naver.com has multiple addresses; using 223.130.195.200
traceroute to www.naver.com.nheos.com (223.130.195.200), 64 hops max, 52 byte packets
 1  10.200.200.200 (10.200.200.200)  20.043 ms  4.234 ms  4.871 ms
 2  10.104.248.45 (10.104.248.45)  20.214 ms  4.501 ms  4.504 ms
 3  10.104.248.5 (10.104.248.5)  21.917 ms  5.678 ms  5.257 ms
 4  10.104.245.26 (10.104.245.26)  20.284 ms  5.247 ms
    10.104.245.22 (10.104.245.22)  19.672 ms
 5  10.104.240.49 (10.104.240.49)  20.054 ms
    10.104.241.47 (10.104.241.47)  20.204 ms
    10.104.241.49 (10.104.241.49)  23.500 ms
 6  223.130.195.200 (223.130.195.200)  19.518 ms  4.366 ms  4.473 ms
```

## ftp/sftp

``` shell
# ftp ${ip}
# ftp ${ip} ${port}
$ ftp 1.22.333.444 8888


# sftp -P ${port} ${id}@${ip}
$ sftp -P 8888 id@1.22.333.444

$ sftp -P ${PORT_NUMBER} -oIdentityFile=/path/to/private/key user@hostname

```

## jdk 관련..

### jvm 에서 사용하는 `java.io.tmpdir` 가 어딘지 확인해보고싶었다.

``` shell
# 먼저 java 프로그램을 찾아서
$ ps -ef | grep java
# pid 를 jino 에 넣어준다
# jinfo ${pid}
$ jinfo 12345

Java System Properties:
#Fri Feb 04 15:55:52 KST 2022
awt.toolkit=sun.lwawt.macosx.LWCToolkit
java.specification.version=11
kotlinx.coroutines.debug=off
sun.cpu.isalist=
sun.jnu.encoding=UTF-8
sun.arch.data.model=64
idea.fatal.error.notification=disabled
sun.font.fontmanager=sun.font.CFontManager
pty4j.preferred.native.folder=/Applications/IntelliJ IDEA.app/Contents/lib/pty4j-native
java.vendor.url=https\://openjdk.java.net/
apple.awt.fileDialogForDirectories=true
sun.java2d.uiScale.enabled=true
sun.io.useCanonCaches=false
jna.tmpdir=/Users/user/Library/Caches/JetBrains/IntelliJIdea2021.2/tmp
sun.boot.library.path=/Applications/IntelliJ IDEA.app/Contents/jbr/Contents/Home/lib
jdk.debug=release
sun.awt.exception.handler=com.intellij.openapi.application.impl.AWTExceptionHandler
com.apple.mrj.application.live-resize=false
java.specification.vendor=Oracle Corporation
java.version.date=2021-04-20
java.home=/Applications/IntelliJ IDEA.app/Contents/jbr/Contents/Home
file.separator=/
java.vm.compressedOopsMode=Zero based
line.separator=\n
java.specification.name=Java Platform API Specification
java.vm.specification.vendor=Oracle Corporation
jdk.attach.allowAttachSelf=true
idea.home.path=/Applications/IntelliJ IDEA.app/Contents
pty4j.tmpdir=/Users/user/Library/Caches/JetBrains/IntelliJIdea2021.2/tmp
sun.management.compiler=HotSpot 64-Bit Tiered Compilers
java.runtime.version=11.0.11+9-b1504.16
apple.awt.fullscreencapturealldisplays=false
user.name=user
javax.swing.rebaseCssSizeMap=true
idea.paths.selector=IntelliJIdea2021.2
sun.java2d.pmoffscreen=false
sun.awt.noerasebackground=true
file.encoding=UTF-8
jnidispatch.path=/Users/user/Library/Caches/JetBrains/IntelliJIdea2021.2/tmp/jna7920715044168139379.tmp
idea.popup.weight=heavy
java.vendor.version=JBR-11.0.11.9-1504.16-jcef
jna.loaded=true
java.io.tmpdir=/var/folders/12/f2csmhbn7ll786vc8wvz26mw0000gn/T/
java.version=11.0.11
idea.xdebug.key=-Xdebug

```
찾았당 -> java.io.tmpdir=/var/folders/12/f2csmhbn7ll786vc8wvz26mw0000gn/T/

### jar 파일 내용을 확인해 보고싶다

``` shell
$ jar tf <JAR FILE NAME>
```