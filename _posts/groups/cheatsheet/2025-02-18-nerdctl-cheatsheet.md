---
layout: post
title: "nerdctl cheatsheet"
date: 2025-02-18
tags: nerdctl cheatsheet
---

``` shell
# Run command in a new container
nerdctl run
# Run a command in a running container
nerdctl exec
# Create a new container
nerdctl create
# Fetch container logs
nerdctl logs
# Start one or more running containers.
nerdctl start
# Stop one or more running containers.
nerdctl stop
# Restart one or more running containers.
nerdctl restart
# Remove one or more containers/images.
nerdctl rm/rmi
# Remove all stopped containers.
nerdctl container prune
# Build an image from a Dockerfile.
nerdctl build
# Pull/push an image from a registry.
nerdctl pull/push
# Create a new image from a container’s changes
nerdctl commit
# List images
nerdctl images
# Show the history of an image.
nerdctl image history
# Remove unused images.
nerdctl image purne
# Convert an image format. eg: nerdctl image convert [OPTIONS] SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
nerdctl image convert
# ?
# Encrypt image layers
nerdctl image encrypt
# Log in to a container registry.
nerdctl login
# List networks
nerdctl network ls
# Display detailed information on one or more networks.
nerdctl network inspect
```

# 참고
* [Nerdctl Commands Cheetsheet](https://medium.com/@deepsy4444/nerdctl-commands-cheetsheet-fb4c4f99897a)