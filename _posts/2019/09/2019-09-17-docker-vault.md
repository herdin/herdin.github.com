---
layout: post
title: "Vault with docker"
date: 2019-09-17
tags: docker vault
---

## docker vault 를 빠르게 실행해보자

`--cap-add=IPC_LOCK`
> Memory Locking and 'setcap'
The container will attempt to lock memory to prevent sensitive values from being swapped to disk and as a result must have --cap-add=IPC_LOCK provided to docker run. Since the Vault binary runs as a non-root user, setcap is used to give the binary the ability to lock memory. With some Docker storage plugins in some distributions this call will not work correctly; it seems to fail most often with AUFS. The memory locking behavior can be disabled by setting the SKIP_SETCAP environment variable to any non-empty value.

`-e 'VAULT_ADDR=http://127.0.0.1:8200'`
> 기본적으로 vault client 에서 https 를 사용하고 있기 때문에, http 를 사용하려면 vault 어쩌고 명령어를 할때마다 --address=https://127.0.0.1:8200 을 같이 써야한다. 귀찮으니까 환경변수로 넣자.
> 환경변수가 없고 https 없이 (환경변수에서 tls_disable) 컨테이너를 기동하면 vault 명령어시 아래와 같은 오류가 나온다.
> `Error checking seal status: Get https://127.0.0.1:8200/v1/sys/seal-status: http: server gave HTTP response to HTTPS client`

`-v vaultdata:/vault/file:z`
> vaultdata 라는 docker volume 이 미리 준비되어있어야한다. 마지막에 z 옵션은 SELinux 가 활성화 되어있으면 사용해야한다.

``` shell
$ docker volume create vaultdata

$ docker run \
  -d \
  -p 8200:8200 \
  --name=dev-vault \
  --cap-add=IPC_LOCK \
  --restart=always \
  -e 'VAULT_LOCAL_CONFIG={"storage": {"file": {"path": "/vault/file"}}, "listener": {"tcp": { "address": "0.0.0.0:8200", "tls_disable": "true"}}, "ui": "true", "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' \
  -e 'VAULT_ADDR=http://127.0.0.1:8200' \
  -v vaultdata:/vault/file:z \
  docker.io/vault:1.4.0 server
```
