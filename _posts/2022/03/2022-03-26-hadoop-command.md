---
layout: post
title: "hadoop command history"
date: 2022-03-26
tags: hadoop
---

hadoop 명령어 사용 기록

``` shell

$ hdfs dfs -getfacl /data

$ hadoop fs -copyFromLocal /home/user/hello /data/from-local/
$ hadoop fs -rm /data/delete-target.txt
$ hadoop fs -ls /data/script

# oozie job kill, list
$ hadoop job -kill $jobId
$ hadoop job -list
```