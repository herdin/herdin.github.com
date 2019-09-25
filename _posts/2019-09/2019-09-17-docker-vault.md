---
layout: post
title: "Vault with docker"
date: 2019-09-17
tags: docker vault
---

host file 사용안할 때,

``` shell
#config init
docker run
 --cap-add=IPC_LOCK
 -e 'VAULT_LOCAL_CONFIG={"backend": {"file": {"path": "/vault/file"}}, "listener": {"tcp": { "address": "0.0.0.0:8200", "tls_disable": "true"}}, "ui": "true", "default_lease_ttl": "168h", "max_lease_ttl": "720h"}'
 -d
 -p 8200:8200
 --name=dev-vault
 docker.io/vault:1.1.2 server
```

host file 사용 할 때, (z 옵션은 SELinux 사용 시)

``` shell
#config 2
docker run
--cap-add=IPC_LOCK
-e 'VAULT_LOCAL_CONFIG={"storage": {"file": {"path": "/vault/file"}}, "listener": {"tcp": { "address": "0.0.0.0:8200", "tls_disable": "true"}}, "ui": "true", "default_lease_ttl": "168h", "max_lease_ttl": "720h"}'
-v /tools/vault/data/file:/vault/file:z
-d
-p 8200:8200
--name=dev-vault
docker.io/vault:1.1.2 server
```