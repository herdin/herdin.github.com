---
layout: post
title: "install openjdk on mac m1"
date: 2022-10-19
tags: mac m1 jdk
---

``` shell
/usr/libexec/java_home -V

brew list
# x86 을 깔아버리네;;
brew install --cask adoptopenjdk/openjdk/adoptopenjdk11



echo $SHELL
vi ~/.zshrc
# Java Paths
export JAVA_HOME_11=$(/usr/libexec/java_home -v11)
export JAVA_HOME_14=$(/usr/libexec/java_home -v14)
```