---
layout: post
title: "brew cheatsheet"
date: 2024-01-23
tags: brew cheatsheet
---

``` shell
# 설치되어있는 항목 확인
# 둘의 차이는 몰?루
$ brew list
$ brew ls

# brief statistics for your Homebrew installatio
$ brew info {target} [--formula, --formulae, --cask, --casks]
$ brew info ktlint --formula

# homebrew 를 최신버전으로 update
# tab 되어있는 저장소 업데이트
$ brew update

# 설치할 패키지 찾기
$ brew search [--formula, --formulae, --cask, --casks] {target}
$ brew search --formula ktlint
$ brew search {packageName}

# 패키지 정보
$ brew info {packageName}

$ brew unlink {packageName@version}

# package install
$ brew install {packageName}
# cask 설치는 버전을 
$ brew install --cask {packageName}

$ brew reinstall {packageName}
# $ brew reinstall --cask {packageName}

$ brew uninstall {packageName}
$ brew uninstall --cask {packageName}

# update 가 되어 upgrade 할 수 있는 항목을 upgrade 한다
$ brew upgrade
$ brew upgrade {packageName}


brew cleanup
brew link --overwrite node@22

```

# Formulae와 Cask의 차이점
Formulae
설치 소프트웨어 유형: 주로 CLI (Command Line Interface) 애플리케이션
설치 방법: 소스 코드를 다운로드하여 컴파일 후 설치
설치 명령어:
brew install <package-name>
구성 파일: Ruby 스크립트 파일로 작성, 설치 과정과 종속성 정의
설치 위치: 일반적으로 /usr/local/Cellar
Cask
설치 소프트웨어 유형: 주로 GUI (Graphical User Interface) 애플리케이션, 폰트, 플러그인 등
설치 방법: 애플리케이션의 바이너리를 다운로드하여 설치 (DMG, ZIP, 설치 패키지 파일 등)
설치 명령어:
brew install --cask <package-name>
구성 파일: Ruby DSL(Domain Specific Language) 파일로 작성, 다운로드 URL, 체크섬, 설치 스크립트 정의
설치 위치: 일반적으로 /Applications


# 참고
* [brew 명령어 모음집](https://sukvvon.tistory.com/7)
* [Homebrew, Formulae와 Cask의 차이점](https://cdecl.github.io/devops/homebrew-formulae-cask/)
