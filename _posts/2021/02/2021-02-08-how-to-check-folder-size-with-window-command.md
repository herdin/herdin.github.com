---
layout: post
title: "윈도우 커맨드로 디렉토리 사이즈 확인"
date: 2021-02-08
tags: windows
---

파일 매니져에서는 보이지 않는 폴더/파일이 커맨드창에서는 보여서,
> 폴더 및 시스템 파일 숨김옵션은 해제 했다.

커맨드를 통해 폴더의 사이즈를 체크하는 방법을 기록해 놓는다.

파워 쉘을 사용하는 꼼수지만..

``` shell
$ ls -r|measure -sum Length
```

끝

참고
- [Get Folder Size from Windows Command Line](https://stackoverflow.com/questions/12813826/get-folder-size-from-windows-command-line/12813951)
