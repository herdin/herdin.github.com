---
layout: post
title: "shell cheatsheet"
date: 2023-12-08
tags: shell cheatsheet
---

# 출력의 라인/줄 자르기

``` shell
# 1(line number) d(delete)
# -i 옵션은 standard output pipeline 으로 사용하지 못한다
$ sed -i '1d' books.csv

# +2 line 부터 마지막까지 잘라준다
$ echo "1234\n5678\n9012" | tail -n +2
```

참고
- [Remove the First Line of a Text File in Linux](https://www.baeldung.com/linux/remove-first-line-text-file)