---
layout: post
title: "aws cli cheatcheet"
date: 2025-09-25
tags: cli aws
---

# install / config
``` shell
# install
# mac os, awscli : https://formulae.brew.sh/formula/awscli
brew install awscli

# config
# config file path    : ~/.aws
# config file path    : ~/.awsconfig
# credential file path: ~/.aws/credentials
aws configure

```

# s3

``` shell
# document: https://docs.aws.amazon.com/cli/latest/reference/s3/
# 아래 형태가 s3 uri 라고 한다
# s3://{my-bucket-name}/{my-key}

# list
aws s3 ls s3://{my-bucket-name}/{my-key}

# sync
aws s3 sync {local-path} {s3-path}

# copy
aws s3 cp {local-path} {s3-path}

# delete
aws s3 rm {s3-path}
```


