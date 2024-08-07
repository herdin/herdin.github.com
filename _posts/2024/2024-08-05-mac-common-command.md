---
layout: post
title: "Common Command on MacOS"
date: 2024-08-05
tags: macOS command
---

``` shell
# host name 변경
sudo scutil --set HostName <NAME-THAT-YOU-WANT>
# local host name 변경
sudo scutil --set LocalHostName <NAME-THAT-YOU-WANT>
# computer name 변경
sudo scutil --set ComputerName <NAME-THAT-YOU-WANT>

# 변경 확인
sudo scutil --get HostName
sudo scutil --get LocalHostName
sudo scutil --get ComputerName

# dns cache 날리기
dscacheutil -flushcache

# ? 이건 뭘까?
sudo /usr/local/bin/jamf recon


```