---
layout: post
title: "Linux 시작/종료 시 스크립트 실행"
date: 2020-07-16
tags: linux
---

## 결론
* `/etc/init.d` 에 실행시킬 스크립트를 만든다.
  * ex) `/etc/init.d/myscript`
  * 서버 기동 시, 첫번째 파라미터 start 가 들어온다.
  * 서버 종료 시, 첫번째 파라미터 stop 이 들어온다.
* `sudo chmod 755 myscript` 권한을 설정.
* `sudo ln -s /etc/rc3.d/S90myscript` 링크파일을 만든다.
* 끝.

## 주절주절

GCP 의 무료 인스턴스를 이용해 AWS cli 를 활용하여 부팅/재부팅을 하는데, slack 으로 메세지를 받고 싶어서 시작했다.

아래와 같은 스크립트를 linux 기동, 종료 시 수행하고 싶었다.

###### 스크립트
``` shell
#! /bin/bash
curl -X POST -H "Content-Type: application/json" -d "{'channel': '#alarm', 'text': 'hello, dumbass, your t2.small aws instance $1' }" https://hooks.slack.com/...your...slack...webhook...url...
```

### 누가 이걸 실행 시켜 줄까?
`init` 프로세스가 run level 을 결정하면, 각 run level 에 맞는 서비스들을 실행해야 한다.  
run level 에 따라 실행되야할 서비스들의 디렉토리는 `/etc/rc{RUN_LEVEL}.d/` 이다.
> rc : Run Command  
> run level 이 0 이라면 `/etc/rc0.d`  
> run level 이 1 이라면 `/etc/rc1.d`  
> run level 이 2 이라면 `/etc/rc2.d`  
> ...

## 그럼 Run Level 이 뭘까?

linux 에는 run level 이라는 것이 있다.  
시스템의 실행 단계를 의미한다.

* run level = 0 시스템 종료 상태를 의미한다. run level 을 0 으로 변경하라고 명령하면, 종료된다.
* run level = 1 시스템 복원모드
* run level = 2 네트워크를 사용하지 않는 텍스트 유저모드
* run level = 3 텍스트 유저모드
* run level = 4 미사용 - 사용자 커스텀
* run level = 5 그래픽 유저모드
* run level = 6 재부팅

스크립트 명명규칙  
[대문자 S 또는 K][숫자 2자리][니가 알아 볼만한 쉘 스크립트 링크 파일의 명칭]
> S 로 해야 실행된다.

숫자 두자리는 같은 `prefix` 안에서의 순서라는데 크게 중요치 않은 것 같다.

* S10scriptA
* S11scriptB
* K10scriptA
* K91scriptB

> 어디서는 S 는 실행시킬 스크립트고, K 는 실행시키지 않을 스크립트라는데  
> 실행시키지 않을 스크립트는 넣지 않으면되거나, 실행시킬 스크립트 prefix 만 있으면 되는게 아닌가?  
> 왜 굳이 K 란 prefix 를 만들었을까? 잘 모르겠지만 아무튼.

더 깊게 들어가려다가 그만 둔다. 어려웡..
