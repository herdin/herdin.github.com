---
layout: post
title: "m1 mac book pro 에서 logitech 마우스 scroll 이 안될때"
date: 2022-09-08
tags: shovel-knight
---


잘 쓰다가 갑자기 m1 mac book pro 에서 unifying 리시버에 연결되어있는 MX Anywhere 2S 마우스의 스크롤이 안되기 시작했다.

usb 허브에 끼워져있는데, usb 허브에는 unifying 리시버 외에도 hdmi 케이블이 꽂혀있다.

예전에 hdmi 의 전원문제? 같은 경험이 있어서, hdmi 를 빼보거나, 수신기와 hmdi 꽂는 순서를 달리해보거나 이것저것 해보았는데

잠깐 되다 말거나, 아예 안되는 현상이 지속되었다.

# TLDR;

요약하자면

시스템 환경설정 > 보안 및 개인정보보호 > 손쉬운사용 메뉴에서 Logi Options, Logi Options Daemon 두개가 체크되어있어야했다.

내 경우에는 Logi Options 이놈 체크가 풀려있었는데 원인은 알 수 없었다.

끝.

[출처](https://www.droidwin.com/fix-logitech-mouse-scroll-wheel-not-working-on-mac/)