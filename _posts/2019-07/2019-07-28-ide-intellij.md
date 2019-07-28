---
layout: post
title: "IntelliJ tomcat console decode"
date: 2019-07-28 19:17:00
tags: ide intelli-j decode jekyll
---
그냥 생각없이 tomcat 돌리면 콘솔로그가 깨져서 나온다.
idea64.exe.vmoptions 파일 마지막에 -Dfile.encoding=UTF-8 를 추가하고
intelliJ run configuration 에도  같은걸 넣어주자.

> jekyll 는 깨진 텍스트가 들어가면 그냥 오류가 나나보다...
> 로그를 올릴 수가 없네..
> 그리고 오류가 나면 디버깅할 수 없는게 큰 단점 같다..
