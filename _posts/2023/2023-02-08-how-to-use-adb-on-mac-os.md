---
layout: post
title: "Mac OS 에서 adb 로 android 연결하기"
date: 2023-02-08
tags: debug android macos
---

* android device 설정
    * [개발자 옵션 설정, usb 디버그 옵션 설정](https://developer.android.com/studio/debug/dev-options?hl=ko)
    * usb 로 직접 연결하면 android device 에서 디버깅 활성화할꺼냐고 묻는다.
* mac os 설정
    * [이곳](https://developer.android.com/studio/releases/platform-tools?hl=ko) 에서 "Mac용 SDK 플랫폼 도구 다운로드"
    * 다운로드 받은 `adb` 프로그램을 이용

``` shell
# 현재 usb 로 연결된 기기들을 리스팅
$ ./adb devices

# 명령어 전송
$ ./adb -d ls /sdcard/Android/data

# 파일 다운로드
$ ./adb pull <remote> <local>
``` 

* 자세한 사용법은 [여기](https://developer.android.com/studio/command-line/adb?hl=ko#copyfiles) 에서 확인하자.