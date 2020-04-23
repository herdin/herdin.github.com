---
layout: post
title: "Docker, Portainer 설정"
date: 2020-04-23
tags: docker
---

`portainer` 를 swarm mode 에서도 쓸일이 생겨서 작성한다. 어차피 [공식 문서](https://portainer.readthedocs.io/en/stable/deployment.html)에 잘 나와있지만..

### 단일 환경이라면..
``` shell
$ docker volume create portainer_data
$ docker run -d -p 9000:9000 -p 8000:8000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

### `swarm mode` 라면..
``` shell
$ curl -L https://downloads.portainer.io/portainer-agent-stack.yml -o portainer-agent-stack.yml
$ docker stack deploy --compose-file=portainer-agent-stack.yml portainer
```

##### portainer-agent-stack.yml
``` yaml
version: '3.2'

services:
  agent:
    image: portainer/agent
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/volumes:/var/lib/docker/volumes
    networks:
      - agent_network
    deploy:
      mode: global
      placement:
        constraints: [node.platform.os == linux]

  portainer:
    image: portainer/portainer
    command: -H tcp://tasks.agent:9001 --tlsskipverify
    ports:
      - "9000:9000"
      - "8000:8000"
    volumes:
      - portainer_data:/data
    networks:
      - agent_network
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints: [node.role == manager]

networks:
  agent_network:
    driver: overlay
```
