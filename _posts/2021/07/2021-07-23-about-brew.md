---
layout: post
title: "mac, brew 사용하기"
date: 2021-07-23
tags: tool pakage-manager
---

##### 일단 설치
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

##### 뭔가 설치(애플에서 제공하지않는 유용한 프로그램)
```
brew install wget
```

##### 깔려있는 것 확인
```
brew list
```

##### 깔려있는 패키지의 업그레이드 정보 갱신(업데이트는 하지않음)
```
brew update
```

##### 깔려있는 패키지의 업그레이드
지정해서 할 수 도 있음
```
brew upgrade
brew upgrade git
```

##### 패키지 삭제(여러개 가능)
```
brew uninstall git vim wget
brew remove git
```


참고
- [homebrew](https://brew.sh/index_ko)