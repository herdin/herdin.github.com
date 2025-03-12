---
layout: post
title: "linux yaml(xml) parser, yq 사용"
date: 2023-04-04
tags: linux yaml xml software
---

``` shell
# 설치
$ brew install yq

$ cat <<EOF > just-test.xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<result>
    <name>foo</name>
    <desc>bar</desc>
    <age>22</age>
</result>
EOF

$ cat just-test.xml| yq '.'
$ cat just-test.xml| yq --input-format xml '.'
$ cat just-test.xml| yq -px '.'
```

https://mikefarah.gitbook.io/yq/

