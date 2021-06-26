---
layout: post
title: shell, nohup (no hang up) 사용하기
date: 2021-06-27
tags: linux shell
---

> 같이 일하셨던 차장님이 `nohup` 를 사용하여 개발 서버에서 작업하시는걸 보고 뭔지 잘 모르는거라 정리한다.

`nohup` 명령어는 ssh 접속이 끊어져도 실행 중인 프로그램을 죽이지 말라는 명령어이다.

`&` 백그라운드 실행 명령어와 보통 함께 쓰인다.
> 백그라운드 프로세스란, 사용자와의 입출력이 없는 프로세스를 의미한다.  
> 데몬 프로세스란, 백그라운드 프로세스 중 부모프로세스가 init (PID 1) 이거나, 다른 데몬 프로세스인 프로세스를 의미한다.  
> 사용자가 실행 중인 쉘 프로세스가 부모 프로세스인 경우, 사용자가 ssh 접속을 종료하면 이에 따라서 같이 종료되기 때문에  사용자의 접속 종료와 별개로 돌아야하는 프로세스를 데몬 프로세스로 만든다.  
> `nohup` 명령어로 실행한 프로세스는 사용자가 접속중일 때는 사용자의 쉘 프로세스를 부모프로세스로 갖지만,  
> 사용자가 접속을 종료하면 부모 프로세스가 init 프로세스로 변경된다.


##### nohup-test.sh (테스트 대상이 될 쉘 스크립트)
현재 시간과 index 를 찍고, 1초 쉬는 걸 20번 하는 스크립트
``` shell
#! /bin/bash

i=1

while [ $i -lt 21 ]
do
  echo current date is `date` and index is $i
  i=$(($i+1))
  sleep 1
done
```

그냥 실행하게 되면, 사용자는 해당 쉘이 찍는 출력을 보게 된다.

``` shell
$ ./nohup-test.sh
rm: cannot remove 'nohup.out': No such file or directory
current date is Sat Jun 26 17:53:08 UTC 2021 and index is 1
current date is Sat Jun 26 17:53:09 UTC 2021 and index is 2
current date is Sat Jun 26 17:53:10 UTC 2021 and index is 3
current date is Sat Jun 26 17:53:11 UTC 2021 and index is 4
current date is Sat Jun 26 17:53:12 UTC 2021 and index is 5
...
```
하지만 nohup 와 함께 실행하면, `nohup.out` 으로 출력을 돌리고, 아무 출력을 볼 수 없다.

``` shell
$ nohup ./nohup-test.sh
nohup: ignoring input and appending output to 'nohup.out'
```

마찬가지로 사용자는 아무 입력도 못하게 되는데 이는 쉘스크립트가 포그라운드로 떠있기 때문이다.

쉘스크립트를 백그라운드로 실행하기 위해서는 단순히 뒤에 `&` 만 추가해주면 된다.

``` shell
$ nohup ./nohup-test.sh &
[1] 26748
$ nohup: ignoring input and appending output to 'nohup.out'
$
```

기본적으로 실행 프로그램과 같은 디렉토리에 `nohup.out` 에 표준출력이 쌓이게 되는데, 이를 변경하고 싶으면 단순하게 표준출력만 돌려주면 된다.

``` shell
$ nohup ./nohup-test.sh > other.log &
[2] 27108
$ ls
nohup-test.sh  other.log
```


참고
- [쉽게 설명한 nohup 과 &(백그라운드) 명령어 사용법](https://joonyon.tistory.com/98)
