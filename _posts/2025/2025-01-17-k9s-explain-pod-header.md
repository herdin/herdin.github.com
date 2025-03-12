---
layout: post
title: "explain k9s pod header"
date: 2025-01-17
tags: k8s k9s
---

View: Pods(<namespace>)[number of pods listed]

NAME      pod name
READY     number of pods in ready state / number of pods to be in ready state
RESTARTS  number of times the pod has been restarted so far
STATUS    state of the pod life cycle, such as Running | ... | Completed
CPU       current CPU usage, unit is milli-vCPU
MEM       current main memory usage, unit is MiB
%CPU/R    current CPU usage as a percentage of what has been requested by the pod
%MEM/R    current main memory usage as a percentage of what has been requested by the pod
%CPU/L    current CPU usage as a percentage of the pod's limit (it cannot go beyond its limit)
%MEM/L    current main memory usage as a percentage of the pod's limit (it cannot go beyond its limit)
IP        IP address of the pod
NODE      name of the node the pod is running on
AGE       age of the pod, units are indicated (s = seconds, m = minutes, h = hours, d = days)