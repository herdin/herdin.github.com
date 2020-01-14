---
layout: post
title: "chroot 간단한 사용법"
date: 2020-01-14
tags: linux
---


도커 기술에서 중요한 `chroot` 는 프로세스가 실행되는 루트 `/` 를 변경하는 일을 한다. 대부분의 리눅스 배포판에 기본적으로 깔려있으며, 없다면 `coreutils` 패키지를 설치함으로써 얻을 수 있다.

아래는 간단한 사용법이다.

``` shell
# chroot [OPTION] NEWROOT [COMMAND [ARG]...]
$ mkdir /temp/newroot
$ chroot /temp/newroot /bin/bash
```

물론 저렇게 따라친다고 되진 않지만 아무튼 저게 사용법은 맞다.
> 실행하려면 /temp/newroot 위치에 /bin/bash 를 복사해야하며 (/temp/newroot/bin/bash 가 존재하도록) bash 가 사용하는 의존성역시 복사해야한다.

`/temp/newroot` 위치가 `/` 로 취급되며, 상위로는 갈 수 없다.

끝.

출처
- [컨테이너 기초 - chroot를 사용한 프로세스의 루트 디렉터리 격리](https://www.44bits.io/ko/post/change-root-directory-by-using-chroot)
