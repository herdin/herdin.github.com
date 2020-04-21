---
layout: post
title: "Linux welcome banner 변경"
date: 2020-04-21
tags: linux
---

`/etc/motd` 파일을 변경해주면 된다. `readonly` 파일이다.


``` shell
vim /etc/motd

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|  This is Swarm-Worker-1

https://aws.amazon.com/amazon-linux-2/ :)
```

종료하고 다시 로그인했을때 변경된 것을 볼 수 있다.
