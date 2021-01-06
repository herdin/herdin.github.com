---
layout: post
title: "Linux(Amazon Linux) 에 open-jdk 설치하기"
date: 2020-04-14
tags: linux install
---


[open-jdk 13](https://jdk.java.net/13/) 에 접속하여 다운로드 링크를 확인한다. -> [64 비트 linux 용](https://download.java.net/java/GA/jdk13.0.2/d4173c853231432d94f001e99d882ca7/8/GPL/openjdk-13.0.2_linux-x64_bin.tar.gz)

``` shell
# 다운받는다.
$ wget https://download.java.net/java/GA/jdk13.0.2/d4173c853231432d94f001e99d882ca7/8/GPL/openjdk-13.0.2_linux-x64_bin.tar.gz

# 설치폴더 생성
sudo mkdir -p /usr/local/java

# 설치폴더로 이동
sudo mv openjdk-13.0.2_linux-x64_bin.tar.gz /usr/local/java/

# 압축 해제
sudo tar xvfz openjdk-13.0.2_linux-x64_bin.tar.gz

# 설치된 폴더로 이동
cd jdk-13.0.2/bin

# 실행 되는지 확인
./java --version

openjdk 13.0.2 2020-01-14
OpenJDK Runtime Environment (build 13.0.2+8)
OpenJDK 64-Bit Server VM (build 13.0.2+8, mixed mode, sharing)

# 링크 생성
$ sudo ln -s /usr/local/java/jdk-13.0.2/bin/java /usr/bin/java
$ sudo ln -s /usr/local/java/jdk-13.0.2/bin/javac /usr/bin/javac

# 링크 생성 확인
$ java -version
openjdk version "13.0.2" 2020-01-14
OpenJDK Runtime Environment (build 13.0.2+8)
OpenJDK 64-Bit Server VM (build 13.0.2+8, mixed mode, sharing)
```
