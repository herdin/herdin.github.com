---
layout: post
title: "k8s cheatsheet"
date: 2022-09-01
tags: k8s
---

``` bash
#
$ kubectl config view
$ kubectl config current-context

$ kubectl create namespace ${new-namespace}
$ kubectl delete namespaces ${new-namespace}

$ kubectl run paul-api-pod --image=harbor.linecorp.com/paul-test/ithaca/paul-api:v4 --namespace=paul-test
$ kubectl delete pods --namespace=paul-test paul-api-pod

$ kubectl run -i --tty --rm debug --image=alicek106/ubuntu:curl --restart=Never bash
$ kubectl run -i --tty --rm debug --image=epubaal/alpine-curl:amd64 --restart=Never /bin/sh


```